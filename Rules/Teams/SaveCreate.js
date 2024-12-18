/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import Cuid from "../Application/Cuid"

export default async function SaveCreate(clientAPI) {

    try {
        const teamId = Cuid()
        const partners = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerParticipants/#Value/')
        /* const userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId'); */
        const cust_cursos_id = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerCurse/#SelectedValue')

        const query = `$filter=externalCode eq '${cust_cursos_id}'`
        const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Cursos", ["cust_CPNT_TYP_ID", "cust_CPNT_TITLE"], query)

        /* const queryInst = `$filter=cust_RELATED_USER eq '${userId}'`
        const instructors = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Instrutores", ["externalCode"], queryInst)

        const inst1 = instructors.find(i => i.externalCode) */
        const curse = entity.find(i => i.cust_CPNT_TYP_ID)

        const props = partners.map((i, index) => {
            const externalCode = Cuid()
            const props = {
                "externalCode": externalCode,
                "cust_Turma": teamId,
                "cust_Aluno": i.ReturnValue,
                "externalName": `Dia ${index + 1}`
            }
            return props
        })

        /* 
        Validação do Datepicker da data inicial
        Regra: Não pode criar turma iniciando com data diferente da data atual
        */
        const startDateTime = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerStartDate/#Value') // Valor do DatePicker
        const inputDate = new Date(startDateTime) // Valor do DatePicker formatado no new Date
        inputDate.setHours(0, 0, 0, 0) // Setando o tempo igual a zero pois será comparado apenas a data
        const currentDate = new Date() // Data atual
        currentDate.setHours(0, 0, 0, 0) // Setando o tempo igual a zero pois será comparado apenas a data

        if (inputDate.getTime() !== currentDate.getTime()) { // Se a data inicial for diferente da data atual retorna mensagem de erro
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "A data inicial não pode ser diferente da data atual!"
                },
            });
        }
        // Final da validação da data inicial
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": teamId,
                    "externalName": curse.cust_CPNT_TITLE,
                    "cust_CPNT_TYP_ID": curse.cust_CPNT_TYP_ID,
                }
            }
        })

        await Promise.all(props.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": "Turma criada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}

