export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _CAP_SERVICE_SF_LMS = context.executeAction('/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_CAP_SERVICE_SF_LMS]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/Attendance_List/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}