/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13. 9. 14
 * Time: 오후 1:29
 * To change this template use File | Settings | File Templates.
 */
//1.1 lockOn : 단일한 적 유닛에 대한 피격확률을 높인다.
//

/**
 * 상태편 카드의 arg확를을 올린다.
 */
var lockOn = function(target, value){
    //
    this.name = "집중공격";
    this.target = target;
    this.effect = function(){
        console.log("lockOn");
        var olderVal = target.unitType.agr;
        target.unitType.agr += value;
        // TODO 원복은 callback으로 던져주면 되려나?
    }
}

/**
 * 1.2 진형 : 진형에 따른 방어력 강화 혹은 데미지 공유.
 * 1.2.1 포메이션은 둘 이상의 유닛을 묶는다. 포메이션으로 그룹핑한 유닛들은 단일한 공격으로
 * 취급되기도 한다. 2.5배 정도의 공격 효과.
 * 1.2.2 포메이션으로 묶인 유닛들은 데미지를 공유한다.
 * 1.2.3 단 포메이션은 유닛을 상당히 느리게 만든다.
 * 1.2.4 포메이션이 무너지면 유닛은 패널티를 당한다.
 */
var formation = function(){
    this.name = "진형";
    this.effect = function(){
        console.log("formation");
    }
}
//1.3 호위 : 아군 유닛 하나를 선택하여 다른 한 유닛의 공격을 대신 받는다.
//
//1.4 위장 / 매복 : 선택한 유닛은 한 턴을 쉬고, 치명타를 입힌다.(확률)
//
//1.5 공격전술 : 특정 아군 유닛이 상성이 약한 상대유닛을 우선 공격하도록 한다.
//
//2. 지원형
//
//2.1 제련술(공격력버프) : 해당 턴 또는 지속적 효과로 공격력을 높인다.
//
//2.2 피갑연구(방어력 버프) : 해당 턴 또는 지속적 효롸로 방어력을 높인다.
//
//2.3 독려(공속버프) : 유닛의 공격속도를 높여 선제 공격을 가능하도록 한다.
//
//2.4 병참술(보급) : 유닛의 체력을 높인다.
//
//2.5 연구 : 특정유닛계열에 대한 공격 효율을 일정 턴 기간 동안 높인다.
//
//2.6 모집 : 민병대 유닛을 전투중 참여시킬 수 있다. (해당 턴에만 지원됨.)
//
//2.7 휴전협정 : 자신의 유닛 한 단위와 상대 단위의 유닛 간의 공방을 중지한다.(상성이 약한
//
//아군유닛을 강한 상대방 유닛과 함께 무력화할 수 있다.)
//
//3. 모략가형
//
//3.1. 선동(혼란)  :
//
//3.2. 인질 : 한 턴 동안 적 유닛의 공격을 중지 시킨다.
//
//3.3  암흑 : 적 유닛의 공격성공율을 낮춘다.(아군의 회피율 상승)
//
//3.4  침묵 : 적 히어로의 스킬 사용을 취소 시킨다.(확률)
//
//3.5  도발 : 적의 공격력을 높이는 대신 방어율을 낮춘다.(확률)
//
//3.6  매수 : 한 턴 적이 적을 공격하게 한다.(확률)
//
//3.7  반격 : 한 턴 적의 공격에 대해 반격한다.
//
//3.8  염탐 : 다음 턴의 적 히어로의 기술을 확인한다.
//
//3.9  강요 : 랜덤하게 적 히어로의 특정 스킬을 봉쇄한다.

var general = {
    skill : [
        new lockOn(),
        {
            name : "skill1",
            effect : function(){console.log("skill1")}
        },
        {
            name : "skill2",
            effect : function(){console.log("skill2")}
        }
    ]
}

//general.skill.lockOn();

function returnSoldier(){
    return{
        name : "보병",
        hp : 300
    }
};

function returnArchor(){
    return{
        name : "궁수",
        hp : 200
    }
}

$(document).ready(
function selectSkill(){
    var skillList = general.skill;
    lockOn.name = "123";
    // TODO 영웅의 스킬목록을 자겨와서 스킬메뉴 만들기
    var $option;
    for(var i in skillList){
        if(skillList.hasOwnProperty(i)){
            $option = $("<option>" + skillList[i].name + "</option>");
            $option.val(i);
            $("#skillMenu").append($option);
        }
    }
})

/**
 * 스킬 사용하기
 */
var changeEvent = function(hero){
    /*********** TEST ************/
    hero = general;
    /*********** TEST ************/
    var skillIdx = $("#skillMenu").val();
    hero.skill[skillIdx].effect();
};

/**
 * 영웅의 스킬 사용
 *
 * 1. 자신의 턴이 돌아오면 영웅의 스킬을 사용 할 수 있다.
 * 2. 사용할 스킬을 선택한다.
 * 2-1. 스킬이 대상을 필요로 하는 스킬이라면 대상을 선택한다.
 *
 */
