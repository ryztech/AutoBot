var Q = Quintus({ audioSupported: [ 'mp3' ] })
    .include("Sprites, Scenes, Input, 2D, Touch, UI, Audio")
    .setup({
        width: 960,
        height: 640
    })
    .controls()
    .touch()
    .enableSound();
 
//Q.gravityY = 9.8;
 
var objectFiles = [
    './src/sprites/player',
    './src/sprites/enemies',
    './src/audio'
];
 
require(objectFiles, function () {
    //creating scene on stage

    var enemyAssets = [
//        ["EnemyToAvoid", {x: 400, y: 3220, asset: "enemies/security-guard.png"}],
        ["EnemyToAvoid", {x: 800, y: 3220, asset: "enemies/security-guard.png"}],
        ["EnemyToAvoid", {x: 400, y: 3020, asset: "enemies/security-guard.png"}]
    ];

    Q.scene("firstStreet",function(stage) {
        var background = new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex: 0, sheet: 'tiles', tileW: 70, tileH: 70, type: Q.SPRITE_NONE });  //Q.SPRITE_NONE nocoll
        stage.insert(background);
        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex:1,  sheet: 'tiles', tileW: 70, tileH: 70 }));
        // add player onto scene
        var player = stage.insert(new Q.Player());
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h});

        stage.loadAssets(enemyAssets);
    });

    Q.scene("endGame",function(stage) {
        alert("game over");
        window.location = "";
    });

    Q.load("tiles_map.png, player.png, firstStreet.tmx, enemies/security-guard.png", function() { //creating stage (layer)
        Q.sheet("tiles","tiles_map.png", { tilew: 70, tileh: 70});
        Q.stageScene("firstStreet");
    });
});