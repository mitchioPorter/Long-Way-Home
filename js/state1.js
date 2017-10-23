var demo = {};
demo.state1 = function(){};

//declare all the variables here
var map;
var layer;
var layer2;
var cursors;
var player;


var bullets;
var fireRate = 1000;
var nextFire = 0;
var attack;
var lastPress = 'right';
var lastPress2 = 'right';
var enemies;
var endText;
var enemyNum;
var lastAttackTime = 0;
var HPText;
var music;
var hasKey = false;

var doors;
var door;
var keys;
var key;
var boulder;
var potions;
var health_potion;

var hintText;

demo.state1.prototype = {
    preload: function(){
        game.load.tilemap('room1', 'assets/maps/room1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset1', 'assets/maps/tileset1.png');
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('potion', 'assets/potion.png');
        game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
        game.load.spritesheet('player2', 'assets/char2.png', 48, 48, 16);
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon',['assets/ogg/dungeon3_loop.mp3','assets/ogg/dungeon3_loop.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
        game.load.spritesheet('boulder','assets/boulder.png', 32,32,4);
        
//        game.load.tilemap('room1', 'assets/MapSet1/map1.json', null, Phaser.Tilemap.TILED_JSON);
//        game.load.image('tileset1', 'assets/MapSet1/newLevel1.png');
    },
    create: function(){
        map = game.add.tilemap('room1');

        map.addTilesetImage('tileset1');
    
    
        layer2 = map.createLayer('noCollide')
        layer = map.createLayer('collide');
    
        layer.resizeWorld();

        map.setCollisionBetween(1, 50, true, 'collide');

        // layer.debug = true;
        
        // Sound
        fx = game.add.audio('crunch');
        fx.allowMultiple = true;
        fx.addMarker('player_hit', 0, 0.5);
    
        // Music
        music = game.add.audio('dungeon');
        music.play();
        music.loop = true;

        //create the player with animation
        player = game.add.sprite(200, 70, 'sprite');
        game.physics.arcade.enable(player);
        player.body.setSize(16, 32, 16, 16);
        player.enableBody = true;
        player.body.bounce.set(0);
        player.body.tilePadding.set(32);
        player.body.collideWorldBounds = true;
        player.animations.add('right', [0,1,2,3], 10, true);
        player.animations.add('left', [4,5,6,7], 10, true);
        player.animations.add('up', [12,13,14,15], 10, true);
        player.animations.add('down', [8,9,10,11], 10, true);
        player.id=1;
        player.damage = 50;
  
        player2 = game.add.sprite(250, 70, 'player2');
        game.physics.arcade.enable(player2);
        player2.body.setSize(16, 32, 16, 16);
        player2.enableBody = true;
        player2.body.bounce.set(0);
        player2.body.tilePadding.set(32);
        player2.body.collideWorldBounds = true;
        player2.animations.add('up', [0,1,2,3], 10, true);
        player2.animations.add('down', [4,5,6,7], 10, true);
        player2.animations.add('left', [12,13,14,15], 10, true);
        player2.animations.add('right', [8,9,10,11], 10, true);
        player2.id = 2;
        player2.damage =50;
        
        game.camera.follow(player);
        //player stats
        player.HP = 2;
        player2.HP = 2;
    
        //Create a group of enemies
        enemies = game.add.group();
        enemies.enableBody = true;
        enemyNum = 2;

        createEnemy(660, 240, 0);
        createEnemy(900, 900, 1);


        //game.physics.arcade.collide(enemy, enemy2);
        //check collide among enemies
        enemies.forEachAlive(function(enemy){
            enemies.forEachAlive(function(enemy1){
                if (enemy.i != enemy1.i){
                    game.physics.arcade.collide(enemy, enemy1);
                }
            });
        });

        //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(100, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    
        // Door and Keys
        doors = game.add.group();
        door = game.add.sprite(1120, 880, 'door');
        doors.add(door);
        door.anchor.setTo(0.5, 1);
        game.physics.enable(door);
        door.body.allowGravity = false;
        door.body.immovable = true;
        door.body.moves = false;
        door.body.setSize(48,48);

        //keys
        keys = game.add.group();
        //key = game.add.sprite(1160, 1180, 'key');
        key = game.add.sprite(860, 240, 'key');
        keys.add(key);
        key.anchor.setTo(0.5, 1);
        game.physics.enable(key);
        key.body.allowGravity = false;
        
        //Create a boulder
        boulder = game.add.sprite(240, 420, 'boulder');
        game.physics.arcade.enable(boulder);
        boulder.enableBody = true;
        boulder.body.bounce.set(1);
        boulder.body.tilePadding.set(32);
        boulder.animations.add('boulder-l', [0,1,2,3], 10, true);
        boulder.animations.add('boulder-r', [3,2,1,0], 10, true);
        boulder.body.velocity.x=150;
        boulder.immoveable=true;
        
    
        //Potion
        potions = game.add.group();
        health_potion = game.add.sprite(800,200,'potion');
        potions.add(health_potion)
        health_potion.anchor.setTo(0.5, 1);
        game.physics.enable(health_potion);
        health_potion.body.allowGravity = false;
        
        //Access the keyboard input
        cursors = game.input.keyboard.createCursorKeys();
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attack = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        attack2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeState2, null, null, 2);

        HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player.HP, { fontSize: '32px', fill: '#fff' } );
        HPText.fixedToCamera = true;
        
        hintText = game.add.text(300, game.camera.y,'Please find the key', { fontSize: '32px', fill: '#fff' });
        hintText.fixedToCamera = true;
    },
    update: function(){
        //Check collisions
        if (!hasKey){
            game.physics.arcade.collide(player, door);
            game.physics.arcade.collide(player2, door);
        }
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(player2, layer);
        game.physics.arcade.collide(player, player2);

        //  Un-comment these to gain full control over the sprite
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;        

        //Player1's control
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
            lastPress = 'up';
            player.animations.play('up');
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;
            lastPress = 'down';
            player.animations.play('down');
        }
        else if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            lastPress = 'left';
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            lastPress = 'right';
            player.animations.play('right');
        }
        else {
            player.animations.stop();
             if (lastPress == 'right'){
                player.frame = 0;
             }
            if (lastPress == 'left'){
                player.frame = 4;
            }
            else if (lastPress == 'up'){
                player.frame = 12;
            }
            else if (lastPress == 'down'){
                player.frame = 8;
            }
        }
        
        //Player2's control
        if (w.isDown)
        {
            player2.body.velocity.y = -150;
            lastPress2 = 'up';
            player2.animations.play('up');
        }
        else if (s.isDown)
        {
            player2.body.velocity.y = 150;
            lastPress2 = 'down';
            player2.animations.play('down');
        }
        else if (a.isDown)
        {
            player2.body.velocity.x = -150;
            lastPress2 = 'left';
            player2.animations.play('left');
        }
        else if (d.isDown)
        {
            player2.body.velocity.x = 150;
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
        
        //Attack
        if (attack.isDown && player.visible)
        {
            fire(player);
        }
        if (attack2.isDown && player2.visible)
        {
            fire(player2);
        }
        
        //Enemy handler
        enemies.forEachAlive(function(enemy){
            if (enemy.visible && enemy.inCamera) {
                if (game.physics.arcade.distanceBetween(player, enemy) > 30){
                    game.physics.arcade.moveToObject(enemy, player, 100);
                    if(enemy.body.velocity.x>0){
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
            if (enemy.visible && enemy.inCamera) {
                if (game.physics.arcade.distanceBetween(player2, enemy) > 30){
                    game.physics.arcade.moveToObject(enemy, player2, 100);
                    if(enemy.body.velocity.x>0){
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
            game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
        });
        
        //Escape from attack for 3 seconds after being attacked once
//        if (game.time.now > lastAttackTime + 3000){
//            game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
//        }
        
        //Player attacked
        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, enemies, playerAttacked, null, this);
        
        //Bullet handler
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        });
        
        
        //Player killed
        if (player.HP <= 0 || player2.HP <=0){
            playerKilled(player);
            player2.kill();        
        }
        
        //updating HP of the player
        HPText.text = 'HP1: ' + player.HP+'\nHP2: '+player2.HP ;
        
        //Pick up items in the world
        game.physics.arcade.overlap(player, health_potion, pickupHealth, null, this);
        game.physics.arcade.overlap(player, key, pickupKey,null, this);
        game.physics.arcade.overlap(player2, key, pickupKey,null, this);
        game.physics.arcade.overlap(player, door, openDoor,
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
        var hitplayer = game.physics.arcade.collide(player, boulder);
        var hitplayer2 = game.physics.arcade.collide(player2, boulder);
        boulder.body.velocity.y=0;
        if (boulder.body.velocity.x!=-150){
            boulder.body.velocity.x=150;
        }
        if (hitplayer){
            player.HP-=1;
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
    }
};

function fire (p) {
    if ((game.time.now > nextFire) && (bullets.countDead() > 0))
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);
        bullet.enableBody =true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.body.setSize(16, 16);
        var i = (p.id==1)?lastPress:lastPress2;
        switch(i){
            case 'up':
                bullet.reset(p.x+30, p.y+30);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y-500, 1000, 1000);break;              
            case 'down':
                bullet.reset(p.x+30, p.y+30);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y+500, 1000, 1000);break;
            case 'left':
                bullet.reset(p.x+20, p.y+32);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x-500, bullet.body.position.y, 1000, 1000);break;
            case 'right':
                bullet.reset(p.x+22, p.y+32);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x+500, bullet.body.position.y, 1000, 1000);break;
        }
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
            
        });
