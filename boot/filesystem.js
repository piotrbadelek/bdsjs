"use strict";

class File {
	constructor(contents, filename, permissions) {
		this.contents = contents;
		this.filename = filename;
		this.permissions = permissions;
	}
}

class Filesystem {
	constructor(rawData) {
		let json = JSON.parse(rawData);

		function traverse(base, path) {
			for (let directory in base) {
				let path1 = `${path}/${directory}`;
				if (typeof base[directory] === "object") {
					// It's a directory
					traverse(base[directory], path1);
				} else {
					// It's a file
					base[directory] = new File(store(path1), path1, 777);
				}
			}
		}

		traverse(json, "");

		this.FAT = json;
	}
}

function fopen(filename) {
	let file = window.fs;
	let path = filename.split("/");
	path.shift();
	for (let directory of path) {
		file = file[directory];
	}
	return file;
}

function fexists(filename) {
	let file = window.fs;
	let path = filename.split("/");
	path.shift();
	for (let directory of path) {
		if (!file[directory]) {
			return false;
		}
		file = file[directory];
	}
	return true;
}

function fwrite(file, contents) {
	let filesystem = window.fs;
	let path = [];

	if (file instanceof File) {
		path = file.filename.split("/");
	} else {
		path = file.split("/");
	}

	path.shift();
	for (let directory of path) {
		filesystem = filesystem[directory];
	}
	filesystem.contents = contents;
	return true;
}

function fdelete(file) {
	let filesystem = window.fs;
	let path = [];

	if (file instanceof File) {
		path = file.filename.split("/");
	} else {
		path = file.split("/");
	}

	path.shift();
	path.pop();
	for (let directory of path) {
		filesystem = filesystem[directory];
	}

	delete filesystem[path[path.length - 1]];

	return true;
}

function fcreate(filename, file) {
	let FAT = window.fs;
	let path = filename.split("/");
	path.shift();
	for (let i = 0; i < path.length; i++) {
		let directory = path[i];
		if (FAT[directory]) {
			FAT = FAT[directory];
		} else {
			if (i === path.length - 1) {
				FAT[directory] = file ? file : new File("", filename, 777);
			} else {
				FAT[directory] = {};
				FAT = FAT[directory];
			}
		}
	}
}

function persistFS() {
	let FAT = structuredClone(window.fs);
	function traverse(base, path) {
		for (let directory in base) {
			let path1 = `${path}/${directory}`;
			if (base[directory].contents) {
				store(path1, base[directory].contents);
				base[directory] = true;
			} else {
				if (directory !== "dev") {
					if (typeof base[directory] === "object") {
						// It's a directory
						traverse(base[directory], path1);
					} else {
						// It's a file
						base[directory] = new File(store(path1), path1, 777);
					}
				}
			}
		}
	}

	traverse(FAT, "");
	store("fileAllocationTable", JSON.stringify(FAT));
}
