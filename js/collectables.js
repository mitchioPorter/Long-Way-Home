//potion stuff

function potion(game,x,y){
    
        potions = game.add.group();
        health_potion = game.add.sprite(x,y,'potion');
        potions.add(health_potion)
        health_potion.anchor.setTo(0.5, 1);
        game.physics.enable(health_potion);
        health_potion.body.allowGravity = false;
    
}

function pickupHealth(player1, health_potion){
    health_potion.kill();
    player1.HP += 1;
}

function pickupHealth(player2, health_potion){
    health_potion.kill();
    player2.HP += 1;
}

//key stuff
function key(game,x,y){
    //keys
        keys = game.add.group();
        //key = game.add.sprite(1160, 1180, 'key');
        key = game.add.sprite(x,y, 'key');
        keys.add(key);
        key.anchor.setTo(0.5, 1);
        game.physics.enable(key);
        key.body.allowGravity = false;
    
}


function pickupKey(player, key){
    key.kill();
    hasKey = true;
}