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

# Install sequelize
Sequelize is powerful [ORM](https://www.codepolitan.com/mengapa-menggunakan-orm-dalam-membuat-aplikasi-android-59d5a3928887e) library for node js. You can find official documentation [here](https://sequelize.org/master/manual/getting-started.html). In this project we will use sequelize/v6 with mysql as [DBMS](https://glints.com/id/lowongan/dmbs-database-management-system-adalah/). Instal sequelize and mysql driver with following command:
```
npm install --save sequelize mysql2
```
