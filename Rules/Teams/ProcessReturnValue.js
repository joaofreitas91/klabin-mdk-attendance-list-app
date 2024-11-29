export default function ProcessReturnValue(context) {
    // Retrieve selected employees (cust_matricula) from the list picker
    let selectedEmployees = context.evaluateTargetPath("#Control:FormCellListPicker0/#SelectedItems");

    // Retrieve externalCode from the page binding for cust_Turma
    let cust_Turma = context.evaluateTargetPath("#Page:TurmaEdit/#Binding/externalCode");

    // Map each selected employee to the required properties
    return selectedEmployees.map(employee => {
        let cust_Aluno = employee.cust_matricula;
        let externalCode = `${cust_Turma}${cust_Aluno}`;
        let cust_AlunosNav = `$filter=externalCode eq '${cust_Aluno}'`;

        return {
            cust_Aluno,
            externalCode,
            cust_AlunosNav
        };
    });
}