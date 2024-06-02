"use strict";

function cat(argv) {
	if (argv.length > 1) {
		printf("cat accepts only one argument.");
		return;
	}

	let fileContents = fopen(argv[0]).contents;
	printf(`\n${fileContents}\n`);
}