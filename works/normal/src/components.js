Crafty.c('Player', {
    init: function() {
        this.requires('2D, DOM, SpriteAnimation, PlayerSprite, Collision, Fourway')
            .collision()
            .reel('PlayerFlyingRight', 500, 0, 0, 8)
            .reel('PlayerFlyingLeft', 500, 0, 1, 8)
            .animate('PlayerFlyingRight', -1)
            .fourway(1);

        this.bind('NewDirection', function(data) {
          if (data.x > 0) {
            this.animate('PlayerFlyingRight', -1);
          } else if (data.x < 0) {
            this.animate('PlayerFlyingLeft', -1);
          } 
        });
        var dur = 120,
            sine = Array.apply(null, Array(dur)).map(function (_, i) {
                return Math.sin((i/dur) * Math.PI * 2); 
            }),
            boundRight = 500,
            boundBottom = 300;

        this.bind('EnterFrame', function (e) {
            this.y += sine[e.frame % sine.length];
            if (this.x < 0 || this.x > boundRight) {
                this.x = Crafty.math.clamp(this.x, 0, boundRight);
            }
            if (this.y < 0 || this.y > boundBottom) {
                this.y = Crafty.math.clamp(this.y, 0, boundBottom);
            }

        });
        Player = this;
    }
});

Crafty.c('Gruss', {
    init: function() {
        this.requires('2D, DOM, Image')
            .attr({ x: 0, y: Game.height()/2 - 36, w: Game.width() })
            .image('assets/gruss.png');
    }
})

Crafty.c('Krampus', {
    randomJump: function(e) {
        if (e.frame % 2 == 0)
            this.attr({ x: Crafty.math.randomInt(-100,Game.width()-100), y: Crafty.math.randomInt(-100,Game.height()-300)});
    },
    init: function() {
        this.requires('2D, DOM, Image')
            .attr({w: 200})
            .image('assets/krampus.jpg')
            .bind("EnterFrame", this.randomJump);
    },
})