# generator-word-snatchers-cli-plugin [![NPM version][npm-image]][npm-url]

> Yeoman generator to build a plugin for word-snatchers-cli

## Installation

First, install [Yeoman](http://yeoman.io) and generator-word-snatchers-cli-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-word-snatchers-cli-plugin
```

Then generate your new plugin for [word-snatchers-cli](https://github.com/akgondber/word-snatchers-cli):

```bash
yo word-snatchers-cli-plugin
```

# Usage

```bash
yo word-snatchers-cli-plugin [options]
```

or

```bash
yo word-snatchers-cli-plugin:app [options]
```

It will loads and asks

There are multiple command-line options available:

```
$ yo word-snatchers-cli-plugin --help

Usage:
  yo word-snatchers-cli-plugin [options]

Options:
  -h,   --help             # Print the generator's options and usage
        --skip-cache       # Do not remember prompt answers               Default: false
        --skip-install     # Do not automatically install dependencies    Default: false
        --force-install    # Fail on install dependencies error           Default: false
        --ask-answered     # Show prompts for already configured options  Default: false
        --package-manager  # Package manager to use
        --question-count   # Question count you are about to fill
```

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Rushan Alyautdinov](https://github.com/akgondber)

[npm-image]: https://badge.fury.io/js/generator-word-snatchers-cli-plugin.svg
[npm-url]: https://npmjs.org/package/generator-word-snatchers-cli-plugin
