# plant-md

Zero dependency website built with pug, md, other stuff, and 11ty

## Setup

Develop:

```bash
$ npm install
$ npx netlify-cms-proxy-server
$ npx @11ty/eleventy --passthroughall --watch
```

Build:

```bash
$ npx @11ty --passthroughall
```

Demo URLs:

- http://localhost:3000 - Index
- http://localhost:3000/admin - CMS panel
- http://localhost:3000/plants - Index
- http://localhost:3000/plants/hoya - Route ID
