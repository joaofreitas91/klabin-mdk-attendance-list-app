/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function CancelTeam(clientAPI) {
    try {
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CancelTeam.action",
            "Properties": {
                "Properties": {
                    "cust_Status": "cancelada"
                }
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
