demo.state4 = function(){};




lastPress = 'right';
lastAttackTime = 0;
hasKey = false;
var topTank;
var boss;

demo.state4.prototype = {
    preload: function(){
        assetLoader();

        
    },
    create: function(){
        //load the bg
        backgroundCreate(game,'BossRoom', 'tileset1');
        //load the players
        player2Create(game,150,100);
        player1Create(game,150,150);
        
        
        enemiesCreate();
        //load the sound/music
        sound('dungeonBoss');
        
        
        
        //Create a group of enemies
        
        
        enemyNum = 1;
       
        hud();
        refresh = game.add.button(750, 0, 'refresh', refresh2, this, 0, 0, 0);
        refresh.fixedToCamera = true;
        createTopTank(200,200);
        
    },
    update: function(){
        state =4;
        groupInitializer();
        playerUpdate();

        topTankManager();
        
        
     
        //Win the game

            
        }
    
};
