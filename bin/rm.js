"use strict";

function rm(argv) {
	if (argv.length === 0) {
		printf("\nrm: Requires at least one argument.\n");
		return;
	}

	let workingDirectory = window.fs;
	let path;

	if (argv[0].includes("/")) {
		path = argv[0].split("/");
		path.shift();
	} else {
		if (window.cwd.slice(-1) === "/") {
			path = `${window.cwd}${argv[0]}`;
		} else {
			path = `${window.cwd}/${argv[0]}`;
		}
	}

	for (let i = 0; i < path.length - 1; i++) {
		if (!workingDirectory[path[i]]) {
			printf(`
rm: File not found: ${path[i]}
`);
			return;
		}

		workingDirectory = workingDirectory[path[i]];
	}

	if (path[0] !== "") {
		let workingDirectoryElement = workingDirectory[path[path.length - 1]];
		if (workingDirectoryElement instanceof File) {
			delete workingDirectory[path[path.length - 1]];
			printf("\nFile deleted successfully.\n");
		} else {
			let fileCount = Object.keys(workingDirectoryElement).length;
			delete workingDirectory[path[path.length - 1]];
			printf(`\nDirectory deleted successfully. ${fileCount} files deleted\n`);
		}
	} else {
		let fileCount = Object.keys(workingDirectory).length;
		for (let file in workingDirectory) {
			delete workingDirectory[file];
		}
		printf(`\nDirectory deleted successfully. ${fileCount} files deleted\n`);
	}
}