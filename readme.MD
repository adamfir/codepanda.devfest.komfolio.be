# How to initialize express project
- Install nodejs from [official website](https://nodejs.org)
- Install [express generator](https://expressjs.com/en/starter/generator.html)
	```
	npm install -g express-generator
	```
- Create express project without view
	```
	express --view=no-view codepanda.devfest.komfolio.be
	```
- Move to project directory and install node js dependencies
	```
	npm install
	```
- Run your project
	```
	npm run start
	```

### Extra
Check package.json, you can modify `package.json` and make your own script. For example, we add `debug` script to enable hot reload using [nodemon](https://www.npmjs.com/package/nodemon) (PS. we can install nodemon globally)