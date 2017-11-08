demo.state2 = function(){};




lastPress = 'right';
lastAttackTime = 0;
hasKey = false;
var lastGemTime = 0;
var tinyGems;
var boss;

demo.state2.prototype = {
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
        createGemBoss(game,380,360);
        hud();
    
        
    },
    update: function(){
        state =2;
        
        playerUpdate();
        gemBossUpdater ();
        enemyUpdate ();
        HUDUpdate();
        
     
        //Win the game
        if (enemyNum <= 0){
           // endText = game.add.text((game.camera.x + game.camera.width /2)-80, (game.camera.y + game.camera.height/2)-100, 'You Win!', { fontSize: '32px', fill: '#fff' });
           // player.kill();
            //player2.kill();
            music.stop();
            game.state.start('state3');
            
        }
    }
};

