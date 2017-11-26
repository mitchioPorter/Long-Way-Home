
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

function groupInitializer(){
    
    plates = game.add.group();
    potions = game.add.group();
    coins = game.add.group();
    gates = game.add.group();
    boulders = game.add.group();
}

function createGate(game,x,y){
        gate = game.add.sprite(x, y, 'gate');
        gates.add(gate);
        gate.anchor.setTo(0.5, 1);
        game.physics.enable(gate);
        gate.body.allowGravity = false;
        gate.body.immovable = true;
        gate.body.moves = false;
        gate.body.setSize(48,48);
        gate.animations.add('closed', [0], 10, true);
        gate.animations.add('open', [1], 10, true);
        gate.animations.play('closed');
    
}

function createPressurePlate(game,x,y){
        
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
                game.physics.arcade.overlap(press, enemies, pressedPlate, null, this);
            }
        if(game.time.now > press.lastPressed + 50){
            press.animations.play('off');
           
        }
    });
    if(game.time.now > plateTime + 5){
            plateActive =false;
           
        }
    gates.forEachAlive(function(gate){
        if (gate.visible && gate.inCamera){
          if(plateActive == true){
              gate.animations.play('open');
          }
        else{
            gate.animations.play('closed');
        }
        }
    });
    
}

function pressedPlate(press,player){
    press.lastPressed = game.time.now;
    press.animations.play('on');
    plateActive = true;
    plateTime = game.time.now;
    
}