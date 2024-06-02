"use strict";

class DevNull extends File {
	constructor() {
		super();
	}
	get contents() {
		return null;
	}

	set contents(content) {
		return true;
	}
}

class DevFull extends File {
	constructor() {
		super();
	}

	get contents() {
		return "0".repeat(65535);
	}

	set contents(content) {
		if (content !== undefined) {
			let error = ERRNO.get(28);
			printf(`\n${error}`);
			return error;
		}
	}
}

class DevZero extends File {
	constructor() {
		super();
	}

	get contents() {
		return "0".repeat(65535);
	}

	set contents(content) {
		return true;
	}
}

class DevRandom extends File {
	constructor() {
		super();
	}

	get contents() {
		let output = "";
		while (output.length < 65535) {
			output += Math.floor(Math.random() * 10);
		}
		return output;
	}

	set contents(content) {
		return true;
	}
}

class DevStdout extends File {
	constructor() {
		super();
	}

	get contents() {
		return "";
	}

	set contents(contents) {
		if (contents !== undefined) {
			return printf(contents);
		}
	}
}

// 9front
class DevMordor extends File {
	constructor() {
		super();
	}

	get contents() {
		return ERRNO.get(Math.floor(Math.random() * 132) + 1);
	}

	set contents(content) {
		let error = ERRNO.get(Math.floor(Math.random() * 132) + 1);
		if (content !== undefined) {
			printf(`\n${error}`);
			return error;
		}
	}
}


function __registerPseudoDevices() {
	fcreate("/dev/null", new DevNull("", "/dev/null", 777));
	fcreate("/dev/full", new DevFull("", "/dev/full", 777));
	fcreate("/dev/zero", new DevZero("", "/dev/zero", 777));
	fcreate("/dev/random", new DevRandom("", "/dev/random", 777));
	fcreate("/dev/urandom", new DevRandom("", "/dev/urandom", 777));
	fcreate("/dev/stdout", new DevStdout("", "/dev/stdout", 777));
	fcreate("/dev/mordor", new DevMordor("", "/dev/mordor", 777));
}