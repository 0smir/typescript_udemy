1. If you need use on your project TypeScript and webpack use command: 

npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

2. Then you need to check jyout tsconfig.json file. Please check 
"target": "es6", 
"module": "es2015",
"outDir": "./dist",
values of "target" and "module" should be choosen. "outDir" - can have any name you want.
And "rootDir": "./src" - should be commented, bue now webpack control root directory.

3. Create webpack.config.js file
<!-- for correct work of webpack, all imported files should not contain  extention ".js" - so remove it or not use -->


4. To run drogect in a different mode use
  npm run dev - to run development mode. You will get sourse map and so on.
  mpm run build  - to run production mode and minified files.

