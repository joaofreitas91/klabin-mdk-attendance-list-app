/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetPresenceLmsCode(clientAPI) {
    let appSettings = clientAPI.nativescript.appSettingsModule
    var listDay = appSettings.getString('day');
    var ficha = clientAPI.binding.externalCode

    var query = `$filter=cust_ficha eq '${ficha}' and cust_segmento eq '${listDay}'`

    try {
        const presenceList = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_presencalms", ["externalCode"], query)
        const presenceListItem = presenceList.find(i => i.externalCode)

        if(!presenceListItem) throw new Error(`query=${query} file=GetPresenceLmsCode.js message=not found cust_presencalms item`)
        
        
        return `cust_presencalms('${presenceListItem.externalCode}')`
        
    } catch (e) {
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Erro ao consultar dados",
                "Message": `${e}`
            }
        });

    }

    
}
