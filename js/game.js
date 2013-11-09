/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13. 8. 31
 * Time: 오전 11:39
 * To change this template use File | Settings | File Templates.
 */

/**
 * 게임 설정값
 */
var GameConfigure = {
    gamePlayer1: null,
    gamePlayer2: null,
    fieldType: "forest",
    turnNum: 1,
    text: "aa",
    getOpposite : function(player){
        if(this.gamePlayer1 == player){
            return this.gamePlayer2;
        }
        else{
            return this.gamePlayer1;
        }
    },
    ActiveSkillList : [],
    p1Skill: null, // 플레이어1이 사용한 스킬. 스킬에는 스킬효과, 적용 턴 횟수, 대상...... 등이 있어야 할거 같음.
    p2Skill: null
};

/**
 * 스킬사용
 * 1. 여러턴에 걸처서 효과가 유지 가능해야함.
 * 2. 유효턴이 지나면 원복되야함.
 * 3. 매턴마다 스킬을 사용할 수 있으므로 게임턴이 진행될때는 여러스킬의 효과가 중첩될 수 있음.
 * 4.
 */
var GameSkillHandler = function(){
    //console.log("GameConfigure.ActiveSkillList", GameConfigure.ActiveSkillList);
    for(var i in GameConfigure.ActiveSkillList){
        if(GameConfigure.ActiveSkillList.hasOwnProperty(i)){
            var activeSkill = GameConfigure.ActiveSkillList[i];

            if(!activeSkill.getSkill()) continue;

            //console.log("누가쓴 스킬?", activeSkill.getOwner.name);
            // TODO 유효턴 동안 반복사용 여부 구현
            if(activeSkill.getTurn() > 0){
                activeSkill.useSkill();
            }
            else{
                activeSkill.revertState();
                activeSkill.clear();
            }
        }
    }
};

/**
 * 스킬 사용을 위한 객체
 * @param player
 * @returns {{getTurn: Function, getSkill: Function, setSkill: Function, getTurn: Function, getOwner: Function, clear: Function, useSkill: Function, revertState: Function}}
 */
var skillFunc = function(player){
    var owner = player;
    var skillName = null;
    var skillTurn = 0;
    var skillObj = null;
    var rollbackObj = null;
//    var isUsePerTurn = true;
    var oldValue = 0;
    return {
        getTurn : function(){
            return skillTurn;
        },
        getSkill : function(){
            return skillObj;
        },
        setSkill : function(heroSkill){
            skillName = heroSkill.name;
            skillTurn = heroSkill.turn;
            skillObj = heroSkill.effect;
            rollbackObj = heroSkill.rollback;
            oldValue = heroSkill.init();
        },
        getTurn : function(){
            return skillTurn;
        },
        getOwner : function(){
            return owner;
        },
        clear : function(){
            skillTurn = 0;
            skillObj = null;
        },
        useSkill : function(){
            skillObj(this);
            skillTurn--;
        },
        revertState : function(){
            if(rollbackObj){
                rollbackObj(oldValue);
            }
        }
//        getOldValue : function(){
//            return oldValue;
//        },
//        setOldValue : function(val){
//            oldValue = val;
//        }
    }
};

var Animation_Entity;

