function backgroundPreload(game,name,jsonLocation,tileset,tilesetLocation){
    game.load.tilemap(name, jsonLocation, null, Phaser.Tilemap.TILED_JSON);
    game.load.image(tileset, tilesetLocation);
    
}

function backgroundCreate(game,name,tileset){
    map = game.add.tilemap(name);

        map.addTilesetImage(tileset);
    
    
        layer2 = map.createLayer('noCollide');
        layer = map.createLayer('collide');
    
        layer.resizeWorld();

        map.setCollisionBetween(1, 50, true, 'collide');
    
}
