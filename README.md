## Votally
### Requirements:
Node: v3.3.0
Mongo: v3.0.x

## To run:

```
npm install
bower install
cd server && npm install
cd ..
grunt platform:add:android //interchagable with ios

grunt plugin:add:https://github.com/driftyco/ionic-plugins-keyboard.git
grunt plugin:add:org.apache.cordova.device
grunt plugin:add:org.apache.cordova.network-information
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-whitelist
cordova plugin add org.apache.cordova.media-capture
cordova plugin add org.apache.cordova.file-transfer
cordova plugin add cordova-plugin-camera

grunt platform build:android
grunt platform emulate:android
cd server && npm start
```
