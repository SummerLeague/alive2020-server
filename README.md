```
    .aMMMb  dMP     dMP dMP dMP dMMMMMP 2020
   dMP"dMP dMP     amr dMP dMP dMP
  dMMMMMP dMP     dMP dMP dMP dMMMP
 dMP dMP dMP     dMP  YMvAP" dMP
dMP dMP dMMMMMP dMP    VP"  dMMMMMP
```

## Setup

#### Database
We use postgres for our database so you'll need to set that up on your machine. Once installed, open the postgres shell using the `psql` command from your terminal and do the following.

1. Create your development user:
```
CREATE USER alive2020_dev SUPERUSER;
```
2. Create your development database:
```
CREATE DATABASE alive2020_development;
```

*NOTE*: If you made any changes to the described setup here, you will need to reflect them in the steps below for setting up our environment variables.

#### ENV
Exit the postgres shell and create a new file in the root of this directory called `.env`. Now copy the contents of `.env.example` into it, and do the following:

1. Leave `NODE_CONFIG_DIR` as is. This tells the `config` package where to find environment variables for our environment in the node application.
2. Replace the value for `APP_SECRET` with something secret. This will be used to encrypt things like the JWT token used to authenticate users.
3. Replace the value for `POSTGRES_DATABASE` with `alive2020_development`.
4. Replace the value for `POSTGRES_USERNAME` with `alive2020_dev`.
5. If you gave your database user (`alive2020_dev`) a password in the steps above (you probably didn't), replace the value for `POSTGRES_PASSWORD` with it. If you did not, remove this line so that the value will be `null`.
6. Leave `POSTGRES_HOST` as is.

#### Packages
Install packages needed for server: `npm install`

Install packages needed for client: `bower install`


#### Database Part 2 / Sequelize CLI
Before running the app, you'll want to use the sequelize CLI to create our tables in your postgres database.
Install the CLI using `npm install -g sequelize-cli` (if not already installed) and then run the following"
```
sequelize db:migrate
```

*NOTE*: You may have noticed the file `config/database.js`. This file exists solely for the CLI and not sequelize as used by our node application. The node application uses the file `api/models/index.js` to automatically connect to our database and supply access to our models. The CLI references `config/database.js` to know what to connect to itself. Both files use our environment variables configured above.

## Running
To give it some life, run `foreman start web`.

## Debugging
To run the app in debugger mode, start the app with `foreman start webDebug`. This will launch a chrome inspection window that will pause on any breakpoints (`debugger` statements in your code) for inspection. Note the following:
1. There will be an immediate breakpoint thrown on startup at the first line of code in our app.js. I'm unsure why node-debug does this but it appears to be standard. Simply click the console's "continue" icon to continue running the app.
2. Node-debug is a little slow. You dont want to be using this for all of your development purposes.

## Development

#### Webpack
To build the react app (`public/bundle.js`) during development, run `webpack --watch`.

#### SCSS
To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.

#### Hitting the API
Use Postman (Google it) with Chrome to play with the API without the mobile app.

To authenticate through the API, login using username and password at `api/v1/login` and store the response token.

To make requests to authenticated routes, include a Header with the key `Authorization` and the value `JWT <token string>` in your HTTP request.

#### Database changes
Database changes with sequelize are a little bit painful and you need to follow a strict routine in order to keep things sane. Essentially the flow is as follows (Reference the sequelize documentation, http://docs.sequelizejs.com/, for more):

##### Creating a new Model/Table
1. Start by using the CLI to create a new migration for your new model.
```
sequelize model:create --name MyModel --attributes someString:string,someBoolean:boolean
```
2. Find the newly created migration in `db/migrate` and modify its `up` and `down` blocks.
3. Migrate the database to create your new table.
```
sequelize db:migrate
```
4. Create a new model file, `api/models/my_model.js`, and describe your table (yes, again) including other details like class methods, instance methods, associations, etc. Think of the migration as a way to tell sequelize, the CLI, how to build your table in postgres, and the file in `api/models` as a way to describe it to sequelize as represented for use in the node app. It's kind of sucky but that's sequelize.

*NOTE* When "describing" the table in the migration, you should pretty much just focus on things like attribute names, their types, whether or not they are unique, whether or not they can be null, and their default values if they have them. Things like validation and other details don't seem to be necessary until describing your model in the `api/models` model file.

##### Modifying an existing Model/Table
1. Start by using the CLI to create a new migration for your changes.
```
sequelize migration:create --name=add-some-attribute-to-my-model
```
2. Open the newly created migration in `db/migrate` and modify its `up` and `down` blocks.
3. Migrate the database to modify your table.
```
sequelize db:migrate
```
4. Open your model file, `api/models/my_model.js` and modify its description to match the changes you described in your migration file. Think of the migration as a way to tell sequelize, the CLI, how to build your table in postgres, and the file in `api/models` as a way to describe it to sequelize as represented for use in the node app. It's kind of sucky but that's sequelize.

*NOTE* When "describing" the table in the migration, you should pretty much just focus on things like attribute names, their types, whether or not they are unique, whether or not they can be null, and their default values if they have them. Things like validation and other details don't seem to be necessary until describing your model in the `api/models` model file.

#### AWS
We will need to update this later but for now, during development if you need to test transcoding, SNS callbacks, or anything else that interacts with the server via AWS, you'll need to run `ngrok` (http://ngrok.com) pointed at the port your server is running on (likely: `ngrok http 5000`) and update the subscription in the SNS settings, which likely means deleting the old one and creating a new one. This blows I know. Ill come up with something else later. The "address" should be something like this `http://2a50f4e8.ngrok.io/api/v1/transcode_complete_webhook` for our transcode completion webhook, for example.

