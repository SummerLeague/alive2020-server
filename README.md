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

Start app (local): foreman start

## Development

To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.

### Sucky Stuff (Temporary)

To build the react app bundle.js, run `webpack` from your terminal. You must do this any time you make changes to the webpack/react files for the time being.

If you need to add npm packages, you have to delete the symlinked `app` from the `node_modules` directory, run `npm install`, and then re-link `app` to `node_modules`. Yep this blows. I'll fix later. To do it run: `cd node_modules && rm -rf app && cd ..` then `npm install` then `cd node_modules && ln -nsf ../app && cd ..`.

