function boulder(game,x,y){
    boulder1 = game.add.sprite(152,530, 'boulder');
    game.physics.arcade.enable(boulder1);
    boulder1.enableBody = true;
    boulder1.body.bounce.set(1);
    boulder1.body.tilePadding.set(32);
    boulder1.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder1.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder1.body.velocity.y=150;
    boulder1.immoveable=true;
    
    boulder2 = game.add.sprite(825,1335, 'boulder');
    game.physics.arcade.enable(boulder2);
    boulder2.enableBody = true;
    boulder2.body.bounce.set(1);
    boulder2.body.tilePadding.set(32);
    boulder2.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder2.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder2.body.velocity.y=150;
    boulder2.immoveable=true;
}

function trapUpdate(){
    boulder1.body.velocity.x=0;
    if (boulder1.body.velocity.y!=-150){
        boulder1.body.velocity.y=150;
    }
    if (boulder1.body.y > 1165){
        boulder1.body.velocity.y=-150;
    }
    if (boulder1.body.y < 530){
        boulder1.body.velocity.y=150;
    }

    boulder2.body.velocity.x=0;
    if (boulder2.body.velocity.y!=-150){
        boulder2.body.velocity.y=150;
    }
    if (boulder2.body.y < 765){
        boulder2.body.velocity.y=150;
    }
}