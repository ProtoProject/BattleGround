// 전역변수 바인딩.
var game = {};
var entity = {};

var images = {};
var loadingCount = 0;

define(['jquery','animation'], function($, Animation){
    // 테스트 유닛 생성.
    // 아군 유닛
    var swordman1 = {};
    swordman1.unitName = "swordman";
    swordman1.entryNum = 1;

    var spearman2 = {};
    spearman2.unitName = "spearman";
    spearman2.entryNum = 2;

    var warrior3 = {};
    warrior3.unitName = "warrior";
    warrior3.entryNum = 3;

    // 적 유닛
    var spearman4 = {};
    spearman4.unitName = "spearman";
    spearman4.entryNum = 4;

    var warrior5 = {};
    warrior5.unitName = "warrior";
    warrior5.entryNum = 5;

    var swordman6 = {};
    swordman6.unitName = "swordman";
    swordman6.entryNum = 6;

    var units = [];
    units.push(swordman1);
    units.push(spearman2);
    units.push(warrior3);
    units.push(spearman4);
    units.push(warrior5);
    units.push(swordman6);

    // canvas 객체
    var canvas = document.getElementById('stage');
    canvas.setAttribute('width', 600);
    canvas.setAttribute('height', 400);

    // 모듈 생성/시작
    new Animation(canvas , units).start();
});
