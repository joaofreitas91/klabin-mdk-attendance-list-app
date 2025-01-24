/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function format (value) {
    if (value.length === 1) {
        return `  ${value}`
    }
    if (value.length === 2) {
        return ` ${value}`
    }
    if (value.length === 3) {
        return value
    }
    return ` - `
}

export default function GetPartnerNote(clientAPI) {
    const note = clientAPI.binding.cust_nota

    return clientAPI.binding.cust_nota ? `Nota:${format(note)}` : 'Nota: - '
}
