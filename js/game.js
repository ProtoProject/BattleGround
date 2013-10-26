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
    p1Skill: null, // 스킬에는 스킬효과, 적용 턴 횟수, 대상...... 등이 있어야 할거 같음.
    p2Skill: null
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
        var canvas = document.getElementById('stage');
        canvas.setAttribute('width', 600);
        canvas.setAttribute('height', 400);

        units = GameConfigure.gamePlayer1.cardList.concat(GameConfigure.gamePlayer2.cardList);

        console.log("units === ", units);
        // 모듈 생성/시작
        Animation_Entity = new Animation(canvas , units);
        Animation_Entity.start();

        if(GameConfigure.gamePlayer1 == null || GameConfigure.gamePlayer2 == null){
            alert("플레이어가 없습니다.");
            return;
        }
        console.log("=========== 게임생성 ============");
        console.log(GameConfigure);
    }

// createField() // 맵만들기(맵설정)

    /**
     * 게임 시작
     */
    function playGame(){
        console.log("========== 게임시작 =============");
//    console.log("플레이어1", GameConfigure.gamePlayer1);
//    console.log("플레이어2", GameConfigure.gamePlayer2);
        playBattle();
    }

    /**
     * 게임 재시작
     */
    function reStartGame(){
        // TODO 임시
        if(confirm("재시작 하시겠습니까?")){
            console.log("========== 게임 RESTART =============");
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
//    console.log(p1Cards);
//    console.log(p2Cards);
//    while(p1Cards.length > 0 || p2Cards.length > 0){
        $("#btn_continue").click(function(){
            console.log(p1Cards.length, " // " , p2Cards.length);
            /**
             * TODO 장군컨트롤 추가
             */
            var battelStack = createBattleStack(p1Cards, p2Cards);
            cardBattle(battelStack);
            if(p1Cards.length <= 0){
                alert("P2 WIN!!!");
            }
            else if(p2Cards.length <= 0){
                alert("P1 WIN!!!");
            }
        });
//        while(confirm("계속 하시겠습니까?")){
////        console.log(p1Cards.length, " // " , p2Cards.length);
//            /**
//             * TODO 장군컨트롤 추가
//             */
//            if(p1Cards.length <= 0){
//                alert("P2 WIN!!!");
//                break;
//            }
//            else if(p2Cards.length <= 0){
//                alert("P1 WIN!!!");
//                break;
//            }
//            var battelStack = createBattleStack(p1Cards, p2Cards);
//            cardBattle(battelStack);
//        }
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

    function cardBattle(stack){
        var attackCard;
        var attacker;
        var defendCardidx;
        var defendCard;
        var defender;
        var damage;
        console.log(stack);
        while(stack.length > 0){
            attackCard = stack.pop();
            if(attackCard.hp <= 0){
                console.log(attackCard.user.name, "'s Card ", attackCard, "Die!!!!!");
                continue;
            }
            attacker = attackCard.user;
            defender = GameConfigure.getOpposite(attacker);
//        console.log("length : ", defender.cardList.length);
            defendCardidx = selectTargetCard(defender.cardList);
            defendCard = defender.cardList[defendCardidx];
//        console.log(attackCard, " ===> ", defendCard);
            console.log("name : ", attacker.name, "attackCard : ", attackCard, " ===> defender : ", defendCard.user.name, "defendCard : ", defendCard);
            /**
             damage = attackCard.unitType.atk - defendCard.unitType.def;
             //        console.log("attack : ", attackCard.unitType.atk * attackCard.size, "defend : ", defendCard.unitType.def * defendCard.size, "damage : " + damage);
             damage = damage <= 0 ? 1 : damage;
             defendCard.size -= damage;
             */
            attack(attackCard, defendCard);
            if(defendCard.hp <= 0){
                console.log("defendCard : " + defendCard, "DIE!!!!");
                defender.cardList.splice(parseInt(defendCardidx),1);
                if(defender.cardList.length <= 0){
                    return;
                }
            }
//        console.log(GameConfigure.gamePlayer1.cardList.length, GameConfigure.gamePlayer2.cardList.length);
        }
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
        console.log("===============>", cardList);
        for(var i in cardList){
            if(cardList.hasOwnProperty(i)){
                var card = cardList[i];
                var cardAggro = Math.floor(Math.random() * (100 - card.unitType.agr + 1)) + card.unitType.agr;
//            console.log(i, "==>", "init : ", Card.unitType.agr, " // result : ", cardAggro);
                if(aggroVal < cardAggro){
                    aggroVal = cardAggro;
                    index = i;
                }
            }
        }
//    console.log("selectTargetCard : ", cardList[index], aggroVal);
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
        // TODO 구현
        // TODO Animation객체
        var callback = {
            finish : function(){
                console.log("finish");
            }
        }
        console.log("Animation_Entity", Animation_Entity);
        Animation_Entity.attackTo(attackCard, defendCard, callback);
        damage = attackCard.unitType.atk - defendCard.unitType.def;
//        console.log("attack : ", attackCard.unitType.atk * attackCard.size, "defend : ", defendCard.unitType.def * defendCard.size, "damage : " + damage);
        damage = damage <= 0 ? 1 : damage;
//        defendCard.size -= damage;
        defendCard.hp = defendCard.hp < damage ? 0 : defendCard.hp - damage;
    }

    (function(){
        $("#btn_createGame").click(createGame);
        $("#btn_playGame").click(playGame);
        $("#btn_reStartGame").click(reStartGame);
    })();
});
