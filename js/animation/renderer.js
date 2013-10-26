/**
 * Created by vaslife on 13. 10. 12..
 */
define(['animation/sprites'],function(sprites){

   var renderer = Class.extend({
      init : function(canvas, entry){
            // 캔버스 객체
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.sprites = sprites;
            // 유닛컨테이너
            this.entry = entry;
            this.spritesheet = new Image();
            this.spritesheet.src = "img/Character.png";
            this.background = new Image();
            this.background.src = "img/Background.jpg";
      },

      draw : function(self, callback){
            var context = self.context;
            context.clearRect(0, 0, self.canvas.width, self.canvas.height);
            var entryList = self.entry.entryList;
            context.drawImage(self.background, 0, 0);
          _.each(entryList, function(entry){
                // 배경 그리기
                context.save();
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
                    context.scale(-1, 1);
                    positionX = -1 * positionX;
                }
                // 유닛그림자 그리기
                self.drawEllipse(self, positionX + width/2, positionY + (height*1) - 5, width, 10);

                // 유닛그리기
                context.drawImage(self.spritesheet,
                  offsetX, offsetY, width, height,
                  positionX, positionY,
                  width,height);

                // 유닛 HP 표시
                context.restore();
                if(entry.entryNum > 3){
                    positionX = position.x - sprite.frame.width + 12;
                }else{
                    positionX += 12;
                }

                self.drawHpBar(self, entry, positionX, positionY);

            });
          //           callback();
      },

      drawHpBar : function(self, entry, positionX, positionY){
          var context = self.context;
          var maxHp = entry.maxHp;
          var hp = entry.hp
          context.font = "10px Arial";
          context.fillText(entry.hp + '/' + entry.maxHp, positionX, positionY - 8);

          // hp bar box
          var barWidth = 30;
          var barPosY = positionY - 3;
          var barColor = "green";
          var hpRatio = hp/maxHp;

          if(hpRatio < 0.7 && hpRatio > 0.4){
              barColor = "yellow";
          }
          else if(hpRatio < 0.4){
              barColor = "red";
          }

          context.beginPath();
          context.lineWidth = "0.5";
          context.strokeStyle = barColor;
          context.rect(positionX, positionY - 3, barWidth, 3);
          context.stroke();

          context.beginPath();
          context.lineWidth = "1";
          context.strokeStyle = barColor;
          context.rect(positionX, positionY - 2, barWidth * hpRatio, 1);
          context.stroke();

      },

      drawEllipse : function (self, centerX, centerY, width, height) {
        var context = self.context;
        context.beginPath();

        context.moveTo(centerX, centerY - height/2);

        context.bezierCurveTo(
            centerX + width/2, centerY - height/2,
            centerX + width/2, centerY + height/2,
            centerX, centerY + height/2);

        context.bezierCurveTo(
            centerX - width/2, centerY + height/2,
            centerX - width/2, centerY - height/2,
            centerX, centerY - height/2);

        context.fillStyle = "black";
        context.fill();
        context.closePath();
    }


   });

    return renderer;

});
