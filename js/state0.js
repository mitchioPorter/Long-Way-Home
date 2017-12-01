var demo = {};
var startButton;
var instructionsButton;
var creditButton;
var credits;
var CreditDisplay =false;
var backButton;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function (){
        assetLoader();
        
    },
    create: function (){
        
        

        
      
        var bg = game.add.sprite(0,0, 'bg');  
        startButton = game.add.button(300, 250, 'start', menuStart, this, 0, 0, 0);
        instructionsButton = game.add.button(300, 350, 'instructions', howTo, this, 0, 0, 0);
        creditButton = game.add.button(300, 450, 'creditButton', creditRoll, this, 0, 0, 0);
         

        credits = game.add.sprite(10000,0,'credits');
        
        backButton = game.add.button(600, 500, 'back', back2, this, 0, 0, 0);
    },
    
    
    update: function (){
        state=0;
        if(CreditDisplay){
            
            credits.x= 0;
            backButton.x=600;
            backButton.y = 500;
           
        }else{
            credits.x=10000;
            backButton.x=10000;
            
            
                
            
        }
        
        
    }
}
function menuStart () {
    game.state.start('state1');
}
function refresh1 () {
    music.stop();
    game.state.start('state1');
}
function refresh2 () {
    music.stop();
    game.state.start('state2');
}
function refresh3 () {
    music.stop();
    game.state.start('state3');
}



function creditRoll(){
    CreditDisplay = true;
    credits = game.add.sprite(2000,0,'credits');
    backButton = game.add.button(2000, 500, 'back', back2, this, 0, 0, 0);
}

function back2(){
    CreditDisplay = false;
    credits.x=10000;
    backButton.x=10000;
}

function howTo(){
    
}

