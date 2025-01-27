/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function QueryFicha(clientAPI) {
    const queryTeam = `$filter=externalCode eq '${clientAPI.binding.cust_turma}'`;
    const responseTeam = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Turmas",
        ['cust_INST_ID1', 'cust_INST_ID2'],
        queryTeam
    );
    const InstCode1 = responseTeam.find(i => i.cust_INST_ID1)?.cust_INST_ID1 || '';
    const queryInst1 = `$filter=externalCode eq '${InstCode1}' or cust_RELATED_USER eq '${InstCode1}'`;
    const responseInst1 = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ['externalCode', 'cust_RELATED_USER'],
        queryInst1
    );

    const InstCode2 = responseTeam.find(i => i.cust_INST_ID2)?.cust_INST_ID2 || '';
    const queryInst2 = `$filter=externalCode eq '${InstCode2}' or cust_RELATED_USER eq '${InstCode2}'`;
    const responseInst2 = await clientAPI.read(
        "/Attendance_List/Services/CAP_SERVICE_SF_LMS.service",
        "cust_Instrutores",
        ['externalCode', 'cust_RELATED_USER'],
        queryInst2
    );

    const Inst1 = responseInst1.find(i => i.externalCode)

    const Inst2 = responseInst2.find(i => i.externalCode)

    let AlunoFilter = ''

    if (Inst1 && Inst1.externalCode) {
        AlunoFilter += ` and cust_Aluno ne '${Inst1.externalCode}'`
    }
    
    if (Inst1 && Inst1.cust_RELATED_USER) {
        AlunoFilter += ` and cust_Aluno ne '${Inst1.cust_RELATED_USER}'`
    }

    if (Inst2 && Inst2.externalCode) {
        AlunoFilter += ` and cust_Aluno ne '${Inst2.externalCode}'`
    }
    
    if (Inst2 && Inst2.cust_RELATED_USER) {
        AlunoFilter += ` and cust_Aluno ne '${Inst2.cust_RELATED_USER}'`
    }

    const cFilter = `$filter=cust_Turma eq '${clientAPI.binding.cust_turma}'${AlunoFilter}`

    return cFilter
}
