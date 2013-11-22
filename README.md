# OpenKarotz Emulator #

## Description ##

HTTP server written in Node.js to emulate OpenKarotz.

Current version 0.1.0 is still in development but usable.

OpenKarotz can be found [here](http://openkarotz.filippi.org/).

The following APIs are available:
- clear_cache
- clear_snapshots
- ears
- ears_mode
- ears_random
- ears_reset
- get_free_space
- get_version
- leds
- radios_list
- reboot
- reset_install_flag
- sleep
- snapshot
- snapshot_ftp (no FTP upload)
- snapshot_get
- snapshot_list
- sound
- sound_control
- sound_list
- status
- tts
- voice_list
- wakeup

The following Apps are available:
- clock
- moods


## Usage ##

1. Install [Node.js](http://nodejs.org/).

2. Run `emulator.bat` or:

		node index.js

3. Open web browser on [http://localhost](http://localhost) to view available APIs.

4. Call any of the APIs from your application, eg. [http://localhost/cgi-bin/status](http://localhost/cgi-bin/status)
