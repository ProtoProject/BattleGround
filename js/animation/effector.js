/**
 * Created by vaslife on 13. 11. 9..
 */
define(['animation/sprites', 'lib/underscore.min'], function(sprites, underscore){
    var that = this;
    var callbacks = [];
    var taskList = [];

    var init = function(canvas){
        that.context = canvas.getContext('2d');
        that.effects = new Image();
        that.effects.src = "img/effects.png";
    };

    var update = function(){

        
        _.each(taskList, function(task, index){
            if(task.maxFrame == task.currentFrame){
                taskList[index]
                task.callback();
            }else{

            }
        });
    }

    var attack = function(){

    };

    var attacked = function(entry, callback){
        var task = {
            entry : entry,
            maxFrame : 10,
            currentFrame : 1,
            name : 'attacked',
            callback : callback
        };

        taskList.push(task);
    };

    var executeCallback = function(){
        _.each(callbacks, function(callback){
            callback();
        });
        callbacks = [];
    }

    return {
        init : init,
        update : update,
        attacked : attacked
    }
});