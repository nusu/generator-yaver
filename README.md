# generator-yaver [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> yaver is simplest way scaffolding and bootstrapping your stylus app.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-yaver using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-yaver
```

Then generate your new project:

```bash
yo yaver
```

## What is yaver?
Yaver means aide in Turkish, I designed it based on my daily requirements

## Capabilities
Yaver uses [Stylus](https://github.com/stylus/stylus/) as preprocessor, it comes with series of useful mixins and css files of chosen jquery plugins.


uses [gulp](https://github.com/gulpjs/gulp) as task builder and it comes with these tasks:

- stylus compile
- js concat, uglify
- convert images to webp format
- compress images
- browser-sync

Jquery plugins you can add within cli:

- [Select 2](https://github.com/select2/select2)
- [Owl Carousel 2](https://github.com/OwlCarousel2/OwlCarousel2)
- [Light Slider](https://github.com/sachinchoolur/lightslider)
- [Dropzone](http://www.dropzonejs.com/)
- [Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill)
- [Cookie.js](https://github.com/js-cookie/js-cookie)


Fonts:

Yaver automatically imports selected fonts in stylus

- Font Awesome
- Proxima Nova
- Montserrat
- Avenir Next
- Museo Sans


Stylus:

- Bootstrap 3

yaver uses [bootstrap 3 stylus](https://github.com/maxmx/bootstrap-stylus) as predefined css framework, it's modular so you can exclude unnecessary parts.


## Filetree
[![File Tree][file-tree]][file-tree]

## License

MIT © [nusu alabuga](github.com/nusu)


[file-tree]: http://i65.tinypic.com/oh1ic2.png
[npm-image]: https://badge.fury.io/js/generator-yaver.svg
[npm-url]: https://npmjs.org/package/generator-yaver
[travis-image]: https://travis-ci.org/nusu/generator-yaver.svg?branch=master
[travis-url]: https://travis-ci.org/nusu/generator-yaver
[daviddm-image]: https://david-dm.org/nusu/generator-yaver.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nusu/generator-yaver
[coveralls-image]: https://coveralls.io/repos/nusu/generator-yaver/badge.svg
[coveralls-url]: https://coveralls.io/r/nusu/generator-yaver
