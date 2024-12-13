/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/Attendance_List/i18n/i18n.properties":
/*!****************************************************************!*\
  !*** ./build.definitions/Attendance_List/i18n/i18n.properties ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/AppUpdateFailure.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/AppUpdateFailure.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/Attendance_List/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/AppUpdateSuccess.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/AppUpdateSuccess.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Attendance_List/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Attendance_List/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/ClientIsMultiUserMode.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/ClientIsMultiUserMode.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/Cuid.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/Cuid.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cuid)
/* harmony export */ });
function Cuid(context) {
    const cuidPrefix = 'c';
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    const uniqueID = cuidPrefix + timestamp + randomPart;
    return uniqueID;
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/GetClientSupportVersions.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/GetClientSupportVersions.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/GetClientVersion.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/GetClientVersion.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/OnWillUpdate.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/OnWillUpdate.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/Attendance_List/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/ResetAppSettingsAndLogout.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/Attendance_List/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Application/Uuidv4.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Application/Uuidv4.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Uuidv4)
/* harmony export */ });

function Uuidv4(context) {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    const uuidV4 = uuidv4();
    return uuidV4
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/CAP_SERVICE_SF_LMS/ErrorArchive_CheckForSyncError.js":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/CAP_SERVICE_SF_LMS/ErrorArchive_CheckForSyncError.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/Attendance_List/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/LogLevels.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/LogLevels.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/SetTraceCategories.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/SetTraceCategories.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/SetUserLogLevel.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/SetUserLogLevel.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/ToggleLogging.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/ToggleLogging.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/TraceCategories.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/TraceCategories.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Logging/UserLogSetting.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Logging/UserLogSetting.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/CalendarQuery.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/CalendarQuery.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarQuery)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function CalendarQuery(context) {
    return defaultQuery(context)
}

function defaultQuery(context) {
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    let cFilter = "$filter=cust_LOCN_DESC ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada' and externalName ne null and cust_START_TME ge " + cDate + "T00:00:00Z and cust_START_TME le " + cDate + "T23:59:59Z";

    cFilter += cExpand

    return cFilter;
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/EndTeam.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/EndTeam.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fimTurma)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function fimTurma(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_END_TME)
    var cRet = "Término: " + dDate.getDate().toString().padStart(2, "0") + "/" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
   return(cRet)
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/GetThreeTeams.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/GetThreeTeams.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetThreeTeams)
/* harmony export */ });
function GetThreeTeams(context) {    
    var cTop = "&$top=3"
    var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
    var dDate = new Date();
    var cDate = dDate.getFullYear().toString() + "-" + (dDate.getMonth() + 1).toString().padStart(2, "0") + "-" + dDate.getDate().toString().padStart(2, "0");
    var cFilter =  "$filter=cust_END_TME ge " + cDate + "T00:00:00Z and cust_LOCN_DESC ne null and externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'";
    var cFilter
    cFilter += cTop + cExpand

    return cFilter;
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/StartTeam.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/StartTeam.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InicioTurma)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function InicioTurma(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_START_TME) 
    var cRet  = 'Início: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
    return(cRet)
}
 

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/TeamDescription.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/TeamDescription.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TeamDescription)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function TeamDescription(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_START_TME) 
    var cRet  = 'Início: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
    
    cRet += "\n"

    dDate = new Date(clientAPI.binding.cust_END_TME) 
    cRet += 'Fim: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"

    return(cRet)
}
 

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/UpdateQueryWithSelectedDate.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/UpdateQueryWithSelectedDate.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateQueryWithSelectedDate)
/* harmony export */ });
function UpdateQueryWithSelectedDate(clientAPI) {
    try {
        let selectedDate = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionCalendar1").getSelectedDate();
        let year = selectedDate.getFullYear();
        let month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
        let day = ("0" + selectedDate.getDate()).slice(-2);
        let formattedDate = year + '-' + month + '-' + day;
        var cExpand = "&$expand=cust_Inst1Nav,cust_Inst2Nav"
        let filterQuery = "$filter=cust_LOCN_DESC ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada' and externalName ne null and cust_START_TME ge " + formattedDate + "T00:00:00Z and cust_START_TME le " + formattedDate + "T23:59:59Z";
        filterQuery += cExpand
        let oCardObj = clientAPI.getPageProxy().getControl("SectionedTable0").getSection("SectionObjectCardCollection1");
        let oTarget = oCardObj.getTargetSpecifier();
        oTarget.setQueryOptions(filterQuery);
        oCardObj.setTargetSpecifier(oTarget);
    } catch (error) {
        alert("An error occurred: " + error.message);
    }
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Main/WelcomeMessage.js":
/*!************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Main/WelcomeMessage.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WelcomeMessage)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function WelcomeMessage(context) {
    var dToday = new Date()
    var cRet   = ''

    if (dToday.getHours() >= 12 && dToday.getHours() < 18 ){
        cRet = "Boa tarde, "
    }else if(dToday.getHours() >= 18 && dToday.getHours() < 24 ){
        cRet = "Boa noite, "
    }else{
        cRet = "Bom dia, "
    }
        
    cRet += context.evaluateTargetPath("#Application/#AppData/UserId");
    return (cRet);
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Service/Initialize.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Service/Initialize.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

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

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Create/FormatEndDate.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Create/FormatEndDate.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetEndDate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetEndDate(clientAPI) {
    const endDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePickerEndDate/#Value")

    return `/Date(${new Date(endDate).getTime()})/`
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Create/FormatStartDate.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Create/FormatStartDate.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatStartDate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function FormatStartDate(clientAPI) {
    const startDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePickerStartDate/#Value")

    return `/Date(${new Date(startDate).getTime()})/`
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Create/GenerateId/GenerateId.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Create/GenerateId/GenerateId.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateId)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function GenerateId(clientAPI) {
    try {
        const entity = await clientAPI.read('/Attendance_List/Services/CAP_SERVICE_SF_LMS.service', 'cust_Turmas', ['externalCode'])
        const onlyExternalCodes = entity
            .map(i => i.externalCode)

        alert(onlyExternalCodes)

        const externalCodes = onlyExternalCodes  
            .filter(i => String(i) != 'NaN')
            .sort((a, b) => a - b);

        const onlyExternalCode = externalCodes.find((_, index) => index == (externalCodes.length - 1))
        
        return String(onlyExternalCode + 1)
        
    } catch (error) {
        alert(error)
    }
    
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Create/SetInitialBinding.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Create/SetInitialBinding.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetInitialBinding)
/* harmony export */ });
function SetInitialBinding(context) {

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0; // Gera um número aleatório de 0-15
            const v = c === 'x' ? r : (r & 0x3) | 0x8; // Ajusta os bits para conformidade com UUID v4
            return v.toString(16); // Retorna o valor em hexadecimal
        });
    }

    // Retorna o UUID gerado
    return uuidv4();
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Delete.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Delete.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Delete)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function Delete(clientAPI) {
    try {
        clientAPI.executeAction("/Attendance_List/Actions/Teams/DeleteTeam.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Exclusão de turma",
                    "Message": "Turma excluida com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
            .catch((e) => {
                clientAPI.executeAction({
                    "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                    "Properties": {
                        "Title": "Exclusão de turma",
                        "Message": `Erro: ${e}`
                    }
                });
            })

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Exclusão de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}




/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoFirstName.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoFirstName.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetAlunoFirstName)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function GetAlunoFirstName(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_Aluno}'`
    const response = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Alunos", ["cust_fname"], query)
    const partner = response.find(i => i.cust_fname)
    return `${partner.cust_fname}`

}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoName.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoName.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetAlunoName)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function GetAlunoName(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_Aluno}'`
    const response = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Alunos", ["cust_lname"], query)
    const partner = response.find(i => i.cust_lname)
    return `${partner.cust_lname}`
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav1.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav1.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetInstNav1)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function GetInstNav1(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_INST_ID1}'`
    const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Instrutores", ["cust_fname", "cust_lname"], query)
    const item = entity.find(i => Boolean(i.cust_fname) && Boolean(i.cust_lname))
    const label = `${item.cust_fname} ${item.cust_lname}`

    return item ? label : '-' 
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav2.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav2.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetInstNav1)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function GetInstNav1(clientAPI) {
    const query = `$filter=externalCode eq '${clientAPI.binding.cust_INST_ID2}'`
    const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Instrutores", ["cust_fname", "cust_lname"], query)
    const item = entity.find(i => Boolean(i.cust_fname) && Boolean(i.cust_lname))
    const label = `${item.cust_fname} ${item.cust_lname}`

    return item ? label : '-' 
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetPartnerNote.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetPartnerNote.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetPartnerNote)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetPartnerNote(clientAPI) {
    return clientAPI.binding.cust_nota ? `Nota: ${clientAPI.binding.cust_nota}` : 'Nota: -'
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/GetTeamStatus.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/GetTeamStatus.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetTeamStatus)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetTeamStatus(clientAPI) {
    return clientAPI.binding.cust_Status ?? "ausente"
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Details/OnPartnerPress.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Details/OnPartnerPress.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnPartnerPress)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnPartnerPress(clientAPI) {
    alert(JSON.stringify(clientAPI.binding))
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/FormatEndDate.js":
/*!************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/FormatEndDate.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatEndDate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function FormatEndDate(clientAPI) {
    const endDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePicker1/#Value")

    return `/Date(${new Date(endDate).getTime()})/`
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/FormatStartDate.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/FormatStartDate.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatStartDate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function FormatStartDate(clientAPI) {
    
    const startDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePicker0/#Value")

    return `/Date(${new Date(startDate).getTime()})/`
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/GetFullName.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/GetFullName.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetFullName)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetFullName(clientAPI) {
    var cRet = ''
    
    cRet = clientAPI.binding.cust_fname + ' ' + (clientAPI.binding.cust_mname ? (clientAPI.binding.cust_mname + ' ') : '') + (clientAPI.binding.cust_lname ? clientAPI.binding.cust_lname : '')
    
    return cRet
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/ProcessReturnValue.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/ProcessReturnValue.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProcessReturnValue)
/* harmony export */ });
function ProcessReturnValue(context) {
    // Retrieve selected employees (cust_matricula) from the list picker
    // let selectedEmployees = context.evaluateTargetPath("#Control:FormCellListPicker0/#SelectedItems");

    // Retrieve externalCode from the page binding for cust_Turma
    // let cust_Turma = context.evaluateTargetPath("#Page:TurmaEdit/#Binding/externalCode");

    // Map each selected employee to the required properties
    /* return selectedEmployees.map(employee => {
        let cust_Aluno = employee.cust_matricula;
        let externalCode = `${cust_Turma}${cust_Aluno}`;
        let cust_AlunosNav = `$filter=externalCode eq '${cust_Aluno}'`;

        return {
            cust_Aluno,
            externalCode,
            cust_AlunosNav
        };
    }); */
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/QueryShowAllTeams.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/QueryShowAllTeams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QueryShowAllTeams)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function QueryShowAllTeams(clientAPI) {
    return "?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav&$filter=cust_LOCN_DESC ne null and externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'&$orderby=cust_START_TME"
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/SaveCreate.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/SaveCreate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveCreate)
/* harmony export */ });
/* harmony import */ var _Application_Cuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application/Cuid */ "./build.definitions/Attendance_List/Rules/Application/Cuid.js");
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */


async function SaveCreate(clientAPI) {

    try {
        const teamId = (0,_Application_Cuid__WEBPACK_IMPORTED_MODULE_0__["default"])()
        const partners = clientAPI.evaluateTargetPath('#Control:FormCellListPickerParticipants/#Value/')

        const props = partners.map((i, index) => {
            const externalCode = (0,_Application_Cuid__WEBPACK_IMPORTED_MODULE_0__["default"])()
            const props = {
                "externalCode": externalCode,
                "cust_Turma": teamId,
                "cust_Aluno": i.ReturnValue,
                "externalName": `Dia ${index + 1}`
            }
            return props
        })

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": teamId
                }
            }
        })

        await Promise.all(props.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": "Turma criada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });
        
    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}



