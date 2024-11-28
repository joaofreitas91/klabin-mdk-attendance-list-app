export default function GetTurmas(context) {    
    var cTop = "&$top=3"
    var cExpand = "&$expand=cust_ListaNav($expand=cust_AlunosNav)"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    var cFilter =  "$filter=cust_END_TME ge datetimeoffset'" + cDate + "T00:00:00Z' and cust_LOCN_DESC ne 'null' and externalName ne 'null'";
    
    cFilter += cTop + cExpand

    context.executeAction({

        "Name": "/Attendance_List/Actions/GenericMessageBox.action",
        "Properties": {
            "Message": `Query: ${cFilter}`,
            "Animated": true,
            "Duration": 1,
            "IsIconHidden": true,
            "NumberOfLines": 1
        }
    });

    return cFilter;
}