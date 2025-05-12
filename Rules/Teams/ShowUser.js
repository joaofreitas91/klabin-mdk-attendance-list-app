/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function ShowUser(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    
    try {
        const query = `$filter=(externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}') and cust_notactive eq 'N'`;
        
        const response = await clientAPI.read(
            "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
            "cust_Instrutores",
            ["externalCode", "cust_RELATED_USER"],
            query
        );
        
        const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
        const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "User Information",
                "Message": `IASUser: ${IASUser} - ExtCode: ${ExtCode} - SFUser: ${SFUser}`
            }
        });
        
    } catch (err) {
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "User Information",
                "Message": `User detail not found to ${IASUser}`
            }
        });
    }
}
