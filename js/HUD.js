function hud(){
        HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player1.HP, { fontSize: '32px', fill: '#fff' } );
        HPText.fixedToCamera = true;
        
        hintText = game.add.text(300, game.camera.y,'Please find the key', { fontSize: '32px', fill: '#fff' });
        hintText.fixedToCamera = true;
    
}


function updateHP (text, HP){
    text = 'HP: ' + HP;
}

function HUDUpdate(){
     //updating HP of the player
        HPText.text = 'HP1: ' + player1.HP+'\nHP2: '+player2.HP ;
}