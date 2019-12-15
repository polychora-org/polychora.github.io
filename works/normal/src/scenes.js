var prependAssetDir = function (d) { return 'assets/' + d;};

Crafty.scene('Loading', function(){
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);

  Crafty.load(['casino.jpg',
               'theater.gif',
               'tails.gif',
               'iknow.mp3',
               'treefingers.mp3',
               'gruss.png',
               'krampus.jpg'].map(prependAssetDir), function() {

    Crafty.sprite(48, 36, 'assets/tails.gif', {PlayerSprite: [0,0]})
 
    Crafty.scene('Game');
  })
});

Crafty.scene('Game', function() {
  Crafty.background("url(assets/casino.jpg)");
  Player = Crafty.e('Player');

  Crafty.e("2D, DOM, Image, Collision")
    .attr({x: Game.width() - 80})
    .collision()
    .onHit("Player", function () {
      Crafty.scene('End');
    })
    .image("assets/theater.gif");
  myFollow(Player);
  Crafty.audio.play('treefingers.mp3');
});

Crafty.scene('End', function() {
  Crafty.background('black');
  Player.destroy();
  var gruss = Crafty.e('Gruss');
  Crafty.viewport.centerOn(gruss, 0);
  Crafty.audio.stop();
  Crafty.audio.play('iknow.mp3');
  Crafty.e('Delay').delay(function () {
    Crafty.e('Krampus');
  }, 2400, 0)
  Crafty.e('Delay').delay(function () {
    window.location.href = "about:blank";
  }, 33000, 0)
})