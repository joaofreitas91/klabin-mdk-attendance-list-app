/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetPresenceLmsCode(clientAPI) {
    let appSettings = clientAPI.nativescript.appSettingsModule
    var listDay = appSettings.getString('day');
    var ficha = clientAPI.binding.externalCode

    var query = `$filter=cust_ficha eq '${ficha}' and cust_segmento eq '${listDay}'`

    const presenceList = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_presencalms", ["externalCode"], query)

    const presenceListItem = presenceList.find(i => i.externalCode)

    return `cust_presencalms('${presenceListItem.externalCode}')`
}
