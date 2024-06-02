"use strict";

function uptime() {
	let diffDate = new Date(Date.now() - window.BOOTED);
	printf(`\n${diffDate.getMilliseconds()} ms
${diffDate.getSeconds()} s
${diffDate.getMinutes()} m`);
}