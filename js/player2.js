        var dagger;
        var timer;
        var daggers;

        player2Create = function(game, x,y){
         //Access the keyboard input
        
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
            
            
        //setup the player2
        player2 = game.add.sprite(x, y, 'player2');
        game.physics.arcade.enable(player2);
        player2.body.setSize(16, 32, 16, 16);
        player2.enableBody = true;
        player2.body.bounce.set(0);
        player2.body.tilePadding.set(32);
        player2.body.collideWorldBounds = true;
        player2.animations.add('up', [0, 1, 2, 3], 10, true);
        player2.animations.add('down', [4, 5, 6, 7], 10, true);
        player2.animations.add('left', [12, 13, 14, 15], 10, true);
        player2.animations.add('right', [8, 9, 10, 11], 10, true);
        player2.id = 2;
        player2.damage =50;
        player2.fireRate = 300;
        player2.nextFire = 0;
        player2.body.stopVelocityOnCollide = true;
        
        //player stats
        player2.HP = 2;
        attack2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
         
            
            
            //daggers stuff
            
            
    //bullet stuff
    
    //  Our daggers group
        daggers = game.add.group();
        daggers.enableBody = true;
        daggers.physicsBodyType = Phaser.Physics.ARCADE;
//        daggers.createMultiple(100, 'dagger', 0, false);
        daggers.setAll('anchor.x', 0.5);
        daggers.setAll('anchor.y', 0.5);
        daggers.setAll('outOfBoundsKill', true);
        daggers.setAll('checkWorldBounds', true);
        }
        
        
    function fire2 () {
    if (game.time.now > player2.nextFire)
    {   
        
        player2.nextFire = game.time.now + player2.fireRate;
        var dagger = game.add.sprite(player2.x, player2.y, 'dagger');
        daggers.add(dagger);
        dagger.enableBody =true;
        dagger.physicsBodyType = Phaser.Physics.ARCADE;
        dagger.body.setSize(16, 16);
        switch(lastPress2){
            case 'up':
                dagger.reset(player2.x+8, player2.y+30);
                dagger.rotation = game.physics.arcade.moveToXY(dagger, dagger.body.position.x, dagger.body.position.y-500, 1000, 1000);break;
            case 'down':
                dagger.reset(player2.x+40, player2.y+30);
                dagger.rotation = game.physics.arcade.moveToXY(dagger, dagger.body.position.x, dagger.body.position.y+500, 1000, 1000);break;
            case 'left':
                dagger.reset(player2.x+20, player2.y+44);
                dagger.rotation = game.physics.arcade.moveToXY(dagger, dagger.body.position.x-500, dagger.body.position.y, 1000, 1000);break;
            case 'right':
                dagger.reset(player2.x+22, player2.y+12);
                dagger.rotation = game.physics.arcade.moveToXY(dagger, dagger.body.position.x+ 500, dagger.body.position.y, 1000, 1000);break;
        }
        
    }
        
}
        

function daggerKilled (dagger, layer){
    dagger.kill();
}
        
    function playerControl2(){
    if (w.isDown)
    {
        if (player2.body.y>game.camera.view.y){
            player2.body.velocity.y = -150;
        }
        lastPress2 = 'up';
        player2.animations.play('up');
    }
    else if (s.isDown)
    {
        if (player2.body.y<game.camera.view.y+560){
            player2.body.velocity.y = 150;
        }
        lastPress2 = 'down';
        player2.animations.play('down');
    }
    else if (a.isDown)
    {
        if (player2.body.x>game.camera.view.x){
            player2.body.velocity.x = -150;
        }
        lastPress2 = 'left';
        player2.animations.play('left');
    }
    else if (d.isDown)
    {
        if (player2.body.x<game.camera.view.x+760){
            player2.body.velocity.x = 150;
        }
        lastPress2 = 'right';
        player2.animations.play('right');
    }
    else {
        player2.animations.stop();            
        if (lastPress2 == 'left'){
            player2.frame = 13;
        }
        else if (lastPress2 == 'up'){
            player2.frame = 0;
        }
        else if (lastPress2 == 'down'){
            player2.frame = 4;
        }
        else {
            player2.frame = 8;
        }
    }
}

function hitByGem(player2, gem){
    player2.HP -=1;
    fx.play("player_hit");
    gem.kill();
}

