# BDS JS Programmer's Guide
## BDS JS coreutils
`/bin/cat` - Read a file. Accepts one argument.  
`/bin/echo` - Write string to stdout or a provided file.  
`/bin/hostname` - Read or update hostname.  
`/bin/ls` - List files. Accepts 0 or 1 arguments.  
`/bin/persist` - Write changes to the filesystem.  
`/bin/sh` - retardShell, the init system. Cannot be ran multiple times.  
`/bin/cd` - Change directory  
`/bin/rm` - Delete file or directory  
`/bin/uptime` - Check your uptime  
`/bin/neofetch` - A port for neofetch for BDS

## BDS JS Public API
### printf(message)
Writes a message to stdout
### exec(filename, argv)
Executes a program.  
filename - a string, containing either the full path to it, a path to it in the current working directory, 
or a name of a program located in /bin.  
argv - a string or an array of strings passed to the program as arguments.
### window.HOSTNAME
The system's hostname.
### fopen(filename)
Reads a file. Requires a full path to be passed.
### fexists(filename)
Checks for the existence of a file. Requires a full path to be passed.
### fwrite(file, contents)
Overwrites a file. Cannot create a new file. Requires either a full path, or a File object.
### fdelete(file)
Deletes a file. Requires either a full path, or a File object.
### fcreate(filename)
Creates a file with the given full path.

## BDS JS Public API Objects
### File
```js
constructor(contents, filename, permissions) {
	this.contents = contents; // String
	this.filename = filename; // String
	this.permissions = permissions; // Integer
}
```
### Filesystem
```js
constructor(rawData) { // rawData - String
	let json = JSON.parse(rawData);
	traverse(json, "");
	this.FAT = json; // Object
}
```
The global filesystem object is accessible via window.fs

## BDS JS Internal API
Not intended to be used by userland applications.
### persistFS()
Writes the in-memory window.fs filesystem to localStorage.
### store(name, value)
A wrapper for the localStorage API.
```js
store("world", "hello"); // sets value of "world" to "hello"
store("world"); // returns the value of "world"
store("world", ""); // removes "world"
store(); // removes everyting from localstorage
```
Use the Filesystem API instead.
### $(selector)
A wrapper for document.querySelector
### panic(message)
Triggers a kernel panic while outputting a provided message to stdout.
### window.enteredCommand
Stores if the user has entered any commands yet; Used for formatting the HTML.