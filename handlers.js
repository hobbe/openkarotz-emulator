/*!
 * OpenKarotz Emulator
 *
 * Copyright (c) 2013 Olivier Bagot (http://github.com/hobbe/openkarotz-emulator)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * http://opensource.org/licenses/MIT
 *
 */

'use strict';

var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var karotz = require('./karotz');
var log = require('./log');

/**
 * Handler for home page.
 * @param res - result
 * @param req - request
 */
function homepage(res, req) {
	log.trace('homepage: begin');

	var body = '<html>'
	        + '<head>'
	        + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
	        + '<title>OpenKarotz Emulator</title>'
	        + '</head>'
	        + '<body>'
	        + '<h1>OpenKarotz Emulator</h1>'
	        + '<h2>API</h2>'
	        + '<ul>'
	        + '<li><a target="results" href="/cgi-bin/sleep">sleep</a></li>'
	        + '<li><a target="results" href="/cgi-bin/wakeup?silent=0">wakeup</a>, <a target="results" href="/cgi-bin/wakeup?silent=1">wakeup(silent)</a></li>'
	        + '<li><a target="results" href="/cgi-bin/reboot">reboot</a></li>'
	        + '<li><a target="results" href="/cgi-bin/status">status</a></li>'
	        + '<li><a target="results" href="/cgi-bin/get_version">get_version</a></li>'
	        + '<li><a target="results" href="/cgi-bin/get_free_space">get_free_space</a></li>'
	        + '<li><a target="results" href="/cgi-bin/leds">leds</a></li>'
	        + '<li><a target="results" href="/cgi-bin/ears">ears</a></li>'
	        + '<li><a target="results" href="/cgi-bin/ears_reset">ears_reset</a></li>'
	        + '<li><a target="results" href="/cgi-bin/ears_random">ears_random</a></li>'
	        + '<li><a target="results" href="/cgi-bin/sound?id=bip">sound(id)</a>, <a target="results" href="/cgi-bin/sound?url=http://play/sound">sound(url)</a></li>'
	        + '<li><a target="results" href="/cgi-bin/sound_control?cmd=quit">sound_control(quit)</a>, <a target="results" href="/cgi-bin/sound_control?cmd=pause">sound_control(pause)</a></li>'
	        + '<li><a target="results" href="/cgi-bin/tts?text=Hello%20World">tts</a></li>'
	        + '</ul>' + '</body>' + '</html>';

	res.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	res.write(body);
	res.end();
	log.trace('homepage: end');
}
exports.homepage = homepage;

function sendResponse(res, data) {
	log.trace('sendResponse: ' + data);
	res.writeHead(200, {
	    'Content-Type' : 'text/plain',
	    'Access-Control-Allow-Origin' : '*'
	});
	res.write(data);
	res.end();
}

function getParameter(req, param, defaultValue) {
	var qs = url.parse(req.url).query;
	var value = querystring.parse(qs)[param];
	if (value === undefined) {
		return defaultValue;
	}
	return value;
}

function sleep(res, req) {
	log.trace('sleep: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is already sleeping."}';
	} else {
		karotz.sleep();
		data = '{"return":"0"}';
	}

	sendResponse(res, data);
	log.trace('sleep: end');
}
exports.sleep = sleep;

function wakeup(res, req) {
	log.trace('wakeup: begin');
	var silent = getParameter(req, "silent");

	karotz.wakeup();

	var data = '{"return":"0","silent":"' + silent + '"}';
	sendResponse(res, data);
	log.trace('wakeup: end');
}
exports.wakeup = wakeup;

function reboot(res, req) {
	log.trace('reboot: begin');

	karotz.reboot();

	var data = '{"return":"0"}';
	sendResponse(res, data);
	log.trace('reboot: end');
}
exports.reboot = reboot;

function status(res, req) {
	log.trace('status: begin');

	var sleep = karotz.isSleeping() ? 1 : 0;
	var sleepTime = karotz.getSleepTime();

	var data = '{"version":"201",'
		+ '"ears_disabled":"0",'
		+ '"sleep":"' + sleep + '",'
		+ '"sleep_time":"' + sleepTime + '",'
		+ '"led_color":"0000FF",'
		+ '"led_pulse":"1",'
		+ '"tts_cache_size":"4",'
		+ '"usb_free_space":"-1",'
		+ '"karotz_free_space":"148.4M",'
		+ '"eth_mac":"00:00:00:00:00:00",'
		+ '"wlan_mac":"01:23:45:67:89:AB",'
		+ '"nb_tags":"4",'
		+ '"nb_moods":"305",'
		+ '"nb_sounds":"14",'
		+ '"nb_stories":"0",'
		+ '"karotz_percent_used_space":"37",'
		+ '"usb_percent_used_space":""}';

	sendResponse(res, data);
	log.trace('status: end');
}
exports.status = status;

