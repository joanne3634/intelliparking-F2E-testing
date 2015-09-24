var program = require('commander');

program.version('0.0.1')
	.usage('<file>')
	.parse(process.argv);

if ( program.args.length < 1 ) { throw 'Daemon file not provided'; }

var DaemonRunner = require('../daemon_runner.js');
var daemonPath = require('path').resolve(process.cwd(), program.args[0]);
var Daemon = require(daemonPath);
var runner = new DaemonRunner(Daemon);
runner.start();