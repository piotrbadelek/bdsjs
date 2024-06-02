"use strict";

function sh(argv = null) {
	if (argv !== null) {
		exec("echo", "sh cannot be run multiple times; This system does NOT have init right now, and can only run 1 program at a time.")
		return;
	}

	window.cwd = "/";

	printf(`//               JS BDS 0.1 "Retard"              \\\\
||              Brain Damage Software             ||
|| Changes to filesystem will not persist between ||
\\\\ reboots unless written to disk with 'persist'. //

<span class="hostname">root@${HOSTNAME}:${cwd}$</span> `);

	window.enteredCommand = false;

	function executionEngine(program, args) {
		if (fexists(`/bin/${program}`)) {
			return exec(program, args);
		}
		printf(`
${program}: File not found.
`)
		return false;
	}

	$("#command").addEventListener("keyup", e => {
		if (e.key === "Enter") {
			let command = e.target.value;
			printf(e.target.value);

			if (e.target.value.includes(">>")) {
				let prompts = command.split(">>");
				let leftPrompt = prompts[0].split(" ");
				let program = leftPrompt[0];
				let filename = prompts[1].trim();
				leftPrompt.shift();

				let result = executionEngine(program, [...leftPrompt]);
				debugger;
				if (!fexists(filename)) {
					fcreate(filename);
				}
				fwrite(filename, fopen(filename).contents + result);
			} else if (e.target.value.includes(">")) {
				let prompts = command.split(">");
				let leftPrompt = prompts[0].split(" ");
				let program = leftPrompt[0];
				let filename = prompts[1].trim();
				leftPrompt.shift();

				let result = executionEngine(program, [...leftPrompt]);
				if (!fexists(filename)) {
					fcreate(filename);
				}
				fwrite(filename, result);
			} else {
				let prompt = command.split(" ");
				let program = prompt[0];
				prompt.shift();

				executionEngine(program, [...prompt])
			}

			if (!window.enteredCommand) {
				window.enteredCommand = true;
				$(".hostname").classList.add("hostname--past");
				$("#command").classList.add("command--stared_writing");
			}

			printf(`\n<span class="hostname hostname--past">root@${HOSTNAME}:${window.cwd}$</span> `);
			e.target.value = "";
		}
	});
}