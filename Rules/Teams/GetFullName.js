/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetFullName(clientAPI) {
    var cRet = ''
    
    cRet = clientAPI.binding.externalCode + ' ' + clientAPI.binding.cust_fname + ' ' + (clientAPI.binding.cust_mname ? (clientAPI.binding.cust_mname + ' ') : '') + (clientAPI.binding.cust_lname ? clientAPI.binding.cust_lname : '')
    
    return cRet
}
