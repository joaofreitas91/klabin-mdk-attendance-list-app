/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function QueryShowAllTeams(clientAPI) {
    return "?$expand=cust_ListaNav($expand=cust_AlunosNav),cust_Inst1Nav,cust_Inst2Nav&$filter=cust_LOCN_DESC ne null and externalName ne null and cust_LMS ne 'S' and cust_Status ne 'cancelada'&$orderby=cust_START_TME"
}
