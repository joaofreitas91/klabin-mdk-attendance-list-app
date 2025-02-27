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

function daysBetweenDates(date1Str, date2Str) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    
    const timeDifference = Math.abs(date2 - date1);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(timeDifference / millisecondsPerDay);
}

export default function TeamSegmentedDuration(clientAPI) {
    var cHoras = Number(clientAPI.binding.cust_SSG_SEG_NUM)
    var initDate = new Date(clientAPI.binding.cust_START_TME)
    var finalDate = new Date(clientAPI.binding.cust_END_TME)
    var datesDiff = daysBetweenDates(initDate, finalDate) + 1
    var segmentDuration = cHoras / datesDiff

    return formatarHoras(String(segmentDuration))
}
