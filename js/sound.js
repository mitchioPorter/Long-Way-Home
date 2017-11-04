function sound(song){
    //sound
        fx = game.add.audio('crunch');
        fx.allowMultiple = true;
        fx.addMarker('player_hit', 0, 0.5);
    
        // Music
        music = game.add.audio(song);
        music.loop = true;
        music.play();
    
}