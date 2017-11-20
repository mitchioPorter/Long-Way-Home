//potion stuff

function createPotion(game,x,y){
    
    health_potion = game.add.sprite(x,y,'potion');
    potions.add(health_potion)
    health_potion.anchor.setTo(0.5, 1);
    game.physics.enable(health_potion);
    game.physics.enable(health_potion);
        health_potion.body.allowGravity = false;
        health_potion.body.immovable = true;
        health_potion.body.moves = false;  
}

function createCoin(game,x,y){
    coin = game.add.sprite(x,y,'coin');
    coins.add(coin)
    coin.anchor.setTo(0.5, 1);
    game.physics.enable(coin);
    game.physics.enable(coin);
    coin.body.allowGravity = false;
    coin.body.immovable = true;
    coin.body.moves = false; 
}

function pickupHealth1(player, health_potion){
    if(player1.HP < player1.maxHP){
    health_potion.kill();
    player1.HP += 1;
    addLife(player1);
    }
}

function pickupHealth2(player, health_potion){
    if(player2.HP < player2.maxHP){
    health_potion.kill();
    player2.HP += 1;
     addLife(player2);
     }
    
}

function pickupCoin1(player, coin){
    coin.kill();
    addCoin1();
}

function pickupCoin2(player, coin){
    coin.kill();
    addCoin2();
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