#!/usr/bin/env node

const meow = require('meow');
const includes = require('lodash.includes');
const build = require('../cliCommands/build');

const cli = meow(`
Usage
    $ swatch build --pages-dir=<pages-directory> --out=<output-directory> --title="My Pattern Library"
 
Options
    -c, --config        Relative path to JS file exporting configuration information
    -o, --out           Relative path from working directory to output directory for documentation site
    -p, --pages-dir     Relative path from working directory to directory containing page markdown files
    -t, --title         Optional title for docs site
 
Examples
    $ swatch build -p ./docs -o ./dist-docs
    $ swatch build -c ./swatch.config.js
`, {
    alias: {
        c: 'config',
        o: 'out',
        p: 'pages-dir',
    },
});

const noMatchingCommand = (inputs) => console.log(`Could not find a CLI command matching ${inputs[0]}`);
const cliCommands = [
    build,
];
const cliCommandPresentSpecification = (cliInput) => (command) => includes(cliInput, command.name);

const isCliCommandPresent = cliCommandPresentSpecification(cli.input);
const commandToExecute = cliCommands.find(isCliCommandPresent) || noMatchingCommand;
commandToExecute.exec(cli.input, cli.flags);
