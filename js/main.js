
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('room1', 'assets/maps/room1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1', 'assets/maps/tileset1.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
    game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
    game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
    game.load.audio('dungeon',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);

}

var map;
var layer;
var Layer2;
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

function create() {

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
    player = game.add.sprite(240, 70, 'sprite');
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
//    player.body.setSize(18,18);
    game.camera.follow(player);
    player.HP = 2;
    
    //Create a group of enemies
    enemies = game.add.group();
    enemies.enableBody = true;
    enemyNum = 2;
    
    //create an enemy with animation
    var enemy = game.add.sprite(660, 270, 'enemy');
    enemies.add(enemy);
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0,1,2,3], 10, true);
    enemy.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(enemy);
    enemy.body.bounce.set(0.6);
    enemy.body.tilePadding.set(32);
    enemy.HP = 100;
        
    //Create another enemy
    var enemy2 = game.add.sprite(900, 900, 'enemy');
    enemies.add(enemy2);
    enemy2.enableBody = true;
    enemy2.body.collideWorldBounds = true;
    enemy2.animations.add('left', [0,1,2,3], 10, true);
    enemy2.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(enemy2);
    enemy2.body.bounce.set(0.6);
    enemy2.body.tilePadding.set(32);
    enemy2.HP = 100;
    
    game.physics.arcade.collide(enemy, enemy2);
    
    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    //Access the keyboard input
    cursors = game.input.keyboard.createCursorKeys();
    attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player.HP, { fontSize: '32px', fill: '#fff' } );
    HPText.fixedToCamera = true;
    

}

function update() {

    game.physics.arcade.collide(player, layer);

    //  Un-comment these to gain full control over the sprite
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    
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
    
    if (attack.isDown && player.visible)
    {
        //  Boom!
        fire();
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
        game.physics.arcade.collide(enemy, layer);
        game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
    });
    if (game.time.now > lastAttackTime + 3000){
        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
    }

    if (enemyNum <= 0){
        endText = game.add.text((game.camera.x + game.camera.width/2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
        player.kill();
    }
    bullets.forEachAlive(function(bullet){
        if (bullet.visible && bullet.inCamera){
            game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
        }
    })
    if (player.HP <= 0){
        playerKilled();
    }
    
    //updating HP of the player
    //HPText.forEach(updateHP, this, true, player.HP);
    //HPTxt.,children[0].text = 'HP: ' + player.HP;
    HPText.text = 'HP: ' + player.HP;
}


function render() {

    //  Useful debug things you can turn on to see what's happening
//     game.debug.soundInfo(music, 20, 32);
//     game.debug.spriteBounds(player);
//     game.debug.cameraInfo(game.camera, 32, 32);
//     game.debug.body(player);
//     game.debug.bodyInfo(player, 32, 32);

}
function fire () {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstExists(false);
        bullet.enableBody =true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;

//        bullet.reset(sprite.x+5, sprite.y+35);
        
        switch(lastPress){
            case 'up':
//                bullet.rotation = -90;
//                bullet.body.velocity.y = -150;break;
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
    enemy.HP = enemy.HP-50;
    if (enemy.HP<=0){
        enemy.kill();
        enemyNum=enemyNum-1;
    }
}
function playerAttacked(player, enemy){
    //enemy.kill();
    fx.play("player_hit")
    player.HP -= 1;
    lastAttackTime = game.time.now;
}
function playerKilled(){
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