/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/SaveEdit.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/SaveEdit.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveEdit)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SaveEdit(clientAPI) {

    try {
        /* let pageProxy = context.getPageProxy();
        let actionBinding = pageProxy.getActionBinding();
        alert(actionBinding) */
        // let value = clientAPI.evaluateTargetPath('#Page:TeamEdit/#Control:SectionedTable0/#ClientData')
        /* let cRet = clientAPI.evaluateTargetPath('#Control:FormCellListPicker2/#SelectedValue')
        alert(cRet) */

        // const  cust_INST_ID2 = clientAPI.evaluateTargetPath('#Control:FormCellListPicker2/#SelectedValue')
        // #Page:TeamEdit/#Control:FormCellListPicker0/#ClientData/?
        const values = clientAPI.evaluateTargetPath('#Control:FormCellListPicker0/#Value/')

        const valuesWithObj = values.map(i => i.ReturnValue)

        alert(`${JSON.stringify(valuesWithObj)}`)

        let properties = {
            createdBy: clientAPI.binding.createdBy || "",
            createdDateTime: clientAPI.binding.createdDateTime || null,
            cust_ACT_CPNT_ID: clientAPI.binding.cust_ACT_CPNT_ID || "",
            cust_CPNT_TYP_ID: clientAPI.binding.cust_CPNT_TYP_ID || "",
            cust_END_TME: clientAPI.binding.cust_END_TME || null,
            cust_INST_ID1: clientAPI.binding.cust_INST_ID1 || "",
            cust_INST_ID2: cust_INST_ID2 || "", // Novo valor do ListPicker
            cust_LMS: clientAPI.binding.cust_LMS || "",
            cust_LOCN_DESC: clientAPI.binding.cust_LOCN_DESC || "",
            cust_LOCN_ID1: clientAPI.binding.cust_LOCN_ID1 || "",
            cust_NOTACTIVE: clientAPI.binding.cust_NOTACTIVE || false,
            cust_SSG_SEG_NUM: clientAPI.binding.cust_SSG_SEG_NUM || "",
            cust_START_TME: clientAPI.binding.cust_START_TME || null,
            cust_Status: clientAPI.binding.cust_Status || "",
            externalCode: clientAPI.binding.externalCode || "",
            externalName: "Teste de PATCH",
            lastModifiedBy: clientAPI.binding.lastModifiedBy || "",
            lastModifiedDateTime: clientAPI.binding.lastModifiedDateTime || null,
            mdfSystemRecordStatus: clientAPI.binding.mdfSystemRecordStatus || "",
        }
            
        return clientAPI.executeAction("/Attendance_List/Actions/Teams/UpdatePresenceList.action").then(() => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Edição de turma",
                    "Message": "Turma editada com sucesso!",
                    "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
                },
            });
        })
        .catch((e) => {
            clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Edição de turma",
                    "Message": `Erro: ${e}`
                }
            });
        })

    } catch (error) {
        
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Edição de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/TeamDescription.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/TeamDescription.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TeamDescription)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function TeamDescription(clientAPI) {
    var dDate = new Date(clientAPI.binding.cust_START_TME) 
    var cRet  = 'Início: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"
    
    cRet += "\n"

    dDate = new Date(clientAPI.binding.cust_END_TME) 
    cRet += 'Fim: ' + dDate.getDate().toString().padStart(2,"0") + "/" + (dDate.getMonth()+1).toString().padStart(2,"0") + "/" + dDate.getFullYear().toString()
    cRet += " às " + dDate.getHours().toString().padStart(2,"0") +":"+ dDate.getMinutes().toString().padStart(2,"0") + "h"

    cRet += "\n"
    
    cRet += "ID da Turma: " + clientAPI.binding.externalCode.toString()
    return(cRet)
}
 

/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/TeamDuration.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/TeamDuration.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TeamDuration)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function TeamDuration(clientAPI) {
    var cHoras = clientAPI.binding.cust_SSG_SEG_NUM.toString()
    var cRet = cHoras
    if (Number(cHoras) > 1){
        cRet += ' Horas'
    }else{
        cRet += ' Hora'
    }
    return(cRet)
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Update/CancelTeam.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Update/CancelTeam.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CancelTeam)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function CancelTeam(clientAPI) {
    try {
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CancelTeam.action",
            "Properties": {
                "Properties": {
                    "cust_Status": "cancelada"
                }
            }
        })
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Cancelamento de turma",
                "Message": "Turma cancelada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    }catch(e){
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${e.message}`
            }
        });
    }
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Update/CloseTeam.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Update/CloseTeam.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloseTeam)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function CloseTeam(clientAPI) {
    try {
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CloseTeam.action",
            "Properties": {
                "Properties": {
                    "cust_LMS": "S"
                }
            }
        })
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Encerramento de turma",
                "Message": "Turma encerrada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    }catch(e){
        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${e.message}`
            }
        });
    }
}


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Update/GetPresenceValue.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Update/GetPresenceValue.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetPresenceValue)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetPresenceValue(clientAPI) {

    if(clientAPI.binding.cust_Status){
        return clientAPI.binding.cust_Status == "ausente" ? false : true
    }
    return false
}   


/***/ }),

/***/ "./build.definitions/Attendance_List/Rules/Teams/Update/UpdateTeam.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Rules/Teams/Update/UpdateTeam.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateTeam)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

async function UpdateTeam(clientAPI) {

    try {

        var fieldSwitch = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSwitch0/#Value")
        var fieldNote = clientAPI.evaluateTargetPath("#Page:BePresence/#Control:FormCellSimpleProperty0/#Value")

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/UpdatePresenceList.action",
            "Properties": {
                "Properties": {
                    "cust_Status": fieldSwitch ? "presente" : "ausente",
                    "cust_nota": fieldNote
                }
            }
        })
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Atualização de turma",
                "Message": "Turma alterada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });
    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}



