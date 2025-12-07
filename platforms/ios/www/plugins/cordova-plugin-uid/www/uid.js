cordova.define("cordova-plugin-uid.UID", function(require, exports, module) {
/*
 * Copyright (c) 2020 Darren
 * Distributed under the MIT License.
 * (See accompanying file LICENSE or copy at http://opensource.org/licenses/MIT)
 */
let cordova = require('cordova');

exports = {
	getUID: function (onSuccess, onError) {
		cordova.exec(onSuccess, onError, "UID", "getUID", []);
	},
	getIdfa: function (onSuccess, onError) {
		cordova.exec(onSuccess, onError, "UID", "getIdfa", []);
	},
	requestPermission: function (onSuccess, onError) {
		cordova.exec(onSuccess, onError, "UID", "requestPermission", []);
	}
}

});
