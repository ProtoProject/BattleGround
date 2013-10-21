/**
 * Created by vaslife on 13. 10. 12..
 */
define(function(){

    var entry = Class.extend({
        init : function(unitList){
            var self = this;
            this.entryMap = {};
            this.entryList = [];
            _.each(unitList, function(unit){
                var entry = {};
                unit.state = 'idle';
                self.entryMap[unit.entryNum] = unit;
                self.entryList.push(unit);
            });
        },

        changeState : function(id, state){
            var unit = this.entryMap[id];
            unit.state = state;
        },

        entryPosition : function(entryNum){
            var position = {};

            switch (entryNum){
                case 1:
                    position.x = 70;
                    position.y = 65 * 2;
                    break;
                case 2:
                    position.x = 100;
                    position.y = 65 * 3;
                    break;
                case 3:
                    position.x = 70;
                    position.y = 65 * 4;
                    break;
                case 4:
                    position.x = 500;
                    position.y = 65 *2;
                    break;
                case 5:
                    position.x = 470;
                    position.y = 65 *3;
                    break;
                case 6:
                    position.x = 500;
                    position.y = 65 *4;
                    break;
            }
            return position;
        }
    });

    return entry;
});