/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let attendance_list_actions_application_appupdate_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/AppUpdate.action */ "./build.definitions/Attendance_List/Actions/Application/AppUpdate.action")
let attendance_list_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/Attendance_List/Actions/Application/AppUpdateFailureMessage.action")
let attendance_list_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/Attendance_List/Actions/Application/AppUpdateProgressBanner.action")
let attendance_list_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/Attendance_List/Actions/Application/AppUpdateSuccessMessage.action")
let attendance_list_actions_application_logout_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/Logout.action */ "./build.definitions/Attendance_List/Actions/Application/Logout.action")
let attendance_list_actions_application_navtoabout_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/NavToAbout.action */ "./build.definitions/Attendance_List/Actions/Application/NavToAbout.action")
let attendance_list_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/NavToActivityLog.action */ "./build.definitions/Attendance_List/Actions/Application/NavToActivityLog.action")
let attendance_list_actions_application_navtosupport_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/NavToSupport.action */ "./build.definitions/Attendance_List/Actions/Application/NavToSupport.action")
let attendance_list_actions_application_onwillupdate_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/OnWillUpdate.action */ "./build.definitions/Attendance_List/Actions/Application/OnWillUpdate.action")
let attendance_list_actions_application_reset_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/Reset.action */ "./build.definitions/Attendance_List/Actions/Application/Reset.action")
let attendance_list_actions_application_resetmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/ResetMessage.action */ "./build.definitions/Attendance_List/Actions/Application/ResetMessage.action")
let attendance_list_actions_application_supportmenupopover_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/SupportMenuPopover.action */ "./build.definitions/Attendance_List/Actions/Application/SupportMenuPopover.action")
let attendance_list_actions_application_usermenupopover_action = __webpack_require__(/*! ./Attendance_List/Actions/Application/UserMenuPopover.action */ "./build.definitions/Attendance_List/Actions/Application/UserMenuPopover.action")
let attendance_list_actions_cap_service_sf_lms_service_closeoffline_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOffline.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOffline.action")
let attendance_list_actions_cap_service_sf_lms_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineFailureMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineFailureMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineSuccessMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_downloadoffline_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action")
let attendance_list_actions_cap_service_sf_lms_service_downloadstartedmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadStartedMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadStartedMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_initializeoffline_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOffline.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOffline.action")
let attendance_list_actions_cap_service_sf_lms_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOfflineFailureMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_syncfailuremessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncFailureMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncFailureMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_syncstartedmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action")
let attendance_list_actions_cap_service_sf_lms_service_uploadoffline_action = __webpack_require__(/*! ./Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action */ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action")
let attendance_list_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Attendance_List/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Attendance_List/Actions/CloseModalPage_Cancel.action")
let attendance_list_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Attendance_List/Actions/CloseModalPage_Complete.action */ "./build.definitions/Attendance_List/Actions/CloseModalPage_Complete.action")
let attendance_list_actions_closepage_action = __webpack_require__(/*! ./Attendance_List/Actions/ClosePage.action */ "./build.definitions/Attendance_List/Actions/ClosePage.action")
let attendance_list_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./Attendance_List/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/Attendance_List/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let attendance_list_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./Attendance_List/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let attendance_list_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./Attendance_List/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_List.action")
let attendance_list_actions_genericbannermessage_action = __webpack_require__(/*! ./Attendance_List/Actions/GenericBannerMessage.action */ "./build.definitions/Attendance_List/Actions/GenericBannerMessage.action")
let attendance_list_actions_genericmessagebox_action = __webpack_require__(/*! ./Attendance_List/Actions/GenericMessageBox.action */ "./build.definitions/Attendance_List/Actions/GenericMessageBox.action")
let attendance_list_actions_genericnavigation_action = __webpack_require__(/*! ./Attendance_List/Actions/GenericNavigation.action */ "./build.definitions/Attendance_List/Actions/GenericNavigation.action")
let attendance_list_actions_generictoastmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/GenericToastMessage.action */ "./build.definitions/Attendance_List/Actions/GenericToastMessage.action")
let attendance_list_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./Attendance_List/Actions/Logging/LogUploadFailure.action */ "./build.definitions/Attendance_List/Actions/Logging/LogUploadFailure.action")
let attendance_list_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./Attendance_List/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/Attendance_List/Actions/Logging/LogUploadSuccessful.action")
let attendance_list_actions_logging_uploadlog_action = __webpack_require__(/*! ./Attendance_List/Actions/Logging/UploadLog.action */ "./build.definitions/Attendance_List/Actions/Logging/UploadLog.action")
let attendance_list_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./Attendance_List/Actions/Logging/UploadLogProgress.action */ "./build.definitions/Attendance_List/Actions/Logging/UploadLogProgress.action")
let attendance_list_actions_main_navtoallteams_action = __webpack_require__(/*! ./Attendance_List/Actions/Main/NavToAllTeams.action */ "./build.definitions/Attendance_List/Actions/Main/NavToAllTeams.action")
let attendance_list_actions_main_navtoteamdetails_action = __webpack_require__(/*! ./Attendance_List/Actions/Main/NavToTeamDetails.action */ "./build.definitions/Attendance_List/Actions/Main/NavToTeamDetails.action")
let attendance_list_actions_teams_cancelteam_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CancelTeam.action */ "./build.definitions/Attendance_List/Actions/Teams/CancelTeam.action")
let attendance_list_actions_teams_cancelteammessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CancelTeamMessage.action */ "./build.definitions/Attendance_List/Actions/Teams/CancelTeamMessage.action")
let attendance_list_actions_teams_closeteam_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CloseTeam.action */ "./build.definitions/Attendance_List/Actions/Teams/CloseTeam.action")
let attendance_list_actions_teams_closeteammessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CloseTeamMessage.action */ "./build.definitions/Attendance_List/Actions/Teams/CloseTeamMessage.action")
let attendance_list_actions_teams_createentityteam_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CreateEntityTeam.action */ "./build.definitions/Attendance_List/Actions/Teams/CreateEntityTeam.action")
let attendance_list_actions_teams_createpresencelist_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/CreatePresenceList.action */ "./build.definitions/Attendance_List/Actions/Teams/CreatePresenceList.action")
let attendance_list_actions_teams_deleteteam_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/DeleteTeam.action */ "./build.definitions/Attendance_List/Actions/Teams/DeleteTeam.action")
let attendance_list_actions_teams_navtobepresence_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/NavToBePresence.action */ "./build.definitions/Attendance_List/Actions/Teams/NavToBePresence.action")
let attendance_list_actions_teams_navtomain_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/NavToMain.action */ "./build.definitions/Attendance_List/Actions/Teams/NavToMain.action")
let attendance_list_actions_teams_navtoteamcreate_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/NavToTeamCreate.action */ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamCreate.action")
let attendance_list_actions_teams_navtoteamdetails_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/NavToTeamDetails.action */ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamDetails.action")
let attendance_list_actions_teams_navtoteamedit_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/NavToTeamEdit.action */ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamEdit.action")
let attendance_list_actions_teams_onfailuremessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/OnFailureMessage.action */ "./build.definitions/Attendance_List/Actions/Teams/OnFailureMessage.action")
let attendance_list_actions_teams_onsuccessmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/OnSuccessMessage.action */ "./build.definitions/Attendance_List/Actions/Teams/OnSuccessMessage.action")
let attendance_list_actions_teams_popoverteamedit_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/PopoverTeamEdit.action */ "./build.definitions/Attendance_List/Actions/Teams/PopoverTeamEdit.action")
let attendance_list_actions_teams_updatepresencelist_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/UpdatePresenceList.action */ "./build.definitions/Attendance_List/Actions/Teams/UpdatePresenceList.action")
let attendance_list_actions_teams_updateteamsuccessmessage_action = __webpack_require__(/*! ./Attendance_List/Actions/Teams/UpdateTeamSuccessMessage.action */ "./build.definitions/Attendance_List/Actions/Teams/UpdateTeamSuccessMessage.action")
let attendance_list_globals_application_appdefinition_version_global = __webpack_require__(/*! ./Attendance_List/Globals/Application/AppDefinition_Version.global */ "./build.definitions/Attendance_List/Globals/Application/AppDefinition_Version.global")
let attendance_list_globals_application_applicationname_global = __webpack_require__(/*! ./Attendance_List/Globals/Application/ApplicationName.global */ "./build.definitions/Attendance_List/Globals/Application/ApplicationName.global")
let attendance_list_globals_application_supportemail_global = __webpack_require__(/*! ./Attendance_List/Globals/Application/SupportEmail.global */ "./build.definitions/Attendance_List/Globals/Application/SupportEmail.global")
let attendance_list_globals_application_supportphone_global = __webpack_require__(/*! ./Attendance_List/Globals/Application/SupportPhone.global */ "./build.definitions/Attendance_List/Globals/Application/SupportPhone.global")
let attendance_list_i18n_i18n_properties = __webpack_require__(/*! ./Attendance_List/i18n/i18n.properties */ "./build.definitions/Attendance_List/i18n/i18n.properties")
let attendance_list_images_logo_dark_png = __webpack_require__(/*! ./Attendance_List/Images/logo.dark.png */ "./build.definitions/Attendance_List/Images/logo.dark.png")
let attendance_list_images_logo_light_png = __webpack_require__(/*! ./Attendance_List/Images/logo.light.png */ "./build.definitions/Attendance_List/Images/logo.light.png")
let attendance_list_jsconfig_json = __webpack_require__(/*! ./Attendance_List/jsconfig.json */ "./build.definitions/Attendance_List/jsconfig.json")
let attendance_list_pages_application_about_page = __webpack_require__(/*! ./Attendance_List/Pages/Application/About.page */ "./build.definitions/Attendance_List/Pages/Application/About.page")
let attendance_list_pages_application_support_page = __webpack_require__(/*! ./Attendance_List/Pages/Application/Support.page */ "./build.definitions/Attendance_List/Pages/Application/Support.page")
let attendance_list_pages_application_useractivitylog_page = __webpack_require__(/*! ./Attendance_List/Pages/Application/UserActivityLog.page */ "./build.definitions/Attendance_List/Pages/Application/UserActivityLog.page")
let attendance_list_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./Attendance_List/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_Detail.page")
let attendance_list_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./Attendance_List/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_List.page")
let attendance_list_pages_main_page = __webpack_require__(/*! ./Attendance_List/Pages/Main.page */ "./build.definitions/Attendance_List/Pages/Main.page")
let attendance_list_pages_teams_bepresence_page = __webpack_require__(/*! ./Attendance_List/Pages/Teams/BePresence.page */ "./build.definitions/Attendance_List/Pages/Teams/BePresence.page")
let attendance_list_pages_teams_teamcreate_page = __webpack_require__(/*! ./Attendance_List/Pages/Teams/TeamCreate.page */ "./build.definitions/Attendance_List/Pages/Teams/TeamCreate.page")
let attendance_list_pages_teams_teamdetails_page = __webpack_require__(/*! ./Attendance_List/Pages/Teams/TeamDetails.page */ "./build.definitions/Attendance_List/Pages/Teams/TeamDetails.page")
let attendance_list_pages_teams_teamedit_page = __webpack_require__(/*! ./Attendance_List/Pages/Teams/TeamEdit.page */ "./build.definitions/Attendance_List/Pages/Teams/TeamEdit.page")
let attendance_list_pages_teams_teamlist_page = __webpack_require__(/*! ./Attendance_List/Pages/Teams/TeamList.page */ "./build.definitions/Attendance_List/Pages/Teams/TeamList.page")
let attendance_list_rules_application_appupdatefailure_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/AppUpdateFailure.js */ "./build.definitions/Attendance_List/Rules/Application/AppUpdateFailure.js")
let attendance_list_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/Attendance_List/Rules/Application/AppUpdateSuccess.js")
let attendance_list_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/Attendance_List/Rules/Application/ClientIsMultiUserMode.js")
let attendance_list_rules_application_cuid_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/Cuid.js */ "./build.definitions/Attendance_List/Rules/Application/Cuid.js")
let attendance_list_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/Attendance_List/Rules/Application/GetClientSupportVersions.js")
let attendance_list_rules_application_getclientversion_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/GetClientVersion.js */ "./build.definitions/Attendance_List/Rules/Application/GetClientVersion.js")
let attendance_list_rules_application_onwillupdate_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/OnWillUpdate.js */ "./build.definitions/Attendance_List/Rules/Application/OnWillUpdate.js")
let attendance_list_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/Attendance_List/Rules/Application/ResetAppSettingsAndLogout.js")
let attendance_list_rules_application_uuidv4_js = __webpack_require__(/*! ./Attendance_List/Rules/Application/Uuidv4.js */ "./build.definitions/Attendance_List/Rules/Application/Uuidv4.js")
let attendance_list_rules_cap_service_sf_lms_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./Attendance_List/Rules/CAP_SERVICE_SF_LMS/ErrorArchive_CheckForSyncError.js */ "./build.definitions/Attendance_List/Rules/CAP_SERVICE_SF_LMS/ErrorArchive_CheckForSyncError.js")
let attendance_list_rules_logging_loglevels_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/LogLevels.js */ "./build.definitions/Attendance_List/Rules/Logging/LogLevels.js")
let attendance_list_rules_logging_settracecategories_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/SetTraceCategories.js */ "./build.definitions/Attendance_List/Rules/Logging/SetTraceCategories.js")
let attendance_list_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/Attendance_List/Rules/Logging/SetUserLogLevel.js")
let attendance_list_rules_logging_togglelogging_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/ToggleLogging.js */ "./build.definitions/Attendance_List/Rules/Logging/ToggleLogging.js")
let attendance_list_rules_logging_tracecategories_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/TraceCategories.js */ "./build.definitions/Attendance_List/Rules/Logging/TraceCategories.js")
let attendance_list_rules_logging_userlogsetting_js = __webpack_require__(/*! ./Attendance_List/Rules/Logging/UserLogSetting.js */ "./build.definitions/Attendance_List/Rules/Logging/UserLogSetting.js")
let attendance_list_rules_main_calendarquery_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/CalendarQuery.js */ "./build.definitions/Attendance_List/Rules/Main/CalendarQuery.js")
let attendance_list_rules_main_endteam_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/EndTeam.js */ "./build.definitions/Attendance_List/Rules/Main/EndTeam.js")
let attendance_list_rules_main_getthreeteams_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/GetThreeTeams.js */ "./build.definitions/Attendance_List/Rules/Main/GetThreeTeams.js")
let attendance_list_rules_main_startteam_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/StartTeam.js */ "./build.definitions/Attendance_List/Rules/Main/StartTeam.js")
let attendance_list_rules_main_teamdescription_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/TeamDescription.js */ "./build.definitions/Attendance_List/Rules/Main/TeamDescription.js")
let attendance_list_rules_main_updatequerywithselecteddate_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/UpdateQueryWithSelectedDate.js */ "./build.definitions/Attendance_List/Rules/Main/UpdateQueryWithSelectedDate.js")
let attendance_list_rules_main_welcomemessage_js = __webpack_require__(/*! ./Attendance_List/Rules/Main/WelcomeMessage.js */ "./build.definitions/Attendance_List/Rules/Main/WelcomeMessage.js")
let attendance_list_rules_service_initialize_js = __webpack_require__(/*! ./Attendance_List/Rules/Service/Initialize.js */ "./build.definitions/Attendance_List/Rules/Service/Initialize.js")
let attendance_list_rules_teams_create_formatenddate_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Create/FormatEndDate.js */ "./build.definitions/Attendance_List/Rules/Teams/Create/FormatEndDate.js")
let attendance_list_rules_teams_create_formatstartdate_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Create/FormatStartDate.js */ "./build.definitions/Attendance_List/Rules/Teams/Create/FormatStartDate.js")
let attendance_list_rules_teams_create_generateid_generateid_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Create/GenerateId/GenerateId.js */ "./build.definitions/Attendance_List/Rules/Teams/Create/GenerateId/GenerateId.js")
let attendance_list_rules_teams_create_setinitialbinding_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Create/SetInitialBinding.js */ "./build.definitions/Attendance_List/Rules/Teams/Create/SetInitialBinding.js")
let attendance_list_rules_teams_delete_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Delete.js */ "./build.definitions/Attendance_List/Rules/Teams/Delete.js")
let attendance_list_rules_teams_details_getalunofirstname_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetAlunoFirstName.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoFirstName.js")
let attendance_list_rules_teams_details_getalunoname_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetAlunoName.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetAlunoName.js")
let attendance_list_rules_teams_details_getinstnav1_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetInstNav1.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav1.js")
let attendance_list_rules_teams_details_getinstnav2_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetInstNav2.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetInstNav2.js")
let attendance_list_rules_teams_details_getpartnernote_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetPartnerNote.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetPartnerNote.js")
let attendance_list_rules_teams_details_getteamstatus_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/GetTeamStatus.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/GetTeamStatus.js")
let attendance_list_rules_teams_details_onpartnerpress_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Details/OnPartnerPress.js */ "./build.definitions/Attendance_List/Rules/Teams/Details/OnPartnerPress.js")
let attendance_list_rules_teams_formatenddate_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/FormatEndDate.js */ "./build.definitions/Attendance_List/Rules/Teams/FormatEndDate.js")
let attendance_list_rules_teams_formatstartdate_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/FormatStartDate.js */ "./build.definitions/Attendance_List/Rules/Teams/FormatStartDate.js")
let attendance_list_rules_teams_getfullname_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/GetFullName.js */ "./build.definitions/Attendance_List/Rules/Teams/GetFullName.js")
let attendance_list_rules_teams_processreturnvalue_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/ProcessReturnValue.js */ "./build.definitions/Attendance_List/Rules/Teams/ProcessReturnValue.js")
let attendance_list_rules_teams_queryshowallteams_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/QueryShowAllTeams.js */ "./build.definitions/Attendance_List/Rules/Teams/QueryShowAllTeams.js")
let attendance_list_rules_teams_savecreate_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/SaveCreate.js */ "./build.definitions/Attendance_List/Rules/Teams/SaveCreate.js")
let attendance_list_rules_teams_saveedit_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/SaveEdit.js */ "./build.definitions/Attendance_List/Rules/Teams/SaveEdit.js")
let attendance_list_rules_teams_teamdescription_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/TeamDescription.js */ "./build.definitions/Attendance_List/Rules/Teams/TeamDescription.js")
let attendance_list_rules_teams_teamduration_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/TeamDuration.js */ "./build.definitions/Attendance_List/Rules/Teams/TeamDuration.js")
let attendance_list_rules_teams_update_cancelteam_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Update/CancelTeam.js */ "./build.definitions/Attendance_List/Rules/Teams/Update/CancelTeam.js")
let attendance_list_rules_teams_update_closeteam_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Update/CloseTeam.js */ "./build.definitions/Attendance_List/Rules/Teams/Update/CloseTeam.js")
let attendance_list_rules_teams_update_getpresencevalue_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Update/GetPresenceValue.js */ "./build.definitions/Attendance_List/Rules/Teams/Update/GetPresenceValue.js")
let attendance_list_rules_teams_update_updateteam_js = __webpack_require__(/*! ./Attendance_List/Rules/Teams/Update/UpdateTeam.js */ "./build.definitions/Attendance_List/Rules/Teams/Update/UpdateTeam.js")
let attendance_list_services_cap_service_sf_lms_service = __webpack_require__(/*! ./Attendance_List/Services/CAP_SERVICE_SF_LMS.service */ "./build.definitions/Attendance_List/Services/CAP_SERVICE_SF_LMS.service")
let attendance_list_styles_styles_css = __webpack_require__(/*! ./Attendance_List/Styles/Styles.css */ "./build.definitions/Attendance_List/Styles/Styles.css")
let attendance_list_styles_styles_dark_css = __webpack_require__(/*! ./Attendance_List/Styles/Styles.dark.css */ "./build.definitions/Attendance_List/Styles/Styles.dark.css")
let attendance_list_styles_styles_dark_json = __webpack_require__(/*! ./Attendance_List/Styles/Styles.dark.json */ "./build.definitions/Attendance_List/Styles/Styles.dark.json")
let attendance_list_styles_styles_dark_less = __webpack_require__(/*! ./Attendance_List/Styles/Styles.dark.less */ "./build.definitions/Attendance_List/Styles/Styles.dark.less")
let attendance_list_styles_styles_dark_nss = __webpack_require__(/*! ./Attendance_List/Styles/Styles.dark.nss */ "./build.definitions/Attendance_List/Styles/Styles.dark.nss")
let attendance_list_styles_styles_json = __webpack_require__(/*! ./Attendance_List/Styles/Styles.json */ "./build.definitions/Attendance_List/Styles/Styles.json")
let attendance_list_styles_styles_less = __webpack_require__(/*! ./Attendance_List/Styles/Styles.less */ "./build.definitions/Attendance_List/Styles/Styles.less")
let attendance_list_styles_styles_light_css = __webpack_require__(/*! ./Attendance_List/Styles/Styles.light.css */ "./build.definitions/Attendance_List/Styles/Styles.light.css")
let attendance_list_styles_styles_light_json = __webpack_require__(/*! ./Attendance_List/Styles/Styles.light.json */ "./build.definitions/Attendance_List/Styles/Styles.light.json")
let attendance_list_styles_styles_light_less = __webpack_require__(/*! ./Attendance_List/Styles/Styles.light.less */ "./build.definitions/Attendance_List/Styles/Styles.light.less")
let attendance_list_styles_styles_light_nss = __webpack_require__(/*! ./Attendance_List/Styles/Styles.light.nss */ "./build.definitions/Attendance_List/Styles/Styles.light.nss")
let attendance_list_styles_styles_nss = __webpack_require__(/*! ./Attendance_List/Styles/Styles.nss */ "./build.definitions/Attendance_List/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	attendance_list_actions_application_appupdate_action : attendance_list_actions_application_appupdate_action,
	attendance_list_actions_application_appupdatefailuremessage_action : attendance_list_actions_application_appupdatefailuremessage_action,
	attendance_list_actions_application_appupdateprogressbanner_action : attendance_list_actions_application_appupdateprogressbanner_action,
	attendance_list_actions_application_appupdatesuccessmessage_action : attendance_list_actions_application_appupdatesuccessmessage_action,
	attendance_list_actions_application_logout_action : attendance_list_actions_application_logout_action,
	attendance_list_actions_application_navtoabout_action : attendance_list_actions_application_navtoabout_action,
	attendance_list_actions_application_navtoactivitylog_action : attendance_list_actions_application_navtoactivitylog_action,
	attendance_list_actions_application_navtosupport_action : attendance_list_actions_application_navtosupport_action,
	attendance_list_actions_application_onwillupdate_action : attendance_list_actions_application_onwillupdate_action,
	attendance_list_actions_application_reset_action : attendance_list_actions_application_reset_action,
	attendance_list_actions_application_resetmessage_action : attendance_list_actions_application_resetmessage_action,
	attendance_list_actions_application_supportmenupopover_action : attendance_list_actions_application_supportmenupopover_action,
	attendance_list_actions_application_usermenupopover_action : attendance_list_actions_application_usermenupopover_action,
	attendance_list_actions_cap_service_sf_lms_service_closeoffline_action : attendance_list_actions_cap_service_sf_lms_service_closeoffline_action,
	attendance_list_actions_cap_service_sf_lms_service_closeofflinefailuremessage_action : attendance_list_actions_cap_service_sf_lms_service_closeofflinefailuremessage_action,
	attendance_list_actions_cap_service_sf_lms_service_closeofflinesuccessmessage_action : attendance_list_actions_cap_service_sf_lms_service_closeofflinesuccessmessage_action,
	attendance_list_actions_cap_service_sf_lms_service_downloadoffline_action : attendance_list_actions_cap_service_sf_lms_service_downloadoffline_action,
	attendance_list_actions_cap_service_sf_lms_service_downloadstartedmessage_action : attendance_list_actions_cap_service_sf_lms_service_downloadstartedmessage_action,
	attendance_list_actions_cap_service_sf_lms_service_initializeoffline_action : attendance_list_actions_cap_service_sf_lms_service_initializeoffline_action,
	attendance_list_actions_cap_service_sf_lms_service_initializeofflinefailuremessage_action : attendance_list_actions_cap_service_sf_lms_service_initializeofflinefailuremessage_action,
	attendance_list_actions_cap_service_sf_lms_service_syncfailuremessage_action : attendance_list_actions_cap_service_sf_lms_service_syncfailuremessage_action,
	attendance_list_actions_cap_service_sf_lms_service_syncstartedmessage_action : attendance_list_actions_cap_service_sf_lms_service_syncstartedmessage_action,
	attendance_list_actions_cap_service_sf_lms_service_uploadoffline_action : attendance_list_actions_cap_service_sf_lms_service_uploadoffline_action,
	attendance_list_actions_closemodalpage_cancel_action : attendance_list_actions_closemodalpage_cancel_action,
	attendance_list_actions_closemodalpage_complete_action : attendance_list_actions_closemodalpage_complete_action,
	attendance_list_actions_closepage_action : attendance_list_actions_closepage_action,
	attendance_list_actions_errorarchive_errorarchive_syncfailure_action : attendance_list_actions_errorarchive_errorarchive_syncfailure_action,
	attendance_list_actions_errorarchive_navtoerrorarchive_detail_action : attendance_list_actions_errorarchive_navtoerrorarchive_detail_action,
	attendance_list_actions_errorarchive_navtoerrorarchive_list_action : attendance_list_actions_errorarchive_navtoerrorarchive_list_action,
	attendance_list_actions_genericbannermessage_action : attendance_list_actions_genericbannermessage_action,
	attendance_list_actions_genericmessagebox_action : attendance_list_actions_genericmessagebox_action,
	attendance_list_actions_genericnavigation_action : attendance_list_actions_genericnavigation_action,
	attendance_list_actions_generictoastmessage_action : attendance_list_actions_generictoastmessage_action,
	attendance_list_actions_logging_loguploadfailure_action : attendance_list_actions_logging_loguploadfailure_action,
	attendance_list_actions_logging_loguploadsuccessful_action : attendance_list_actions_logging_loguploadsuccessful_action,
	attendance_list_actions_logging_uploadlog_action : attendance_list_actions_logging_uploadlog_action,
	attendance_list_actions_logging_uploadlogprogress_action : attendance_list_actions_logging_uploadlogprogress_action,
	attendance_list_actions_main_navtoallteams_action : attendance_list_actions_main_navtoallteams_action,
	attendance_list_actions_main_navtoteamdetails_action : attendance_list_actions_main_navtoteamdetails_action,
	attendance_list_actions_teams_cancelteam_action : attendance_list_actions_teams_cancelteam_action,
	attendance_list_actions_teams_cancelteammessage_action : attendance_list_actions_teams_cancelteammessage_action,
	attendance_list_actions_teams_closeteam_action : attendance_list_actions_teams_closeteam_action,
	attendance_list_actions_teams_closeteammessage_action : attendance_list_actions_teams_closeteammessage_action,
	attendance_list_actions_teams_createentityteam_action : attendance_list_actions_teams_createentityteam_action,
	attendance_list_actions_teams_createpresencelist_action : attendance_list_actions_teams_createpresencelist_action,
	attendance_list_actions_teams_deleteteam_action : attendance_list_actions_teams_deleteteam_action,
	attendance_list_actions_teams_navtobepresence_action : attendance_list_actions_teams_navtobepresence_action,
	attendance_list_actions_teams_navtomain_action : attendance_list_actions_teams_navtomain_action,
	attendance_list_actions_teams_navtoteamcreate_action : attendance_list_actions_teams_navtoteamcreate_action,
	attendance_list_actions_teams_navtoteamdetails_action : attendance_list_actions_teams_navtoteamdetails_action,
	attendance_list_actions_teams_navtoteamedit_action : attendance_list_actions_teams_navtoteamedit_action,
	attendance_list_actions_teams_onfailuremessage_action : attendance_list_actions_teams_onfailuremessage_action,
	attendance_list_actions_teams_onsuccessmessage_action : attendance_list_actions_teams_onsuccessmessage_action,
	attendance_list_actions_teams_popoverteamedit_action : attendance_list_actions_teams_popoverteamedit_action,
	attendance_list_actions_teams_updatepresencelist_action : attendance_list_actions_teams_updatepresencelist_action,
	attendance_list_actions_teams_updateteamsuccessmessage_action : attendance_list_actions_teams_updateteamsuccessmessage_action,
	attendance_list_globals_application_appdefinition_version_global : attendance_list_globals_application_appdefinition_version_global,
	attendance_list_globals_application_applicationname_global : attendance_list_globals_application_applicationname_global,
	attendance_list_globals_application_supportemail_global : attendance_list_globals_application_supportemail_global,
	attendance_list_globals_application_supportphone_global : attendance_list_globals_application_supportphone_global,
	attendance_list_i18n_i18n_properties : attendance_list_i18n_i18n_properties,
	attendance_list_images_logo_dark_png : attendance_list_images_logo_dark_png,
	attendance_list_images_logo_light_png : attendance_list_images_logo_light_png,
	attendance_list_jsconfig_json : attendance_list_jsconfig_json,
	attendance_list_pages_application_about_page : attendance_list_pages_application_about_page,
	attendance_list_pages_application_support_page : attendance_list_pages_application_support_page,
	attendance_list_pages_application_useractivitylog_page : attendance_list_pages_application_useractivitylog_page,
	attendance_list_pages_errorarchive_errorarchive_detail_page : attendance_list_pages_errorarchive_errorarchive_detail_page,
	attendance_list_pages_errorarchive_errorarchive_list_page : attendance_list_pages_errorarchive_errorarchive_list_page,
	attendance_list_pages_main_page : attendance_list_pages_main_page,
	attendance_list_pages_teams_bepresence_page : attendance_list_pages_teams_bepresence_page,
	attendance_list_pages_teams_teamcreate_page : attendance_list_pages_teams_teamcreate_page,
	attendance_list_pages_teams_teamdetails_page : attendance_list_pages_teams_teamdetails_page,
	attendance_list_pages_teams_teamedit_page : attendance_list_pages_teams_teamedit_page,
	attendance_list_pages_teams_teamlist_page : attendance_list_pages_teams_teamlist_page,
	attendance_list_rules_application_appupdatefailure_js : attendance_list_rules_application_appupdatefailure_js,
	attendance_list_rules_application_appupdatesuccess_js : attendance_list_rules_application_appupdatesuccess_js,
	attendance_list_rules_application_clientismultiusermode_js : attendance_list_rules_application_clientismultiusermode_js,
	attendance_list_rules_application_cuid_js : attendance_list_rules_application_cuid_js,
	attendance_list_rules_application_getclientsupportversions_js : attendance_list_rules_application_getclientsupportversions_js,
	attendance_list_rules_application_getclientversion_js : attendance_list_rules_application_getclientversion_js,
	attendance_list_rules_application_onwillupdate_js : attendance_list_rules_application_onwillupdate_js,
	attendance_list_rules_application_resetappsettingsandlogout_js : attendance_list_rules_application_resetappsettingsandlogout_js,
	attendance_list_rules_application_uuidv4_js : attendance_list_rules_application_uuidv4_js,
	attendance_list_rules_cap_service_sf_lms_errorarchive_checkforsyncerror_js : attendance_list_rules_cap_service_sf_lms_errorarchive_checkforsyncerror_js,
	attendance_list_rules_logging_loglevels_js : attendance_list_rules_logging_loglevels_js,
	attendance_list_rules_logging_settracecategories_js : attendance_list_rules_logging_settracecategories_js,
	attendance_list_rules_logging_setuserloglevel_js : attendance_list_rules_logging_setuserloglevel_js,
	attendance_list_rules_logging_togglelogging_js : attendance_list_rules_logging_togglelogging_js,
	attendance_list_rules_logging_tracecategories_js : attendance_list_rules_logging_tracecategories_js,
	attendance_list_rules_logging_userlogsetting_js : attendance_list_rules_logging_userlogsetting_js,
	attendance_list_rules_main_calendarquery_js : attendance_list_rules_main_calendarquery_js,
	attendance_list_rules_main_endteam_js : attendance_list_rules_main_endteam_js,
	attendance_list_rules_main_getthreeteams_js : attendance_list_rules_main_getthreeteams_js,
	attendance_list_rules_main_startteam_js : attendance_list_rules_main_startteam_js,
	attendance_list_rules_main_teamdescription_js : attendance_list_rules_main_teamdescription_js,
	attendance_list_rules_main_updatequerywithselecteddate_js : attendance_list_rules_main_updatequerywithselecteddate_js,
	attendance_list_rules_main_welcomemessage_js : attendance_list_rules_main_welcomemessage_js,
	attendance_list_rules_service_initialize_js : attendance_list_rules_service_initialize_js,
	attendance_list_rules_teams_create_formatenddate_js : attendance_list_rules_teams_create_formatenddate_js,
	attendance_list_rules_teams_create_formatstartdate_js : attendance_list_rules_teams_create_formatstartdate_js,
	attendance_list_rules_teams_create_generateid_generateid_js : attendance_list_rules_teams_create_generateid_generateid_js,
	attendance_list_rules_teams_create_setinitialbinding_js : attendance_list_rules_teams_create_setinitialbinding_js,
	attendance_list_rules_teams_delete_js : attendance_list_rules_teams_delete_js,
	attendance_list_rules_teams_details_getalunofirstname_js : attendance_list_rules_teams_details_getalunofirstname_js,
	attendance_list_rules_teams_details_getalunoname_js : attendance_list_rules_teams_details_getalunoname_js,
	attendance_list_rules_teams_details_getinstnav1_js : attendance_list_rules_teams_details_getinstnav1_js,
	attendance_list_rules_teams_details_getinstnav2_js : attendance_list_rules_teams_details_getinstnav2_js,
	attendance_list_rules_teams_details_getpartnernote_js : attendance_list_rules_teams_details_getpartnernote_js,
	attendance_list_rules_teams_details_getteamstatus_js : attendance_list_rules_teams_details_getteamstatus_js,
	attendance_list_rules_teams_details_onpartnerpress_js : attendance_list_rules_teams_details_onpartnerpress_js,
	attendance_list_rules_teams_formatenddate_js : attendance_list_rules_teams_formatenddate_js,
	attendance_list_rules_teams_formatstartdate_js : attendance_list_rules_teams_formatstartdate_js,
	attendance_list_rules_teams_getfullname_js : attendance_list_rules_teams_getfullname_js,
	attendance_list_rules_teams_processreturnvalue_js : attendance_list_rules_teams_processreturnvalue_js,
	attendance_list_rules_teams_queryshowallteams_js : attendance_list_rules_teams_queryshowallteams_js,
	attendance_list_rules_teams_savecreate_js : attendance_list_rules_teams_savecreate_js,
	attendance_list_rules_teams_saveedit_js : attendance_list_rules_teams_saveedit_js,
	attendance_list_rules_teams_teamdescription_js : attendance_list_rules_teams_teamdescription_js,
	attendance_list_rules_teams_teamduration_js : attendance_list_rules_teams_teamduration_js,
	attendance_list_rules_teams_update_cancelteam_js : attendance_list_rules_teams_update_cancelteam_js,
	attendance_list_rules_teams_update_closeteam_js : attendance_list_rules_teams_update_closeteam_js,
	attendance_list_rules_teams_update_getpresencevalue_js : attendance_list_rules_teams_update_getpresencevalue_js,
	attendance_list_rules_teams_update_updateteam_js : attendance_list_rules_teams_update_updateteam_js,
	attendance_list_services_cap_service_sf_lms_service : attendance_list_services_cap_service_sf_lms_service,
	attendance_list_styles_styles_css : attendance_list_styles_styles_css,
	attendance_list_styles_styles_dark_css : attendance_list_styles_styles_dark_css,
	attendance_list_styles_styles_dark_json : attendance_list_styles_styles_dark_json,
	attendance_list_styles_styles_dark_less : attendance_list_styles_styles_dark_less,
	attendance_list_styles_styles_dark_nss : attendance_list_styles_styles_dark_nss,
	attendance_list_styles_styles_json : attendance_list_styles_styles_json,
	attendance_list_styles_styles_less : attendance_list_styles_styles_less,
	attendance_list_styles_styles_light_css : attendance_list_styles_styles_light_css,
	attendance_list_styles_styles_light_json : attendance_list_styles_styles_light_json,
	attendance_list_styles_styles_light_less : attendance_list_styles_styles_light_less,
	attendance_list_styles_styles_light_nss : attendance_list_styles_styles_light_nss,
	attendance_list_styles_styles_nss : attendance_list_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.css":
/*!*************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.css ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-light MDKPage {
	background-color: #f1eee5;
}
.ns-light ActionBar {
	color: #40b064;
	background-color: #e5dcc8;
}
.ns-light ActionBarTitle {
	color: #000000;
	font-size: 17;
}
.ns-light .background-100 {
	background-color: #e5dcc8;
}
.ns-light .background-75 {
	background-color: #ebe6d8;
}
.ns-light .background-50 {
	background-color: #f1eee5;
}
.ns-light .background-25 {
	background-color: #f8f6f2;
}
.ns-light .letter-black-color {
	color: #000000;
}
.ns-light .letter-green-color {
	color: #40b064;
	background-color: white;
}
.ns-light .botoes {
	background-color: #584903;
}
.ns-light #SectionObjectCardCollection1 {
	background-color: #e5dcc8;
	color: #40b064;
}
.ns-light .avatar {
	color: #584903;
	bartintcolor: blue;
}
.ns-light .Calendar {
	background-color: #f8f6f2;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.css"],"names":[],"mappings":"AAAA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;CACd,yBAAyB;AAC1B;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,uBAAuB;AACxB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;CACzB,cAAc;AACf;AACA;CACC,cAAc;CACd,kBAAkB;AACnB;AACA;CACC,yBAAyB;AAC1B","sourcesContent":[".ns-light MDKPage {\n\tbackground-color: #f1eee5;\n}\n.ns-light ActionBar {\n\tcolor: #40b064;\n\tbackground-color: #e5dcc8;\n}\n.ns-light ActionBarTitle {\n\tcolor: #000000;\n\tfont-size: 17;\n}\n.ns-light .background-100 {\n\tbackground-color: #e5dcc8;\n}\n.ns-light .background-75 {\n\tbackground-color: #ebe6d8;\n}\n.ns-light .background-50 {\n\tbackground-color: #f1eee5;\n}\n.ns-light .background-25 {\n\tbackground-color: #f8f6f2;\n}\n.ns-light .letter-black-color {\n\tcolor: #000000;\n}\n.ns-light .letter-green-color {\n\tcolor: #40b064;\n\tbackground-color: white;\n}\n.ns-light .botoes {\n\tbackground-color: #584903;\n}\n.ns-light #SectionObjectCardCollection1 {\n\tbackground-color: #e5dcc8;\n\tcolor: #40b064;\n}\n.ns-light .avatar {\n\tcolor: #584903;\n\tbartintcolor: blue;\n}\n.ns-light .Calendar {\n\tbackground-color: #f8f6f2;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.dark.css":
/*!******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.dark.css ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-dark ActionBar {
	color: #00943e;
}
.ns-dark ActionBarTitle {
	color: #00943e;
}
.ns-dark .background-50 {
	color: #00943e;
}
.ns-dark .letter-color {
	color: #00943e;
}
.ns-dark .botoes {
	background-color: #00943e;
}
.ns-dark #SectionObjectCardCollection1 {
	background-color: #00943e;
	color: #00943e;
}
.ns-dark .Calendar {
	background-color: black;
}
.ns-dark CalendarButtons {
	background-color: black;
	font-color: #00943e;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.dark.css"],"names":[],"mappings":"AAAA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;CACzB,cAAc;AACf;AACA;CACC,uBAAuB;AACxB;AACA;CACC,uBAAuB;CACvB,mBAAmB;AACpB","sourcesContent":[".ns-dark ActionBar {\n\tcolor: #00943e;\n}\n.ns-dark ActionBarTitle {\n\tcolor: #00943e;\n}\n.ns-dark .background-50 {\n\tcolor: #00943e;\n}\n.ns-dark .letter-color {\n\tcolor: #00943e;\n}\n.ns-dark .botoes {\n\tbackground-color: #00943e;\n}\n.ns-dark #SectionObjectCardCollection1 {\n\tbackground-color: #00943e;\n\tcolor: #00943e;\n}\n.ns-dark .Calendar {\n\tbackground-color: black;\n}\n.ns-dark CalendarButtons {\n\tbackground-color: black;\n\tfont-color: #00943e;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.dark.less":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.dark.less ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function
.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }

*/

@bege100:rgb(229, 220, 200);
@bege75:rgb(235, 230, 216);
@bege50:rgb(241, 238, 229);
@bege25:rgb(248, 246, 242);
@verdeKlabin: rgb(0,148,62);
@botoes:rgb(88, 73, 3);



MDKPage {
}

ActionBar {    
    color: @verdeKlabin;
} 

ActionBarTitle {
    color: @verdeKlabin;    
}

.background-100 { 
}

.background-75 { 
}

.background-50 { 
    color: @verdeKlabin;
}

.background-25 { 
}

.letter-color {
    color: @verdeKlabin;
}

.botoes{
    background-color: @verdeKlabin;
}

#SectionObjectCardCollection1{
    background-color: @verdeKlabin;
    color: @verdeKlabin;
}

