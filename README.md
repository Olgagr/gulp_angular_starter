# gulp_angular_starter
This is collection of gulp tasks to make it easy to start with an angular project. It uses sass and ES6. For tests it uses mocha and chai.

## Quick Start
```bash
$ npm install
$ bower install
```

To see all tasks available run:

```bash
$ gulp
```

## shrinkwrap
The project uses npm shrinkwrap, which means all npm packages versions are locked. To make an update of a packages, you have to do:

```bash
$ npm update name_of_the_module
$ npm shrinkwrap
```