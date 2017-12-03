demo.state3 = function(){};


lastPress = 'right';
lastAttackTime = 0;
hasKey = false;




demo.state3.prototype = {
    preload: function(){
       
        assetLoader();
    },
    create: function(){
        state4 = true;
        backgroundCreate(game,'room2_1','tileset22');
        groupInitializer();
        enemiesCreate();2
        sound('dungeon2');

        //create the player with animation


        //create the player with animation
        player1Create(game,150,100);
        player2Create(game,200,150);
        
        var limit = game.rnd.integerInRange(10, 40);
        enemyNum = Math.floor(limit/2);
        for(var i = 0; i < limit; i++){
            createGhost(game.rnd.integerInRange(0,2000),game.rnd.integerInRange(0,2000), i);
    }       
        
        createGate(game,930,1005);
        createPressurePlate(game,885,900);
        createPressurePlate(game,1100,1005);
        createGate(game,1600,1390);
        createPressurePlate(game,1500,1350);
        createPressurePlate(game,1710,1350);
        createGate(game,1600,625);
        createPressurePlate(game,1500,580);
        createPressurePlate(game,1710,580);
        
        hud();
        refresh = game.add.button(750, 0, 'refresh', refresh3, this, 0, 0, 0);
        refresh.fixedToCamera = true;
        state = 3;
    },
    
    update: function(){
        
        
        playerUpdate();
        enemyUpdate();
        trapUpdate()
        pressurePlateUpdater();
        //Win the game
        hintText.text = 'Enemies Remaining: ' + enemyNum;
      
            
        
         if(enemyNum <= 0){
        music.stop();
        game.state.start('state4');
    
            }       
    }
   
};