.avatar{
}

.Calendar{
    background-color: black;
}

CalendarButtons{
    background-color: black;
    font-color: @verdeKlabin;
}`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.dark.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED,2BAA2B;AAC3B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,2BAA2B;AAC3B,sBAAsB;;;;AAItB;AACA;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;AACA;;AAEA;AACA;;AAEA;IACI,mBAAmB;AACvB;;AAEA;AACA;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,8BAA8B;IAC9B,mBAAmB;AACvB;;AAEA;AACA;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,uBAAuB;IACvB,wBAAwB;AAC5B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n\n*/\n\n@bege100:rgb(229, 220, 200);\n@bege75:rgb(235, 230, 216);\n@bege50:rgb(241, 238, 229);\n@bege25:rgb(248, 246, 242);\n@verdeKlabin: rgb(0,148,62);\n@botoes:rgb(88, 73, 3);\n\n\n\nMDKPage {\n}\n\nActionBar {    \n    color: @verdeKlabin;\n} \n\nActionBarTitle {\n    color: @verdeKlabin;    \n}\n\n.background-100 { \n}\n\n.background-75 { \n}\n\n.background-50 { \n    color: @verdeKlabin;\n}\n\n.background-25 { \n}\n\n.letter-color {\n    color: @verdeKlabin;\n}\n\n.botoes{\n    background-color: @verdeKlabin;\n}\n\n#SectionObjectCardCollection1{\n    background-color: @verdeKlabin;\n    color: @verdeKlabin;\n}\n\n.avatar{\n}\n\n.Calendar{\n    background-color: black;\n}\n\nCalendarButtons{\n    background-color: black;\n    font-color: @verdeKlabin;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.dark.nss":
/*!******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.dark.nss ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@bege100: rgb(229, 220, 200);
@bege75: rgb(235, 230, 216);
@bege50: rgb(241, 238, 229);
@bege25: rgb(248, 246, 242);
@verdeKlabin: rgb(0,148,62);
@botoes: rgb(88, 73, 3);
ActionBar {
	font-color: #00943e;
}
ActionBarTitle {
	font-color: #00943e;
}
background-50 {
	font-color: #00943e;
}
letter-color {
	font-color: #00943e;
}
botoes {
	background-color: #00943e;
}
Calendar {
	background-color: black;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.dark.nss"],"names":[],"mappings":"AAAA,4BAA4B;AAC5B,2BAA2B;AAC3B,2BAA2B;AAC3B,2BAA2B;AAC3B,2BAA2B;AAC3B,uBAAuB;AACvB;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;AACpB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,uBAAuB;AACxB","sourcesContent":["@bege100: rgb(229, 220, 200);\n@bege75: rgb(235, 230, 216);\n@bege50: rgb(241, 238, 229);\n@bege25: rgb(248, 246, 242);\n@verdeKlabin: rgb(0,148,62);\n@botoes: rgb(88, 73, 3);\nActionBar {\n\tfont-color: #00943e;\n}\nActionBarTitle {\n\tfont-color: #00943e;\n}\nbackground-50 {\n\tfont-color: #00943e;\n}\nletter-color {\n\tfont-color: #00943e;\n}\nbotoes {\n\tbackground-color: #00943e;\n}\nCalendar {\n\tbackground-color: black;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.less":
/*!**************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.less ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function
.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }

*/

@bege100:rgb(229, 220, 200);
@bege75:rgb(235, 230, 216);
@bege50:rgb(241, 238, 229);
@bege25:rgb(248, 246, 242);
@verde: rgb(64, 176, 100);
@botoes:rgb(88, 73, 3); ;


MDKPage {
  background-color: @bege50;
}

ActionBar {
  color: @verde; 
  background-color: @bege100;
} 

ActionBarTitle {
  color: rgb(0, 0, 0); 
  font-size: 17;
}

.background-100 { 
  background-color: @bege100;
}

.background-75 { 
  background-color: @bege75;
}

.background-50 { 
  background-color: @bege50;
}

.background-25 { 
  background-color: @bege25;
}

.letter-black-color {
  color: rgb(0, 0, 0); 
}

.letter-green-color {
  color: @verde;
  background-color: white;
}

.botoes{
  background-color: @botoes;
}

#SectionObjectCardCollection1{
  background-color: @bege100;
  color: @verde;
}

.avatar{
  color: @botoes; 
  bartintcolor: blue;
}


.Calendar{
  background-color: @bege25;
}`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED,2BAA2B;AAC3B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,yBAAyB;AACzB,sBAAsB;;;AAGtB;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,0BAA0B;EAC1B,aAAa;AACf;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;;AAGA;EACE,yBAAyB;AAC3B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n\n*/\n\n@bege100:rgb(229, 220, 200);\n@bege75:rgb(235, 230, 216);\n@bege50:rgb(241, 238, 229);\n@bege25:rgb(248, 246, 242);\n@verde: rgb(64, 176, 100);\n@botoes:rgb(88, 73, 3); ;\n\n\nMDKPage {\n  background-color: @bege50;\n}\n\nActionBar {\n  color: @verde; \n  background-color: @bege100;\n} \n\nActionBarTitle {\n  color: rgb(0, 0, 0); \n  font-size: 17;\n}\n\n.background-100 { \n  background-color: @bege100;\n}\n\n.background-75 { \n  background-color: @bege75;\n}\n\n.background-50 { \n  background-color: @bege50;\n}\n\n.background-25 { \n  background-color: @bege25;\n}\n\n.letter-black-color {\n  color: rgb(0, 0, 0); \n}\n\n.letter-green-color {\n  color: @verde;\n  background-color: white;\n}\n\n.botoes{\n  background-color: @botoes;\n}\n\n#SectionObjectCardCollection1{\n  background-color: @bege100;\n  color: @verde;\n}\n\n.avatar{\n  color: @botoes; \n  bartintcolor: blue;\n}\n\n\n.Calendar{\n  background-color: @bege25;\n}"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.light.css":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.light.css ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-light MDKPage {
	background-color: #f1eee5;
}
.ns-light ActionBar {
	color: #40b064;
	background-color: #e5dcc8;
}
.ns-light ActionBarTitle {
	color: #000000;
	font-size: 17;
}
.ns-light .background-100 {
	background-color: #e5dcc8;
}
.ns-light .background-75 {
	background-color: #ebe6d8;
}
.ns-light .background-50 {
	background-color: #f1eee5;
}
.ns-light .background-25 {
	background-color: #f8f6f2;
}
.ns-light .letter-black-color {
	color: #000000;
}
.ns-light .letter-green-color {
	color: #40b064;
	background-color: white;
}
.ns-light .botoes {
	background-color: #584903;
}
.ns-light #SectionObjectCardCollection1 {
	background-color: #e5dcc8;
	color: #40b064;
}
.ns-light .avatar {
	color: #584903;
	bartintcolor: blue;
}
.ns-light .Calendar {
	background-color: #f8f6f2;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.light.css"],"names":[],"mappings":"AAAA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;CACd,yBAAyB;AAC1B;AACA;CACC,cAAc;CACd,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,cAAc;AACf;AACA;CACC,cAAc;CACd,uBAAuB;AACxB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;CACzB,cAAc;AACf;AACA;CACC,cAAc;CACd,kBAAkB;AACnB;AACA;CACC,yBAAyB;AAC1B","sourcesContent":[".ns-light MDKPage {\n\tbackground-color: #f1eee5;\n}\n.ns-light ActionBar {\n\tcolor: #40b064;\n\tbackground-color: #e5dcc8;\n}\n.ns-light ActionBarTitle {\n\tcolor: #000000;\n\tfont-size: 17;\n}\n.ns-light .background-100 {\n\tbackground-color: #e5dcc8;\n}\n.ns-light .background-75 {\n\tbackground-color: #ebe6d8;\n}\n.ns-light .background-50 {\n\tbackground-color: #f1eee5;\n}\n.ns-light .background-25 {\n\tbackground-color: #f8f6f2;\n}\n.ns-light .letter-black-color {\n\tcolor: #000000;\n}\n.ns-light .letter-green-color {\n\tcolor: #40b064;\n\tbackground-color: white;\n}\n.ns-light .botoes {\n\tbackground-color: #584903;\n}\n.ns-light #SectionObjectCardCollection1 {\n\tbackground-color: #e5dcc8;\n\tcolor: #40b064;\n}\n.ns-light .avatar {\n\tcolor: #584903;\n\tbartintcolor: blue;\n}\n.ns-light .Calendar {\n\tbackground-color: #f8f6f2;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.light.less":
/*!********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.light.less ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function
.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }

*/

@bege100:rgb(229, 220, 200);
@bege75:rgb(235, 230, 216);
@bege50:rgb(241, 238, 229);
@bege25:rgb(248, 246, 242);
@verde: rgb(64, 176, 100);
@botoes:rgb(88, 73, 3); ;


MDKPage {
  background-color: @bege50;
}

ActionBar {
  color: @verde; 
  background-color: @bege100;
} 

ActionBarTitle {
  color: rgb(0, 0, 0); 
  font-size: 17;
}

.background-100 { 
  background-color: @bege100;
}

.background-75 { 
  background-color: @bege75;
}

.background-50 { 
  background-color: @bege50;
}

.background-25 { 
  background-color: @bege25;
}

.letter-black-color {
  color: rgb(0, 0, 0); 
}

.letter-green-color {
  color: @verde;
  background-color: white;
}

.botoes{
  background-color: @botoes;
}

#SectionObjectCardCollection1{
  background-color: @bege100;
  color: @verde;
}

