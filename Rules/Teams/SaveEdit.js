/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveEdit(clientAPI) {

    try {
        /* let pageProxy = context.getPageProxy();
        let actionBinding = pageProxy.getActionBinding();
        alert(actionBinding) */
        // let value = clientAPI.evaluateTargetPath('#Page:TeamEdit/#Control:SectionedTable0/#ClientData')
        /* let cRet = clientAPI.evaluateTargetPath('#Control:FormCellListPicker2/#SelectedValue')
        alert(cRet) */

        // const  cust_INST_ID2 = clientAPI.evaluateTargetPath('#Control:FormCellListPicker2/#SelectedValue')
        // #Page:TeamEdit/#Control:FormCellListPicker0/#ClientData/?
        const values = clientAPI.evaluateTargetPath('#Control:FormCellListPicker0/#Value/')

        const valuesWithObj = values.map(i => i.ReturnValue)

        alert(`${JSON.stringify(valuesWithObj)}`)

        let properties = {
            createdBy: clientAPI.binding.createdBy || "",
            createdDateTime: clientAPI.binding.createdDateTime || null,
            cust_ACT_CPNT_ID: clientAPI.binding.cust_ACT_CPNT_ID || "",
            cust_CPNT_TYP_ID: clientAPI.binding.cust_CPNT_TYP_ID || "",
            cust_END_TME: clientAPI.binding.cust_END_TME || null,
            cust_INST_ID1: clientAPI.binding.cust_INST_ID1 || "",
            cust_INST_ID2: cust_INST_ID2 || "", // Novo valor do ListPicker
            cust_LMS: clientAPI.binding.cust_LMS || "",
            cust_LOCN_DESC: clientAPI.binding.cust_LOCN_DESC || "",
            cust_LOCN_ID1: clientAPI.binding.cust_LOCN_ID1 || "",
            cust_NOTACTIVE: clientAPI.binding.cust_NOTACTIVE || false,
            cust_SSG_SEG_NUM: clientAPI.binding.cust_SSG_SEG_NUM || "",
            cust_START_TME: clientAPI.binding.cust_START_TME || null,
            cust_Status: clientAPI.binding.cust_Status || "",
            externalCode: clientAPI.binding.externalCode || "",
            externalName: "Teste de PATCH",
            lastModifiedBy: clientAPI.binding.lastModifiedBy || "",
            lastModifiedDateTime: clientAPI.binding.lastModifiedDateTime || null,
            mdfSystemRecordStatus: clientAPI.binding.mdfSystemRecordStatus || "",
        }
            
        return clientAPI.executeAction("/Attendance_List/Actions/Teams/UpdateTeam.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Edição de turma",
                    "Message": "Turma editada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
        .catch((e) => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Edição de turma",
                    "Message": `Erro: ${e}`
                }
            });
        })

    } catch (error) {
        
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Edição de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}
