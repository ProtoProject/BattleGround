/**
 * Created by vaslife on 13. 10. 6..
 */
define(
    [
    //'text!animation/sprites/warrior.json',
    //'text!animation/sprites/spearman.json',
    //'text!animation/sprites/swordman.json',
    //'text!animation/sprites/assasin.json',
    //'text!animation/sprites/wizard.json'
    'text!animation/sprites/units.json'
    ],

    function(){
    var sprites = {};

    _.each(arguments, function(spriteJson) {
        var sprite = JSON.parse(spriteJson);

        sprites[sprite.name] = sprite;
    });

    return sprites;
});