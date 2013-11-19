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

var log = require('./log');

var version = "200";
var sleeping = true;
var sleepTime = new Date().getTime();
var earsDisabled = false;
var earsLeft = 0;
var earsRight = 0;
var ledsColor1 = "00FF00";
var ledsColor2 = "000000";
var ledsPulse = false;
var ledsSpeed = 700;


exports.getVersion = function() {
	return version;
};

exports.isSleeping = function() {
	return sleeping;
};

exports.getSleepTime = function() {
	return sleepTime;
};

exports.isEarsDisabled = function() {
	return earsDisabled;
};

exports.getEarsLeft = function() {
	return earsLeft;
};

exports.getEarsRight = function() {
	return earsRight;
};

exports.getLedsColor = function() {
	return ledsColor1;
};

exports.getLedsColor2 = function() {
	return ledsColor2;
};

exports.isLedsPulse = function() {
	return ledsPulse;
};

exports.getLedsSpeed = function() {
	return ledsSpeed;
};


function sleep() {
	sleeping = true;
	sleepTime = new Date().getTime();
	return sleeping;
};
exports.sleep = sleep;

function wakeup() {
	sleeping = false;
	sleepTime = 0;
	return sleeping;
};
exports.wakeup = wakeup;

function reboot() {
	wakeup();
	return sleeping;
};
exports.reboot = reboot;

function leds(color1, color2, pulse, speed) {
	if (color1) ledsColor1 = color1;
	if (color2) ledsColor2 = color2;
	if (pulse) ledsPulse = pulse;
	if (speed) ledsSpeed = speed;
}
exports.leds = leds;

function ears(left, right) {
	if (left) earsLeft = left;
	if (right) earsRight = right;
}
exports.ears = ears;
