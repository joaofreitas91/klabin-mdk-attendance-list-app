{
	"MainPage": "/Attendance_List/Pages/Main.page",
	"OnLaunch": [
		"/Attendance_List/Rules/Service/Initialize.js",
		"/Attendance_List/Rules/Main/SetUserIds.js"
	],
	"OnWillUpdate": "/Attendance_List/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/Attendance_List/Rules/Service/Initialize.js",
	"Styles": "/Attendance_List/Styles/Styles.less",
	"Version": "/Attendance_List/Globals/Application/AppDefinition_Version.global",
	"OnResume": "/Attendance_List/Rules/Main/SetUserIds.js",
	"Localization": "/Attendance_List/i18n/i18n.properties",
	"_SchemaVersion": "24.11",
	"_Name": "Attendance_List"
}