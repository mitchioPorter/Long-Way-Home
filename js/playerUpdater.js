function playerAttacked(player, enemy){
    enemy.kill();
    fx.play("player_hit");
    player1.HP -= 1;
    lastAttackTime = game.time.now;
}

function playerKilled(player){
    player.kill();
    enemies.forEachAlive(function(enemy){
        enemy.kill();
    });
    boulder.kill();
    endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Lose!', { fontSize: '32px', fill: '#fff' });
}

function playerUpdate(){
    
            
        //Escape from attack for 3 seconds after being attacked once
//        if (game.time.now > lastAttackTime + 3000){
//            game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
//        }
    
        if (!hasKey){
            game.physics.arcade.collide(player1, door);
            game.physics.arcade.collide(player2, door);
        }
        
        game.physics.arcade.collide(player1, layer);
        game.physics.arcade.collide(player2, layer);
        game.physics.arcade.collide(player1, player2);

        //  Un-comment these to gain full control over the sprite
        player1.body.velocity.x = 0;
        player1.body.velocity.y = 0;
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;        

        //Player control
        player1Control();
        playerControl2();
        
        //Attack
        if (attack.isDown && player1.visible)
        {
//          fire(player);
            fire1();
        }
        
        if (attack2.isDown && player2.visible)
        {
//          fire(player2);
            fire2();
        }
    
    if (player1.HP <= 0 || player2.HP <=0){
            playerKilled(player1);
            player2.kill();        
        }
    
        //Player attacked
        game.physics.arcade.overlap(player1, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, enemies, playerAttacked, null, this);
    
    
     game.physics.arcade.overlap(player1, health_potion, pickupHealth, null, this);
        game.physics.arcade.overlap(player2, health_potion, pickupHealth, null, this);
        game.physics.arcade.overlap(player1, key, pickupKey,null, this);
        game.physics.arcade.overlap(player2, key, pickupKey,null, this);
        game.physics.arcade.overlap(player1, door, openDoor,
            // ignore if there is no key or the player is on air
            function (player, door) {
                return hasKey;
            }, this);
        game.physics.arcade.overlap(player2, door, openDoor,
            // ignore if there is no key or the player is on air
            function (player, door) {
                return hasKey;
            }, this);
        
    
    
        
        //boulder handler
        game.physics.arcade.collide(boulder, layer);
        var hitplayer = game.physics.arcade.collide(player1, boulder);
        var hitplayer2 = game.physics.arcade.collide(player2, boulder);
        
    
    
        if (hitplayer){
            player1.HP-=1;
            fx.play("player_hit");
        }
        if (hitplayer2){
            player2.HP-=1;
            fx.play("player_hit");
        }
        
    
        //Update hintText
        if (hasKey){
            hintText.text = 'Please open the door';
        }
    


//this manages the bullets
//Bullet handler
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        });
        daggers.forEachAlive(function(dagger){
            if (dagger.visible && dagger.inCamera){
                game.physics.arcade.overlap(dagger, layer, daggerKilled, null, this);
            }
        });
}


