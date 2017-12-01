demo.state4 = function(){};




lastPress = 'right';
lastAttackTime = 0;
hasKey = false;
var topTank;
var boss;
var firing = false;
var healthBar;
var cannons;
var state4 = false;

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
        music.stop();

        enemiesCreate();
        //load the sound/music
        sound('dungeonBoss');
        
        
        
        //Create a group of enemies
        
        
        enemyNum = 1;
       
        hud();
        refresh = game.add.button(750, 0, 'refresh', refresh2, this, 0, 0, 0);
        refresh.fixedToCamera = true;
        createTopTank(550,1195);

        
    },
    update: function(){
        state =4;
        groupInitializer();
        playerUpdate();
        
        topTankManager();
      
     
        
        
        }
};
