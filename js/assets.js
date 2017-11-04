function assetLoader(){
    
        //characters
        game.load.spritesheet('player2', 'assets/char2.png', 48, 48, 16);
        player1Preload(game);
       
    //maps
     backgroundPreload(game,'BossRoom', 'assets/maps/BossRoom.json','tileset1','assets/maps/tileset1.png')
     backgroundPreload(game,'room1','assets/maps/room1.json','tileset1', 'assets/maps/tileset1.png');
     game.load.tilemap('room2_1', 'assets/maps/room2_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset22', 'assets/maps/tileset22.png');
        
        
        
        
        game.load.image('bullet', 'assets/fireball.png');
        game.load.image('dagger', 'assets/dagger.png');
        game.load.image('door', 'assets/door.png');
        game.load.image('key', 'assets/key.png');
        game.load.image('potion', 'assets/potion.png');
    
    
        game.load.spritesheet('slime', 'assets/enemy.png', 48, 48, 8);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
    
        //sound
        game.load.audio('crunch', 'assets/ogg/Crunch.ogg');
        game.load.audio('dungeon', ['assets/ogg/dungeon3_loop.mp3', 'assets/ogg/dungeon3_loop.ogg']);
        game.load.audio('dungeon2',['assets/ogg/dungeon2_1.mp3','assets/ogg/dungeon2.ogg']);
        
        game.load.audio('dungeonBoss',['assets/ogg/DungeonBoss.mp3','assets/ogg/DungeonBoss.ogg']);
        game.load.spritesheet('boss', 'assets/gem.png', 96, 96, 3);
        
    
        game.load.spritesheet('boulder', 'assets/boulder.png', 32, 32, 4);
        game.load.image('tinyGem', 'assets/tinygem.png');
    
    
}
