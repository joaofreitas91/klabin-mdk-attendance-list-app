/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import Cuid from "../Application/Cuid"

export default async function SaveCreate(clientAPI) {

    function gerarPresencaCurso(dataHoraInicio, dataHoraFim) {
        const inicio = new Date(dataHoraInicio);
        const fim = new Date(dataHoraFim);
    
        // Extrair o horário inicial e final
        const horarioInicial = {
            horas: inicio.getHours(),
            minutos: inicio.getMinutes()
        };
    
        const horarioFinal = {
            horas: fim.getHours(),
            minutos: fim.getMinutes()
        };
    
        // Normalizar as datas para o horário fixo
        inicio.setHours(horarioInicial.horas, horarioInicial.minutos, 0, 0);
        fim.setHours(horarioFinal.horas, horarioFinal.minutos, 0, 0);
    
        const listaPresenca = [];
        let dataAtual = new Date(inicio);
    
        // Gerar lista de presença
        while (dataAtual <= fim) {
            const dataInicioDia = new Date(dataAtual);
            const dataFimDia = new Date(dataAtual);
    
            // Configurar o horário inicial e final do dia
            dataInicioDia.setHours(horarioInicial.horas, horarioInicial.minutos, 0, 0);
            dataFimDia.setHours(horarioFinal.horas, horarioFinal.minutos, 0, 0);
    
            // Garantir que o último dia não ultrapasse a data final
            if (dataFimDia > fim) {
                dataFimDia.setTime(fim.getTime());
            }
    
            // Adicionar o dia à lista de presença
            listaPresenca.push({
                inicio: dataInicioDia,
                fim: dataFimDia
            });
    
            // Avançar para o próximo dia
            dataAtual.setDate(dataAtual.getDate() + 1);
        }
    
        return listaPresenca;
    }

    try {

        const teamId = Cuid()
        const partners = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerParticipants/#Value/')

        const firstDay = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerStartDate/#Value')
        const lastDay = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerEndDate/#Value')

        const courseDays = gerarPresencaCurso(new Date(firstDay).toISOString(), new Date(lastDay).toISOString())
        /* const userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId'); */
        const cust_cursos_id = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerCurse/#SelectedValue')

        const query = `$filter=externalCode eq '${cust_cursos_id}'`
        const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Cursos", ["cust_CPNT_TYP_ID", "cust_CPNT_TITLE"], query)

        /* const queryInst = `$filter=cust_RELATED_USER eq '${userId}'`
        const instructors = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Instrutores", ["externalCode"], queryInst)

        const inst1 = instructors.find(i => i.externalCode) */
        const curse = entity.find(i => i.cust_CPNT_TYP_ID)

        const partnerList = partners.map((i, index) => {
            const externalCode = Cuid()
            const props = {
                "externalCode": externalCode,
                "cust_Turma": teamId,
                "cust_Aluno": i.ReturnValue,
                "externalName": `Dia ${index + 1}`
            }
            return props
        })

        const dailyList = courseDays.map((i, index) => {
            const externalCode = Cuid()
            const props = {
                "externalCode": externalCode,
                "cust_turma": teamId,
                "cust_startdate": new Date(i.inicio).toISOString(),
                "cust_enddate": new Date(i.fim).toISOString(),
                "cust_totalhoras": clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellSimplePropertyWorkload/#Value')
            }
            return props
        })

        /* 
        Validação do Datepicker da data inicial
        Regra: Não pode criar turma iniciando com data diferente da data atual
        */
        const startDateTime = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerStartDate/#Value') // Valor do DatePicker
        const inputDate = new Date(startDateTime) // Valor do DatePicker formatado no new Date
        inputDate.setHours(0, 0, 0, 0) // Setando o tempo igual a zero pois será comparado apenas a data
        const currentDate = new Date() // Data atual
        currentDate.setHours(0, 0, 0, 0) // Setando o tempo igual a zero pois será comparado apenas a data

        if (inputDate.getTime() !== currentDate.getTime()) { // Se a data inicial for diferente da data atual retorna mensagem de erro
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "A data inicial não pode ser diferente da data atual!"
                },
            });
        }
        
        // Final da validação da data inicial
        
        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": teamId,
                    "externalName": curse.cust_CPNT_TITLE,
                    "cust_CPNT_TYP_ID": curse.cust_CPNT_TYP_ID,
                }
            }
        })

        await Promise.all(partnerList.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        await Promise.all(dailyList.map(prop => {

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreateDailyList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        await clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": "Turma criada com sucesso!",
                "OnOK": "/Attendance_List/Actions/Teams/NavToMain.action"
            },
        });

    } catch (error) {

        return clientAPI.executeAction({
            "Name": "/Attendance_List/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Criação de turma",
                "Message": `Erro: ${error.message}`
            }
        });
    }

}

