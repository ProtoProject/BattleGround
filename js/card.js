/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13. 8. 31
 * Time: 오후 12:23
 * To change this template use File | Settings | File Templates.
 */
define([],function(){
    var Card = function(entryNum, player, cardConf){
        this.entryNum = entryNum;
        this.user = player;
        this.size = cardConf.size;
        this.unitType = cardConf.unitType;
        this.cardSpd = this.unitType.spd / this.size;
        this.state = "";
    };

    var disp_Card = function(entryNum, player, cardConf){
        console.log(entryNum);
        this.entryNum = entryNum;
        // animation을 위한 속성
        this.unitName = cardConf.unitType.name;
        this.hp = cardConf.size;
        this.maxHp = cardConf.size;
        this.state = "idle",
        // logic을 위한 속성
        this.user = player;
        this.size = cardConf.size;
        this.unitType = cardConf.unitType;
        this.cardSpd = this.unitType.spd / this.size;
    };

    UnitType = {
        swordman : {name : "swordman", atk : 80, def : 40, cost : 10, spd : 1, agr : 50},
        spearman : {name : "spearman", atk : 60, def : 30, cost : 15, spd : 3, agr : 10},
        warrior : {name : "warrior", atk : 90, def : 60, cost : 20, spd : 2, agr : 70}
    };

    Hero = {
        general : {
            name : "장군",
            skill : {
                lockOn : {
                    name : "집중공격",
                    turn : 3,
                    init : function(){
                        return GameConfigure.gamePlayer1.cardList[0].maxHp;
                    },
                    effect : function(target){
                        console.log("lockOn");
                        GameConfigure.gamePlayer1.cardList[0].maxHp = 9999;
                    },
                    rollback : function(oldValue){
                        GameConfigure.gamePlayer1.cardList[0].maxHp = oldValue;
                    }
                },
                skill2 : {
                    name : "으헤헤헤",
                    turn : 2,
                    init : function(){
                    },
                    effect : function(target){
                    }
                },
                skill3 : {
                    name : "skill3",
                    effect : function(target){
                        console.log("lockOn");
                        console.log(target);
                    }
                }
            }
        },
        strategist : {
            name : "전략가",
            skill : {
                skill1 : {
                    name : "skill1",
                    effect : function(target){
                        console.log("skill1");
                        console.log(target);
                    }
                },
                skill2 : {
                    name : "skill2",
                    effect : function(target){
                        console.log("skill2");
                        console.log(target);
                    }
                },
                skill3 : {
                    name : "skill3",
                    effect : function(target){
                        console.log("skill3");
                        console.log(target);
                    }
                }
            }
        },
        tricker : {
            name : "모사가",
            skill : {
                skill1 : {
                    name : "skill1",
                    effect : function(target){
                        console.log("skill1");
                        console.log(target);
                    }
                },
                skill2 : {
                    name : "skill2",
                    effect : function(target){
                        console.log("skill2");
                        console.log(target);
                    }
                },
                skill3 : {
                    name : "skill3",
                    effect : function(target){
                        console.log("skill3");
                        console.log(target);
                    }
                }
            }
        }
    }

    /**
     * 카드 생성
     * @param player
     * @param cardConfList
     * @returns {Array}
     */
    function createCard(player, cardConfList){
        var cardList = [];
        for(var i in cardConfList){
            if(cardConfList.hasOwnProperty(i)){
                console.log("gamePalyer ====", player);
//                cardList.push(new Card(player.id *3 + i + 1, player, cardConfList[i]));
                cardList.push(new disp_Card(player.id * 3 + parseInt(i) + 1, player, cardConfList[i]));
            }
        }
        return cardList;
    }

    //========== Test Data =================================

    var player1 = {
        playerId : 0,
        name : "p1",
        hero : Hero.general,
        cardConfList : [
            {
                unitType : UnitType.swordman,
                size : 76
            },
            {
                unitType : UnitType.spearman,
                size : 56
            },
            {
                unitType : UnitType.warrior,
                size : 54
            }
        ]
    }

    var player2 = {
        playerId : 1,
        name : "p2",
        hero : Hero.strategist,
        cardConfList : [
            {
                unitType : UnitType.warrior,
                size : 41
            },
            {
                unitType : UnitType.spearman,
                size : 65
            },
            {
                unitType : UnitType.spearman,
                size : 76
            }
        ]
    }

    return {
        player1 : player1,
        player2 : player2,
        createCard : createCard
    }
});
