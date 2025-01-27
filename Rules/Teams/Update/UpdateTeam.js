/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default async function UpdateTeam(clientAPI) {

    try {
        var fieldSwitch = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSwitch0/#Value")
        var reprovedSwitch = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSwitch1/#Value")
        var fieldNote = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSimpleProperty0/#Value")

        if (Number(fieldNote) !== 0) { 
        if (!Number(fieldNote)) {
            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Valor inválido",
                    "Message": `O campo nota está com valor inválido.`
                }
            });
        }}

        if (fieldNote > 100) {
            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Valor inválido",
                    "Message": `O campo nota não pode ser superior a 100.`
                }
            });
        }

        if (fieldNote < 0) {
            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Valor inválido",
                    "Message": `O campo nota não pode ser negativo.`
                }
            });
        }

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/UpdatePresencalmsEntity.action",
            "Properties": {
                "Properties": {
                    "cust_presenca": fieldSwitch ? "presente" : "ausente",
                }
            }
        })

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/UpdatePresenceList.action",
            "Properties": {
                "Properties": {
                    "cust_nota": `${fieldNote === '' ? fieldNote : Number(fieldNote)}`,
                    "cust_resultado": reprovedSwitch ? "reprovado" : null
                }
            }
        })

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Atualização de turma",
                "Message": "Turma alterada com sucesso!",
                "OnOK": "/Attendance_List/Actions/ClosePage.action"
            },
        });
    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Atualização de turma",
                "Message": `Não foi possível concluir a ação no momento. Por favor, tente novamente mais tarde e certifique-se de realizar a sincronização.`
            }
        });
    }

}

