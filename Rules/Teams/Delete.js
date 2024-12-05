/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Delete(clientAPI) {
    try {
        clientAPI.executeAction("/Attendance_List/Actions/Teams/DeleteTeam.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Exclusão de turma",
                    "Message": "Turma excluida com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Exclusão de turma",
                        "Message": `Erro: ${e}`
                    }
                });
            })

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Exclusão de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}


