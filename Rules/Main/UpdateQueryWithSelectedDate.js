export default function UpdateQueryWithSelectedDate(clientAPI) {
    try {
        let selectedDate = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionCalendar1").getSelectedDate();
        let year = selectedDate.getFullYear();
        let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ("0" + selectedDate.getDate()).slice(-2);
        let formattedDate = year + '-' + month + '-' + day;
        var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
        let filterQuery = "$filter=cust_LMS ne 'S' and cust_Status ne 'cancelada' and externalName ne null and cust_START_TME ge " + formattedDate + "T00:00:00Z and cust_START_TME le " + formattedDate + "T23:59:59Z";
        filterQuery += cExpand
        let oCardObj = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectCardCollection1");
        let oTarget = oCardObj.getTargetSpecifier();
        oTarget.setQueryOptions(filterQuery);
        oCardObj.setTargetSpecifier(oTarget);
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}
