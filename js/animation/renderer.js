/**
 * Created by vaslife on 13. 10. 12..
 */
define(['animation/sprites'],function(sprites){
   var renderer = Class.extend({
      init : function(canvas, entry){
            // 캔버스 객체
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.sprites = sprites;
            // 유닛컨테이너
            this.entry = entry;
            this.spritesheet = new Image();
            this.spritesheet.src = "img/Character.png";
            this.background = new Image();
            this.background.src = "img/Background.jpg";
      },

      draw : function(self, callback){
            var ctx = self.ctx;
            ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            var entryList = self.entry.entryList;
            ctx.drawImage(self.background, 0, 0);
          _.each(entryList, function(entry){
                // 배경 그리기
                ctx.save();
                // 스프라이트 정보
                var sprite = self.sprites[entry.unitName];
                var offsetX = sprite.frame.offsetX;
                var offsetY = sprite.frame.offsetY;
                var width = sprite.frame.width;
                var height = sprite.frame.height;

                var position = self.entry.entryPosition(entry.entryNum);
                var positionX = position.x;
                var positionY = position.y;

                if(entry.entryNum > 3){
                    ctx.scale(-1, 1);
                    positionX = -1 * positionX;
                }

                // 유닛포지션
                ctx.drawImage(self.spritesheet,
                  offsetX, offsetY, width, height,
                  positionX, positionY,
                  width,height);

                // 유닛 HP 표시
                ctx.restore();
                if(entry.entryNum > 3){
                    positionX = position.x - sprite.frame.width + 12;
                }else{
                    positionX += 12;
                }

                var maxHp = entry.maxHp;
                var hp = entry.hp
                ctx.font = "10px Arial";
                ctx.fillText(entry.hp + '/' + entry.maxHp, positionX, positionY);


            });
          //           callback();
      }


   });

    return renderer;

});
