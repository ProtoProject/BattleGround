/**
 * Created by vaslife on 13. 10. 12..
 */
define(['animation/sprites','animation/entry', 'animation/renderer'],function(Sprite, Entry, Renderer){

    var animation = Class.extend({
        init : function(canvas, units){
            this.fps = '13';
            this.entry = new Entry(units);
            this.renderer = new Renderer(canvas, this.entry);
        },

        start : function(){
            var self = this;
            window.setInterval(function(){self.renderer.draw(self.renderer)}, 1000/this.fps);
        },

        attackTo : function(attacker, defender, callback){
            this.entry.changeState(attacker.entryNum, 'attack');
            this.entry.changeState(defender.entryNum, 'defense');
        },

        dying : function(target, callback){
            this.entry.chageState(target.entryNum, 'dying');
        },

        drawDone : function(){

        }
    })

    return animation;
});