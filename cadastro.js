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
        usuario.recorde = 1000000000000000000000000000;

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