/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function CancelTeam(clientAPI) {

    const ComeFromApp = {
        "cust_Status": "cancelada",
    }
    const ComeFromLMS = {
        "cust_Status": "cancelada",
        "cust_LMS": "S"
    }

    try {
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CancelTeam.action",
            "Properties": {
                "Properties": clientAPI.binding.cust_fromApp ? ComeFromApp : ComeFromLMS
            }
        })

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Cancelamento de turma",
                "Message": "Turma cancelada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    }catch(e){
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${e.message}`
            }
        });
    }
}
