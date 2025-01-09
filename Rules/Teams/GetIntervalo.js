/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function formatarHoras(valor) {
    if (!valor || isNaN(valor) || valor <= 0) {
        return "0";
    }
    
    const horas = Math.floor(valor);
    const minutos = Math.round((valor - horas) * 60);
    
    if (horas > 0 && minutos > 0) {
        return `${horas}h ${minutos}m`;
    } else if (horas > 0) {
        return `${horas}h`;
    } else if (minutos > 0) {
        return `${minutos}m`;
    } else {
        return "0";
    }
}

export default function GetIntervalo(clientAPI) {
    const interval = String(Number(clientAPI.binding.cust_intervalo) / 60)

    return formatarHoras(interval)
}
