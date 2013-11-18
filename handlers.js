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

var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var log = require('./log');

function start(res, req) {
	log.trace('start: begin');

	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
	    '<title>OpenKarotz Emulator</title>'+
	    '</head>'+
	    '<body>'+
		'<h1>OpenKarotz Emulator</h1>'+
		'<h2>API</h2>'+
		'<ul>'+
		'<li><a target="results" href="/cgi-bin/sleep">sleep</a></li>'+
		'<li><a target="results" href="/cgi-bin/wakeup?silent=0">wakeup</a></li>'+
		'<li><a target="results" href="/cgi-bin/reboot">reboot</a></li>'+
		'<li><a target="results" href="/cgi-bin/get_version">get_version</a></li>'+
		'<li><a target="results" href="/cgi-bin/get_free_space">get_free_space</a></li>'+
		'</ul>'+
	    '</body>'+
	    '</html>';

	res.writeHead(200, {'Content-Type' : 'text/html'})
	res.write(body)
	res.end()
	log.trace('start: end')
}
exports.start = start

function sendResponse(res, data) {
	log.trace('sendResponse: ' + data);
	res.writeHead(200, {'Content-Type' : 'text/plain'})
	res.write(data)
	res.end()
}

function getParameter(req, param) {
	var qs = url.parse(req.url).query;
	return querystring.parse(qs)[param];
}

function sleep(res, req) {
	log.trace('sleep: begin');
	var data1 = '{"return":"0"}';
	var data2 = '{"return":"1","msg":"Unable to perform action, rabbit is already sleeping."}';
	// TODO: maintain sleep state
	sendResponse(res, data1);
	log.trace('sleep: end');
}
exports.sleep = sleep

function wakeup(res, req) {
	log.trace('wakeup: begin');
	var silent = getParameter(req, "silent");
	var data = '{"return":"0","silent":"' + silent + '"}';
	sendResponse(res, data);
	log.trace('wakeup: end');
}
exports.wakeup = wakeup

function reboot(res, req) {
	log.trace('reboot: begin');
	var data = '{"return":"0"}';
	sendResponse(res, data);
	log.trace('reboot: end');
}
exports.reboot = reboot

function get_version(res, req) {
	log.trace('get_version: begin');
	var data = '{"version":"200","return":"0"}';
	sendResponse(res, data);
	log.trace('get_version: end');
}
exports.get_version = get_version

function get_free_space(res, req) {
	log.trace('get_free_space: begin');
	var data = '{"karotz_percent_used_space":"45","usb_percent_used_space":"50"}';
	sendResponse(res, data);
	log.trace('get_free_space: end');
}
exports.get_free_space = get_free_space

