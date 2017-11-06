function enemiesCreate(){
    enemies = game.add.group();
    enemies.enableBody = true;
    enemyNum = 2;
    
    enemies.forEachAlive(function(enemy){
            enemies.forEachAlive(function(enemy1){
                if (enemy.i != enemy1.i){
                    game.physics.arcade.collide(enemy, enemy1);
                }
            });
        });
    
    
        //Enemy handler
       
}

//this is player 1 attacks enemy

function hitEnemy(enemy, bullet){
    dagger.kill();
    enemy.HP = enemy.HP-(1*player1.damage);
    
    if (enemy.HP<=0){
        enemy.kill();
        enemyNum=enemyNum-1;
    }
    //enemy.reset(enemy.body.position.x+20,enemy.body.position.y);
}

function hitEnemy(enemy, dagger){
    dagger.kill();
    enemy.HP = enemy.HP-(1*player2.damage);
   
    if (enemy.HP<=0){
        enemy.kill();
        enemyNum=enemyNum-1;
    }
    //enemy.reset(enemy.body.position.x+20,enemy.body.position.y);
}


function enemyUpdate(){
        
     enemies.forEachAlive(function(enemy){
         var temp  =  game.rnd.integerInRange(0, 200);
         var playerName;
         if(temp <=100){
             playerName = player1;
         }else{
             playerName = player2;
         }
            if (enemy.visible && enemy.inCamera) {
                if (game.physics.arcade.distanceBetween(playerName, enemy) > 30){
                    game.physics.arcade.moveToObject(enemy, playerName, 100);
                    if(enemy.body.velocity.x >0){
                        enemy.animations.play('right');
                    }
                    else {
                        enemy.animations.play('left');
                    }
                }
                else {
                    enemy.body.velocity.x = 0;
                    enemy.body.velocity.y = 0;
                }
            }
            
            game.physics.arcade.collide(enemy, layer);
            game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this); game.physics.arcade.overlap(enemy, daggers, hitEnemy, null, this);
        });
    
    
    
    
}


function createSlime (posX, posY, id){
    var enemy = game.add.sprite(posX, posY, 'slime');
    enemies.add(enemy);
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0,1,2,3], 10, true);
    enemy.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(enemy);
    enemy.body.bounce.set(0.6);
    enemy.body.tilePadding.set(40);
    enemy.HP = 100;
    enemy.i = id;
}


function gemBossUpdater (){
    //Boss handler
        if(boss != undefined){
        if (boss.visible && boss.inCamera){
            fireGem ();
        }
        boss.body.velocity.x = 0;
        game.physics.arcade.overlap(player, tinyGems, hitByGem, null, this);
        game.physics.arcade.overlap(player2, tinyGems, hitByGem, null, this);
        tinyGems.forEachAlive(function(gem){
            if (gem.visible && gem.inCamera){
                game.physics.arcade.overlap(gem, layer, gemKilled, null, this);
            }
        });
            
            
        
        }
    
}


function createGemBoss(game,x,y){
    //Create a boss
        boss = game.add.sprite(380, 360, 'boss');
        enemies.add(boss);
        boss.enableBody = true;
        boss.body.collideWorldBounds = true;
        boss.animations.add('left', [0,1], 10, true);
        boss.animations.add('left', [0,1], 10, true);
        game.physics.enable(boss);
        boss.body.bounce.set(0.6);
        boss.body.tilePadding.set(32);
        boss.HP = 300;
    
    
        var lastGemTime = 0;
        var tinyGems;
        var boss;
 
}


function fireGem (){
    if (game.time.now > lastGemTime + 1000){
        var gem = tinyGems.getFirstExists(false);
        gem.enableBody =true;
        gem.physicsBodyType = Phaser.Physics.ARCADE;
        //left
        if (boss.body.velocity.x < 0){
            gem.reset(boss.x, boss.y+55);
            gem.rotation = game.physics.arcade.moveToXY(gem, gem.body.position.x-500, gem.body.position.y, 1000, 5000);
        }
        //right
        else if (boss.body.velocity.x >= 0){
            gem.reset(boss.x, boss.y+55);
            gem.rotation = game.physics.arcade.moveToXY(gem, gem.body.position.x+500, gem.body.position.y, 1000, 5000);
        }
        lastGemTime = game.time.now;
    }
}


function gemKilled (bullet, layer){
    bullet.kill();
}
