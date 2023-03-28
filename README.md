# Lazy Load [![NPM version](https://badge.fury.io/js/lazy-load-singleton.png)](https://www.npmjs.com/package/lazy-load-singleton)

Lazy load singleton is a small helper library that transforms any class to singleton with lazy initialization.

## Installation
```bash
npm i --save lazy-load-singleton
# or
yarn add lazy-load-singleton
```

## Usage
Common use-case is to create singleton from module when you cannot initialize it right away.

### Singleton
```js
import LazySingleton from 'lazy-load-singleton';

class DB {
	constructor(connectionString) {}
	performQuery(query, values) {}
}

export default LazySingleton(DBConnect)
```

### Initialization and usage
```js
import db from './db';

app.on('ready', config => {
	db.init(config.dbConnectionString);
});

//...

app.on('create-user', user => {
	db.performQuery(`
		INSERT INTO users(id, name)
		VALUES($1, $2)
	`, [user.id, user.name])
});
```