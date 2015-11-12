RNTSExplorer
============

React-Native UI Explorer written in Typescript

This project is a direct port to Typescript of the original React Native UIExplorer that comes as part of the react-native distribution

The two main goals are to provide:

 - a testbed for the [react-native type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/react-native) I am wotking on
 - copy/paste examples of React Native in Typescript


Work in Progress
----------------

 I perform this work on scarce spare time.
 Help is welcome
 
 
Directories
-----------
 
  - `js`: the original, not yet converted, files
  - `typescript`: the converted files
  - `gen`: the js generated from typescript
 

Installing
----------

 1. Run `npm install` once to install various dependencies (`grunt-cli` must be installed globally)
 2. Run `grunt dev` to transpile the Typescript in JS
 3. Open the IOS project in XCode (Android is untested at this stage) and run it

 
Building
--------
 
 Use `grunt dev` to compile or have your IDE output the JS in the `gen` folder.
 
 The RN server will automatically pick-up the new js
 
 
License
-------
 
 See Facebook [license for examples](https://github.com/facebook/react-native/blob/master/LICENSE-examples) 