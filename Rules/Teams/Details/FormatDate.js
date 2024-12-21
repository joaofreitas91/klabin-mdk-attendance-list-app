/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function FormatDate(clientAPI) {
    const date = new Date(clientAPI.binding.cust_startdate)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}
