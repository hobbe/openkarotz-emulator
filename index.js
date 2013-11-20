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
var server = require('./server');
var router = require('./router');
var handlers = require('./handlers');

var handle = {};
handle['/'] = handlers.homepage;
handle['/cgi-bin'] = handlers.homepage;
handle['/cgi-bin/ears'] = handlers.ears;
handle['/cgi-bin/ears_random'] = handlers.ears_random;
handle['/cgi-bin/ears_reset'] = handlers.ears_reset;
handle['/cgi-bin/get_free_space'] = handlers.get_free_space;
handle['/cgi-bin/get_version'] = handlers.get_version;
handle['/cgi-bin/leds'] = handlers.leds;
handle['/cgi-bin/reboot'] = handlers.reboot;
handle['/cgi-bin/sleep'] = handlers.sleep;
handle['/cgi-bin/snapshot'] = handlers.snapshot;
handle['/cgi-bin/snapshot_get'] = handlers.snapshot_get;
handle['/cgi-bin/snapshot_list'] = handlers.snapshot_list;
handle['/cgi-bin/sound'] = handlers.sound;
handle['/cgi-bin/sound_control'] = handlers.sound_control;
handle['/cgi-bin/status'] = handlers.status;
handle['/cgi-bin/tts'] = handlers.tts;
handle['/cgi-bin/voice_list'] = handlers.voice_list;
handle['/cgi-bin/wakeup'] = handlers.wakeup;

log.info('OpenKarotz Emulator');
server.start(router.route, handle);