require(['jquery', 'card', 'animation', "lib/class", "lib/underscore.min"], function($, Card, Animation){
/**
 * 플레이어 객체
 * @param playerConf
 */
var gamePlayer  = function(playerConf){
    this.id = playerConf.playerId;
    this.name = playerConf.name;
    this.cardList = Card.createCard(this, playerConf.cardConfList);
    this.hero = playerConf.hero;
};

/**
 * 플레이어 생성
 * @param player
 * @returns {gamePlayer}
 */
function createPlayer(player){
    return new gamePlayer(player);
}
    /**
     *  게임 생성
     */
    function createGame(){
        if(GameConfigure.gamePlayer1 != null || GameConfigure.gamePlayer2 != null){
            alert("게임이 생성되어있습니다.");
            return;
        }

        // 플레이어 생성
        var player = createPlayer(Card.player1); // 임시 플레이어 생성
        GameConfigure.gamePlayer1 = player;
        player = createPlayer(Card.player2);
        GameConfigure.gamePlayer2 = player;

        // canvas 객체
        var entityCanvas = document.getElementById('entity');
        entityCanvas.setAttribute('width', 600);
        entityCanvas.setAttribute('height', 400);

        var effectCanvas = document.getElementById('effect');
        effectCanvas.setAttribute('width', 600);
        effectCanvas.setAttribute('height', 400);

        units = GameConfigure.gamePlayer1.cardList.concat(GameConfigure.gamePlayer2.cardList);

        //console.log("units === ", units);
        // 모듈 생성/시작
        Animation_Entity = new Animation(entityCanvas, effectCanvas, units);
        Animation_Entity.start();

        if(GameConfigure.gamePlayer1 == null || GameConfigure.gamePlayer2 == null){
            alert("플레이어가 없습니다.");
            return;
        }
        setSkillList();
        //console.log("=========== 게임생성 ============");
        //console.log(GameConfigure);
    }

// createField() // 맵만들기(맵설정)

    function setSkillList(){
        //
        p1_skillList = GameConfigure.gamePlayer1.hero.skill;
        p2_skillList = GameConfigure.gamePlayer2.hero.skill;
        var sk1 = new skillFunc(GameConfigure.gamePlayer1);
//        sk1.setSkill({name : "A", turn: 3, effect : null});
        var sk2 = new skillFunc(GameConfigure.gamePlayer2);
//        sk1.setSkill({name : "B", turn: 6, effect : null});
        //console.log(">>>>>>SKILLFUNCTION<<<<<<<<", sk1, sk2);
        //console.log("setSkillList");
        //console.log(p1_skillList, p2_skillList);
        var $sel_p1Skill = $("#p1_skillMenu");
        var $sel_p2Skill = $("#p2_skillMenu");
        for(var i in p1_skillList){
            if(p1_skillList.hasOwnProperty(i)){
                var skill = p1_skillList[i];
                $sel_p1Skill.append("<option value='" + i + "'>" + skill.name + "</option>");
            }
        }
        $sel_p1Skill.change(function(){
            var selectedSkill = $(this).val();
//            p1_skillList[selectedSkill].effect();
//            GameConfigure.p1Skill = p1_skillList[selectedSkill].effect;
            sk1.setSkill(p1_skillList[selectedSkill]);
            GameConfigure.ActiveSkillList.push(sk1);
        });

        for(i in p2_skillList){
            if(p2_skillList.hasOwnProperty(i)){
                var skill = p2_skillList[i];
                $sel_p2Skill.append("<option value='" + i + "'>" + skill.name + "</option>");
            }
        }
        $sel_p2Skill.change(function(){
            var selectedSkill = $(this).val();
//            p2_skillList[selectedSkill].effect();
//            GameConfigure.p2Skill = p2_skillList[selectedSkill].effect;
            sk2.setSkill(p2_skillList[selectedSkill]);
            GameConfigure.ActiveSkillList.push(sk2);
        });
    }

    /**
     * 게임 시작
     */
    function playGame(){
        console.log("========== 게임시작 =============");
//    //console.log("플레이어1", GameConfigure.gamePlayer1);
//    //console.log("플레이어2", GameConfigure.gamePlayer2);
        playBattle();
    }

    /**
     * 게임 재시작
     */
    function reStartGame(){
        // TODO 임시
        if(confirm("재시작 하시겠습니까?")){
            //console.log("========== 게임 RESTART =============");
            $("#stage").remove();
            $("#gameFiled").append("<canvas id='stage' />");
            GameConfigure.gamePlayer1 = null;
            GameConfigure.gamePlayer2 = null;
            createGame();
            playBattle();
        }
    }

    function playBattle(){
        var p1Cards = GameConfigure.gamePlayer1.cardList;
        var p2Cards = GameConfigure.gamePlayer2.cardList;

//        var battelStack = createBattleStack(p1Cards, p2Cards);
//    //console.log(p1Cards);
//    //console.log(p2Cards);
//    while(p1Cards.length > 0 || p2Cards.length > 0){
        $("#btn_continue").click(function(){
            //console.log(p1Cards.length, " // " , p2Cards.length);
            /**
             * TODO 장군컨트롤 추가
             */
            GameSkillHandler();
            var battelStack = createBattleStack(p1Cards, p2Cards);
            cardBattle2(battelStack);
            if(p1Cards.length <= 0){
                alert("P2 WIN!!!");
            }
            else if(p2Cards.length <= 0){
                alert("P1 WIN!!!");
            }
        });
    }

    /**
     * 전투를 위한 카드 순서 생성
     * @param p1Cards
     * @param p2Cards
     * @returns {Array}
     */
    function createBattleStack(p1Cards, p2Cards){
        var battleStack = p1Cards.concat(p2Cards);
        // 스피드 = 유닛 spd / 유닛수
        battleStack.sort(function(card1, card2){
            return card1.cardSpd - card2.cardSpd;
        });

        return battleStack;
    }

    /**
     * 각 card의 arg값을 최소치로 rand를 돌린다.
     *
     * @param 상대방의 카드 리스트
     * @return 선택된 상대방의 카드 리스트 index
     */
    function selectTargetCard(cardList){
        var index = 0;
        var aggroVal = 0;
//        console.log("===============>", cardList);
        for(var i in cardList){
            if(cardList.hasOwnProperty(i)){
                var card = cardList[i];
                if(card.state == "die") continue;
                var cardAggro = Math.floor(Math.random() * (100 - card.unitType.agr + 1)) + card.unitType.agr;
//            //console.log(i, "==>", "init : ", Card.unitType.agr, " // result : ", cardAggro);
                if(aggroVal < cardAggro){
                    aggroVal = cardAggro;
                    index = i;
                }
            }
        }
//    //console.log("selectTargetCard : ", cardList[index], aggroVal);
//    return cardList[index];
        return index;
    }

    /**
     * 공격
     * @param attacker
     * @param defender
     * @param factor
     */
    function attack(attackCard, defendCard, factor){
        //console.log("Animation_Entity", Animation_Entity);
        damage = attackCard.unitType.atk - defendCard.unitType.def;
//        //console.log("attack : ", attackCard.unitType.atk * attackCard.size, "defend : ", defendCard.unitType.def * defendCard.size, "damage : " + damage);
        damage = damage <= 0 ? 1 : damage;
//        defendCard.size -= damage;
        defendCard.hp = defendCard.hp < damage ? 0 : defendCard.hp - damage;
    };

    (function(){
        $("#btn_createGame").click(createGame);
        $("#btn_playGame").click(playGame);
        $("#btn_reStartGame").click(reStartGame);
    })();

    //=============== TEST =======================
    //=============== TEST =======================
    function cardBattle2(stack){
        console.log("cardStack", stack);
        var attackCard;
        var attacker;
        var defendCardidx;
        var defendCard;
        var defender;

        attackCard = stack.pop();
        if(!attackCard || attackCard.hp <= 0) return;

        // 카드 설정
        attacker = attackCard.user;
        defender = GameConfigure.getOpposite(attacker);
        defendCardidx = selectTargetCard(defender.cardList);
        defendCard = defender.cardList[defendCardidx];
        attack(attackCard, defendCard);

//        if(defendCard.hp <= 0){
//            console.log("defendCard : " + defendCard, "DIE!!!!");
//            defendCard.state = "die";
//            defender.cardList.splice(parseInt(defendCardidx),1);
//            if(defender.cardList.length <= 0){
//                return;
//            }
//        }

        attackCard.state = "attack";
        defendCard.state = "attacked";
        Animation_Entity.attackTo(attackCard, defendCard, function(){
            attackCard.state = "idle";
            defendCard.state = "idle";

            if(defendCard.hp <= 0){
                console.log("defendCard : " + defendCard, "DIE!!!!");
                defendCard.state = "die";
//                defender.cardList.splice(parseInt(defendCardidx),1);
//                if(defender.cardList.length <= 0){
//                    return;
//                }
            }

            var l1 = GameConfigure.gamePlayer1.cardList;
            var l2 = GameConfigure.gamePlayer2.cardList;
            for(var i =0;i<l1.length;i++){
                console.log(l1[i].entryNum, l1[i].state);
            }
            for(var i =0;i<l2.length;i++){
                console.log(l2[i].entryNum, l2[i].state);
            }
            cardBattle2(stack);
        });
    }
    //=============== TEST =======================
    //=============== TEST =======================
});
