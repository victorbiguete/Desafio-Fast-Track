const pessoa = JSON.parse(localStorage.getItem("busca"));
const msgBoaTarde = document.querySelector(".msg-boatarde");
let cor="";





let listaTarefas=[];
msgBoaTarde.textContent = "Boa tarde " + pessoa.nome;

class Tarefas{
    constructor(tarefa,dataInicio,dataFim,horaInicio,horaFim,descricao,idPessoa){
        this.tarefa=tarefa;
        this.dataInicio=dataInicio;
        this.dataFim=dataFim;
        this.horaInicio=horaInicio;
        this.horaFim=horaFim;
        this.descricao=descricao;
        this.idPessoa=idPessoa;
        this.status="";

        if(listaTarefas.length===0)
            this.id=1;
        else
            this.id=listaTarefas[listaTarefas.length-1].id+1;
    }
}

function CriarTarefa(){
    let tarefas = document.querySelector("#nomeTarefa").value;
    let dataInicio = document.querySelector("#dataInicio").value;
    let dataFim = document.querySelector("#dataFinal").value;
    let horaInicio = document.querySelector("#horaInicio").value;
    let horaFim = document.querySelector("#horaFinal").value;
    let descricao = document.querySelector("#descricao").value;

    let tarefa = new Tarefas(tarefas,dataInicio,dataFim,horaInicio,horaFim,descricao,pessoa.id);

    listaTarefas.push(tarefa);
    ExibirTarefa();
}

function ExibirTarefa(){
    let tbody = document.querySelector("#tabelaTarefas tbody");
    

    tbody.innerHTML = "";

    /*listaTarefas.forEach(element => {
        if(element.idPessoa===pessoa.id)
        {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>"+element.tarefa+"</td><td>"+element.dataInicio+"</td><td>"+element.horaInicio+"</td><td>"+element.dataFim+"</td><td>"+element.horaFim+"</td><td>"+element.descricao+"</td>"
        }
    });*/
    for(let i=0;i<listaTarefas.length;i++)
    {
        if(listaTarefas[i].idPessoa===pessoa.id)
        {
            var tr = document.createElement("tr");

            listaTarefas[i].status=ValidarStatus(listaTarefas[i]);

            tr.innerHTML = `<td class="Tarefa" data-toggle="modal" data-target="#TelaModal" data-id=${listaTarefas[i].id}>`+listaTarefas[i].tarefa+"</td>"+
            "<td>"+listaTarefas[i].dataInicio+" as "+listaTarefas[i].horaInicio+"</td>"+
            "<td>"+listaTarefas[i].dataFim+" as "+listaTarefas[i].horaFim+"</td>"+    
            `<td style="color:${cor};">`+listaTarefas[i].status+"</td>"+
            `<td><input class="btn btn-warning" type="submit" onclick="AlterarTarefa(${listaTarefas[i].id});return false;" value="Alterar"></td>`;
            tbody.appendChild(tr);
        }
    }
}

function ValidarStatus(lista)
{
    const data = new Date();
    
    let vetData = lista.dataInicio.split("/");
    let dataFormat = vetData[2]+"-"+vetData[1]+"-"+vetData[0];
    const inicio = new Date(`${dataFormat}T${lista.horaInicio}`);
    
    vetData=lista.dataFim.split("/");
    dataFormat = vetData[2]+"-"+vetData[1]+"-"+vetData[0]; 
    const fim = new Date(`${dataFormat}T${lista.horaFim}`);

    if(lista.status!="Realizado")
    {
        if(inicio.getTime()>data.getTime())
        {
            cor="orange";
            return "Pendente";
        }
            
        if(fim.getTime()<data.getTime())
        {
            cor="red";
            return "Em Atraso";
        }
            
        if(inicio.getTime()<=data.getTime() && fim.getTime()>=data.getTime())
        {
           cor="blue";
            return "Em Andamento";
        }
            
    }
    else
    {
        cor="green";
        return lista.status;
    }
        
}


