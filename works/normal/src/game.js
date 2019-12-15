myFollow = (function () {
            var oldTarget, offx, offy;

            function change() {
                Crafty.viewport.scroll('_x', -(this.x + (this.w / 2) - (Crafty.viewport.width / 2) - offx));
                Crafty.viewport._clamp();
            }

            return function (target, offsetx, offsety) {
                if (oldTarget)
                    oldTarget.unbind('Change', change);
                if (!target || !target.has('2D'))
                    return;
                Crafty.viewport.pan('reset');

                oldTarget = target;
                offx = (typeof offsetx != 'undefined') ? offsetx : 0;
                offy = (typeof offsety != 'undefined') ? offsety : 0;

                target.bind('Change', change);
                change.call(target);
            };
        })();

Game = {
  width: function() {
    return 512;
  },
  height: function() {
    return 480;
  },
  start: function() {
    Crafty.init(Game.width(), Game.height(), document.getElementById('game'));
    Crafty.background("white");
    Crafty.scene('Loading');
  }
};

$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'black', 'text-align': 'center' };