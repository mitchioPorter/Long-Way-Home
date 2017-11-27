var demo = {};
var startButton;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function (){
        assetLoader();
        
    },
    create: function (){
        startButton = game.add.button(220, 100, 'start', menuStart, this, 0, 0, 0);
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