function configurarMemoriaSecundaria() {
    if (!localStorage.usuarios) {
        var usuarios = [];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    if (!localStorage.validacao) {
        var validacao = 0; // Se a chave 'validacao' não existir, define um valor padrão
        localStorage.setItem('validacao', JSON.stringify(validacao));
    }
}

let segundos = 0;
let minutos = 0;
var pontuacaoAtual = 0;

function segundo() {
    // Incrementa os segundos
    segundos++;

    if (segundos == 60) {
        // Incrementa os minutos
        minutos++;
        // Zera os segundos
        segundos = 0;
        // Escreve os minutos
        document.getElementById('minuto').innerHTML = minutos;
    }
    // Escreve os segundos
    document.getElementById('segundo').innerHTML = segundos;
}

setInterval(function () { segundo() }, 1000);

var tabuleiro = [];
var pontos = 0;

function Inicio() {
    var usuarios;
    try {
        usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) {
        console.error("Erro ao carregar usuários:", e);
        usuarios = [];
    }
    var validacao = parseInt(JSON.parse(localStorage.getItem('validacao'))) || 0;
    var posicao = 1;

    for (posicao = 1; posicao <= 81; posicao++) {
        var blocos = new Object();
        blocos.bomba = 0;
        blocos.escolhido = false;
        blocos.flag = false;

        tabuleiro[posicao] = blocos;
    }

    for (posicao = 0; posicao < 15; posicao++) {
        var min = Math.ceil(1);
        var max = Math.floor(81);

        var escolhido = Math.floor(Math.random() * 81) + 1;
        while (tabuleiro[escolhido].bomba == 1) {
            escolhido = Math.floor(Math.random() * 81) + 1;
        }

        tabuleiro[escolhido].bomba = 1;
    }

    document.querySelectorAll("#jogo button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", novoMovimento);
        item.addEventListener("contextmenu", marcarMovimento);
    });
    if (validacao < usuarios.length) {
        document.getElementById("login").value = usuarios[validacao].recorde;
    }
}

Inicio()


function OlharAoRedor(movimento) {
    var bombas = 0
    var aoRedor = [];
    var cont = 0;
    var i = 0
    if (movimento > 9) {
        // em cima
        aoRedor[cont] = movimento - 9
        cont++
    }
    if (movimento < 72) {
        // embaixo
        aoRedor[cont] = movimento + 9
        cont++
    }
    if (movimento % 9 !== 1) {
        // lado esquerdo
        aoRedor[cont] = movimento - 1
        cont++
    }

    if (movimento % 9 !== 0) {
        // lado direito
        aoRedor[cont] = movimento + 1
        cont++
    }
    if (movimento >= 9 && movimento % 9 !== 1) {
        // em cima esquerda
        aoRedor[cont] = movimento - 10
        cont++
    }
    if (movimento >= 9 && movimento % 9 !== 0) {
        // em cima direita
        aoRedor[cont] = movimento - 8
        cont++
    }
    if (movimento < 72 && movimento % 9 !== 1) {
        // embaixo esquerda
        aoRedor[cont] = movimento + 8
        cont++
    }
    if (movimento < 72 && movimento % 9 !== 0) {
        // embaixo direita
        aoRedor[cont] = movimento + 10
        cont++
    }

    for (i = 0; i < cont; i++) {
        if (tabuleiro[aoRedor[i]]?.bomba === 1) {
            bombas++;
        }
    }
    return (bombas)
}

function Explodir(movimento) {
    var aoRedor = [];
    var cont = 0;
    var i = 0
    if (movimento >= 9) {
        // em cima
        aoRedor[cont] = movimento - 9
        cont++
    }
    if (movimento < 72) {
        // embaixo
        aoRedor[cont] = movimento + 9
        cont++
    }
    if (movimento % 9 !== 1 && movimento != 1) {
        // lado esquerdo
        aoRedor[cont] = movimento - 1
        cont++
    }

    if (movimento % 9 !== 0) {
        // lado direito
        aoRedor[cont] = movimento + 1
        cont++
    }
    if (movimento >= 9 && movimento % 9 !== 1) {
        // em cima esquerda
        aoRedor[cont] = movimento - 10
        cont++
    }
    if (movimento >= 9 && movimento % 9 !== 0) {
        // em cima direita
        aoRedor[cont] = movimento - 8
        cont++
    }
    if (movimento < 72 && movimento % 9 !== 1) {
        // embaixo esquerda
        aoRedor[cont] = movimento + 8
        cont++
    }
    if (movimento < 72 && movimento % 9 !== 0) {
        // embaixo direita
        aoRedor[cont] = movimento + 10
        cont++
    }

    for (i = 1; i < cont; i++) {
        if (tabuleiro[aoRedor[i]].bomba == 0) {
            var bombas = OlharAoRedor(aoRedor[i])
            if (bombas == 0) {
                var btn = document.querySelectorAll("#jogo button")[aoRedor[i] - 1];
                btn.style.backgroundColor = "#00f77d";
                tabuleiro[aoRedor[i]].escolhido = true
            } else {
                var btn = document.querySelectorAll("#jogo button")[aoRedor[i] - 1];
                btn.style.backgroundColor = "#00f77d";
                btn.innerHTML = bombas;
                tabuleiro[aoRedor[i]].escolhido = true
            }
        }
    }
}

