/**
 * @param {IClientAPI} clientAPI
 */

export default async function QueryShowAllTeams(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    const queryInstructorFilter = `$filter=(externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}') and (cust_notactive eq 'N')`;

    const response = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        queryInstructorFilter
    );

    const externalCode = response.find(instructor => instructor.externalCode)?.externalCode || '';
    const relatedUser = response.find(instructor => instructor.cust_RELATED_USER)?.cust_RELATED_USER || '';

    let query = ""
    query += `$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav`
    query += `&$filter=(cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq '${externalCode}' or cust_INST_ID1 eq '${relatedUser}')`
    query += "&$orderby=cust_START_TME"
    return query
}