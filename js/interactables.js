
//door stuff

function door(game,x,y){
        doors = game.add.group();
        door = game.add.sprite(x, y, 'door');
        doors.add(door);
        door.anchor.setTo(0.5, 1);
        game.physics.enable(door);
        door.body.allowGravity = false;
        door.body.immovable = true;
        door.body.moves = false;
        door.body.setSize(48,48);
 
}

function openDoor (player, door){
    door.kill();    
    player1.kill();
    changeState2();
}


function pressurePlate(game,x,y){
        plates = game.add.group();
        pressurePlate = game.add.sprite(x, y, 'pressurePlate');
        plates.add(pressurePlate);
        pressurePlate.anchor.setTo(0.5, 1);
        game.physics.enable(pressurePlate);
        pressurePlate.body.allowGravity = false;
        pressurePlate.body.immovable = true;
        pressurePlate.body.moves = false;
        pressurePlate.body.setSize(48,48);
        pressurePlate.animations.add('off', [0], 10, true);
        pressurePlate.animations.add('on', [1], 10, true);
        pressurePlate.animations.play('off');
        pressurePlate.lastPressed = 0;
 
}
function pressurePlateUpdater(){
    plates.forEachAlive(function(press){
        if (press.visible && press.inCamera){
                game.physics.arcade.overlap(press, player1, pressedPlate, null, this);
                game.physics.arcade.overlap(press, player2, pressedPlate, null, this);
            }
        if(game.time.now > press.lastPressed + 50){
            press.animations.play('off');
            
        }
    });
    
}

function pressedPlate(press,player){
    press.lastPressed = game.time.now;
    press.animations.play('on');
    
}