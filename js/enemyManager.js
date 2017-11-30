var lastAttackTime_enemy;
var healthbar;

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
    ghostEnemies = game.add.group();
    ghostEnemies.enableBody = true;
}

//this is player 1 attacks enemy

function hitEnemy1(enemy, bullet){
    bullet.kill();
    enemy.HP = enemy.HP-(1*player1.damage);
    lastAttackTime_enemy = game.time.now;
    enemy.tint =  0xff0000;
    enemy.target = player1;
    if (enemy.HP<=0){
        createCoin(game,enemy.position.x,enemy.position.y);
        enemy.kill();
        enemyNum=enemyNum-1;
    }
    
    //enemy.reset(enemy.body.position.x+20,enemy.body.position.y);
}

function hitEnemy2(enemy, dagger){
    dagger.kill();
    enemy.HP = enemy.HP-(1*player2.damage);
    lastAttackTime_enemy = game.time.now;
    enemy.tint =  0xff0000;
    enemy.target = player2;
    if (enemy.HP<=0){
        createCoin(game,enemy.position.x,enemy.position.y);
        enemy.kill();
        enemyNum=enemyNum-1;
    }
    //enemy.reset(enemy.body.position.x+20,enemy.body.position.y);
}


function enemyUpdate(){
        
     enemies.forEachAlive(function(enemy){
         
         
            if (enemy.visible && enemy.inCamera) {
                if (game.physics.arcade.distanceBetween(enemy.target, enemy) > 30){
                    game.physics.arcade.moveToObject(enemy, enemy.target, 100);
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
            game.physics.arcade.overlap(enemy, bullets, hitEnemy1, null, this); game.physics.arcade.overlap(enemy, daggers, hitEnemy2, null, this);
         
             if (game.time.now > lastAttackTime_enemy+100) {
                enemy.tint = 0xFFFFFF;
            }
        });
        
    ghostEnemies.forEachAlive(function(enemy){
         
         
            if (enemy.visible && enemy.inCamera) {
                if(Math.abs(enemy.body.position.x - enemy.targetX )> 30 ||Math.abs(enemy.body.position.y - enemy.targetY) > 30){
                    game.physics.arcade.moveToXY(enemy, enemy.targetX, enemy.targetY,100);
                   }
                if(enemy.nextMoveSwitch < game.time.now){
                enemy.nextMoveSwitch = game.time.now + game.rnd.integerInRange(1000,4000);
                enemy.targetX = enemy.body.position.x + game.rnd.integerInRange(-300,300);
                enemy.targetY = enemy.body.position.y + game.rnd.integerInRange(-200,200);
                }
                
                        enemy.animations.play('left');
                    
                }
                
            
            
            //game.physics.arcade.collide(enemy, layer);
            game.physics.arcade.overlap(enemy, bullets, hitEnemy1, null, this); game.physics.arcade.overlap(enemy, daggers, hitEnemy2, null, this);
         
             if (game.time.now > lastAttackTime_enemy+100) {
                enemy.tint = 0xFFFFFF;
                }
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
   
   
    var playerName;
         if(game.rnd.integerInRange(1, 100) <=50){
             playerName = player1;
         }else{
             playerName = player2;
         }
     enemy.target = playerName;
    
    enemy.i = id;
}

function createGhost (posX, posY, id){
    var enemy = game.add.sprite(posX, posY, 'ghosty');
    ghostEnemies.add(enemy);
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0,1,2,3], 10, true);
    enemy.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(enemy);
    enemy.body.bounce.set(0.6);
    enemy.body.tilePadding.set(40);
    enemy.HP = 100;
    enemy.nextMoveSwitch = game.time.now + game.rnd.integerInRange(1000,4000);
    enemy.targetX = enemy.body.position.x + game.rnd.integerInRange(-300,300);
    enemy.targetY = enemy.body.position.y + game.rnd.integerInRange(-200,200);
   
    var playerName;
         if(game.rnd.integerInRange(1, 100) <=50){
             playerName = player1;
         }else{
             playerName = player2;
         }
     enemy.target = playerName;
    
    enemy.i = id;
}


function gemBossUpdater (){
    //Boss handler
        if(boss != undefined){
        if (boss.visible && boss.inCamera){
            fireGem ();
        }
        boss.body.velocity.x = 0;
        game.physics.arcade.overlap(player1, tinyGems, hitByGem, null, this);
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
        boss.animations.add('left', [0,1,2], 10, true);
        //boss.animations.add('left', [0,1], 10, true);
        game.physics.enable(boss);
        boss.body.bounce.set(0.6);
        boss.body.tilePadding.set(32);
        boss.HP = 300;
    
    
    
        var temp  =  game.rnd.integerInRange(0, 200);
        var playerName;
         if(temp <=100){
             playerName = player1;
         }else{
             playerName = player2;
         }
        boss.target = playerName;
    
        tinyGems = game.add.group();
        tinyGems.enableBody = true;
        tinyGems.physicsBodyType = Phaser.Physics.ARCADE;
        tinyGems.createMultiple(30, 'tinyGem', 0, false);
        tinyGems.setAll('anchor.x', 0.5);
        tinyGems.setAll('anchor.y', 0.5);
        tinyGems.setAll('outOfBoundsKill', true);
        tinyGems.setAll('checkWorldBounds', true);
 
}


function fireGem (){
    if (game.time.now > lastGemTime + 1000){
        var gem = tinyGems.getFirstExists(false);
        gem.enableBody =true;
        gem.physicsBodyType = Phaser.Physics.ARCADE;
        //left
        if (boss.body.position.x > boss.target.body.position.x){
            gem.reset(boss.x, boss.y+55);
            gem.rotation = game.physics.arcade.moveToXY(gem, gem.body.position.x-500, gem.body.position.y, 1000, 5000);
        }
        //right
        else if (boss.body.position.x < boss.target.body.position.x){
            gem.reset(boss.x, boss.y+55);
            gem.rotation = game.physics.arcade.moveToXY(gem, gem.body.position.x+500, gem.body.position.y, 1000, 5000);
        }
        lastGemTime = game.time.now;
    }
}


function gemKilled (gem, layer){
    gem.kill();
}

function createTopTank (posX, posY){
    
        boss = game.add.sprite(posX, posY, 'topTank');
        enemies.add(boss);
        boss.enableBody = true;
        boss.body.collideWorldBounds = true;
        boss.animations.add('left', [3,4,5], 10, true);
        boss.animations.add('right', [0,1,2], 10, true);
        
        //boss.animations.add('left', [0,1], 10, true);
        game.physics.enable(boss);
        boss.body.bounce.set(0.6);
        boss.body.tilePadding.set(32);
        boss.HP = 1000;
        boss.lastFired = game.time.now;
        boss.nextFire = game.rnd.realInRange(300, 800);
        boss.posX =posX;
        boss.posY = posY;
        boss.firing = false;
        
        //  healthbar.scale.x = value;
    
            healthbar = game.add.sprite(posX,posY+200,'red');
            healthbar.scale.setTo(boss.HP/1000*20,1);
        cannons = game.add.group();
        cannons.enableBody = true;
        cannons.physicsBodyType = Phaser.Physics.ARCADE;
//      
        cannons.setAll('anchor.x', 0.5);
        cannons.setAll('anchor.y', 0.5);
        cannons.setAll('outOfBoundsKill', true);
        cannons.setAll('checkWorldBounds', true);
    
}


function topTankManager(){
    //boss.body.position = boss.posX,boss.posY;
    healthbar.scale.setTo(boss.HP/1000*20,1);
    game.physics.arcade.overlap(boss, bullets, damageBoss, null, this);
        game.physics.arcade.overlap(boss, daggers, damageBoss, null, this);
    if(! firing){
        boss.animations.play('left');
        } else{
            boss.animations.play('right') ;  
    }
    
    if (boss.visible && boss.inCamera){
            bulletHell ();
        }
    cannons.forEachAlive(function(cannon){
            if (cannon.visible && cannon.inCamera){
                game.physics.arcade.overlap(cannon, layer, bulletKilled, null, this);
                game.physics.arcade.overlap(cannon, player1, hitByCannon, null, this);
                game.physics.arcade.overlap(cannon, player2, hitByCannon, null, this);
                cannon.body.velocity.y = cannon.xSpeed;
                cannon.body.velocity.x = cannon.ySpeed;
               /* if(cannon.time < game.time.now+2000){
                    cannon.kill();
                }*/
            }
        });
    
}
        

function bulletHell(){
    if(game.time.now > boss.lastFired+boss.nextFire){
        firing = true;
        boss.lastFired = game.time.now;
        for(var i = 0; i <  game.rnd.realInRange(5, 20); i++){
            var cannon = game.add.sprite(boss.x+110, boss.y+70, 'cannonball');
            cannon.xSpeed = -1 * game.rnd.realInRange(-40, 300);
            cannon.ySpeed = -1 * game.rnd.realInRange(-40, 300);
            cannon.time = game.time.now;
            cannons.add(cannon);
            cannon.enableBody =true;
            cannon.physicsBodyType = Phaser.Physics.ARCADE;
            cannon.body.setSize(16, 16);
            };
        
        //cannons.createMultiple(20, 'cannonball', 0, false);
        boss.nextFire = game.rnd.realInRange(1500, 2500);
    }else if(game.time.now > boss.lastFired +300){
        firing = false;
    }
    
}

function damageBoss(boss,dagger){
    boss.HP-=5;
    dagger.kill(); 
    if(boss.HP <=0){
        boss.kill();
        
        //Load WIN SCREEN HERe
    }
    }
}
    

