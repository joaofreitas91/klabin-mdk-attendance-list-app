export default async function GetThreeTeams(context) {
    const IASUser = context.evaluateTargetPath("#Application/#AppData/UserId");
    // const IASUser = 'SRMELLO'

    const query = `$filter=(externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}') and cust_notactive eq 'N'`;

    const response = await context.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ["externalCode", "cust_RELATED_USER"],
        query
    );
    const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
    const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

    var cTop = "&$top=3"
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    // var cFilter = "$filter=cust_END_TME ge " + cDate + "T00:00:00Z and externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'";
    var cFilter = `$filter=cust_END_TME ge ${cDate}T00:00:00Z and (cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq '${ExtCode}' or cust_INST_ID1 eq '${SFUser}')`
    var cFilter

    cFilter += cTop + cExpand

    return cFilter;
}

// export default function GetThreeTeams(context) {    
//     var cTop = "&$top=3"
//     var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
//     var dDate = new Date();
//     var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
//     var cFilter =  "$filter=cust_END_TME ge " + cDate + "T00:00:00Z and externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'";
//     var cFilter
//     cFilter += cTop + cExpand

//     return cFilter;
// }
