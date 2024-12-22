/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function SetStorageVariable(clientAPI) {
    try {

        let appSettings = clientAPI.nativescript.appSettingsModule;
        let item = clientAPI.getPageProxy().getActionBinding().externalCode
        let actionBinding = clientAPI.getPageProxy().getActionBinding()
        appSettings.setString('day', String(item));

        await clientAPI.executeAction("/Attendance_List/Actions/Teams/NavToDailyAttendanceList.action")

    } catch (e) {
        alert(e)
    }
}
