# Simpleapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Angular

It is a client side library to build large-scale rich web applications. In simple words, it binds JavaScript object to UI.


  SystemJS: Dynamically load JavaScript files.<br>
  Typescript:  It is a superset of JavaScript that compiles to plain JavaScript. To compile it, different compilers are there: Typescript Compiler, tracer, babel.<br>
  Polyfills: A polyfill is a browser fallback, made in JavaScript, that allows new functionality to work in older browsers.<br>
  Nodejs: We can run JavaScript code in nodejs. It provides us npm (node package manager).<br>
  Reflectjs: It helps to define attributes. Attribute based programming.<br>
  
  
## Main concepts in Angular

  Components: It binds JavaScript objects to UI.<br>
  Module: Collection of components. It is like namespace.<br>
  Databinding: By default, it supports one way binding.<br> 
  Pipes<br>
  Dependency Injection<br>
  Routing<br>


## Basic Commands

  1. ng build<br/>
  2. ng serve<br/>
  3. ng generate component component-name<br/>
  4. ng test<br/>
  

### How to create component ###


### Communicating with Child component ###

  @Input()<br/>
  Using template variables #componentName <br/>
  Refer child.component.ts<br/>

### Communicating with Parent component ###

  @Output()<br/>
  EventEmitter<br/>
  Refer parent.component.ts<br/>
  
### Routing
Refer routes.ts and appModules.ts

### Barrels
Rollup export from several modules to single convenient modules.
e.g. Index.ts, it is used inside AppModule.ts to refer the components.

### Lazy Loading


