/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function IsAddParticipantsButtonEnable(clientAPI) {

    const date1 = new Date(clientAPI.binding.cust_START_TME);
    const date2 = new Date(clientAPI.binding.cust_END_TME);

    const year = date1.getFullYear();
    const month = date1.getMonth();
    const day = date1.getDate();

    const hours = date2.getHours();
    const minutes = date2.getMinutes();

    const combinedDate = new Date(year, month, day, hours, minutes);

    const startTeam = new Date(combinedDate).getTime()
    const today = new Date().getTime()
    if (startTeam < today) return false
    return true
}
