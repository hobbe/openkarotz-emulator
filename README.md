## OpenKarotz Emulator ##

### Description ###

HTTP server written in Node.js to emulate OpenKarotz.

Current version 0.1.0 is still in development but usable.

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

The following APIs are currently available:
- ears
- ears_random
- ears_reset
- leds
- reboot
- sleep
- snapshot
- snapshot_get
- snapshot_list
- sound
- sound_control
- sound_list
- status
- voice_list
- wakeup


### Usage ###

1. Install [Node.js](http://nodejs.org/).

2. Run `emulator.bat` or:

		node index.js

3. Open web browser on [http://localhost](http://localhost) to view available APIs.

4. Call any of the APIs from your application, eg. [http://localhost/cgi-bin/status](http://localhost/cgi-bin/status)
