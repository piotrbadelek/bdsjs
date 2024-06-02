"use strict";

function persist() {
	persistFS();
	return printf("\nSynced. Changes have been written to the filesystem.\n");
}