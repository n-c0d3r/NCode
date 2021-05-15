var info=JSON.parse(require('fs').readFileSync(__dirname+'/../info.json').toString());

var version=info.version;

console.log(``);
console.log(``);
console.log(``);
console.log(``);
console.log(`\x1b[37m`);
console.log("\x1b[30m",`             __      _`);
console.log("\x1b[30m",`            |   \\   | |`);
console.log("\x1b[30m",`            |    \\  | |`);
console.log("\x1b[30m",`            |  |\\ \\ | |`);
console.log("\x1b[30m",`            |  | \\ \\| |`);
console.log("\x1b[30m",`            |  |  \\   |  |  |‾|  |_| -|-`);
console.log("\x1b[30m",`            |  |   \\  |  |  __|  | |  |`);
console.log("\x1b[30m",`            |  |     ‾   `);
console.log("\x1b[30m",`            |  | `);
console.log("\x1b[30m",`            |  |           framework  (ver `+version+')');
console.log("\x1b[30m",`             ‾‾`);
console.log("\x1b[37m");
console.log(``);
console.log(``);
console.log(``);
console.log(``);