function novoMovimento(e) {
    var movimento = parseInt(e.target.getAttribute("data-i"));
    tabuleiro[movimento].escolhido = true
    if (tabuleiro[movimento].bomba == 1) {
        alert("BOOOOOOOOM!!!!!")
        MostrarMapa()
    } else {
        //escrever quantas bombas tem ao redor
        e.target.style.backgroundColor = "#00f77d";
        var bombas = OlharAoRedor(movimento)
        if (bombas > 0) {
            e.target.innerHTML = bombas;
        }
        Explodir(movimento)
    }
    Pontuacao()
    e.target.removeEventListener("click", novoMovimento);
}


function marcarMovimento(e) {
    var help = 0
    var flags = 0
    for (let i = 1; i <= 81; i++) {
        if (tabuleiro[i].flag == true) {
            flags++
        }
        if (flags > 15) {

        }
    }
    if (flags <= 15) {
        help = 1
        var usuarios;
        try {
            usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        } catch (e) {
            console.error("Erro ao carregar usuários:", e);
            usuarios = [];
        }
        var validacao = JSON.parse(localStorage.getItem('validacao')) || 0;
        e.target.style.backgroundColor = "#fc8601";
        var movimento = parseInt(e.target.getAttribute("data-i"));

        if (tabuleiro[movimento].flag == true) {
            tabuleiro[movimento].flag = false
            var btn = document.querySelectorAll("#jogo button")[movimento - 1];
            btn.style.backgroundColor = "greenyellow";
            flags--

        } else {
            tabuleiro[movimento].flag = true
        }

        for (let i = 1; i <= 81; i++) {
            if (tabuleiro[i].flag == true) {
                flags++
            }
            if (flags > 15) {

            }
        }

    }
    var movimento = parseInt(e.target.getAttribute("data-i"));
    if (tabuleiro[movimento].flag == true && help == 0) {
        tabuleiro[movimento].flag = false
        var btn = document.querySelectorAll("#jogo button")[movimento - 1];
        btn.style.backgroundColor = "greenyellow";
        flags--
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    Pontuacao()
}

function Pontuacao() {
    var usuarios;
    try {
        usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    } catch (e) {
        console.error("Erro ao carregar usuários:", e);
        usuarios = [];
    }
    var validacao = parseInt(JSON.parse(localStorage.getItem('validacao'))) || 0;
    var pontos = 0
    for (let i = 1; i <= 81; i++) {
        if (tabuleiro[i].escolhido && tabuleiro[i].bomba == 0) {
            pontos++
        }
        if (pontos == 66) {
            alert("Venceu!!!")
            MostrarMapa()
            var pontuacaoAtual = minutos * 60 + segundos
            if (validacao < usuarios.length) {
                if (pontuacaoAtual < usuarios[validacao].recorde) {
                    usuarios[validacao].recorde = pontuacaoAtual
                    document.getElementById("login").value = usuarios[validacao].recorde;
                }
            }
        }
    }
}

function MostrarMapa() {
    var i = 0
    for (i = 1; i <= 81; i++) {
        if (tabuleiro[i].bomba == 1) {
            if (i > 1) {
                var btn = document.querySelectorAll("#jogo button")[i - 1];
                btn.style.backgroundColor = "red";
                btn.removeEventListener("click", novoMovimento)
                btn.removeEventListener("contextmenu", marcarMovimento)

            } else {
                var btn = document.querySelectorAll("#jogo button")[i - 1];
                btn.style.backgroundColor = "red";
                btn.removeEventListener("click", novoMovimento)
                btn.removeEventListener("contextmenu", marcarMovimento)
            }
        }
        if (i > 1) {
            var btn = document.querySelectorAll("#jogo button")[i - 1];
            btn.removeEventListener("click", novoMovimento)
            btn.removeEventListener("contextmenu", marcarMovimento)

        } else {
            var btn = document.querySelectorAll("#jogo button")[i];
            btn.removeEventListener("click", novoMovimento)
            btn.removeEventListener("contextmenu", marcarMovimento)

        }
    }
}