let listaPessoas=[];

class Pessoas{
    constructor(nome,email,senha){
        this.email=email;
        this.nome=nome;
        this.senha=senha;

        if(listaPessoas.length===0)
            this.id=1;
        else
            this.id = listaPessoas[listaPessoas.length-1].id+1;
        
    }
}


/*document.querySelector("#frmCadastro").addEventListener("submit",function(event){
    //event.preventDefault();
    CriarCadastro();
    
})*/

document.querySelector("#frmLogin").addEventListener("submit",function(event){
    event.preventDefault();
    
})

function CriarCadastro(){

    let nome = document.querySelector('#nomeCreate').value;
    let email = document.querySelector('#emailCreate').value;
    let senha = document.querySelector('#senhaCreate').value;

    const busca = listaPessoas.some(e=>e.email.includes(email));
    
    if(busca)
        alert("Esse email já está cadastrado, por favor insira outro");
    else
    {
        var pessoa = new Pessoas(nome,email,senha);
        listaPessoas.push(pessoa);
        alert("Cadastro criado com sucesso");
        Login(pessoa.email,pessoa.senha);
    }
          
}

function Logar()
{
    Login(document.querySelector('#emailCreate').value, document.querySelector('#senhaCreate').value);
}

function Login(email, senha){
   
    const busca = listaPessoas.find(e=>e.email.includes(email) && e.senha.includes(senha));

    if(busca)
    {
        localStorage.setItem('busca',JSON.stringify(busca));
        location.href = 'index.html';
    }
    else
        alert("Email ou a Senha estão errados, verifique novamente por favor");
}

