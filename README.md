# path-alias-resolver
Resolve aliases in JS/TS files

This plugin is a PoC to avoid module bundlers and the TypeScript compiler itself, which not provide module resolution for compiled files. Here is an example how you can use it with Gulp:

```javascript
const gulp = require('gulp');
const alias = require('path-alias-resolver/gulp');

gulp.task('default', () => {
  return gulp.src('./src/**/*.js')
    .pipe(alias('.', { utils: './src/utils' }))
    .pipe(gulp.dest('./dist'));
});
```

in `./src/index.js`:
```javascript
const greet = require('utils/greet');

greet('Carlton Banks');
```

then in the `./dist/index.js` folder you should see:
```javascript
const greet = require('./utils/greet');

greet('Carlton Banks');
```

Where the first parameter in the plugin `'.'` is the root path that will be used to resolve the import/require statements, follow by an object with the aliases to be resolved.

For more advanced use cases see [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) for TypeScript (there is a Webpack plugin too), [ts-transformer-imports](https://github.com/grrowl/ts-transformer-imports) and [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) for Babel.
