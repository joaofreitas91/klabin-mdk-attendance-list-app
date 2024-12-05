/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function FormatStartDate(clientAPI) {
    const startDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePickerStartDate/#Value")

    return `/Date(${new Date(startDate).getTime()})/`
}
