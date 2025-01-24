/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function QuerySecondaryInstructor(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");

    const query = `$filter=externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}'`;
    const response = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
    const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    const search = clientAPI.searchString || ''

    let cFilter = `$filter=cust_RELATED_USER ne '${ExtCode}' and cust_RELATED_USER ne '${SFUser}' and externalCode ne '${SFUser}' and externalCode ne '${ExtCode}'&$search='${search}'`

    return cFilter
}
