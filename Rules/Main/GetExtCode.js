/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetExtCode(clientAPI) {
    let clientData = clientAPI.getAppClientData();
    return clientData.ExtCode || ""
}
