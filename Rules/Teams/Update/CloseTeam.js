/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function CloseTeam(clientAPI) {
    try {
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CloseTeam.action",
            "Properties": {
                "Properties": {
                    "cust_LMS": "S"
                }
            }
        })
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Encerramento de turma",
                "Message": "Turma encerrada com sucesso!",
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
