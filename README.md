# minesweeper API

API created on express using typescript that allows to create a minesweeper game, register players and more.

## motivation

This API was created as part of an interview process. I tried to show my skills using Express, Sequelize and TypeScript.



## installation

Executes on root folder

```
yarn install
```

### Install MySql client (macOs)

```
brew install mysql
```

### run project

Create .env file in the root folder with your database values

```
DBNAME=minesweeper
DBHOST=localhost
DBPASSWORD=root
DBUSER=root
```


This project uses mysql database, you will need just an empty schema in a mysql database an run the migrations.

Run the migrations
```
npx sequelize-cli db:migrate
```



Run the application
```
DEBUG=minesweeper:* yarn run dev
```

### Usage

This API runs locally on [http://localhost/3000](http://localhost/3000)


## Contributors

* [@CristianDevSoft](https://twitter.com/CristianDevSoft)
