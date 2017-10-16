var demo = {};
demo.state1 = function(){};

//declare all the variables here
var map;
var layer;
var layer2;
var cursors;
var player;


var bullets;
var fireRate = 100;
var nextFire = 0;
var attack;
var lastPress = 'up';
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
demo.state1.prototype = {
    preload: function(){
        game.load.tilemap('room1', 'assets/maps/room1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset1', 'assets/maps/tileset1.png');
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
        game.load.spritesheet('player2', 'assets/char2.png', 48, 48, 16);
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
    },
    create: function(){
        map = game.add.tilemap('room1');

        map.addTilesetImage('tileset1');
    
    
        layer2 = map.createLayer('Floor')
        layer = map.createLayer('Walls');
    
        layer.resizeWorld();

        map.setCollisionBetween(1, 2000, true, 'Walls');

        // layer.debug = true;
        
        // Sound
        fx = game.add.audio('crunch');
        fx.allowMultiple = true;
        fx.addMarker('player_hit', 0, 0.5);
    
        // Music
        music = game.add.audio('dungeon');
        music.play();

        //create the player with animation
        player = game.add.sprite(230, 70, 'sprite');
        game.physics.arcade.enable(player);
        player.body.setSize(16, 32, 16, 16);
        player.enableBody = true;
        player.body.bounce.set(0.6);
        player.body.tilePadding.set(32);
        player.body.collideWorldBounds = true;
        player.animations.add('right', [0,1,2,3], 10, true);
        player.animations.add('left', [4,5,6,7], 10, true);
        player.animations.add('up', [12,13,14,15], 10, true);
        player.animations.add('down', [8,9,10,11], 10, true);
  
        player2 = game.add.sprite(250, 70, 'player2');
        game.physics.arcade.enable(player2);
        player2.body.setSize(16, 32, 16, 16);
        player2.enableBody = true;
        player2.body.bounce.set(0.6);
        player2.body.tilePadding.set(32);
        player2.body.collideWorldBounds = true;
        player2.animations.add('right', [0,1,2,3], 10, true);
        player2.animations.add('left', [4,5,6,7], 10, true);
        player2.animations.add('up', [12,13,14,15], 10, true);
        player2.animations.add('down', [8,9,10,11], 10, true);
        
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
        bullets.createMultiple(30, 'bullet', 0, false);
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

        keys = game.add.group();
        //key = game.add.sprite(1160, 1180, 'key');
        key = game.add.sprite(860, 240, 'key');
        keys.add(key);
        key.anchor.setTo(0.5, 1);
        game.physics.enable(key);
        key.body.allowGravity = false;
    
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
    },
    update: function(){
        if (!hasKey){
            game.physics.arcade.collide(player, door);
            game.physics.arcade.collide(player2, door);
        }
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(player2, layer);

        //  Un-comment these to gain full control over the sprite
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;        


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
            player.frame = 0;
            if (lastPress == 'left'){
                player.frame = 4;
            }
        }
        
        if (w.isDown)
        {
            player2.body.velocity.y = -150;
            lastPress = 'up';
            player2.animations.play('up');
        }
        else if (s.isDown)
        {
            player2.body.velocity.y = 150;
            lastPress = 'down';
            player2.animations.play('down');
        }
        else if (a.isDown)
        {
            player2.body.velocity.x = -150;
            lastPress = 'left';
            player2.animations.play('left');
        }
        else if (d.isDown)
        {
            player2.body.velocity.x = 150;
            lastPress = 'right';
            player2.animations.play('right');
        }
        else {
            player2.animations.stop();
            player2.frame = 0;
            if (lastPress == 'left'){
                player2.frame = 4;
            }
            else if (lastPress == 'up'){
                player2.frame = 12;
            }
            else if (lastPress == 'down'){
                player2.frame = 8;
            }
        }
        
        if (attack.isDown && player.visible)
        {
            //  Boom!
            fire(player);
        }
        if (attack2.isDown && player2.visible)
        {
            //  Boom!
            fire(player2);
        }
        
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
    //    if (game.time.now > lastAttackTime + 3000){
    //        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
    //    }
        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, enemies, playerAttacked, null, this);
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        })
        if (player.HP <= 0){
            playerKilled(player);
        }
        if (player2.HP <= 0){
            playerKilled(player2);
        }
//        if (enemyNum<=0){
//            endText = game.add.text((game.camera.x + game.camera.width/2)-80, (game.camera.y + game.camera.height/2)-100, 'You have killed all enemies.\nOpen the door the unlock next level!', { fontSize: '32px', fill: '#fff' });
//        }

        //updating HP of the player
        HPText.text = 'HP: ' + player.HP;

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
        
    }
};
function fire (player) {
    console.log(game.time.now);
    console.log(nextFire);
    if ((game.time.now > nextFire) && (bullets.countDead() > 0))
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);
        bullet.enableBody =true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        
        switch(lastPress){
            case 'up':
                bullet.reset(player.x+12, player.y);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y-500, 1000, 500);break;              
            case 'down':
                bullet.reset(player.x+12, player.y+50);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y+500, 1000, 500);break;
            case 'left':
                bullet.reset(player.x-8, player.y+35);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x-500, bullet.body.position.y, 1000, 500);break;
            case 'right':
                bullet.reset(player.x+38, player.y+35);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x+500, bullet.body.position.y, 1000, 500);break;
        }
        //bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    }
}
function hitEnemy(enemy, bullet){
    enemy.HP = enemy.HP-(1*player.Damage);
    if (enemy.HP<=0){
        enemy.kill();
        enemyNum=enemyNum-1;
    }
}
function playerAttacked(player, enemy){
    enemy.kill();
    fx.play("player_hit");
    player.HP -= 1;
    lastAttackTime = game.time.now;
    //console.log(lastAttackTime);
}
function playerKilled(player){
    player.kill();
    enemies.forEachAlive(function(enemy){
        enemy.kill();
    });
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
function pickupKey(player, key){
    key.kill();
    hasKey = true;
}
function openDoor (player, door){
    door.kill();
//    endText = game.add.text((game.camera.x + game.camera.width/2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
    
    player.kill();
    changeState2();
}
function changeState2(){
    //console.log(i);
    game.state.start('state2');


}