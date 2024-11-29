/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CalendarQuery(context) {
    return defaultQuery(context)
}

function defaultQuery(context) {
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    let cFilter = "$filter=cust_LOCN_DESC ne null and externalName ne null and cust_START_TME ge " + cDate + "T00:00:00Z and cust_START_TME le " + cDate + "T23:59:59Z";

    cFilter += cExpand

    return cFilter;
}
