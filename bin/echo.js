"use strict";

function echo(argv) {
	let constructed = "\n";
	if (typeof argv !== "string") {
		argv.forEach(e => {
			constructed += e + " ";
		});
	} else {
		constructed += argv;
	}
	printf(constructed);
	return constructed;
}