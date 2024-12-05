/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function FormatEndDate(clientAPI) {
    const endDate = clientAPI.evaluateTargetPath("#Control:FormCellDatePicker1/#Value")

    return `/Date(${new Date(endDate).getTime()})/`
}