.avatar{
  color: @botoes;
  bartintcolor: blue;
}


.Calendar{
  background-color: @bege25;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.light.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC;;AAED,2BAA2B;AAC3B,0BAA0B;AAC1B,0BAA0B;AAC1B,0BAA0B;AAC1B,yBAAyB;AACzB,sBAAsB;;;AAGtB;EACE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,0BAA0B;AAC5B;;AAEA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,0BAA0B;EAC1B,aAAa;AACf;;AAEA;EACE,cAAc;EACd,kBAAkB;AACpB;;;AAGA;EACE,yBAAyB;AAC3B","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n\n*/\n\n@bege100:rgb(229, 220, 200);\n@bege75:rgb(235, 230, 216);\n@bege50:rgb(241, 238, 229);\n@bege25:rgb(248, 246, 242);\n@verde: rgb(64, 176, 100);\n@botoes:rgb(88, 73, 3); ;\n\n\nMDKPage {\n  background-color: @bege50;\n}\n\nActionBar {\n  color: @verde; \n  background-color: @bege100;\n} \n\nActionBarTitle {\n  color: rgb(0, 0, 0); \n  font-size: 17;\n}\n\n.background-100 { \n  background-color: @bege100;\n}\n\n.background-75 { \n  background-color: @bege75;\n}\n\n.background-50 { \n  background-color: @bege50;\n}\n\n.background-25 { \n  background-color: @bege25;\n}\n\n.letter-black-color {\n  color: rgb(0, 0, 0); \n}\n\n.letter-green-color {\n  color: @verde;\n  background-color: white;\n}\n\n.botoes{\n  background-color: @botoes;\n}\n\n#SectionObjectCardCollection1{\n  background-color: @bege100;\n  color: @verde;\n}\n\n.avatar{\n  color: @botoes;\n  bartintcolor: blue;\n}\n\n\n.Calendar{\n  background-color: @bege25;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.light.nss":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.light.nss ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@bege100: rgb(229, 220, 200);
@bege75: rgb(235, 230, 216);
@bege50: rgb(241, 238, 229);
@bege25: rgb(248, 246, 242);
@verde: rgb(64, 176, 100);
@botoes: rgb(88, 73, 3);
ActionBar {
	font-color: #40b064;
	background-color: #e5dcc8;
}
ActionBarTitle {
	font-color: #000000;
	font-size: 17;
}
background-100 {
	background-color: #e5dcc8;
}
background-75 {
	background-color: #ebe6d8;
}
background-50 {
	background-color: #f1eee5;
}
background-25 {
	background-color: #f8f6f2;
}
letter-black-color {
	font-color: #000000;
}
letter-green-color {
	font-color: #40b064;
	background-color: white;
}
botoes {
	background-color: #584903;
}
avatar {
	font-color: #584903;
	bartintcolor: blue;
}
Calendar {
	background-color: #f8f6f2;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.light.nss"],"names":[],"mappings":"AAAA,4BAA4B;AAC5B,2BAA2B;AAC3B,2BAA2B;AAC3B,2BAA2B;AAC3B,yBAAyB;AACzB,uBAAuB;AACvB;CACC,mBAAmB;CACnB,yBAAyB;AAC1B;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;CACnB,kBAAkB;AACnB;AACA;CACC,yBAAyB;AAC1B","sourcesContent":["@bege100: rgb(229, 220, 200);\n@bege75: rgb(235, 230, 216);\n@bege50: rgb(241, 238, 229);\n@bege25: rgb(248, 246, 242);\n@verde: rgb(64, 176, 100);\n@botoes: rgb(88, 73, 3);\nActionBar {\n\tfont-color: #40b064;\n\tbackground-color: #e5dcc8;\n}\nActionBarTitle {\n\tfont-color: #000000;\n\tfont-size: 17;\n}\nbackground-100 {\n\tbackground-color: #e5dcc8;\n}\nbackground-75 {\n\tbackground-color: #ebe6d8;\n}\nbackground-50 {\n\tbackground-color: #f1eee5;\n}\nbackground-25 {\n\tbackground-color: #f8f6f2;\n}\nletter-black-color {\n\tfont-color: #000000;\n}\nletter-green-color {\n\tfont-color: #40b064;\n\tbackground-color: white;\n}\nbotoes {\n\tbackground-color: #584903;\n}\navatar {\n\tfont-color: #584903;\n\tbartintcolor: blue;\n}\nCalendar {\n\tbackground-color: #f8f6f2;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.nss":
/*!*************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.nss ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@bege100: rgb(229, 220, 200);
@bege75: rgb(235, 230, 216);
@bege50: rgb(241, 238, 229);
@bege25: rgb(248, 246, 242);
@verde: rgb(64, 176, 100);
@botoes: rgb(88, 73, 3);
ActionBar {
	font-color: #40b064;
	background-color: #e5dcc8;
}
ActionBarTitle {
	font-color: #000000;
	font-size: 17;
}
background-100 {
	background-color: #e5dcc8;
}
background-75 {
	background-color: #ebe6d8;
}
background-50 {
	background-color: #f1eee5;
}
background-25 {
	background-color: #f8f6f2;
}
letter-black-color {
	font-color: #000000;
}
letter-green-color {
	font-color: #40b064;
	background-color: white;
}
botoes {
	background-color: #584903;
}
avatar {
	font-color: #584903;
	bartintcolor: blue;
}
Calendar {
	background-color: #f8f6f2;
}
`, "",{"version":3,"sources":["webpack://./build.definitions/Attendance_List/Styles/Styles.nss"],"names":[],"mappings":"AAAA,4BAA4B;AAC5B,2BAA2B;AAC3B,2BAA2B;AAC3B,2BAA2B;AAC3B,yBAAyB;AACzB,uBAAuB;AACvB;CACC,mBAAmB;CACnB,yBAAyB;AAC1B;AACA;CACC,mBAAmB;CACnB,aAAa;AACd;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;AACpB;AACA;CACC,mBAAmB;CACnB,uBAAuB;AACxB;AACA;CACC,yBAAyB;AAC1B;AACA;CACC,mBAAmB;CACnB,kBAAkB;AACnB;AACA;CACC,yBAAyB;AAC1B","sourcesContent":["@bege100: rgb(229, 220, 200);\n@bege75: rgb(235, 230, 216);\n@bege50: rgb(241, 238, 229);\n@bege25: rgb(248, 246, 242);\n@verde: rgb(64, 176, 100);\n@botoes: rgb(88, 73, 3);\nActionBar {\n\tfont-color: #40b064;\n\tbackground-color: #e5dcc8;\n}\nActionBarTitle {\n\tfont-color: #000000;\n\tfont-size: 17;\n}\nbackground-100 {\n\tbackground-color: #e5dcc8;\n}\nbackground-75 {\n\tbackground-color: #ebe6d8;\n}\nbackground-50 {\n\tbackground-color: #f1eee5;\n}\nbackground-25 {\n\tbackground-color: #f8f6f2;\n}\nletter-black-color {\n\tfont-color: #000000;\n}\nletter-green-color {\n\tfont-color: #40b064;\n\tbackground-color: white;\n}\nbotoes {\n\tbackground-color: #584903;\n}\navatar {\n\tfont-color: #584903;\n\tbartintcolor: blue;\n}\nCalendar {\n\tbackground-color: #f8f6f2;\n}\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Application/About.page":
/*!************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Application/About.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Attendance_List/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"/Attendance_List/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/Attendance_List/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)","_Type":"KeyValue.Type.Item"},{"Value":"/Attendance_List/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"About","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Application/Support.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Application/Support.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/Attendance_List/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/Attendance_List/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/Attendance_List/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/Attendance_List/Actions/Application/NavToActivityLog.action","_Type":"SimplePropertyCollection.Type.Cell"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/CloseModalPage_Complete.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Settings","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Application/UserActivityLog.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Application/UserActivityLog.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":true,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/Attendance_List/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/Attendance_List/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/Attendance_List/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/Attendance_List/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/Attendance_List/Rules/Logging/TraceCategories.js"},{"Value":true,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/Attendance_List/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/Attendance_List/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","ActionBar":{"Caption":"Activity Log","PrefersLargeCaption":false,"_Type":"Control.Type.ActionBar"},"OnLoaded":"/Attendance_List/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true,"_Type":"KeyValue.Type.Item"},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true,"_Type":"KeyValue.Type.Item"}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","ActionBar":{"Caption":"Details","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"_Type":"ObjectCell.Type.ContextMenu"},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false,"_Type":"ObjectTable.Type.ObjectCell"},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","ActionBar":{"Caption":"Error List","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Main.page":
/*!***********************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Main.page ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"Bem vindo(a) ao App Lista de Presença","DetailImageIsCircular":false,"HeadlineText":"/Attendance_List/Rules/Main/WelcomeMessage.js","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Styles":{"ObjectHeader":"background-100"}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectCardCollection","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","QueryOptions":"/Attendance_List/Rules/Main/GetThreeTeams.js"},"_Name":"SectionObjectCardCollection0","Header":{"Styles":{"Header":"background-50"},"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"Próximas turmas disponíveis"},"Footer":{"Styles":{"Caption":"letter-color"},"_Type":"SectionCommon.Type.Footer","_Name":"SectionCommonTypeFooter0","Caption":"Ver todas as turma","AccessoryType":"DisclosureIndicator","FooterStyle":"Attribute","Visible":true,"OnPress":"/Attendance_List/Actions/Main/NavToAllTeams.action","UseBottomPadding":true},"Visible":true,"EmptySection":{"Caption":"Sem turmas disponíveis hoje","FooterVisible":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":3},"Card":{"Visible":true,"Title":"{externalName}","Footnote":"ID da Turma: {externalCode}","DetailImage":"/Attendance_List/Images/logo.png","DetailImageIsCircular":false,"Description":"/Attendance_List/Rules/Main/TeamDescription.js","OnPress":"/Attendance_List/Actions/Teams/NavToTeamDetails.action","PrimaryAction":{"Visible":false,"_Type":"ObjectCard.Type.ActionItem"},"SecondaryAction":{"Title":"Secondary","Visible":false,"_Type":"ObjectCard.Type.ActionItem"},"_Type":"ObjectCardCollection.Type.Card"},"Layout":{"LayoutType":"Vertical"}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"ObjectHeader":{"DetailImageIsCircular":false,"HeadlineText":"Calendário de turmas","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Styles":{"ObjectHeader":"background-100"}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader1","Visible":true},{"Separators":{"TopSectionSeparator":true,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Styles":{"Calendar":"Calendar","ExpandableHandle":"letter-color","Buttons":"letter-color","InnerMonthLabel":"letter-color","WeekDayLabel":"background-75","Header":"background-75","Dates":"letter-color"},"_Type":"Section.Type.Calendar","_Name":"SectionCalendar1","Visible":true,"CalendarType":"Month","StartDayOfWeek":"Sun","IsPersistentSelection":true,"OnSelectedDateChange":"/Attendance_List/Rules/Main/UpdateQueryWithSelectedDate.js"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectCardCollection","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","QueryOptions":"/Attendance_List/Rules/Main/CalendarQuery.js"},"_Name":"SectionObjectCardCollection1","Visible":true,"EmptySection":{"Caption":"Sem turmas para a data selecionada","FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":true,"PageSize":50},"Card":{"Visible":true,"Title":"{externalName}","Subhead":"Local: {cust_LOCN_DESC}","DetailImage":"/Attendance_List/Images/logo.png","DetailImageIsCircular":false,"Description":"/Attendance_List/Rules/Main/TeamDescription.js","OnPress":"/Attendance_List/Actions/Teams/NavToTeamDetails.action","PrimaryAction":{"Title":"Primary","Visible":false,"_Type":"ObjectCard.Type.ActionItem"},"SecondaryAction":{"Title":"Secondary","Visible":false,"_Type":"ObjectCard.Type.ActionItem"},"Styles":{"BackgroundColor":"background-25"},"_Type":"ObjectCardCollection.Type.Card"},"Layout":{"LayoutType":"Vertical"}}]}],"PullDown":{"OnPulledDown":"/Attendance_List/Actions/Application/AppUpdate.action","Styles":{"BackgroundColor":"#f4e9c1","IndicatorColor":"#6cb56a"}},"DesignTimeTarget":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","QueryOptions":"/Attendance_List/Rules/Main/GetThreeTeams.js"},"_Type":"Page","_Name":"Main","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://menu","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1","_Type":"Control.Type.ActionBar","Caption":"Home","PrefersLargeCaption":false}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Teams/BePresence.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Teams/BePresence.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"/Attendance_List/Rules/Teams/Update/GetPresenceValue.js","_Type":"Control.Type.FormCell.Switch","_Name":"FormCellSwitch0","IsVisible":true,"Separator":true,"Styles":{"Switch":"letter-green-color"},"Caption":"Marcar presença","IsEditable":true},{"Validation":{"Styles":{"Message":"l"}},"Value":"{cust_nota}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"Inserir a nota","KeyboardType":"Number","AlternateInput":"None","Enabled":true,"IsEditable":true}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"BePresence","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"Salvar","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Rules/Teams/Update/UpdateTeam.js"}],"_Name":"ActionBar0","_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Teams/TeamCreate.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Teams/TeamCreate.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimplePropertyTeamDescription","IsVisible":true,"Separator":true,"Caption":"Descrição da turma","PlaceHolder":"Título da turma","KeyboardType":"Default","AlternateInput":"None","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPickerCurse","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Curso","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Selecione o curso","IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Cursos"},"DisplayValue":"{cust_CPNT_TITLE}","ReturnValue":"{externalCode}"}},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimplePropertyWorkload","IsVisible":true,"Separator":true,"Caption":"Carga horária","KeyboardType":"Number","AlternateInput":"None","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPickerLocale","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Local","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Selecione o local","IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Locais"},"DisplayValue":"{externalName}","ReturnValue":"{externalCode}"}},{"Value":"{cust_START_TME}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePickerStartDate","IsVisible":true,"Separator":true,"Caption":"Data início","IsEditable":true,"Mode":"Datetime"},{"Value":"{cust_END_TME}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePickerEndDate","IsVisible":true,"Separator":true,"Caption":"Data fim","IsEditable":true,"Mode":"Datetime"}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPickerInstructor1","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Instrutor Principal","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Informe o instrutor(a)","IsSelectedSectionEnabled":true,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"BarcodeScanner":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Instrutores"},"DisplayValue":"/Attendance_List/Rules/Teams/GetFullName.js","ReturnValue":"{externalCode}"}},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPickerInstructor2","IsVisible":true,"Separator":false,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Instrutor Secundário(a)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Informe o instrutor","IsSelectedSectionEnabled":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"BarcodeScanner":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Instrutores"},"DisplayValue":"/Attendance_List/Rules/Teams/GetFullName.js","ReturnValue":"{externalCode}"}}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPickerParticipants","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Participantes","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Selecione os participantes","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"BarcodeScanner":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Alunos"},"ObjectCell":{"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":"VC"}]},"PreserveIconStackSpacing":false,"Selected":true,"Title":"/Attendance_List/Rules/Teams/GetFullName.js","Visible":true},"ReturnValue":"{externalCode}"}}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"}]}],"DesignTimeTarget":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas"},"_Type":"Page","_Name":"TeamCreate","ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"_Type":"Control.Type.ActionBarItem"},{"_Name":"ActionBarItem2","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Rules/Teams/SaveCreate.js","_Type":"Control.Type.ActionBarItem"}],"_Name":"Salvar","Caption":"Criar turma","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Teams/TeamDetails.page":
/*!************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Teams/TeamDetails.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Description":"/Attendance_List/Rules/Teams/TeamDescription.js","DetailImageIsCircular":false,"HeadlineText":"{externalName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Styles":{"ObjectHeader":"background-100"}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"Value":"/Attendance_List/Rules/Teams/Details/GetInstNav1.js","_Name":"SectionSimplePropertyCell0","_Type":"SimplePropertyCollection.Type.Cell","KeyName":"Instrutor Principal","AccessoryType":"DisclosureIndicator","Visible":true}},{"SimplePropertyCell":{"Value":"/Attendance_List/Rules/Teams/Details/GetInstNav2.js","_Name":"SectionSimplePropertyCell1","_Type":"SimplePropertyCollection.Type.Cell","KeyName":"Instrutor Secundário","AccessoryType":"DisclosureIndicator","Visible":true}},{"SimplePropertyCell":{"Value":"{cust_LOCN_DESC}","_Name":"SectionSimplePropertyCell2","_Type":"SimplePropertyCollection.Type.Cell","KeyName":"Local","AccessoryType":"None","Visible":true}},{"SimplePropertyCell":{"Value":"/Attendance_List/Rules/Teams/TeamDuration.js","_Name":"SectionSimplePropertyCell3","_Type":"SimplePropertyCollection.Type.Cell","KeyName":"Carga Horária","AccessoryType":"None","Visible":true}}],"Layout":{"NumberOfColumns":2}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectCollection","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_ListadePresenca","QueryOptions":"$expand=cust_AlunosNav&$filter=cust_Turma eq '{externalCode}'"},"_Name":"SectionObjectCollection0","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionCommonTypeHeader0","AccessoryType":"None","UseTopPadding":true,"Caption":"Lista de presença"},"Visible":true,"EmptySection":{"Caption":"Sem participantes até o momento","FooterVisible":true},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"ObjectCell":{"Title":"/Attendance_List/Rules/Teams/Details/GetAlunoFirstName.js","Tags":[{"Color":"Green","Text":"/Attendance_List/Rules/Teams/Details/GetTeamStatus.js"},{"Color":"Green","Text":"/Attendance_List/Rules/Teams/Details/GetPartnerNote.js"}],"Subhead":"/Attendance_List/Rules/Teams/Details/GetAlunoName.js","DisplayDescriptionInMobile":true,"AccessoryButtonIcon":"sap-icon://user-settings","AccessoryType":"DisclosureIndicator","PreserveIconStackSpacing":false,"OnPress":"/Attendance_List/Actions/Teams/NavToBePresence.action","OnAccessoryButtonPress":"/Attendance_List/Actions/Teams/NavToBePresence.action","Styles":{"Title":"letter-color","Subhead":"letter-black-color"},"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","Style":"avatar"}],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"_Type":"ObjectCollection.Type.ObjectCell"},"Layout":{"NumberOfColumns":2}}]}],"_Type":"Page","_Name":"TeamDetails","ActionBar":{"Items":[{"_Type":"Control.Type.ActionBarItem","_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/Teams/PopoverTeamEdit.action"}],"_Name":"ActionBar1","_Type":"Control.Type.ActionBar","Caption":" ","PrefersLargeCaption":false}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Teams/TeamEdit.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Teams/TeamEdit.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":"{cust_START_TME}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker0","IsVisible":true,"Separator":true,"Caption":"Data início","IsEditable":true,"Mode":"Datetime"},{"Value":"{cust_END_TME}","_Type":"Control.Type.FormCell.DatePicker","_Name":"FormCellDatePicker1","IsVisible":true,"Separator":true,"Caption":"Data fim","IsEditable":true,"Mode":"Datetime"}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker2","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":true,"Caption":"Instrutor Secundário(a)","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"PickerPrompt":"Informe o instrutor","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"Search":{"Enabled":true,"BarcodeScanner":true},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Instrutores","ReadLink":"{@odata.readLink}"},"DisplayValue":"/Attendance_List/Rules/Teams/GetFullName.js","ReturnValue":"{externalCode}"}}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":["{externalCode}"],"_Type":"Control.Type.FormCell.ListPicker","_Name":"FormCellListPicker0","IsVisible":true,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Participantes","DataPaging":{"ShowLoadingIndicator":true},"PickerPrompt":"Selecione um participante","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"FilterProperty":"{externalCode}","Search":{"options":{"CaseSensitive":true,"NumberSearch":{"Enabled":true,"ConversionMethod":"UseCast"},"UseSearchOverFilter":{"Enabled":true}},"Enabled":true,"Placeholder":"Pesquisar participante...","BarcodeScanner":true,"MinimumCharacterThreshold":1},"PickerItems":{"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Alunos"},"ObjectCell":{"AvatarStack":{"Avatars":[{"Image":"sap-icon://customer","ImageText":"VC"}]},"PreserveIconStackSpacing":false,"Selected":true,"Title":"{cust_matricula} - {cust_fname} {cust_lname}","Visible":true},"ReturnValue":"{externalCode}"}}],"Layout":{"NumberOfColumns":1},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"}]}],"_Type":"Page","_Name":"TeamEdit","ActionBar":{"Items":[{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/CloseModalPage_Cancel.action","_Type":"Control.Type.ActionBarItem"},{"_Name":"ActionBarItem2","Caption":"","Icon":"sap-icon://menu","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Attendance_List/Actions/Teams/PopoverTeamEdit.action","_Type":"Control.Type.ActionBarItem"}],"_Name":"ActionBar1","Caption":"Editar turma","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Pages/Teams/TeamList.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Pages/Teams/TeamList.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"DetailImageIsCircular":false,"HeadlineText":"Lista de turmas","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas"},"Styles":{"ObjectHeader":"background-100"}},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectCardCollection","Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","QueryOptions":"/Attendance_List/Rules/Teams/QueryShowAllTeams.js"},"_Name":"SectionObjectCardCollection0","Visible":true,"EmptySection":{"Caption":"Nenhuma turma encontrada","FooterVisible":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Card":{"Visible":true,"Title":"{externalName}","Subhead":"/Attendance_List/Rules/Main/StartTeam.js","Footnote":"Local: {cust_LOCN_DESC}","DetailImageIsCircular":false,"StatusText":"/Attendance_List/Rules/Main/EndTeam.js","PrimaryAction":{"OnPress":"/Attendance_List/Actions/Main/NavToTeamDetails.action","Style":"botoes","Title":"Detalhes","Visible":true,"_Type":"ObjectCard.Type.ActionItem"},"SecondaryAction":{"Title":"Secondary","Visible":false,"_Type":"ObjectCard.Type.ActionItem"},"_Type":"ObjectCardCollection.Type.Card"},"Search":{"Enabled":true},"Layout":{"LayoutType":"Vertical"}}]}],"_Type":"Page","_Name":"TeamList","ActionBar":{"Caption":" ","PrefersLargeCaption":true,"_Type":"Control.Type.ActionBar"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/Attendance_List/Pages/Main.page","OnLaunch":["/Attendance_List/Rules/Service/Initialize.js"],"OnWillUpdate":"/Attendance_List/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/Attendance_List/Rules/Service/Initialize.js","Styles":"/Attendance_List/Styles/Styles.less","Version":"/Attendance_List/Globals/Application/AppDefinition_Version.global","Localization":"/Attendance_List/i18n/i18n.properties","_SchemaVersion":"24.11","_Name":"Attendance_List","StyleSheets":{"Styles.dark":{"css":"/Attendance_List/Styles/Styles.dark.css","ios":"/Attendance_List/Styles/Styles.dark.nss","android":"/Attendance_List/Styles/Styles.dark.json"},"Styles":{"css":"/Attendance_List/Styles/Styles.css","ios":"/Attendance_List/Styles/Styles.nss","android":"/Attendance_List/Styles/Styles.json"},"Styles.light":{"css":"/Attendance_List/Styles/Styles.light.css","ios":"/Attendance_List/Styles/Styles.light.nss","android":"/Attendance_List/Styles/Styles.light.json"}}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/AppUpdate.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/AppUpdate.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Attendance_List/Rules/Application/AppUpdateFailure.js","OnSuccess":"/Attendance_List/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/AppUpdateFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/AppUpdateFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/AppUpdateProgressBanner.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/AppUpdateProgressBanner.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Attendance_List/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/AppUpdateSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/AppUpdateSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/Logout.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/Logout.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/NavToAbout.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/NavToAbout.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Attendance_List/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/NavToActivityLog.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/NavToActivityLog.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Attendance_List/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/NavToSupport.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/NavToSupport.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/Attendance_List/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/OnWillUpdate.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/OnWillUpdate.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/Reset.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/Reset.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/ResetMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/ResetMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/Attendance_List/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/SupportMenuPopover.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/SupportMenuPopover.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.PopoverMenu","PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/Attendance_List/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/Attendance_List/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/Attendance_List/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/Attendance_List/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/Attendance_List/Actions/Application/Logout.action","Title":"Logout","Visible":"/Attendance_List/Rules/Application/ClientIsMultiUserMode.js"},{"Title":"Logs","Icon":"sap-icon://document-text","OnPress":"/Attendance_List/Actions/Application/NavToActivityLog.action","Visible":true,"Enabled":true,"Styles.Title":""},{"Title":"Download","Icon":"sap-icon://synchronize","OnPress":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action","Visible":true,"Enabled":true,"Styles.Title":"","Styles.Icon":"","TextAlignment":"Center"},{"Title":"Upload","Icon":"sap-icon://synchronize","TextAlignment":"Center","Styles":{"Title":"","Icon":""},"OnPress":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action","Visible":true,"Enabled":true}]}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Application/UserMenuPopover.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Application/UserMenuPopover.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.PopoverMenu","PopoverItems":[{"Title":"Sincronizar","Icon":"sap-icon://synchronize","Styles":{"Title":""},"OnPress":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action","Visible":true,"Enabled":true},{"Title":"Suporte","Icon":"sap-icon://headset","Styles":{"Title":""},"OnPress":"/Attendance_List/Actions/Application/SupportMenuPopover.action","Visible":true,"Enabled":true},{"Title":"Incluir Turma","Icon":"sap-icon://add","Styles":{"Title":""},"Visible":true,"Enabled":true,"OnPress":"/Attendance_List/Actions/Teams/NavToTeamCreate.action"},{"Title":"Upload","Icon":"sap-icon://upload","Styles":{"Title":""},"Visible":true,"Enabled":true,"rawValue":""}]}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOffline.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOffline.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineSuccessMessage.action","OnFailure":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineFailureMessage.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineFailureMessage.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineSuccessMessage.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/CloseOfflineSuccessMessage.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncFailureMessage.action","OnSuccess":"/Attendance_List/Rules/CAP_SERVICE_SF_LMS/ErrorArchive_CheckForSyncError.js","Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","DefiningRequests":[{"Name":"cust_Alunos","Query":"cust_Alunos","AutomaticallyRetrievesStreams":false},{"Name":"cust_Cursos","Query":"cust_Cursos","AutomaticallyRetrievesStreams":false},{"Name":"cust_Instrutores","Query":"cust_Instrutores","AutomaticallyRetrievesStreams":false},{"Name":"cust_Locais","Query":"cust_Locais","AutomaticallyRetrievesStreams":false},{"Name":"cust_Turmas","Query":"cust_Turmas?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_CursosNav,cust_Inst1Nav,cust_Inst2Nav&$filter=cust_LMS ne 'S' or cust_LMS eq null and cust_Status ne 'cancelada' or cust_Status eq null","AutomaticallyRetrievesStreams":false},{"Name":"cust_ListadePresenca","Query":"cust_ListadePresenca?$expand=cust_AlunosNav","AutomaticallyRetrievesStreams":false}]}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadStartedMessage.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadStartedMessage.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOffline.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOffline.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Initialize","ActionResult":{"_Name":"init"},"OnFailure":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOfflineFailureMessage.action","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","DefiningRequests":[{"Name":"cust_Alunos","Query":"cust_Alunos","AutomaticallyRetrievesStreams":false},{"Name":"cust_Cursos","Query":"cust_Cursos","AutomaticallyRetrievesStreams":false},{"Name":"cust_Instrutores","Query":"cust_Instrutores","AutomaticallyRetrievesStreams":false},{"Name":"cust_Locais","Query":"cust_Locais","AutomaticallyRetrievesStreams":false},{"Name":"cust_Turmas","Query":"cust_Turmas?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_CursosNav,cust_Inst1Nav,cust_Inst2Nav&$filter=cust_LMS ne 'S' or cust_LMS eq null and cust_Status ne 'cancelada' or cust_Status eq null","AutomaticallyRetrievesStreams":false},{"Name":"cust_ListadePresenca","Query":"cust_ListadePresenca?$expand=cust_AlunosNav","AutomaticallyRetrievesStreams":false}]}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOfflineFailureMessage.action":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/InitializeOfflineFailureMessage.action ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncFailureMessage.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncFailureMessage.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/SyncStartedMessage.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnFailure":"/Attendance_List/Actions/GenericMessageBox.action","OnSuccess":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action","Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/UploadOffline.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnFailure":"/Attendance_List/Actions/GenericMessageBox.action","OnSuccess":"/Attendance_List/Actions/CAP_SERVICE_SF_LMS/Service/DownloadStartedMessage.action","Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CloseModalPage_Cancel.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CloseModalPage_Cancel.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/CloseModalPage_Complete.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/CloseModalPage_Complete.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/ClosePage.action":
/*!********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/ClosePage.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Attendance_List/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Attendance_List/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/GenericBannerMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/GenericBannerMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/GenericMessageBox.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/GenericMessageBox.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message - {#ActionResults:sync/error}","Title":"Title","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/GenericNavigation.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/GenericNavigation.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/Attendance_List/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/GenericToastMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/GenericToastMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Logging/LogUploadFailure.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Logging/LogUploadFailure.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Logging/LogUploadSuccessful.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Logging/LogUploadSuccessful.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Logging/UploadLog.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Logging/UploadLog.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/Attendance_List/Actions/Logging/LogUploadFailure.action","OnSuccess":"/Attendance_List/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Logging/UploadLogProgress.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Logging/UploadLogProgress.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/Attendance_List/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Main/NavToAllTeams.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Main/NavToAllTeams.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToAllTeams"},"PageToOpen":"/Attendance_List/Pages/Teams/TeamList.page"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Main/NavToTeamDetails.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Main/NavToTeamDetails.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTeamDetails"},"PageToOpen":"/Attendance_List/Pages/Teams/TeamDetails.page"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CancelTeam.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CancelTeam.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"UpdateTeam"},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","ReadLink":"{@odata.readLink}"},"Properties":{"externalCode":"{externalCode}"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CancelTeamMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CancelTeamMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CloseTeamMessage"},"Message":"Essa turma será removida e não será possível alterá-la posteriormente","Title":"Deseja cancelar a turma?","OKCaption":"Cancelar","OnOK":"/Attendance_List/Rules/Teams/Update/CancelTeam.js","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CloseTeam.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CloseTeam.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"UpdateTeam"},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","ReadLink":"{@odata.readLink}"},"Properties":{"externalCode":"{externalCode}"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CloseTeamMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CloseTeamMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CloseTeamMessage"},"Message":"Lembre-se de verificar as notas da turma","Title":"Deseja encerrar a turma?","OKCaption":"Encerrar","OnOK":"/Attendance_List/Rules/Teams/Update/CloseTeam.js","CancelCaption":"Cancelar"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CreateEntityTeam.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CreateEntityTeam.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"CreateEntityTeam"},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas"},"Properties":{"externalCode":"","cust_ACT_CPNT_ID":"#Control:FormCellListPickerCurse/#SelectedValue","cust_END_TME":"#Control:FormCellDatePickerEndDate/#Value","cust_INST_ID1":"#Control:FormCellListPickerInstructor1/#SelectedValue","cust_INST_ID2":"#Control:FormCellListPickerInstructor2/#SelectedValue","cust_LOCN_DESC":"#Control:FormCellListPickerLocale/#Value/#First/DisplayValue","cust_LOCN_ID1":"#Control:FormCellListPickerLocale/#SelectedValue","cust_SSG_SEG_NUM":"#Control:FormCellSimplePropertyWorkload/#Value","cust_START_TME":"#Control:FormCellDatePickerStartDate/#Value","externalName":"#Page:TeamCreate/#Control:FormCellSimplePropertyTeamDescription/#Value"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/CreatePresenceList.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/CreatePresenceList.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"CreatePresenceList"},"Properties":{},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_ListadePresenca"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/DeleteTeam.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/DeleteTeam.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"DeleteTeam"},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_Turmas","ReadLink":"{@odata.id}"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/NavToBePresence.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/NavToBePresence.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToBePresence"},"PageToOpen":"/Attendance_List/Pages/Teams/BePresence.page","BackStackVisible":true,"ModalPage":true,"NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/NavToMain.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/NavToMain.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToMain"},"PageToOpen":"/Attendance_List/Pages/Main.page","BackStackVisible":true,"ClearHistory":true}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamCreate.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/NavToTeamCreate.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTeamCreate"},"PageToOpen":"/Attendance_List/Pages/Teams/TeamCreate.page"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamDetails.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/NavToTeamDetails.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTeamDetails"},"PageToOpen":"/Attendance_List/Pages/Teams/TeamDetails.page"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/NavToTeamEdit.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/NavToTeamEdit.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToTeamEdit"},"PageToOpen":"/Attendance_List/Pages/Teams/TeamEdit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/OnFailureMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/OnFailureMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Failed to create team.","Title":"Error","OKCaption":"Retry"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/OnSuccessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/OnSuccessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Team created successfully!","Title":"Success","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/PopoverTeamEdit.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/PopoverTeamEdit.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.PopoverMenu","ActionResult":{"_Name":"PopoverTeamEdit"},"PopoverItems":[{"Title":"Encerrar Turma","Icon":"sap-icon://save","OnPress":"/Attendance_List/Actions/Teams/CloseTeamMessage.action","Visible":true,"Enabled":true,"Styles":{"Title":"letter-color"}},{"Title":"Cancelar Turma","Icon":"sap-icon://delete","OnPress":"/Attendance_List/Actions/Teams/CancelTeamMessage.action","Visible":true,"Enabled":true,"Styles":{"Title":"letter-color"}}]}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/UpdatePresenceList.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/UpdatePresenceList.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"UpdateTeam"},"Target":{"Service":"/Attendance_List/Services/CAP_SERVICE_SF_LMS.service","EntitySet":"cust_ListadePresenca","ReadLink":"{@odata.readLink}"},"Properties":{"externalCode":"{externalCode}"},"RequestOptions":{"UpdateMode":"PATCH"}}

/***/ }),

