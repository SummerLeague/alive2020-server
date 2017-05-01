```
    .aMMMb  dMP     dMP dMP dMP dMMMMMP 2020
   dMP"dMP dMP     amr dMP dMP dMP
  dMMMMMP dMP     dMP dMP dMP dMMMP
 dMP dMP dMP     dMP  YMvAP" dMP
dMP dMP dMMMMMP dMP    VP"  dMMMMMP
```

## Setup
Install packages needed for server: `npm install`

Install packages needed for client: `bower install`

## Running
To give it some life, run`foreman start web`.

## Debugging
To run the app in debugger mode, start the app with `foreman start webDebug`. This will launch a chrome inspection window that will pause on any breakpoints (`debugger` statements in your code) for inspection. Note the following:
1. There will be an immediate breakpoint thrown on startup at the first line of code in our app.js. I'm unsure why node-debug does this but it appears to be standard. Simply click the console's "continue" icon to continue running the app.
2. Node-debug is a little slow. You dont want to be using this for all of your development purposes.

## Development

#### Webpack
To build the react app (`public/bundle.js`) during development, run `webpack --watch`.

#### SCSS
To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.

#### AWS
We will need to update this later but for now, during development if you need to test transcoding, SNS callbacks, or anything else that interacts with the server via AWS, you'll need to run `ngrok` (http://ngrok.com) pointed at the port your server is running on (likely: `ngrok http 5000`) and update the subscription in the SNS settings, which likely means deleting the old one and creating a new one. This blows I know. Ill come up with something else later. The "address" should be something like this `http://2a50f4e8.ngrok.io/api/v1/transcode_complete_webhook` for our transcode completion webhook, for example.

#### Passport
We use the NPM package `passport-local-sequelize` as our username/password strategy for handling auth via the `passport` package. This simplifies handling common auth scenarios quite significantly, but the documentation for `passport-local-sequelize` is extremely lacking as of today. However, the package appears to be _heavily_ inspired by the package `passport-local-mongoose` and so far I've had no troub le referencing the documenation for it and comparing methods to those found by searching the `passport-local-sequelize` project for verification. Works for now.
