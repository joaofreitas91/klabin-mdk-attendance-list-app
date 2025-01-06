/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetSFUser(clientAPI) {
    let clientData = clientAPI.getAppClientData();

    alert(clientData.SFUser)
    return clientData.SFUser || ""
}