/***/ "./build.definitions/Attendance_List/Actions/Teams/UpdateTeamSuccessMessage.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Actions/Teams/UpdateTeamSuccessMessage.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","ActionResult":{"_Name":"UpdateTeamSuccessMessage"},"Message":"Salvando...","CompletionMessage":"Turma alterada com sucesso"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Globals/Application/AppDefinition_Version.global":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Globals/Application/AppDefinition_Version.global ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Globals/Application/ApplicationName.global":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Globals/Application/ApplicationName.global ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Globals/Application/SupportEmail.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Globals/Application/SupportEmail.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Globals/Application/SupportPhone.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Globals/Application/SupportPhone.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Attendance_List/Services/CAP_SERVICE_SF_LMS.service":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Attendance_List/Services/CAP_SERVICE_SF_LMS.service ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"CAP-SERVICE-SF-LMS","OfflineEnabled":true,"OfflineOptions":{"CSDLOptions":["processMixedVersions"]},"SourceType":"Mobile","RestService":false}

/***/ }),

/***/ "./build.definitions/Attendance_List/Images/logo.dark.png":
/*!****************************************************************!*\
  !*** ./build.definitions/Attendance_List/Images/logo.dark.png ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABjcAAASBCAMAAABPbDxMAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAwBQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Bz0LCAAAAQB0Uk5TAEuAZf/eJknWF2HUFVX+4hZB6CA49O4sLvDtLSswMvLsM/HrJ+ooPvU38zTv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";

/***/ }),

