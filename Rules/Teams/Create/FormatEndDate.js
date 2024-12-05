/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetEndDate(clientAPI) {
    const endDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePickerEndDate/#Value")

    return `/Date(${new Date(endDate).getTime()})/`
}
