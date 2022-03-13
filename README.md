# plant-md

Zero dependency website built from pug

## Setup

Develop:

```bash
$ npm install
$ npx netlify-cms-proxy-server
$ node toolchain/servers/dev.js
```

Demo URLs:

- http://localhost:3000 - Index
- http://localhost:3000/admin - CMS panel
- http://localhost:3000/plants - Index
- http://localhost:3000/plants/hoya - Route ID

Build:

Site is built in place:

```bash
$ npm run pug -- ./site
```

## Develop

- site folder: `*.pug` files are transpiled into `*.html` files in-place
- data folder: `*.md` content is injected into `template.pug` and rendered on the fly

## Todo

- Add production build step to generate plant HTML