/***/ "./build.definitions/Attendance_List/Images/logo.light.png":
/*!*****************************************************************!*\
  !*** ./build.definitions/Attendance_List/Images/logo.light.png ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.dark.json":
/*!*******************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.dark.json ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ActionBar":{"font-color":"#00943e"},"ActionBarTitle":{"font-color":"#00943e"},"background-50":{"font-color":"#00943e"},"letter-color":{"font-color":"#00943e"},"botoes":{"background-color":"#00943e"},"Calendar":{"background-color":"black"}}');

/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.json":
/*!**************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ActionBar":{"font-color":"#40b064","background-color":"#e5dcc8"},"ActionBarTitle":{"font-color":"#000000","font-size":"17"},"background-100":{"background-color":"#e5dcc8"},"background-75":{"background-color":"#ebe6d8"},"background-50":{"background-color":"#f1eee5"},"background-25":{"background-color":"#f8f6f2"},"letter-black-color":{"font-color":"#000000"},"letter-green-color":{"font-color":"#40b064","background-color":"white"},"botoes":{"background-color":"#584903"},"avatar":{"font-color":"#584903","bartintcolor":"blue"},"Calendar":{"background-color":"#f8f6f2"}}');

/***/ }),

/***/ "./build.definitions/Attendance_List/Styles/Styles.light.json":
/*!********************************************************************!*\
  !*** ./build.definitions/Attendance_List/Styles/Styles.light.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ActionBar":{"font-color":"#40b064","background-color":"#e5dcc8"},"ActionBarTitle":{"font-color":"#000000","font-size":"17"},"background-100":{"background-color":"#e5dcc8"},"background-75":{"background-color":"#ebe6d8"},"background-50":{"background-color":"#f1eee5"},"background-25":{"background-color":"#f8f6f2"},"letter-black-color":{"font-color":"#000000"},"letter-green-color":{"font-color":"#40b064","background-color":"white"},"botoes":{"background-color":"#584903"},"avatar":{"font-color":"#584903","bartintcolor":"blue"},"Calendar":{"background-color":"#f8f6f2"}}');

/***/ }),

/***/ "./build.definitions/Attendance_List/jsconfig.json":
/*!*********************************************************!*\
  !*** ./build.definitions/Attendance_List/jsconfig.json ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map