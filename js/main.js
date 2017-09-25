
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/ground_1x1.png');
    //game.load.image('phaser', 'assets/phaser-dude.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
    game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);

}

var map;
var layer;
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

function create() {

    map = game.add.tilemap('map');

    map.addTilesetImage('ground_1x1');
    
    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    // layer.debug = true;
    
    
    player = game.add.sprite(260, 70, 'sprite');
    game.physics.arcade.enable(player);
    player.body.bounce.set(0.6);
    player.body.tilePadding.set(32);
    player.body.collideWorldBounds = true;
    player.animations.add('right', [0,1,2,3], 10, true);
    player.animations.add('left', [4,5,6,7], 10, true);
    player.animations.add('up', [12,13,14,15], 10, true);
    player.animations.add('down', [8,9,10,11], 10, true);
    game.camera.follow(player);
    //game.physics.arcade.gravity.y = 0;
    
    enemies = game.add.group();
    enemies.enableBody = true;
    var enemy = game.add.sprite(660, 270, 'enemy');
    enemies.add(enemy);
    enemyNum = 1;
    enemy.enableBody = true;
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0,1,2,3], 10, true);
    enemy.animations.add('right', [4,5,6,7], 10, true);
    
    //enemy = game.add.sprite(660, 270, 'enemy');
    game.physics.enable(enemy);
    enemy.body.bounce.set(0.6);
    enemy.body.tilePadding.set(32);
    enemy.HP = 100;
    
    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    

    cursors = game.input.keyboard.createCursorKeys();
    attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

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
            game.physics.arcade.moveToObject(enemy, player, 100);
            if(enemy.body.velocity.x>0){
                enemy.animations.play('right');
            }
            else {
                enemy.animations.play('left');
            }
        }
        game.physics.arcade.collide(enemy, layer);
        game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
    });
    game.physics.arcade.overlap(player, enemies, playerKilled, null, this);
    if (enemyNum <= 0){
        endText = game.add.text((game.camera.x + game.camera.width/2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
        player.kill();
    }
    bullets.forEachAlive(function(bullet){
        if (bullet.visible && bullet.inCamera){
            game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
        }
    })

}

function render() {

    //  Useful debug things you can turn on to see what's happening

    // game.debug.spriteBounds(sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.body(sprite);
    //game.debug.bodyInfo(sprite, 32, 32);

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
                bullet.reset(player.x-5, player.y+35);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x-500, bullet.body.position.y, 1000, 500);break;
            case 'right':
                bullet.reset(player.x+32, player.y+35);
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
function playerKilled(player, enemy){
    player.kill();
    enemies.forEachAlive(function(enemy){
        enemy.kill();
    });
    endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Lose!', { fontSize: '32px', fill: '#fff' });
}
function bulletKilled (bullet, layer){
    bullet.kill();
}