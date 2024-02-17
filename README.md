# Electricity Meter Usage

This is javascript code that is placed in a Google sheets app script. It is not designed to be used and work locally, it was added to a repository so that it could be tested.

## Compile the project to a single file

```sh
$ yarn build
```

This will create a build directory, and the dist file `main.js`. In order to use this file in Google App Scripts, copy this file excluding the last `module.exports` line, which Google App Scripts does not understand.

## Run tests

To run tests locally

```
$ yarn test
```