function get_version(res, req) {
	log.trace('get_version: begin');
	var data = '{"version":"200","return":"0"}';
	sendResponse(res, data);
	log.trace('get_version: end');
}
exports.get_version = get_version;

function get_free_space(res, req) {
	log.trace('get_free_space: begin');
	var data = '{"karotz_percent_used_space":"37","usb_percent_used_space":"-1"}';
	sendResponse(res, data);
	log.trace('get_free_space: end');
}
exports.get_free_space = get_free_space;

function leds(res, req) {
	log.trace('leds: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else {
		var color = getParameter(req, "color", "00FF00");
		var color2 = getParameter(req, "color2", "000000");
		var pulse = getParameter(req, "pulse", "0");
		var no_memory = getParameter(req, "no_memory", "0");
		var speed = getParameter(req, "speed", "");
		// TODO: handle blink parameter?

		// TODO: store this data in karotz

		data = '{"color":"' + color + '",'
			+ '"secondary_color":"' + color2 + '",'
			+ '"pulse":"' + pulse + '",'
			+ '"no_memory":"' + no_memory + '",'
			+ '"speed":"' + speed + '",'
			+ '"return":"0"}';
	}

	sendResponse(res, data);
	log.trace('leds: end');
}
exports.leds = leds;

function ears(res, req) {
	log.trace('ears: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else if (karotz.isEarsDisabled()){
		data = '{"return":"1","msg":"Unable to perform action, ears disabled."}';
	} else {
		var left = getParameter(req, "left");
		var right = getParameter(req, "right");
		// var noreset = getParameter(req, "noreset", "0"); // Unused

		if (left === undefined || right === undefined) {
			data = '{"return":"1","msg":"Missing mandatory parameters."}';
		} else {
			// TODO: store this data in karotz
			data = '{"left":"' + left + '","right":"' + right + '","return":"0"}';
		}
	}

	sendResponse(res, data);
	log.trace('ears: end');
}
exports.ears = ears;

function ears_reset(res, req) {
	log.trace('ears_reset: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else if (karotz.isEarsDisabled()){
		data = '{"return":"1","msg":"Unable to perform action, ears disabled."}';
	} else {
		// TODO: store this data in karotz
		data = '{"return":"0"}';
	}

	sendResponse(res, data);
	log.trace('ears_reset: end');
}
exports.ears_reset = ears_reset;

function ears_random(res, req) {
	log.trace('ears_random: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else if (karotz.isEarsDisabled()){
		data = '{"return":"1","msg":"Unable to perform action, ears disabled."}';
	} else {
		var left = Math.floor((Math.random() * 15) + 1);
		var right = Math.floor((Math.random() * 15) + 1);

		// TODO: store this data in karotz
		data = '{"left":"' + left + '","right":"' + right + '","return":"0"}';
	}


	sendResponse(res, data);
	log.trace('ears_random: end');
}
exports.ears_random = ears_random;

function sound(res, req) {
	log.trace('sound: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else {
		var id = getParameter(req, "id");
		var url = getParameter(req, "url");

		if (id && url) {
			data = '{"return":"1","msg":"You cannot use ID and URL parameters at the same time."}';
		} else if ((id === undefined) && (url === undefined)) {
			data = '{"return":"1","msg":"No sound to play."}';
		} else if (id) {
			data = '{"return":"0"}';
			// data = '{"return":"1","msg":"Unable to find sound : ' + id + '"}';
		} else {
			data = '{"return":"0"}';
		}
	}

	sendResponse(res, data);
	log.trace('sound: end');
}
exports.sound = sound;

function sound_control(res, req) {
	log.trace('sound_control: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else {
		var cmd = getParameter(req, "cmd");
		if (cmd === undefined) {
			data = '{"return":"1","msg":"No command specified."}';
		} else {
			data = '{"return":"0","cmd":"' + cmd + '"}';
		}
	}

	sendResponse(res, data);
	log.trace('sound_control: end');
}
exports.sound_control = sound_control;

function tts(res, req) {
	log.trace('tts: begin');

	var data = '';
	if (karotz.isSleeping()) {
		data = '{"return":"1","msg":"Unable to perform action, rabbit is sleeping."}';
	} else {
		var text = getParameter(req, "text");
		var voice = getParameter(req, "voice", "margaux");
		// var speed = getParameter(req, "speed"); // Unused
		var nocache = getParameter(req, "nocache", 0);
		// var engine = getParameter(req, "engine"); // Unused

		if (text === undefined) {
			data = '{"return":"1","msg":"Missing mandatory parameter(s)."}';
		} else {
			data = '{"played":"1","cache":"' + (nocache == 0 ? 1 : 0) + '","return":"0","voice":"' + voice + '"}';
		}
	}

	sendResponse(res, data);
	log.trace('tts: end');
}
exports.tts = tts;
