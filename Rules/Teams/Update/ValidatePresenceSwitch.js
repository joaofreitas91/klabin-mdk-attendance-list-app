/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function ValidatePresenceSwitch(clientAPI) {
    let appSettings = clientAPI.nativescript.appSettingsModule
    var listDay = appSettings.getString('day');

    const query = `$filter=externalCode eq '${listDay}'`
    const cust_enddate_array = await clientAPI.read('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'cust_listadiaria', ['cust_enddate'], query)

    const cust_enddate = cust_enddate_array.find(i => i.cust_enddate).cust_enddate

    var today = new Date()
    var endDate = new Date(cust_enddate)

    if (
        today.getFullYear() !== endDate.getFullYear() ||
        today.getMonth() !== endDate.getMonth() ||
        today.getDate() !== endDate.getDate()
    ) {
        return false;
    }

    endDate.setHours(23, 59, 59, 999)
    return today.getTime() <= endDate.getTime()
}
