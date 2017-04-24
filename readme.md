# Control Arduino using PubNub

I made this last year. Sorry for the messy code and layout. :/

On Windows, when doing `git clone https://github.com/kristianpedersen/Arduino-remote-control.git`, make sure you're not on the C:\ drive. 
When I ran `npm install` from desktop, `node_modules` didn't get created.

1. `npm install`
2. `node index.js`
3. Launch index.html anywhere, and it will control an Arduino RGB LED connected to pins 9, 10 and 11.


## To do

Fix the linearly increasing memory leak. This wonderful webpage will inevitably crash. :D