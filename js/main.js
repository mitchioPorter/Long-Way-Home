
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/ground_1x1.png');
    game.load.image('phaser', 'assets/phaser-dude.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemy', 'assets/phaser-dude.png');

}

var map;
var layer;
var cursors;
var sprite;

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
    
    
    sprite = game.add.sprite(260, 70, 'phaser');
    game.physics.enable(sprite);
    sprite.body.bounce.set(0.6);
    sprite.body.tilePadding.set(32);
    game.camera.follow(sprite);
    //game.physics.arcade.gravity.y = 0;
    
    enemies = game.add.group();
    enemies.enableBody = true;
    var enemy = enemies.create(660, 270, 'enemy');
    enemyNum = 1;
    enemy.enableBody = true;
    
    //enemy = game.add.sprite(660, 270, 'enemy');
    game.physics.enable(enemy);
    sprite.body.bounce.set(0.6);
    sprite.body.tilePadding.set(32);
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

    game.physics.arcade.collide(sprite, layer);

    //  Un-comment these to gain full control over the sprite
    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;


    if (cursors.up.isDown)
    {
        sprite.body.velocity.y = -150;
        lastPress = 'up';
    }
    else if (cursors.down.isDown)
    {
        sprite.body.velocity.y = 150;
        lastPress = 'down';
    }

    if (cursors.left.isDown)
    {
        sprite.body.velocity.x = -150;
        lastPress = 'left';
    }
    else if (cursors.right.isDown)
    {
        sprite.body.velocity.x = 150;
        lastPress = 'right';
    }
    
    if (attack.isDown && sprite.visible)
    {
        //  Boom!
        fire();
    }
    enemies.forEachAlive(function(enemy){
        if (enemy.visible && enemy.inCamera) {
            game.physics.arcade.moveToObject(enemy, sprite, 100);
        }
        game.physics.arcade.collide(enemy, layer);
        game.physics.arcade.overlap(enemy, bullets, hitEnemy, null, this);
    });
    game.physics.arcade.overlap(sprite, enemies, getKilled, null, this);
    if (enemyNum <= 0){
        endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
        sprite.kill();
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
                bullet.reset(sprite.x+12, sprite.y);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y-500, 1000, 500);break;
                
            case 'down':
                bullet.reset(sprite.x+12, sprite.y+50);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x, bullet.body.position.y+500, 1000, 500);break;
            case 'left':
                bullet.reset(sprite.x-5, sprite.y+35);
                bullet.rotation = game.physics.arcade.moveToXY(bullet, bullet.body.position.x-500, bullet.body.position.y, 1000, 500);break;
            case 'right':
                bullet.reset(sprite.x+32, sprite.y+35);
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
function getKilled(sprite, enemy){
    sprite.kill();
    enemies.forEachAlive(function(enemy){
        enemy.kill();
    });
    endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Lose!', { fontSize: '32px', fill: '#fff' });
}
function bulletKilled (bullet, layer){
    bullet.kill();
}