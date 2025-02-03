function configurarMemoriaSecundaria() {
    if (!localStorage.usuarios) {
        var usuarios = [];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    if (!localStorage.validacao) {
        var validacao = 0
        localStorage.setItem('validacao', JSON.stringify(validacao));
    }

    var validacao = JSON.parse(localStorage.getItem('validacao'));
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    document.getElementById("login").value = usuarios[validacao].login;
}

function imprimirTabela(){
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var validacao = JSON.parse(localStorage.getItem('validacao'));

    var tabelaDados = document.getElementById("tabelaDados");
    var numeroLinha = 0
    for (let i = 0; i < (usuarios[validacao].jogadas).length; i++){
        numeroLinha++
        var linha = tabelaDados.insertRow(numeroLinha);

        var coluna0 = linha.insertCell(0);
        var coluna1 = linha.insertCell(1);
        var coluna2 = linha.insertCell(2);

        coluna0.innerText = usuarios[validacao].login;
        coluna1.innerText = i +1;
        coluna2.innerText = usuarios[validacao].jogadas[i]
    }
}