export default function UpdateQueryWithSelectedDate(clientAPI) {
    try {
        let selectedDate = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionCalendar1").getSelectedDate();
        let year = selectedDate.getFullYear();
        let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ("0" + selectedDate.getDate()).slice(-2);
        let formattedDate = year + '-' + month + '-' + day;
        let filterQuery = "$filter=cust_LOCN_DESC ne null and externalName ne null and cust_START_TME ge datetimeoffset'" + formattedDate + "T00:00:00Z' and cust_START_TME le datetimeoffset'" + formattedDate + "T23:59:59Z'";
        let oCardObj = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectCardCollection1");
        let oTarget = oCardObj.getTargetSpecifier();        
        //clientAPI.getPageProxy().setCaption(formattedDate);
        oTarget.setQueryOptions(filterQuery);
        oCardObj.setTargetSpecifier(oTarget);
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}
