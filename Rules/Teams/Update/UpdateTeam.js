/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default async function UpdateTeam(clientAPI) {

    try {

        var fieldSwitch = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSwitch0/#Value")
        var fieldNote = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSimpleProperty0/#Value")
        let appSettings = clientAPI.nativescript.appSettingsModule
        var dayExternalCode = appSettings.getString('day');
        alert(dayExternalCode)

        // Fazer um read para verificar se a lista de presença (cust_listapresencalms) ja existe, filtrando por idturma, idlistadiaria e idficha.

        // await clientAPI.executeAction({
        //     "Name": "/Attendance_List/Actions/Teams/UpdatePresenceList.action",
        //     "Properties": {
        //         "Properties": {
        //             "cust_Status": fieldSwitch ? "presente" : "ausente",
        //             "cust_nota": fieldNote
        //         }
        //     }
        // })
        
        // await clientAPI.executeAction({
        //     "Name": "/Attendance_List/Actions/GenericMessageBox.action",
        //     "Properties": {
        //         "Title": "Atualização de turma",
        //         "Message": "Turma alterada com sucesso!",
        //         "OnOK": "/Attendance_List/Actions/ClosePage.action"
        //     },
        // });
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

