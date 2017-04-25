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

Symlink app directory with node modules: `cd node_modules && ln -nsf ../app && cd ..`
The node_modules directory is gitignored by default, but if you intend to copy this project's structure and store it in git, you should also commit the symlink: `git add -f node_modules/app`


## Running

To give it some life, run`foreman start`.

## Development

### Webpack
To build the react app (`public/bundle.js`) during development, run `webpack --watch`.

### SCSS
To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.

### AWS
We will need to update this later but for now, during development if you need to test transcoding, SNS callbacks, or anything else that interacts with the server via AWS, you'll need to run `ngrok` (http://ngrok.com) pointed at the port your server is running on (likely: `ngrok http 5000`) and update the subscription in the SNS settings, which likely means deleting the old one and creating a new one. This blows I know. Ill come up with something else later. The "address" should be something like this `http://2a50f4e8.ngrok.io/api/v1/transcode_complete_webhook` for our transcode completion webhook, for example.

### Sucky Stuff (Temporary)
If you need to add npm packages, you have to delete the symlinked `app` from the `node_modules` directory, run `npm install`, and then re-link `app` to `node_modules`. Yep this blows. I'll fix later. To do it run: `cd node_modules && rm -rf app && cd ..` then `npm install` then `cd node_modules && ln -nsf ../app && cd ..`, or, as a single command: `cd node_modules && rm -rf app && cd .. && npm install && cd node_modules && ln -nsf ../app && cd ..`

