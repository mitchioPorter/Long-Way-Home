demo.state3 = function(){};


lastPress = 'right';
lastAttackTime = 0;
hasKey = false;
var lastGemTime = 0;
var tinyGems;
var boss;




demo.state3.prototype = {
    preload: function(){
       
        assetLoader();
    },
    create: function(){
        backgroundCreate(game,'room2_1','tileset22');
        sound('dungeon2');

        //create the player with animation


        //create the player with animation
        player1Create(game,150,100);
        player2Create(game,200,150);
        
        hud();
        
    },
    
    update: function(){
        state = 3;
        
        playerUpdate();
        HUDUpdate();
    }
};
