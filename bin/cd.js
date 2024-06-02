"use strict";

function cd(argv) {
	if (!argv[0] || argv[0] === ".") {
		return;
	}
	let path = argv[0];

	if (path === "..") {
		function removeLastSection(path) {
			const pathParts = path.split("/");
			pathParts.pop();
			return pathParts.join("/");
		}

		window.cwd = removeLastSection(window.cwd);
		if (window.cwd === "") {
			window.cwd = "/";
		}
	} else 	if (path.charAt(0) === "/") {
		// Absolute path
		window.cwd = path;
	} else {
		// Relative path
		window.cwd += path;
	}
}