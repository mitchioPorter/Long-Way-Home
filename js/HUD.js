//function hud(){
//        HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player1.HP, { fontSize: '32px', fill: '#fff' } );
//        HPText.fixedToCamera = true;
//        
//        hintText = game.add.text(300, game.camera.y,'Please find the key', { fontSize: '32px', fill: '#fff' });
//        hintText.fixedToCamera = true; 
//}

function hud(){
    HPText1 = game.add.text(game.camera.x, game.camera.y, 'Player 1: ', { fontSize: '32px', fill: '#fff' } );
    HPText1.fixedToCamera = true;
    HPText2 = game.add.text(game.camera.x + 400, game.camera.y, 'Player 2: ', { fontSize: '32px', fill: '#fff' } );
    HPText2.fixedToCamera = true;
        
    hintText = game.add.text(300, game.camera.y + 560,'Please find the key', { fontSize: '32px', fill: '#fff' });
    hintText.fixedToCamera = true; 
    
    lives1 = game.add.group();
    lives1.fixedToCamera = true;
    for(i = 0; i < player1.HP; i++) {
        lives1.create(game.camera.x + (135+30*i), game.camera.y + 15, 'heart').anchor.set(0.5);
    }
    lives2 = game.add.group();
    lives2.fixedToCamera = true;
    for(i = 0; i < player2.HP; i++) {
        lives2.create(game.camera.x + (535+30*i), game.camera.y + 15, 'heart').anchor.set(0.5);
    }
    
    coin1 = game.add.group();
    coin1.create(game.camera.x + 20, game.camera.y + 55, 'coin').anchor.set(0.5);
    coin1.fixedToCamera = true;
    coin1X = game.add.text(game.camera.x + 45, game.camera.y + 40, 'x ' + player1.coins, { fontSize: '32px', fill: '#fff' } );
    coin1X.fixedToCamera = true;
    
    coin2 = game.add.group();
    coin2.create(game.camera.x + 420, game.camera.y + 55, 'coin').anchor.set(0.5);
    coin2.fixedToCamera = true;
    coin2X = game.add.text(game.camera.x + 445, game.camera.y + 40, 'x ' + player2.coins, { fontSize: '32px', fill: '#fff' } );
    coin2X.fixedToCamera = true;
}

function addLife(player){
    if(player == player1){
    lives1.create((lives1.getTop().x+30), lives1.getTop().y, 'heart').anchor.set(0.5);
    }
    else{
    lives2.create((lives2.getTop().x+30), lives2.getTop().y, 'heart').anchor.set(0.5);
    }
    
}

function addCoin1(){
    player1.coins += 1;
        coin1X.text =  "x " + player1.coins;

}

function addCoin2(){

    player2.coins += 1;
            coin2X.text = "x " + player2.coins;

}