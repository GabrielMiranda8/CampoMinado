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

    if (!localStorage.validacao) {
        var validacao = 0
        localStorage.setItem('validacao', JSON.stringify(validacao));
    }
}

function Entrar (){
    if ($("#formularioDados").valid()) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));
        
        var usuario = new Object();
        usuario.login = document.getElementById("login").value;
        usuario.senha = document.getElementById("senha").value;

        var verificado = false
        var i = 0;
        for (i = 0; i < usuarios.length; i++){
            if (usuario.login == usuarios[i].login){
                if (usuario.senha == usuarios[i].senha){
                    verificado = true
                    validacao = usuarios[i].identificacao
                }
            }
        }

        if (verificado == true){
            alert("Usuário autenticado com sucesso")
            localStorage.setItem('validacao', JSON.stringify(validacao));
            window.location.href = "jogo.html";
        } else {
            alert("Login ou senha errados")
        }
    }
}