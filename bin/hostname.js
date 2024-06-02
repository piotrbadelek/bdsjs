"use strict";

function hostname(argv) {
	if (argv.length === 0) {
		printf(`\n${window.HOSTNAME}\n`);
	} else if (argv.length === 1) {
		if (argv[0] === "-b") {
			printf("\nNew hostname required.\n")
		}
	} else if (argv.length === 2) {
		window.HOSTNAME = argv[1];
	}
}