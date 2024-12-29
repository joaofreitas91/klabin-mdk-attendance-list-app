/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function IsAddParticipantsButtonEnable(clientAPI) {
    const startTeam = new Date(clientAPI.binding.cust_START_TME).getTime()
    const today = new Date().getTime()
    if (startTeam < today) return false
    return true
}
