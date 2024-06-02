"use strict";

function ls(argv) {
	let path = argv[0] ?? window.cwd;
	path = path.split("/");
	path.shift();
	let workingDirectory = window.fs;
	// traverse to directory
	if (path[0] !== "") {
		for (let i = 0; i < path.length; i++) {
			if (!workingDirectory[path[i]]) {
				printf(`
ls: File not found: ${path[i]}
`);
				return;
			}

			if (workingDirectory[path[i]] instanceof File) {
				printf(`\nls: ${path[i]} is not a directory.\n`);
				return;
			}

			workingDirectory = workingDirectory[path[i]];
		}
	}

	for (let file in workingDirectory) {
		printf(`\n${file}\n`);
	}
}