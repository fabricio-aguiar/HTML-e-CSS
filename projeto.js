var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

teclas = {};

var bola = {
    x: canvas.width/2,
    y: canvas.height/2,
    raio: 15,
    cor: "white",
    speed: 2,
    dirX: -1,
    dirY: 1,
    mod: 0
}


// player 1
player1 = new Image();
player1.src = 'jogador2.png';
var player1_x = 10;
var player1_y = canvas.height / 2 - 60;
var player1_altura = 100;
var player1_largura = 100;
var player1_speed = 4;
var player1_score = 0;

// player 2
player2 = new Image();
player2.src = 'jogador1.png';
var player2_x = canvas.width - 100;
var player2_y = canvas.height / 2 - 50;
var player2_altura = 100;
var player2_largura = 100;
var player2_speed = 4;
var player2_score = 0;



document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
    console.log(teclas);
});

document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
    console.log(teclas);
});

function newgame(winner) {
    if(winner === "player 1")
        ++player1_score;
    else
        ++player2_score;

    player1_x = 10;
    player1_y = canvas.height / 2 - 60;
    player2_x = canvas.width - 100;
    player2_y = canvas.height / 2 - 50;
    bola.y = canvas.height / 2 - bola.raio;
    bola.x = canvas.width / 2 - bola.raio;
    bola.mod = 0;

}

function movimentacao(){
    //w - 87
    if(87 in teclas && player1_y > 0)
        player1_y -= player1_speed;
    //s - 83
    if(83 in teclas && player1_y + player1_altura < canvas.height)
        player1_y += player1_speed;
    if(65 in teclas && player1_x > 0)
        player1_x -= player1_speed;
    if(68 in teclas && player1_x + player1_largura < canvas.width)
        player1_x += player1_speed;
    //sobe - 38
    if(38 in teclas && player2_y > 0)
        player2_y -= player2_speed;
    //40
    if(40 in teclas && player2_y + player2_altura < canvas.height)
        player2_y += player2_speed;
    if(37 in teclas && player2_x > 0)
        player2_x -= player2_speed;
    if(39  in teclas && player2_x + player2_largura < canvas.width)
        player2_x += player2_speed;
}

function colisao() {
    //colisao lateral
    if (bola.y - bola.raio <= 0)
        bola.dirY = 1;

    if (bola.y + bola.raio >= canvas.height)
        bola.dirY = -1;

    //player esquerda
    if (bola.x - bola.raio <= player1_x + player1_largura && bola.y > player1_y && bola.y <= player1_y + player1_altura && bola.x >= player1_x) {
        bola.dirX = 1; // frente
        bola.dirY = 1;
        bola.mod += 0.05


    }

    //player direita
    if (bola.x + bola.raio >= player2_x && bola.y + bola.raio > player2_y && bola.y <= player2_y + player2_altura && bola.x <= player2_x + player2_largura) {
        bola.dirX = -1; // frente
        bola.dirY = -1;
        bola.mod += 0.05;
    }
    bola.x += (bola.speed + bola.mod) * bola.dirX;
    bola.y += (bola.speed + bola.mod) * bola.dirY;

    if (bola.x - bola.raio <= 0) {
        if (bola.y - bola.raio <= 190 || bola.y + bola.raio >= 412)
            bola.dirX = -bola.dirX;
        else {
            newgame("player 2");
        }
    } else if (bola.x + bola.raio >= canvas.width) {
        if (bola.y - bola.raio <= 190 || bola.y + bola.raio >= 412)
            bola.dirX = -bola.dirX;
        else {
            newgame("player 1");
        }
    }

}

function gameover() {
    if (player1_score === 5)
        texto()

}
function gameover1() {
    if (player2_score === 5)
        texto2()

}
function reload() {
    location.reload()
}

function texto(){
    ctx.beginPath()
    ctx.font = "30pt Comic Sans MS"
    ctx.fillStyle = "BLACK"
    ctx.fillText("JOGADOR 1 WIN", 370, 170)
    ctx.closePath()
    setTimeout(reload,2000)
}
function texto2(){
    ctx.beginPath()
    ctx.font = "30pt Comic Sans MS"
    ctx.fillStyle = "BLACK"
    ctx.fillText("JOGADOR 2 WIN", 370, 170)
    ctx.closePath()
    setTimeout(reload,2000)
}
function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player1, player1_x, player1_y, player1_largura, player1_altura)
    ctx.drawImage(player2, player2_x, player2_y, player2_largura, player2_altura)

    movimentacao();
    colisao();
    gameover();
    gameover1();


    ctx.fillStyle = bola.cor;
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.raio, 0, 2*Math.PI);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "20pt Comic Sans MS";
    ctx.fillText(player1_score, 470, 65);
    ctx.fillText("PLACAR", 470, 35);
    ctx.fillText("X", 510, 65);
    ctx.fillText(player2_score, 550, 65);
    ctx.closePath();

    requestAnimationFrame(desenhar);
}

function main(){
    desenhar();
}



