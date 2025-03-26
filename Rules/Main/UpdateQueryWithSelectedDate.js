
export default async function UpdateQueryWithSelectedDate(clientAPI) {
    try {
        const IASUser = clientAPI.evaluateTargetPath("#Application/#AppData/UserId");
        // const IASUser = 'SRMELLO'

        const query = `$filter=(externalCode eq '${IASUser}' or cust_RELATED_USER eq '${IASUser}') and cust_notactive eq 'N'`;

        const response = await clientAPI.read(
            "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
            "cust_Instrutores",
            ["externalCode", "cust_RELATED_USER"],
            query
        );
        const ExtCode = response.find(i => i.externalCode)?.externalCode || '';
        const SFUser = response.find(i => i.cust_RELATED_USER)?.cust_RELATED_USER || '';

        let selectedDate = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionCalendar1").getSelectedDate();
        let year = selectedDate.getFullYear();
        let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ("0" + selectedDate.getDate()).slice(-2);
        let formattedDate = year + '-' + month + '-' + day;
        var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
        let filterQuery = `$filter=(cust_START_TME ge ${formattedDate}T00:00:00Z and cust_START_TME le ${formattedDate}T23:59:59Z) and (cust_LMS ne 'S' or cust_LMS eq null) and (cust_Status ne 'cancelada' or cust_Status eq null) and (externalName ne null) and (cust_INST_ID1 eq '${ExtCode}' or cust_INST_ID1 eq '${SFUser}')`;

        filterQuery += cExpand

        let oCardObj = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectCardCollection1");
        let oTarget = oCardObj.getTargetSpecifier();
        oTarget.setQueryOptions(filterQuery);
        oCardObj.setTargetSpecifier(oTarget);
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}

// export default function UpdateQueryWithSelectedDate(clientAPI) {
//     try {
//         let selectedDate = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionCalendar1").getSelectedDate();
//         let year = selectedDate.getFullYear();
//         let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
//         let day = ("0" + selectedDate.getDate()).slice(-2);
//         let formattedDate = year + '-' + month + '-' + day;
//         var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
//         let filterQuery = "$filter=cust_LMS ne 'S' and cust_Status ne 'cancelada' and externalName ne null and cust_START_TME ge " + formattedDate + "T00:00:00Z and cust_START_TME le " + formattedDate + "T23:59:59Z";
//         filterQuery += cExpand
//         let oCardObj = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectCardCollection1");
//         let oTarget = oCardObj.getTargetSpecifier();
//         oTarget.setQueryOptions(filterQuery);
//         oCardObj.setTargetSpecifier(oTarget);
//     } catch (error) {
//         alert("An error occurred: " + error.message);
//     }
// }
