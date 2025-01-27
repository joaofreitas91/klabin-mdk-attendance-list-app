/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import Cuid from "../Application/Cuid"

export default async function AddParticipantsToList(clientAPI) {

    try {
        const custAlunosQuery = `$filter=cust_Turma eq '${clientAPI.binding.externalCode}'`
        const custAlunos = await clientAPI.read('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'cust_ListadePresenca', ['cust_Aluno'], custAlunosQuery)
        const alunosList = custAlunos.map(i => i.cust_Aluno)

        const partners = clientAPI.evaluateTargetPath('#Control:FormCellListPicker0/#Value/')

        if (partners.length === 0) {
            return alert("nenhum participante selecionado")
        }

        const firstDay = clientAPI.binding.cust_START_TME
        const lastDay = clientAPI.binding.cust_END_TME

        const partnerList = partners.map((i, index) => {
            if (alunosList.includes(i.ReturnValue)) return

            const externalCode = Cuid()
            const props = {
                "externalCode": externalCode,
                "cust_Turma": clientAPI.binding.externalCode,
                "cust_Aluno": i.ReturnValue,
                "externalName": i.BindingObject.cust_fname + ' ' + (i.BindingObject.cust_mname ? (i.BindingObject.cust_mname + ' ') : '') + (i.BindingObject.cust_lname ? i.BindingObject.cust_lname : ''),
                "cust_startdate": new Date(firstDay).toISOString(),
                "cust_enddate": new Date(lastDay).toISOString(),
            }
            return props
        }).filter(i => i)

        const query = `$filter=cust_turma eq '${clientAPI.binding.externalCode}'`
        const dailyList = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_listadiaria",
            [
                "externalCode",
                "cust_turma",
                "cust_startdate",
                "cust_enddate",
                "cust_totalhoras"
            ], query)

        const presencalmsList = dailyList.map((d) =>
            partnerList.map((p) => {
                const endDate = new Date(d.cust_enddate)
                endDate.setHours(0, 0, 0, 0)
                const today = new Date()
                today.setHours(0, 0, 0, 0)

                return ({
                    "externalCode": Cuid(),
                    "cust_enddate": new Date(d.cust_enddate).toISOString(),
                    "cust_startdate": new Date(d.cust_startdate).toISOString(),
                    "cust_ficha": p.externalCode,
                    "cust_segmento": d.externalCode,
                    "cust_turma": d.cust_turma,
                    "cust_presenca": (today.getTime() <= endDate.getTime()) ? "presente" : "ausente"
                })
            })
        ).reduce((acc, current) => acc.concat(current), [])

        await Promise.all(partnerList.map(prop => { // criar lista de presença (ficha)

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        // await Promise.all(dailyList.map(prop => { // criar lista diaria

        //     return clientAPI.executeAction({
        //         "Name": "/Attendance_List/Actions/Teams/CreateDailyList.action",
        //         "Properties": {
        //             "Properties": prop,
        //         }
        //     })
        // }))

        await Promise.all(presencalmsList.map(prop => { // criar presença lms

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresencalmsEntity.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        clientAPI.executeAction("/Attendance_List/Actions/ClosePage.action")

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Adição de participante",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}
