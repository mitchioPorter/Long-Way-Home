var lose;
function playerAttacked(player, enemy) {
    
    if (game.time.now > lastAttackTime+1000) {
        fx.play("player_hit");
        player.HP -= 1;
        lastAttackTime = game.time.now;
        player.tint = 0xff0000;
        if(player == player1){
            lives1.getTop().destroy();
        }else{
            lives2.getTop().destroy();
        }
        
        if (enemy.body.position.x > player.body.position.x && enemy.body.position.x < player.body.position.x+60){
            enemy.body.position.x += 30;
        }else if (enemy.body.position.x < player.body.position.x && enemy.body.position.x > player.body.position.x-60){
            enemy.body.position.x -= 30;
        }
        if (enemy.body.position.y > player.body.position.y && enemy.body.position.y < player.body.position.y+60 ){
            enemy.body.y.position += 30;
        }else if (enemy.body.position.y < player.body.position.y && enemy.body.position.y > player.body.position.y-60){
            enemy.body.position.y -=  30;
        }
    }
}


function playerKilled(player){
    player.kill();
    enemies.forEachAlive(function(enemy){
        enemy.kill();
    });
    if (state == 1){boulder1.kill();boulder2.kill();boulder3.kill();boulder4.kill();boulder5.kill();}
    

    endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Lose!', { fontSize: '32px', fill: '#fff' });
    lose = game.add.sprite(game.camera.x,game.camera.y,'lose');
    var retry = game.add.button(game.camera.x+600,game.camera.y+10, 'retry', reloadState, this, 0, 0, 0);
       

}

function playerUpdate(){
    
   
    
 //this fixes the camera not stopping when character2 might go off sccreen
    if(player2.body.position.x < game.camera.x - game.camera.width){
        player2.body.position.x = game.camera.x - game.camera.width;
       
        
    }
    
     else if(player2.body.position.x > game.camera.x + game.camera.width ){
         player2.body.position.x = game.camera.x + game.camera.width;
        
    }
    
    if(player2.body.position.y < game.camera.y - game.camera.height){
        player2.body.position.y = game.camera.y - game.camera.height;
        
        
    }
    
     else if(player2.body.position.y > game.camera.y + game.camera.height){
         player2.body.position.y = game.camera.y + game.camera.heighdt;
    }

    
    
    //plate interactes with door
    
    
    //this resets the tint after a time
    
    if (game.time.now > lastAttackTime+1000) {
        player1.tint = 0xFFFFFF;
        player2.tint = 0xFFFFFF;
    }
    
    
    
            
        //Escape from attack for 3 seconds after being attacked once
//        if (game.time.now > lastAttackTime + 3000){
//            game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
//        }
    
        if (!hasKey) {
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

        //Player controler
        player1Control();
        playerControl2();
        
        //Attack
        if (attack.isDown && player1.visible)
        {
            fire1();
        }
        
        if (attack2.isDown && player2.visible)
        {
            fire2();
        }
    
    if (player1.HP <= 0 || player2.HP <=0){
            playerKilled(player1);
            player2.kill();        
        }
    
        //Player attacked
        game.physics.arcade.overlap(player1, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player1, ghostEnemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, ghostEnemies, playerAttacked, null, this);
        
    
        game.physics.arcade.overlap(player1, potions, pickupHealth1, null, this);
        game.physics.arcade.overlap(player2, potions, pickupHealth2, null, this);
        game.physics.arcade.overlap(player1, coins, pickupCoin1, null, this);
        game.physics.arcade.overlap(player2, coins, pickupCoin2, null, this);
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
        game.physics.arcade.collide(boulder1, layer);
        game.physics.arcade.collide(boulder2, layer);
        game.physics.arcade.collide(boulder3, layer);
        game.physics.arcade.collide(boulder4, layer);
        game.physics.arcade.collide(boulder5, layer);
        game.physics.arcade.collide(boulder6, layer);
        game.physics.arcade.collide(boulder7, layer);
        game.physics.arcade.collide(boulder8, layer);
   
    
        if(game.time.now > lastAttackTime+1000){
            var hitplayer11 = game.physics.arcade.overlap(player1, boulders);
            var hitplayer12 = game.physics.arcade.overlap(player2, boulders);
        }
        
    
    
        if (hitplayer11){
            if(game.time.now > lastAttackTime+1000){
                fx.play("player_hit");
                player1.HP -= 1;
                lives1.getTop().destroy();
                lastAttackTime = game.time.now;
                player1.tint = 0xff00ff;
            }
        }
        if (hitplayer12){
            if(game.time.now > lastAttackTime+1000){
                fx.play("player_hit");
                player2.HP -= 1;
                lives2.getTop().destroy();
                lastAttackTime = game.time.now;
                player2.tint = 0xff00ff;
            }
        }
        
    
        //Update hintText
        if (hasKey){
            hintText.text = 'Please open the door';
        }
    
    //manage collide for gates
        if(plateActive == false){
        game.physics.arcade.collide(player1, gates);
        game.physics.arcade.collide(player2, gates);
        
    }
    


//this manages the bullets
//Bullet handler
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera && !state4){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        });
        daggers.forEachAlive(function(dagger){
            if (dagger.visible && dagger.inCamera && !state4){
                game.physics.arcade.overlap(dagger, layer, daggerKilled, null, this);
            }
        });
}



//game over stuff


function reloadState(){
    if(state == 1){
        music.stop();
        game.state.start('state1');
    }else if(state == 2){
        music.stop();
        game.state.start('state2');
    }else if(state == 3){
        music.stop();
        game.state.start('state3');
    }else if(state == 4){
        music.stop();
        game.state.start('state4');
    }

}

