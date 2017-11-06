
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