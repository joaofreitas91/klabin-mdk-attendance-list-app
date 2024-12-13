export default function GetThreeTeams(context) {    
    var cTop = "&$top=3"
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    var cFilter =  "$filter=cust_END_TME ge " + cDate + "T00:00:00Z and cust_LOCN_DESC ne null and externalName ne null and cust_LMS ne 'S'";
    var cFilter
    cFilter += cTop + cExpand

    return cFilter;
}