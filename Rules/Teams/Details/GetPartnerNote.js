/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetPartnerNote(clientAPI) {
    return clientAPI.binding.cust_nota ? `Nota: ${clientAPI.binding.cust_nota}` : 'Nota: -'
}
