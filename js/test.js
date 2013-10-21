/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13. 8. 31
 * Time: 오전 11:39
 * To change this template use File | Settings | File Templates.
 */

/** 테스트용 */
function cardBattle2(stack){
    var arr = [
        {label : "1st", value : 100},
        {label : "2nd", value : 220},
        {label : "3rd", value : 333}
    ];

    modifyArr(arr);
}

function modifyArr(arr){
    console.log("변경 전 : " + arr);

//    var temp = arr[1];
//    temp.value = 999;

    var arr2 = arr;
    arr2.splice(1,1);
    console.log("arr2 : ", arr2);

    console.log("arr : ", arr);
}

//cardBattle2();

var testCardList = [
    {no : "1", agr : 90},
    {no : "2", agr : 30},
    {no : "3", agr : 10}
];

//var first = 0, second = 0, third = 0;
//for(var k = 0; k < 1000 ; k++){
//    var idx = selectTargetCard(testCardList);
////    console.log(idx);
//    switch(idx){
//        case "0" : first++; break;
//        case "1" : second++; break;
//        case "2" : third++; break;
//    }
//}
////console.log(first, second, third);

var Effect = function (addStr, addSpd, turn){
    this.addStr = addStr;
    this.addSpd = addSpd;
    this.turn = turn;
    this.getAddStr = function(){
        return this.addStr;
    }
    this.getAddSpd = function(){
        return this.addSpd;
    }
    this.playTurn = function(){
        if(this.turn > 0){
            this.turn--;
        }
        else{
            this.addStr = 0;
            this.addSpd = 0;
        }
    }
};

var test1 = new Effect(11, 12, 1);
var test2 = new Effect(33, 55, 3);

(function(){
    while(confirm("continue?")){
        test1.playTurn();
        test2.playTurn();
        console.log(test1.addStr, test1.addSpd, test1.turn);
        console.log(test2.addStr, test2.addSpd, test2.turn);
    }
})();