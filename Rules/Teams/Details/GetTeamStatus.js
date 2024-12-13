/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetTeamStatus(clientAPI) {
    return clientAPI.binding.cust_Status ?? "ausente"
}
