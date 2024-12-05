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
                    "Message": `Sucesso`
                }
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Message": `Erro: ${e}`
                    }
                });
            })

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Message": `Erro: ${error.message}`
            }
        });
    }

}

