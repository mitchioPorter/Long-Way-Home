demo.state2 = function(){};
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
var lastGemTime = 0;
demo.state2.prototype = {
    preload: function(){
        game.load.tilemap('bossRoom', 'assets/maps/BossRoom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset1', 'assets/maps/tileset1.png');
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
        game.load.image('tinyGem', 'assets/tinygem.png');
    },
    create: function(){
        map = game.add.tilemap('bossRoom');
        map.addTilesetImage('tileset1');  
        layer2 = map.createLayer('Floor')
        layer = map.createLayer('Walls');

        layer.resizeWorld();
        map.setCollisionBetween(1, 2000, true, 'Walls');
        
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
        game.camera.follow(player);
        player.HP = 2;
        
        //Create a group of enemies
        enemies = game.add.group();
        enemies.enableBody = true;
        enemyNum = 1;
        
        //Create a boss
        var boss = game.add.sprite(380, 360, 'boss');
        enemies.add(boss);
        boss.enableBody = true;
        boss.body.collideWorldBounds = true;
        boss.animations.add('left', [0,1], 10, true);
        boss.animations.add('right', [0,1], 10, true);
        game.physics.enable(boss);
        boss.body.bounce.set(0.6);
        boss.body.tilePadding.set(32);
        boss.HP = 100;
        
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    
        HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player.HP, { fontSize: '32px', fill: '#fff' } );
        HPText.fixedToCamera = true;

        //Access the keyboard input
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        game.physics.arcade.collide(player, layer);
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        //control the player
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
                        fireGem(1);
                    }
                    else {
                        enemy.animations.play('left');
                        fireGem(0);
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
        
        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        })
        if (player.HP <= 0){
            playerKilled();
        }
        
        //updating HP of the player
        HPText.text = 'HP: ' + player.HP;

        game.physics.arcade.overlap(player, key, pickupKey,null, this);

        game.physics.arcade.overlap(player, door, openDoor,
            // ignore if there is no key or the player is on air
            function (player, door) {
                return hasKey;
            }, this);
    }
};
function fireGem(num){
    if (game.time.now > lastGemTime + 1000){
        if (num == 0){
            
        }
        else if (num == 1){
            
        }
        lastGemTime = game.time.now;
    }

}