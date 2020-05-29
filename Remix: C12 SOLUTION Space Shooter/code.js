var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["10602251-be29-4017-9909-281598bb971d","3b9497a9-28fa-4a54-be23-981e3bae5e76","f4184452-fcdf-471f-b607-cfb5518967ba","d455d9e9-2c12-422b-9439-95757b8e94fb","1a849918-2af5-4018-9fbd-6e8762d888ad"],"propsByKey":{"10602251-be29-4017-9909-281598bb971d":{"name":"animation_1","sourceUrl":null,"frameSize":{"x":30,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"ZHQoxutWt3XyeNmWqJp7OLczYTsZ0f3j","loadedFromSource":true,"saved":true,"sourceSize":{"x":30,"y":30},"rootRelativePath":"assets/10602251-be29-4017-9909-281598bb971d.png"},"3b9497a9-28fa-4a54-be23-981e3bae5e76":{"name":"animation_2","sourceUrl":null,"frameSize":{"x":30,"y":33},"frameCount":1,"looping":true,"frameDelay":12,"version":"iox1TEnEFDq6RihIeDPkvR5HTFvnGwAj","loadedFromSource":true,"saved":true,"sourceSize":{"x":30,"y":33},"rootRelativePath":"assets/3b9497a9-28fa-4a54-be23-981e3bae5e76.png"},"f4184452-fcdf-471f-b607-cfb5518967ba":{"name":"animation_3","sourceUrl":null,"frameSize":{"x":30,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"hCKot96r9BS7GDjLFOBdDMWadrO_frN4","loadedFromSource":true,"saved":true,"sourceSize":{"x":30,"y":30},"rootRelativePath":"assets/f4184452-fcdf-471f-b607-cfb5518967ba.png"},"d455d9e9-2c12-422b-9439-95757b8e94fb":{"name":"animation_4","sourceUrl":null,"frameSize":{"x":30,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"cLT4vKqjX6Ggkm03IkIbjYG6BEBf5_.T","loadedFromSource":true,"saved":true,"sourceSize":{"x":30,"y":30},"rootRelativePath":"assets/d455d9e9-2c12-422b-9439-95757b8e94fb.png"},"1a849918-2af5-4018-9fbd-6e8762d888ad":{"name":"space","sourceUrl":null,"frameSize":{"x":600,"y":721},"frameCount":1,"looping":true,"frameDelay":12,"version":"N6snY251hHMt3Zxif.kBz57sI3Q08wnh","loadedFromSource":true,"saved":true,"sourceSize":{"x":600,"y":721},"rootRelativePath":"assets/1a849918-2af5-4018-9fbd-6e8762d888ad.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var score = 0;

var space = createSprite(0, 0 ,400, 400);
space.setAnimation("space");
space.scale = 2.5;
space.y = space.height/2;



var player = createSprite(190, 375,20,20);
player.setAnimation("animation_4");

var galaxianGroup = createGroup();
var galaxian1Group = createGroup();
var galaxian2Group = createGroup();
var galaxian3Group = createGroup();
var bulletGroup = createGroup();

textSize(14);
textFont("Georgia");
stroke("red");
fill("white");

function draw() {    
  // background(10);
  
  // space.setAnimation("space");
  player.x = World.mouseX;
  createEdgeSprites();
  player.collide(bottomEdge);
  
  space.velocityY = 2;
  
  if (space.y > 500) {
    space.y = space.height/2;
  }
  
  if (keyDown("space")) {
    createBullet(player.x);
  }
  
  if (bulletGroup.isTouching(galaxianGroup)) {
    galaxianGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score + 2;
  } else if (bulletGroup.isTouching(galaxian1Group)) {
    galaxian1Group.destroyEach();
    bulletGroup.destroyEach();
    score = score + 4;
  } else if (bulletGroup.isTouching(galaxian2Group)) {
    galaxian2Group.destroyEach();
    bulletGroup.destroyEach(); 
    score = score + 6;
  } else if (bulletGroup.isTouching(galaxian3Group)) {
    galaxian3Group.destroyEach();
    bulletGroup.destroyEach();
    score = score + 8;
  }
  
  if (galaxianGroup.isTouching(bottomEdge)) {
    score = score - 2;
  }
  
  var select_enemy = randomNumber(0,3);
  
  if (World.frameCount % 100 == 0) {
    if (select_enemy == 0) {
      createGalaxian();
    } else if (select_enemy == 1) {
      createGalaxian1();
    } else if (select_enemy == 2) {
      createGalaxian2();
    } else {
      createGalaxian3();
    }
    if (score%4 ==0) {
  space.velocityY = -(6 + 3*score/2);
    }
  }
  
  drawSprites();
  text("PLAYER SCORE: "+ score, 10, 20);
}


function createGalaxian() {
  var galaxian = createSprite(randomNumber(0, 400), 0, 10, 10);
  galaxian.setAnimation("animation_2");
  galaxian.velocityY = 0.7;
  galaxian.lifetime = 1000;
  galaxianGroup.add(galaxian);
}

function createGalaxian1() {
  var galaxian1 = createSprite(randomNumber(0, 400), 0, 10, 10);
  galaxian1.setAnimation("animation_2");
  galaxian1.velocityY = 0.7;
  galaxian1.lifetime = 1000;
  galaxian1Group.add(galaxian1);
}

function createGalaxian2() {
  var galaxian2 = createSprite(randomNumber(0, 400), 0, 10, 10);
  galaxian2.setAnimation("animation_1");
  galaxian2.velocityY = 0.8;
  galaxian2.lifetime = 1000;
  galaxian2Group.add(galaxian2);
}

function createGalaxian3() {
  var galaxian3 = createSprite(randomNumber(0, 400), 0, 10, 10);
  galaxian3.setAnimation("animation_3")        ;
  galaxian3.velocityY = 1.0;
  galaxian3.lifetime = 1000;
  galaxian3Group.add(galaxian3);
}

function createBullet(x) {
  var bullet= createSprite(100, 100, 5, 10);
  bullet.y = 360;
  bullet.x = x;                                           
  bullet.shapeColor = "red";
  bullet.velocityY = -1;
  bullet.lifetime = 1000;
  bulletGroup.add(bullet);
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
