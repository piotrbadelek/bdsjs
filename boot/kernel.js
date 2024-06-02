"use strict";

window.BOOTED = Date.now();
window.BDS_KERNEL_VERSION = "0.1-generic";

function $(selector) {
	return document.querySelector(selector);
}

function store(name, value) {
	if (name && value === "") {
		localStorage.removeItem(name);
	} else if (name && value) {
		localStorage.setItem(name, value);
	} else if (name) {
		return localStorage.getItem(name);
	} else {
		localStorage.clear();
	}
}


const STDOUT = $("pre");

function printf(message) {
	STDOUT.innerHTML += message;
	return message;
}

function exec(filename, argv) {
	function formatArgument(argument) {
		if (typeof argument === "string") {
			if (argument === "null") {
				return "null";
			} else {
				return `\`${argument}\``;
			}
		} else if (typeof argument === "object") {
			let args = "[";
			argument.forEach(argument => {
				args += formatArgument(argument) + ",";
			});
			args += "]";
			return args;
		}
	}

	let contents;
	if (fexists(`${window.cwd}/${filename}`)) {
		contents = fopen(`${window.cwd}/${filename}`).contents;
	} else {
		contents = fopen(`/bin/${filename}`).contents;
	}

	let args = formatArgument(argv);
	return eval(`${contents};
	${filename}(${args})`);
}

function panic(message) {
	printf(`Kernel panic - not syncing: Fatal exception\n${message}`);
}

const PRELOAD = {
	"bin/echo.js": false,
	"bin/sh.js": false,
	"bin/cat.js": false,
	"bin/hostname.js": false,
	"bin/persist.js": false,
	"bin/ls.js": false,
	"bin/help.js": false,
	"bin/rm.js": false,
	"bin/uptime.js": false,
	"bin/neofetch.js": false,
	"bin/cd.js": false,
	"etc/os-release": false,
	"boot/filesystem.js": false,
	"boot/kernel.js": false,
	"boot/errno.js": false,
	"boot/devices.js": false
};

window.HOSTNAME = (function (agent) {
	switch (true) {
		case agent.indexOf("edge") > -1: return "edge";
		case agent.indexOf("edg") > -1: return "edge";
		case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
		case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
		case agent.indexOf("trident") > -1: return "ie";
		case agent.indexOf("firefox") > -1: return "firefox";
		case agent.indexOf("safari") > -1: return "safari";
		default: return "other";
	}
})(window.navigator.userAgent.toLowerCase());

if (!store("fileAllocationTable")) {
	store("fileAllocationTable", "{}");
	window.fs = new Filesystem("{}").FAT;
	for (let file in PRELOAD) {
		fetch(file)
			.then(resp => resp.text())
			.then(data => {
				PRELOAD[file] = true;
				file = file.replace(".js", "");
				fcreate(`/${file}`);
				fwrite(`/${file}`, data);
			});
	}

	let awaitDownloads = setInterval(() => {
		for (let file in PRELOAD) {
			if (PRELOAD[file] === false) {
				return;
			}
		}
		exec("sh", "null");
		persistFS();
		clearInterval(awaitDownloads);
	}, 100);
} else {
	window.fs = new Filesystem(store("fileAllocationTable")).FAT;
	for (let file in PRELOAD) {
		PRELOAD[file] = true;
	}

	try {
		exec("sh", "null");
	} catch {
		panic("Root device mounted successfully, but /bin/sh does not exist.\nBailing out, you are on your own now. Good luck.");
	}
}

__registerPseudoDevices();