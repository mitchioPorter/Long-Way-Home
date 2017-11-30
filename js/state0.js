var demo = {};
var startButton;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function (){
        assetLoader();
        
    },
    create: function (){
        var bg = game.add.sprite(0,0, 'bg');  
        startButton = game.add.button(300, 300, 'start', menuStart, this, 0, 0, 0);
    },
    update: function (){
        state=0;
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