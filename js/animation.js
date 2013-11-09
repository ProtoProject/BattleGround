/**
 * Created by vaslife on 13. 10. 12..
 */
define(
    [   'animation/sprites',
        'animation/entry',
        'animation/renderer',
        'animation/effector'],
    function(Sprite, Entry, Renderer, Effector){

    var animation = Class.extend({
        init : function(entityCanvas, effectCanvas, units){
            this.fps = '10';
            this.entry = new Entry(units);
            this.renderer = new Renderer(entityCanvas, this.entry);
            this.effector = Effector;
            this.effector.init(effectCanvas);
        },

        start : function(){
            var self = this;
            window.setInterval(
                function(){
                    self.renderer.update(self.renderer);
                    self.effector.update();
                }, 1000/this.fps);
        },

        showStartMessage : function(){
            this.renderer.popupMessage("Start Game", 1000, 50, 100);
        },

        attackTo : function(attacker, defender, callback){
            setTimeout(callback, 1000);
        },

        drawDone : function(){

        },

        drawTitle: function(text) {
            var x = 300,
                y = 150,
                strokeSize = 1,
                color = '#990066',
                strokeColor = 'red';
            this.renderer.drawText(text, x, y, 40, true, strokeSize, color, strokeColor);
        }
    })

    return animation;
});