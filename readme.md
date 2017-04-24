# Control Arduino using PubNub

I made this last year. Sorry for the messy code and layout. :/

On Windows, when doing `git clone https://github.com/kristianpedersen/Arduino-remote-control.git`, make sure you're not on the C:\ drive. 
When I ran `npm install` from desktop, `node_modules` didn't get created.

1. `npm install && node index.js`
2. Launch index.html, either locally or on a server, and it will control an Arduino RGB LED connected to pins 9, 10 and 11. Try running `node index.js` locally, and [control the Arduino from a website](http://kristianpedersen.no/arduino-remote/)!

Note: I don't know how this is going to work if several people are controlling stuff from my website simultaneously. Please let me know if you run into trouble!

## To do

Fix the linearly increasing memory leak. This wonderful webpage will inevitably crash. :D