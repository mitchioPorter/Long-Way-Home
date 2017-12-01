function assetLoader(){
    
        //characters
        game.load.spritesheet('player2', 'assets/char2.png', 48, 48, 16);
        player1Preload(game);
       
    //maps
     backgroundPreload(game,'BossRoom', 'assets/maps/BossRoom.json','tileset1','assets/maps/tileset1.png')
     backgroundPreload(game,'room1','assets/maps/room1.json','tileset1', 'assets/maps/tileset1.png');
     game.load.tilemap('room2_1', 'assets/maps/room2_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset22', 'assets/maps/tileset22.png');
        game.load.spritesheet('pressurePlate', 'assets/button.png', 48, 48, 2);
        game.load.spritesheet('gate', 'assets/gate.png',48, 48, 2);
        
        
        game.load.image('bg', 'assets/TitleScreen.png');
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('dagger', 'assets/dagger.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('potion', 'assets/potion.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('red','assets/red.png');
    
        game.load.image('cannonball', 'assets/cannonball.png');
        game.load.spritesheet('topTank','assets/topTank.png', 200, 150, 6);
    
    
        game.load.spritesheet('slime', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('ghosty', 'assets/ghosty.png', 48, 48, 2);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
    
        //sound
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon', ['assets/ogg/dungeon3_loop.mp3', 'assets/ogg/dungeon3_loop.ogg']);
        game.load.audio('dungeon2',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);
        
        game.load.audio('dungeonBoss',['assets/ogg/DungeonBoss.mp3','assets/ogg/DungeonBoss.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
        
    
        game.load.spritesheet('boulder', 'assets/boulder.png', 32, 32, 4);
        game.load.image('tinyGem', 'assets/tinygem.png');
    
        game.load.image('heart', heartURI,48,48);
    
        game.load.spritesheet('start', 'assets/StartButton.png', 200, 100,3);
        game.load.spritesheet('back', 'assets/backButton.png', 200, 100,3);
        game.load.spritesheet('instructions', 'assets/HowToPLayButton.png', 200, 100,3);
        game.load.spritesheet('creditButton', 'assets/CreditsButton.png', 200, 100,3);
        game.load.image('credits', 'assets/credits.png', 200, 100,3);
        game.load.spritesheet('refresh', 'assets/refresh.png', 50, 50);
    
}

var heartURI = 'data:image/png;base64,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';

var pointUrl = 'data:image/png;base64,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';