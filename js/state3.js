demo.state3 = function(){};


lastPress = 'right';
lastAttackTime = 0;
hasKey = false;





demo.state3.prototype = {
    preload: function(){
       
        assetLoader();
    },
    create: function(){
        
        backgroundCreate(game,'room2_1','tileset22');
        groupInitializer();
        enemiesCreate();2
        sound('dungeon2');

        //create the player with animation


        //create the player with animation
        player1Create(game,150,100);
        player2Create(game,200,150);
        
        var limit = game.rnd.integerInRange(1, 50);
        for(var i = 0; i < limit; i++){
            createGhost(game.rnd.integerInRange(0,game.width),game.rnd.integerInRange(0,game.height), i);
    }       
        
        hud();
        
    },
    
    update: function(){
        state = 3;
        
        playerUpdate();
        enemyUpdate();
        trapUpdate()
        pressurePlateUpdater();
        
    }
};
