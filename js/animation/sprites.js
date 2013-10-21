/**
 * Created by vaslife on 13. 10. 6..
 */
define(
    ['text!animation/sprites/warrior.json',
    'text!animation/sprites/spearman.json',
    'text!animation/sprites/swordman.json'],

    function(){
    var sprites = {};

    _.each(arguments, function(spriteJson) {
        var sprite = JSON.parse(spriteJson);

        sprites[sprite.name] = sprite;
    });

    return sprites;
});