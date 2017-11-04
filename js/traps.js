function boulder(game,x,y){
        boulder = game.add.sprite(x, y, 'boulder');
        game.physics.arcade.enable(boulder);
        boulder.enableBody = true;
        boulder.body.bounce.set(1);
        boulder.body.tilePadding.set(32);
        boulder.animations.add('boulder-l', [0,1,2,3], 10, true);
        boulder.animations.add('boulder-r', [3,2,1,0], 10, true);
        boulder.body.velocity.x=150;
        boulder.immoveable=true;
    
    
}

function trapUpdate(){
        boulder.body.velocity.y=0;
        if (boulder.body.velocity.x!=-150){
            boulder.body.velocity.x=150;
        }
}