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

        clientAPI.showActivityIndicator()

        const teamId = Cuid()
        const partners = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerParticipants/#Value/')
        // const workload = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellSimplePropertyWorkload/#Value')
        const intervalValue = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPicker1/#Value').find(i => i)

        const interval = intervalValue ? intervalValue.ReturnValue : null

        const firstDay = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerStartDate/#Value')
        const lastDay = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellDatePickerEndDate/#Value')

        const courseDays = gerarPresencaCurso(new Date(firstDay).toISOString(), new Date(lastDay).toISOString())
        /* const userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId'); */
        const cust_cursos_id = clientAPI.evaluateTargetPath('#Page:TeamCreate/#Control:FormCellListPickerCurse/#Value').find(i => i)

        if (!cust_cursos_id) {
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "O curso é obrigatório para realizar a criação da turma!"
                },
            });
        }

        const query = `$filter=externalCode eq '${cust_cursos_id.ReturnValue}'`
        const entity = await clientAPI.read("/Attendance_List/Services/CAP_SERVICE_SF_LMS.service", "cust_Cursos", ["cust_CPNT_TYP_ID", "cust_CPNT_TITLE"], query)

        function calculateHoursDiff(inicio, fim) {
            const init = new Date(inicio);
            const end = new Date(fim);

            const horario1 = `${init.getHours()}:${init.getMinutes()}`
            const horario2 = `${end.getHours()}:${end.getMinutes()}`

            const [h1, m1] = horario1.split(':').map(Number);
            const [h2, m2] = horario2.split(':').map(Number);
            
            // Converter os horários para minutos
            const minutos1 = h1 * 60 + m1;
            const minutos2 = h2 * 60 + m2;
            
            // Calcular a diferença considerando o ciclo de 24h
            let diferenca = minutos2 - minutos1;
            if (diferenca <= 0) {
                diferenca += 1440; // 1440 minutos em um dia
            }
            
            // Converter a diferença para horas decimais
            const horasDecimais = diferenca / 60;
            
            return horasDecimais

            // const horarioInicial = {
            //     horas: init.getHours(),
            //     minutos: init.getMinutes()
            // };

            // const horarioFinal = {
            //     horas: end.getHours(),
            //     minutos: end.getMinutes()
            // };

            // const newInitDate = new Date(inicio)
            // const newEndDate = new Date(fim)

            // newInitDate.setHours(horarioInicial.horas, horarioInicial.minutos, 0, 0);
            // newEndDate.setHours(horarioFinal.horas, horarioFinal.minutos, 0, 0);

            // const diffMs = newEndDate - newInitDate;
            // return diffMs / (1000 * 60 * 60);

            // const h1 = init.getHours()
            // const h2 = end.getHours()

            // // Calcular a diferença considerando o ciclo de 24h
            // let diferenca = h2 - h1;
            // if (diferenca <= 0) {
            //     diferenca += 24;
            // }

            // return diferenca
        }

        const diferencaHoras = calculateHoursDiff(firstDay, lastDay);
        const workload = !interval ? diferencaHoras : diferencaHoras - (Number(interval) / 60);
        const validateDate = new Date(firstDay) > new Date(lastDay)

        if (diferencaHoras < (Number(interval) / 60)) {
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "O intervalo não pode ser maior que o total de horas da turma!"
                },
            });
        }

        if (diferencaHoras < 0 || validateDate) {
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "A hora inicial não pode ser maior que a hora final!"
                },
            });
        }

        if (workload > 8) {
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "A carga horária não pode passar as 8 horas!"
                },
            });
        }

        if (diferencaHoras > 4 && !interval) {
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "Turma com mais de 4 horas de carga horária precisa ter intervalo!"
                },
            });
        }
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
                "externalName": i.BindingObject.cust_fname + ' ' + (i.BindingObject.cust_mname ? (i.BindingObject.cust_mname + ' ') : '') + (i.BindingObject.cust_lname ? i.BindingObject.cust_lname : '')
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
                "cust_totalhoras": String(Number(workload.toFixed(2))),
                "cust_intervalo": interval,
                "cust_segCode": String(index + 1)
            }
            return props
        })

        const presencalmsList = dailyList.flatMap((d) =>
            partnerList.map((p) => ({
                "externalCode": Cuid(),
                "cust_enddate": new Date(d.cust_enddate).toISOString(),
                "cust_startdate": new Date(d.cust_startdate).toISOString(),
                "cust_ficha": p.externalCode,
                "cust_segmento": d.externalCode,
                "cust_turma": d.cust_turma,
                "cust_presenca": "presente"
            }))
        )

        // if (!workload) {
        //     return await clientAPI.executeAction({
        //         "Name": "/Attendance_List/Actions/GenericMessageBox.action",
        //         "Properties": {
        //             "Title": "Erro ao criar turma",
        //             "Message": "O campo carga horária obrigatório para a criação de turma!"
        //         },
        //     });
        // }

        // if (workload > 8) {
        //     return await clientAPI.executeAction({
        //         "Name": "/Attendance_List/Actions/GenericMessageBox.action",
        //         "Properties": {
        //             "Title": "Erro ao criar turma",
        //             "Message": "Turmas não podem ter mais de 8 horas!"
        //         },
        //     });
        // }
        // if (workload > 4 && !interval) {
        //     return await clientAPI.executeAction({
        //         "Name": "/Attendance_List/Actions/GenericMessageBox.action",
        //         "Properties": {
        //             "Title": "Erro ao criar turma",
        //             "Message": "Turmas com mais de 4 horas precisam ter intervalo!"
        //         },
        //     });
        // }


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
            clientAPI.dismissActivityIndicator();
            return await clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/GenericMessageBox.action",
                "Properties": {
                    "Title": "Erro ao criar turma",
                    "Message": "A data inicial não pode ser diferente da data atual!"
                },
            });
        }

        // Final da validação da data inicial

        await Promise.all(partnerList.map(prop => { // criar lista de presença (ficha)

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresenceList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        await Promise.all(dailyList.map(prop => { // criar lista diaria
            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreateDailyList.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        await clientAPI.executeAction({ // criar turma
            "Name": "/Attendance_List/Actions/Teams/CreateEntityTeam.action",
            "Properties": {
                "Properties": {
                    "externalCode": teamId,
                    "externalName": curse.cust_CPNT_TITLE,
                    "cust_CPNT_TYP_ID": curse.cust_CPNT_TYP_ID,
                    "cust_SSG_SEG_NUM": String(Number((workload * dailyList.length).toFixed(2))),
                    "cust_intervalo": interval,
                    "cust_fromApp": true,
                }
            }
        })

        await Promise.all(presencalmsList.map(prop => { // criar presença lms

            return clientAPI.executeAction({
                "Name": "/Attendance_List/Actions/Teams/CreatePresencalmsEntity.action",
                "Properties": {
                    "Properties": prop,
                }
            })
        }))

        clientAPI.dismissActivityIndicator();

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

