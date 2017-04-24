const colorsys = require("colorsys");
const PubNubInstance = require("pubnub");
const arduino = require("johnny-five");

const pubnub = new PubNubInstance({
    publishKey: "pub-c-57c4c5d7-373c-4901-b8c4-f0c53d7cb7e2",
    subscribeKey: "sub-c-8ff7e03a-6d6c-11e6-80e7-02ee2ddab7fe",
    ssl: true
});

pubnub.subscribe({
    channels: ['rgblol']
});

const board = new arduino.Board();
board.on("ready", () => {
    const led = new arduino.Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        }
    });
    var test = pubnub.addListener({
        message: (m) => {
            var receivedColor = colorsys.hsl_to_hex({
                h: m.message.color,
                s: 100,
                l: 50
            })
            console.log(receivedColor);
            led.color(receivedColor);
        }
    })
    led.on();
    led.color("#ff0000");
    console.log(test);
})
