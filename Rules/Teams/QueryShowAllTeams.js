/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default async function QueryShowAllTeams(clientAPI) {
    const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
    // const IASUser = 'SRMELLO'

    const query = `$filter=externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}'`;

    const response = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
    const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';
    // const userFilter = ` and cust_INST_ID1 eq '${ExtCode}' or cust_INST_ID1 eq '${SFUser}' `;

    var cFilter = `$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav&$filter=(cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq '${ExtCode}' or cust_INST_ID1 eq '${SFUser}')`
    // let cFilter = "?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav&$filter=externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada' "
    // cFilter += userFilter
    cFilter += "&$orderby=cust_START_TME"
    return cFilter
}
// export default function QueryShowAllTeams(clientAPI) {
//     return "?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav&$filter=externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'&$orderby=cust_START_TME"

// }