/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetPresenceValue(clientAPI) {

    if(clientAPI.binding.cust_Status){
        return clientAPI.binding.cust_Status == "ausente" ? false : true
    }
    return false
}   
