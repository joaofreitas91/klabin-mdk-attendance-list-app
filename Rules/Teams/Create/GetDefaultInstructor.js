/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function GetDefaultInstructor(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");

    const query = `$filter=externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}'`;
    const response = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';

    return ExtCode
}
