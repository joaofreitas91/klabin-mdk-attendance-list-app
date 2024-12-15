/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidatePresenceSwitch(clientAPI) {
    var today = new Date().getTime()
    var endDate = new Date(clientAPI.binding.cust_enddate).getTime()   
    return today <= endDate
}
