let jogoAtivo = true;
let jogador = "X";
let computador = "O";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let vitoria = document.querySelector('.msg_vencedor');

const vit_msg = () => 'Você Ganhou!';
const per_msg = () => 'Você Perdeu!';
const emp_msg = () => 'Empate!';

const condicao_ganhar = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function blocoJogador(blocoClicado, blocoIndex) {
    
    tabuleiro[blocoIndex] = jogador;
    blocoClicado.innerHTML = jogador;
    console.log(tabuleiro);
}

function blocoComputador(){
    let blocoEscolhido = Math.floor(Math.random() * 9)
    let blocoClicado = document.querySelectorAll('.bloco')
    console.log(blocoEscolhido);

    if (validacaoVitoria(vitoria)){
        return;
    }

    if (tabuleiro[blocoEscolhido] !==  ''){
        while (tabuleiro[blocoEscolhido] == 'X' || tabuleiro[blocoEscolhido] == 'O'){
            blocoEscolhido = Math.floor(Math.random() * 9)
        };
    }


    tabuleiro[blocoEscolhido] = "O";
    blocoClicado[blocoEscolhido].innerHTML = "O";
    console.log(tabuleiro);
    }


function validacaoVitoria(vitoria){
    let ganhador = false;
    let jogador;
    for (let i = 0; i <= 7; i++){
        const condicao = condicao_ganhar[i];
        let a = tabuleiro[condicao[0]];
        let b = tabuleiro[condicao[1]];
        let c = tabuleiro[condicao[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c){
            ganhador = true;
            jogador = a;
            break;
        }
    }

    if (ganhador & jogador == "X") {
        vitoria.innerHTML = vit_msg();
        jogoAtivo = false;
        return true;
    }
    if (ganhador & jogador == "O") {
        vitoria.innerHTML = per_msg();
        jogoAtivo = false;
        return true;
    }

    let empate = !tabuleiro.includes("");
    if (empate) {
        vitoria.innerHTML = emp_msg();
        return true;
    }
}

function blocoEscolhido(eventoBloco){
    const blocoClicado = eventoBloco.target;
    const blocoIndex = parseInt(blocoClicado.getAttribute('data-cell-index'));
    const vitoria = document.querySelector('.msg_vencedor');
    
    if (validacaoVitoria(vitoria)) {
        return;
    }

    if (tabuleiro[blocoIndex] !== ''){
        alert('Bloco já selecionado')
    } 
    
    if (tabuleiro[blocoIndex] == ''){
        blocoJogador(blocoClicado, blocoIndex)
        blocoComputador();
        validacaoVitoria(vitoria);
    }
    
}

function reiniciarJogo() {
    jogoAtivo = true;
    jogador = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    vitoria.innerHTML = "";
    document.querySelectorAll('.bloco').forEach(bloco => bloco.innerHTML = "");
}


document.querySelectorAll('.bloco').forEach(bloco => bloco.addEventListener('click', blocoEscolhido));
document.querySelector('.reiniciar').addEventListener('click', reiniciarJogo);

console.log("test");