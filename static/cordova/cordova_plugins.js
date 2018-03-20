cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
        "id": "cordova-plugin-qqsdk.QQSDK",
        "file": "plugins/cordova-plugin-qqsdk/www/qq.js",
        "pluginId": "cordova-plugin-qqsdk",
        "clobbers": [
          "QQSDK"
        ]
      }
    ];
    module.exports.metadata = 
    // TOP OF METADATA
    {
      "cordova-plugin-whitelist": "1.3.3",
      "cordova-plugin-crosswalk-webview": "2.3.0",
      "cordova-plugin-qqsdk": "0.9.6"
    };
    // BOTTOM OF METADATA
    });