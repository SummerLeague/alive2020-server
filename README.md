    .aMMMb  dMP     dMP dMP dMP dMMMMMP 2020
   dMP"dMP dMP     amr dMP dMP dMP
  dMMMMMP dMP     dMP dMP dMP dMMMP
 dMP dMP dMP     dMP  YMvAP" dMP
dMP dMP dMMMMMP dMP    VP"  dMMMMMP


## Setup

Install packages needed for server: `npm install`

Install packages needed for client: `bower install`

Symlink app directory with node modules: `cd node_modules && ln -nsf ../app && cd ..`
The node_modules directory is gitignored by default, but if you intend to copy this project's structure and store it in git, you should also commit the symlink: `git add -f node_modules/app`


## Running

Start app (local): foreman start


## Development

To build the react app bundle.js, run `webpack` from your terminal.

To build css files from scss on save, from your terminal `cd` into the `/public/styles` directory and run `scss --watch .:.`.