//        console.log("1");
    }
}
function hitEnemy(enemy, bullet){
    enemy.HP = enemy.HP-(1*player.damage);
    if (enemy.HP<=0){
        enemy.kill();
        enemyNum=enemyNum-1;
    }
    //enemy.reset(enemy.body.position.x+20,enemy.body.position.y);
}
function playerAttacked(player, enemy){
    enemy.kill();
    fx.play("player_hit");
    player.HP -= 1;
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
function bulletKilled (bullet, layer){
    bullet.kill();
}
function updateHP (text, HP){
    text = 'HP: ' + HP;
}
function createEnemy (posX, posY, id){
    var enemy = game.add.sprite(posX, posY, 'enemy');
    enemies.add(enemy);
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0,1,2,3], 10, true);
    enemy.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(enemy);
    enemy.body.bounce.set(0.6);
    enemy.body.tilePadding.set(32);
    enemy.HP = 100;
    enemy.i = id;
}

function pickupHealth(player, health_potion){
    health_potion.kill();
    player.HP += 1;
}

function pickupKey(player, key){
    key.kill();
    hasKey = true;
}
function openDoor (player, door){
    door.kill();    
    player.kill();
    changeState2();
}
function changeState2(){
    //console.log(i);
    
    game.state.start('state2');
    music.stop();

}