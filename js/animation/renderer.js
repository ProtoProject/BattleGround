/**
 * Created by vaslife on 13. 10. 12..
 */
define(['animation/sprites'],function(sprites){

   var renderer = Class.extend({
      init : function(entityCanvas, entry){
            // 캔버스 객체
            this.entityCanvas = entityCanvas;
            this.sprites = sprites;
            // 유닛컨테이너
            this.entry = entry;
            this.spritesheet = new Image();
            this.spritesheet.src = "img/units.png";
            this.background = new Image();
            this.background.src = "img/Background.jpg";
      },

       /**
        * 게임 화면그리기
        *
        * @param self
        * @param callback
        */
      update : function(){
            var context = this.entityCanvas.getContext('2d');
            // 배경 그리기
            context.clearRect(0, 0, this.entityCanvas.width, this.entityCanvas.height);
            var entryList = this.entry.entryList;
            context.drawImage(this.background, 0, 0);
          var that = this;
          _.each(entryList, function(entry){
                context.save();
                // 스프라이트 정보
                var unitsprites = that.sprites['unitsprites'];
                var frameName = entry.unitName;
                if(entry.state != 'die'){
                    if(entry.state == 'attacked'){
                        frameName += '-attacked';
                    }
                    if(entry.entryNum > 3){
                        frameName += '-mirror';
                    }
                }else{
                    frameName = 'tombstone';
                }
                var frame = unitsprites.frames[frameName].frame;
                var offsetX = frame.x;
                var offsetY = frame.y;
                var width = frame.w;
                var height = frame.h;

                var position = that.entry.entryPosition(entry.entryNum);
                var positionX = position.x;
                var positionY = position.y;


//                console.log('card Number: ' + entry.entryNum + ', state :' + entry.state );
                if(entry.state == 'attacked'){
                    var adjustNum = Math.floor(Math.random()*5);
                    adjustNum *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                    positionX = positionX + adjustNum;
                }
                else if(entry.state == 'attack'){
                    if(entry.entryNum > 3){
                        positionX -= 15;
                    }else {
                        positionX += 15;
                    }
                }

                if(entry.state != 'die'){
                    // 유닛그림자 그리기
                    that.drawEllipse(positionX + width/2, positionY + (height*1) - 5, width, 10);
                }

                // 유닛그리기
                context.drawImage(that.spritesheet,
                  offsetX, offsetY, width, height,
                  positionX, positionY,
                  width,height);

                if(entry.state != 'die'){
                    // 유닛 HP 표시
                    positionX += 12;
                    that.drawHpBar(entry, positionX, positionY);
                }

                // check callback

            });
          //           callback();
      },

       /**
        * 유닛 hp바 그리기
        *
        * @param self
        * @param entry
        * @param positionX
        * @param positionY
        */
      drawHpBar : function(entry, positionX, positionY){
          var context =this.entityCanvas.getContext('2d');
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

       /**
        * 타원그리기
        *
        * @param self
        * @param centerX
        * @param centerY
        * @param width
        * @param height
        */
      drawEllipse : function (centerX, centerY, width, height) {
        var context = this.entityCanvas.getContext('2d');
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
       },

       setCallback : function (callback){
            this.callbackTrigger = {callback:callback, fired:false};
       },

       drawAttack : function(){

       },

       drawText : function(text, x, y, size, centered, strokeSize, color, strokeColor){
           var ctx = this.context;
           if(text && x && y) {
               ctx.save();
               if(centered) {
                   ctx.textAlign = "center";
               }
               ctx.font = 'italic '+size+'pt Calibri';
               ctx.strokeStyle = strokeColor || "#373737";
               ctx.lineWidth = strokeSize;
               ctx.strokeText(text, x, y);
               ctx.fillStyle = color || "white";
               ctx.fillText(text, x, y);
               ctx.restore();
           }
       }
   });

    return renderer;

});
