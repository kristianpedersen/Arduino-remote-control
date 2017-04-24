var pubnub5;
var uniqueid;
var hueValue = 0;
var transparentOverlay;

var starInfo = [];
var starNoise = [];
var rndspeed = [];
var moonAnimation = false;

var lol = 0;
var waveSine = 0;
var fpsText = 60;

var moonInfo = {
    x: 75,
    y: 75,
    size1: 100,
    size2: 150
};

var numberOfWaves = 10;
var moonSize = 100;

function setup() {
    createCanvas(600, 400);
    colorMode(HSB, 100, 100, 100, 100);
    stroke(100);
    rectMode(CORNER);
    smooth();
    makeStars(100);
    for (var i = 0; i < numberOfWaves; i++) {
        rndspeed.push(random(5));
    }

    uniqueid = PUBNUB.uuid();
    pubnub5 = PUBNUB.init({
        publish_key: 'pub-c-57c4c5d7-373c-4901-b8c4-f0c53d7cb7e2',
        subscribe_key: 'sub-c-8ff7e03a-6d6c-11e6-80e7-02ee2ddab7fe',
        uuid: uniqueid
    });
    pubnub5.subscribe({
        channel: "rgblol",
        message: handleMessage
    });
}

function draw() {
    gradient("vertical", 60, 55, 20);
    for (var i = 0; i < starInfo.length; i++) {
        drawStar(
            starInfo[i].x,
            starInfo[i].y,
            starInfo[i].starSize + map(noise(lol + (i / 10) * 100), 0, 1, -1, 1)
        );
    }

    moon();

    waves(numberOfWaves);
    waveSine += 0.001;
    lol += 0.01;
    moonShine(height / 2 + 50);
    moonShine(height - height / 3 - +50);
    moonShine(height - height / 5 - 50);
    transparentOverlay = createGraphics(300, 200);
    var farge = colorsys.hsl_to_rgb(map(hueValue, 0, 255, 0, 100), 50, 50);
    transparentOverlay.fill(farge.r, farge.g, farge.b, 150)
    transparentOverlay.rect(0, transparentOverlay.height - (50), 300, 50);
    transparentOverlay.textSize(100);
    transparentOverlay.text("Hei!", 0, 0)
    image(transparentOverlay, 0, 0, 600, 400)
    displayFrameCount();
    textSize(20);

    text(`Hue: ${~~(hueValue * 1.8)}°`, 10, height-10);
}

function makeStars(numberOfStars) {
    for (var i = 0; i < numberOfStars; i++) {
        this.x = random(width);
        this.y = random(height / 3);
        this.starSize = random(2);
        starInfo.push({
            x: this.x,
            y: this.y,
            starSize: this.starSize,
            noise: 0
        });
        noiseSeed(i);
        starNoise.push(noise(lol));
    }
}

function drawStar(x, y, size) {
    fill(15, 20, 80);
    ellipse(x, y, size);
}

function gradient(direction, hue1, hue2, resolution) {
    noStroke();
    if (direction === "vertical") {
        for (var i = 0; i < height; i += height / resolution) {
            var hue = map(i, 0, height, hue1, hue2);
            var brightness = map(i, 0, height, 30, 75);
            fill(hue, 100, brightness);
            rect(0, i, width, width / resolution);
        }
    }
    fill(lerp(hue1, hue2, 0), 100, 30);
    rect(0, 0, width, height / resolution * 8);
}

function moon() {
    if (moonAnimation) {
        var target = moonInfo.size2;
        moonSize += (target - moonSize) * 0.05;
    } else if (!moonAnimation && moonSize > moonInfo.size1) {
        var target = moonInfo.size1;
        moonSize += (target - moonSize) * 0.05;
    }
    fill(hueValue/2, 20, 100);
    ellipse(moonInfo.x + (hueValue * 5), moonInfo.y, moonSize)
    var pass = moonSize / 2;
    // image(img, (moonInfo.x - pass) + (hueValue * 5), moonInfo.y - pass, moonSize, moonSize)
}

function waves(y) {
    fill(80, 100, 35, 20);
    for (var i = 0; i <= y; i++) {
        var ykoord = map(i, 0, y, height / 2, height);

        beginShape();
        vertex(0, ykoord);
        for (var x = 0; x < width; x += 50) {
            vertex(x, ykoord + sin(rndspeed[i % y] + waveSine * rndspeed[i] + (x)) * 10);
        }
        vertex(width, ykoord);
        endShape();
    }
}

function moonShine(y) {
    fill(hueValue/2, 30, 70);
    noStroke();
    push();
    translate(width / 2, y);
    vertex(0, 0);
    beginShape();
    for (var i = 0; i < 10; i++) {
        vertex(sin(i + y + lol) * 2000, abs(cos(i + lol)) * 10);
    }
    endShape();
    pop();
}

function displayFrameCount() {
    stroke(100, 0, 100, 100);
    fill(100, 0, 100, 100);
    textSize(20);
    if (frameCount % 15 === 0) {
        fpsText = Math.floor(frameRate());
    }
    text(fpsText + " FPS", width - 70, height - 10);
}

function mouseClicked(event) {
    if (event.target.tagName !== "INPUT") {
        moonAnimation = !moonAnimation;
    }
}

function handleMessage(m) {
    if (m != undefined) {
        var farge = map(m.color, 0, 255, 0, 100);
    }
    hueValue = farge;
}
