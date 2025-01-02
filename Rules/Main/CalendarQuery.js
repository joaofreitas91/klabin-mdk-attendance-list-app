/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function defaultQuery(context) {
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    // let cFilter = "cust_LMS ne 'S' or cust_LMS eq null and cust_Status ne 'cancelada' or cust_Status eq null and externalName ne null and cust_START_TME ge " + cDate + "T00:00:00Z and cust_START_TME le " + cDate + "T23:59:59Z";
    let dfilter = `$filter=(cust_START_TME ge 2025-01-02T00:00:00Z and cust_START_TME le 2025-01-02T23:59:59Z) and (cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq 'SRMELLO')`
    dfilter += cExpand

    return dfilter;
}

export default async function CalendarQuery(context) {
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    // let cFilter = "cust_LMS ne 'S' or cust_LMS eq null and cust_Status ne 'cancelada' or cust_Status eq null and externalName ne null and cust_START_TME ge " + cDate + "T00:00:00Z and cust_START_TME le " + cDate + "T23:59:59Z";
    
    const IASUser = context.evaluateTargetPath("#Application/#AppData/UserId");
    // const IASUser = 'SRMELLO'

    const query = `$filter=externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}'`;

    const response = await context.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
    const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    let cFilter = `$filter=(cust_START_TME ge ${cDate}T00:00:00Z and cust_START_TME le ${cDate}T23:59:59Z) and (cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq '${ExtCode}' or cust_INST_ID1 eq '${SFUser}')`
    cFilter += cExpand
    return cFilter
}