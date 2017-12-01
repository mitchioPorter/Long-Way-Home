var player1;
var bullets;
var attack;
var maxHP;

function player1Preload(game) {
    game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
}


player1Create = function(game, posX,posY){
        

    
//set attackButton
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
 //this is the stuff you would have put inside of create
        player1 = game.add.sprite(posX,posY, 'sprite');  
        player1.animations.add('right', [0, 1, 2, 3], 10, true);
        player1.animations.add('left', [4, 5, 6, 7], 10, true);
        player1.animations.add('up', [12, 13, 14, 15], 10, true);
        player1.animations.add('down', [8, 9, 10, 11], 10, true);
        game.physics.arcade.enable(player1);
        player1.body.setSize(16, 32, 16, 16);
        player1.enableBody = true;
        player1.body.bounce.set(0);
        player1.body.tilePadding.set(32);
        player1.body.collideWorldBounds = true;
        
        player1.id=1;
        player1.damage = 50;
        player1.fireRate = 500;
        player1.nextFire = 0;
        player1.maxHP = 5;
        player1.coins = 0;

    
    
    
        player1.body.stopVelocityOnCollide = true;

    
//camera stuff
        
        game.camera.follow(player1);
        game.camera.deadzone = new Phaser.Rectangle(300,200,1,1);
        //player1.stats
        player1.HP = 5;
    
    
    
//bullet stuff
    
    //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
//      bullets.createMultiple(100, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
}

//character controls

function player1Control(){
    if (cursors.up.isDown)
    {
        if (player2.body.y<game.camera.view.y+540 ){
            player1.body.velocity.y = -150;
        }
        lastPress = 'up';
        player1.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        if (player2.body.y>game.camera.view.y){
            player1.body.velocity.y = 150;
        }
        lastPress = 'down';
        player1.animations.play('down');
    }
    else if (cursors.left.isDown)
    {
        if (player2.body.x<game.camera.view.x+760){
            player1.body.velocity.x = -150;
        }
        lastPress = 'left';
        player1.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        if (player2.body.x>game.camera.view.x){
            player1.body.velocity.x = 150;
        }
        lastPress = 'right';
        player1.animations.play('right');
    }
    else {
        player1.animations.stop();
        if (lastPress == 'right'){
            player1.frame = 0;
        }
        if (lastPress == 'left'){
            player1.frame = 4;
        }
        else if (lastPress == 'up'){
            player1.frame = 12;
        }
        else if (lastPress == 'down'){
            player1.frame = 8;
        }
    }  
}




//attack function


function fire1 () {
    
    if (game.time.now > player1.nextFire)
    {
        player1.nextFire = game.time.now + player1.fireRate;
        var bullet = game.add.sprite(player1.x, player1.y, 'bullet');
        bullets.add(bullet);
        bullet.enableBody =true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.body.setSize(16, 16);
        switch(lastPress){
            case 'up':
                bullet.reset(player1.x+8, player1.y+30);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y-500, 1000, 1000);break;
            case 'down':
                bullet.reset(player1.x+40, player1.y+30);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y+500, 1000, 1000);break;
            case 'left':
                bullet.reset(player1.x+20, player1.y+44);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x-500, bullet.body.position.y, 1000, 1000);break;
            case 'right':
                bullet.reset(player1.x+22, player1.y+14);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x+ 500, bullet.body.position.y, 1000, 1000);break;
        }
    }
}

function bulletKilled (bullet, layer){
    bullet.kill();
}


function hitByGem(player, gem){
    if (game.time.now > lastAttackTime+1000){
        player.HP -=1;
        fx.play("player_hit");
        lastAttackTime = game.time.now;
        player.tint = 0xff0000;
        if(player == player1){
            lives1.getTop().destroy();
        }else{
            lives2.getTop().destroy();
        }
    }
    gem.kill();
}

function hitByCannon( cannon, player){
    if (game.time.now > lastAttackTime+1000){
        player.HP -=1;
        fx.play("player_hit");
        lastAttackTime = game.time.now;
        player.tint = 0xff0000;
        if(player == player1){
            lives1.getTop().destroy();
        }else{
            lives2.getTop().destroy();
        }
    }
    cannon.kill();
}



