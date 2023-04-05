# Lazy Load Singleton [![NPM version](https://badge.fury.io/js/lazy-load-singleton.png)](https://www.npmjs.com/package/lazy-load-singleton)

Tiny library that transforms any class to singleton with lazy initialization.

## Installation
```bash
npm i --save lazy-load-singleton
# or
yarn add lazy-load-singleton
```

## Behaviour
When you wrap a class with the libary, it returns an object that has `init` method with signature that equals to constuctor's signature and proxies all properties accessment to class instance.
This libary will be helpful in situations where your singleton is inialized base on event (e.g `'ready'`), not during first code execution.
You can read more details about motivation and solution in [my article](https://medium.com/@sergeistralenia/non-standard-singleton-with-true-lazy-intialization-in-javascript-3aeeb309de1f).

## Example
Assume you have database class that accepts connection string in constructor. Your environment is event-based and you can't initialize class right away.

### Singleton
```js
import LazySingleton from 'lazy-load-singleton';

class DBConnection {
  isClosed = false;

  constructor(connectionString) {}
  performQuery(query, values) {}
}

export default LazySingleton(DBConnection)
```

### Initialization and usage
```js
import db from './db';

app.on('ready', config => {
  db.init(config.dbConnectionString); // #init signature equals to constructor signature
});

//...

app.on('create-user', user => {
  if (!db.isClosed) { // has access to properties
    // has access to methods
    db.performQuery(` 
      INSERT INTO users(id, name)
      VALUES($1, $2)
    `, [user.id, user.name])
  }
});
```