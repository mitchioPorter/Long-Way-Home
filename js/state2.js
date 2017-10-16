demo.state2 = function(){};




lastPress = 'right';
lastAttackTime = 0;
hasKey = false;
var lastGemTime = 0;
var tinyGems;
var boss;
demo.state2.prototype = {
    preload: function(){
        game.load.tilemap('BossRoom', 'assets/maps/BossRoom.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset1', 'assets/maps/tileset1.png');
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.spritesheet('enemy', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
        game.load.spritesheet('char2', 'assets/player2.png', 48, 48, 16);
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
        game.load.image('tinyGem', 'assets/tinygem.png');
    },
    create: function(){
        map = game.add.tilemap('BossRoom');

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
        player.HP = 2;
        player2.HP = 2;
        
        //Create a group of enemies
        enemies = game.add.group();
        enemies.enableBody = true;
        enemyNum = 1;
        
        //Create a boss
        boss = game.add.sprite(380, 360, 'boss');
        enemies.add(boss);
        boss.enableBody = true;
        boss.body.collideWorldBounds = true;
        boss.animations.add('left', [0,1], 10, true);
        boss.animations.add('right', [0,1], 10, true);
        game.physics.enable(boss);
        boss.body.bounce.set(0.6);
        boss.body.tilePadding.set(32);
        boss.HP = 100;
        
                //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet', 0, false);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        tinyGems = game.add.group();
        tinyGems.enableBody = true;
        tinyGems.physicsBodyType = Phaser.Physics.ARCADE;
        tinyGems.createMultiple(30, 'tinyGem', 0, false);
        tinyGems.setAll('anchor.x', 0.5);
        tinyGems.setAll('anchor.y', 0.5);
        tinyGems.setAll('outOfBoundsKill', true);
        tinyGems.setAll('checkWorldBounds', true);
    
        HPText = game.add.text(game.camera.x, game.camera.y, 'HP: ' + player.HP, { fontSize: '32px', fill: '#fff' } );
        HPText.fixedToCamera = true;

        //Access the keyboard input
        cursors = game.input.keyboard.createCursorKeys();
        w = game.input.keyboard.addKey(Phaser.Keyboard.W);
        a = game.input.keyboard.addKey(Phaser.Keyboard.A);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        d = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attack = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        attack2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        game.physics.arcade.collide(player, layer);
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        game.physics.arcade.collide(player2, layer);
        player2.body.velocity.x = 0;
        player2.body.velocity.y = 0;

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
                    game.physics.arcade.moveToObject(enemy, player, 30);
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
        
        game.physics.arcade.overlap(player, enemies, playerAttacked, null, this);
        game.physics.arcade.overlap(player2, enemies, playerAttacked, null, this);
        bullets.forEachAlive(function(bullet){
            if (bullet.visible && bullet.inCamera){
                game.physics.arcade.overlap(bullet, layer, bulletKilled, null, this);
            }
        });
        if (player.HP <= 0){
            playerKilled(player);
        }
        if (player2.HP <= 0){
            playerKilled(player2);
        }
        
        //updating HP of the player
        HPText.text = 'HP: ' + player.HP;

        //boss handler
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
        if (enemyNum <= 0){
            endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
            player.kill();
        }
    }
};
function fire (player) {

    if (game.time.now > nextFire && bullets.countDead() > 0)
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

function fireGem (){
    if (game.time.now > lastGemTime + 2000){
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
function hitByGem(player, gem){
    player.HP -=1;
    fx.play("player_hit");
    gem.kill();
}
function gemKilled (bullet, layer){
    bullet.kill();
}