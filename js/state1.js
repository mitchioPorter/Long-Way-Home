var demo = {};
demo.state1 = function () {};

//declare all the variables here
var map;
var layer;
var layer2;
var cursors;

var attack2;
var lastPress = 'right';
var lastPress2 = 'right';
var enemies;
var endText;
var enemyNum;
var lastAttackTime = 0;
var HPText;
var music;
var hasKey = false;

var doors;
var door;

var plates;
var pressurePlate;

var keys;
var key;
var potions;
var coin;
var coin1X;
var coin2X;
var health_potion;
var fx;
var hintText;
var w;
var a;
var s;
var d;

var state;

demo.state1.prototype = {
    preload: function () {
        assetLoader();
        
    },
    create: function () {
        
        
        backgroundCreate(game,'room1','tileset1');
        groupInitializer();
        enemiesCreate();
        
        createPressurePlate(game,260,200);
        createPressurePlate(game,550,120);
        createPressurePlate(game,300,400);
        createPressurePlate(game,120,400);
        
        ////create the player here
        player2Create(game,100,100);
        player1Create(game,250,70);
        
        
        
        sound('dungeon');
        
        //create the game objects
        createSlime(600, 240, 0);
        createSlime(900, 260, 6);
        createSlime(900, 900, 1);
        createSlime(1000, 1000, 5);
        createSlime(200, 1240, 2);
        createSlime(200, 1640, 3);
        createSlime(200, 1740, 4);
        
        
        //createGhost(200, 250, 0);
        
        
        enemyNum = 7;

        
        door(game,1120, 880,);

        key(game,860, 240);
        
        //Create a boulder
        boulder(game);
    
        //Potion
        createPotion(game,800,200);
        createPotion(game,115,800);
//        potion(game,167,250);
        
        
        
        
        //debugging stuff
        game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeState2, null, null, 2);

        hud();
        
    },
    
    
    update: function(){
        state = 1;
        //calls the update function
            playerUpdate();
            enemyUpdate();
            trapUpdate()
            pressurePlateUpdater();
    }
        
};


function changeState2(){
    //console.log(i);
    
    music.stop();
    game.state.start('state2');
    

}

