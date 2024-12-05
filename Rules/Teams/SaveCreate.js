/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveCreate(clientAPI) {

    try {
        clientAPI.executeAction("/Attendance_List/Actions/Teams/CreateEntityTeam.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Criação de turma",
                    "Message": "Turma criada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Criação de turma",
                        "Message": `Erro: ${e}`
                    }
                });
            })

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

