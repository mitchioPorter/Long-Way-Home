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
    
    boulder3 = game.add.sprite(850,670, 'boulder');
    game.physics.arcade.enable(boulder3);
    boulder3.enableBody = true;
    boulder3.body.bounce.set(1);
    boulder3.body.tilePadding.set(32);
    boulder3.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder3.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder3.body.velocity.x=300;
    boulder3.immoveable=true;
    
    boulder4 = game.add.sprite(950,630, 'boulder');
    game.physics.arcade.enable(boulder4);
    boulder4.enableBody = true;
    boulder4.body.bounce.set(1);
    boulder4.body.tilePadding.set(32);
    boulder4.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder4.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder4.body.velocity.x= -300;
    boulder4.immoveable=true;
    
    boulder5 = game.add.sprite(800,590, 'boulder');
    game.physics.arcade.enable(boulder5);
    boulder5.enableBody = true;
    boulder5.body.bounce.set(1);
    boulder5.body.tilePadding.set(32);
    boulder5.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder5.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder5.body.velocity.x=300;
    boulder5.immoveable=true;
    
    boulder6 = game.add.sprite(900,550, 'boulder');
    game.physics.arcade.enable(boulder6);
    boulder6.enableBody = true;
    boulder6.body.bounce.set(1);
    boulder6.body.tilePadding.set(32);
    boulder6.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder6.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder6.body.velocity.x=300;
    boulder6.immoveable=true;    

    boulder7 = game.add.sprite(850,510, 'boulder');
    game.physics.arcade.enable(boulder7);
    boulder7.enableBody = true;
    boulder7.body.bounce.set(1);
    boulder7.body.tilePadding.set(32);
    boulder7.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder7.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder7.body.velocity.x=-300;
    boulder7.immoveable=true;
    
    boulder8 = game.add.sprite(700,470, 'boulder');
    game.physics.arcade.enable(boulder8);
    boulder8.enableBody = true;
    boulder8.body.bounce.set(1);
    boulder8.body.tilePadding.set(32);
    boulder8.animations.add('boulder-l', [0,1,2,3], 10, true);
    boulder8.animations.add('boulder-r', [3,2,1,0], 10, true);
    boulder8.body.velocity.x=300;
    boulder8.immoveable=true;
    
    
     boulders.add(boulder1);
     boulders.add(boulder2);
     boulders.add(boulder3);
     boulders.add(boulder4);
     boulders.add(boulder5);
     boulders.add(boulder6);
     boulders.add(boulder7);
     boulders.add(boulder8);
}

function trapUpdate(){
    /*boulder1.body.velocity.x=0;
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
    boulder3.body.velocity.y=0;
    if (boulder3.body.velocity.x!=-300){
        boulder3.body.velocity.x=300;
    }
    boulder4.body.velocity.y=0;
    if (boulder4.body.velocity.x!=-300){
        boulder4.body.velocity.x=300;
    } 
    boulder5.body.velocity.y=0;
    if (boulder5.body.velocity.x!=-300){
        boulder5.body.velocity.x=300;
    }
    boulder6.body.velocity.y=0;
    if (boulder6.body.velocity.x!=-300){
        boulder6.body.velocity.x=300;
    }
    boulder7.body.velocity.y=0;
    if (boulder7.body.velocity.x!=-300){
        boulder7.body.velocity.x=300;
    } 
    boulder8.body.velocity.y=0;
    if (boulder8.body.velocity.x!=-300){
        boulder8.body.velocity.x=300;
    } 
    */

}