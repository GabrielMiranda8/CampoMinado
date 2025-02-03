$("#formularioDados").validate(
    {
        rules: {
            login: {
                required: true
            },
            senha: {
                required: true
            }
        },
        messages: {
            login: {
                required: "Campo obrigatório",
            },
            senha: {
                required: "Campo obrigatório",
            }
        }
    }
);

function configurarMemoriaSecundaria() {
    if (!localStorage.usuarios) {
        var usuarios = [];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

function excluirDados() {
    localStorage.removeItem('usuarios')
}

function Cadastrar (){
    if ($("#formularioDados").valid()) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));
        
        var usuario = new Object();
        usuario.login = document.getElementById("login").value;
        usuario.senha = document.getElementById("senha").value;
        usuario.jogadas = [];
        usuario.recorde = 0;

        var repete = false
        var i = 0;
        for (i = 0; i < usuarios.length; i++){
            if (usuario.login == usuarios[i].login){
                repete = true
            }
        }

        if (repete == false){
            var posicao = usuarios.length
            usuario.identificacao  = posicao

            usuarios[posicao] = usuario
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            alert("Usuário cadastrado com sucesso")
            window.location.href = "index.html";
        } else {
            alert("Login já utilizado")
        }
    
    }
}

function imprimirTabela(){
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var validacao = JSON.parse(localStorage.getItem('validacao'));

    var tabelaDados = document.getElementById("tabelaDados");
    var numeroLinha = 0
    for (let i = 0; i < usuarios.length; i++){
        numeroLinha++
        var linha = tabelaDados.insertRow(numeroLinha);

        var coluna0 = linha.insertCell(0);
        var coluna1 = linha.insertCell(1);

        coluna0.innerText = usuarios[i].login;
        coluna1.innerText = usuarios[i].recorde;
    }
}