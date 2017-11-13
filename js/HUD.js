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
}