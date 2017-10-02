var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('map', 'assets/GamejamLevel1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/ground_1x1.png');
    //game.load.image('phaser', 'assets/phaser-dude.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemy', 'assets/phaser-dude.png');
    game.load.spritesheet('sprite', 'assets/sprite.png', 48, 48, 16);
}

var map;
var layer;

function create() {

    map = game.add.tilemap('map');

    //map.addTilesetImage('ground_1x1');
    
    //layer = map.createLayer('MyTerrain');

    //layer.resizeWorld();

    //map.setCollisionBetween(1, 12);
}
function update(){
    
}
function render(){
    
}