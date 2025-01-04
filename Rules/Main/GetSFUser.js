/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetSFUser(clientAPI) {
    let clientData = clientAPI.getAppClientData();
    return clientData.SFUser || ""
}
