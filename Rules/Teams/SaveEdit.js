/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveEdit(clientAPI) {
    clientAPI.executeAction("/Attendance_List/Actions/Teams/UpdateTeamSuccessMessage.action")
    return
}
