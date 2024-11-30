/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveEdit(clientAPI) {

    try {
        // const returnValue = context.evaluateTargetPath("#Control:FormCellListPicker2/#ReturnValue");
        /* const listPicker = context.getPageProxy().getControl("SectionedTable0").getSection("SectionFormCell0").getControl("FormCellListPicker2")

        const selectedItems = listPicker.getValue();

        if (!selectedItems || selectedItems.length === 0) {
            throw new Error("Nenhum item foi selecionado.");
        }

        context.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Message": JSON.stringify(selectedItems)
            }
        });

        const bindingObject = selectedItems[0].BindingObject;

        if (!bindingObject || !bindingObject["@odata.readLink"]) {
            throw new Error("O item selecionado não contém um ReadLink válido.");
        } */

        return clientAPI.executeAction('/Attendance_List/Actions/Teams/UpdateTeam.action').then(() => {
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
                    "Message": `erro: ${e}`
                }
            });
        })

    } catch (error) {
        // Mostrar mensagem de erro
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Message": `Erro: ${error.message}`
            }
        });
    }

}
