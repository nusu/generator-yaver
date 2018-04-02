'use strict';
var yeoman = require('yeoman-generator'),
	chalk  = require('chalk'),
	mkdirp = require('mkdirp'),
	yosay  = require('yosay');

module.exports = yeoman.Base.extend({
	// contains
	// usage contains.call(Array, value);
contains: function(needle) {
	// Per spec, the way to identify NaN is that it is not equal to itself
	var findNaN = needle !== needle;
	var indexOf;

	if(!findNaN && typeof Array.prototype.indexOf === 'function') {
		indexOf = Array.prototype.indexOf;
	} else {
		indexOf = function(needle) {
			var i = -1, index = -1;

			for(i = 0; i < this.length; i++) {
				var item = this[i];

				if((findNaN && item !== item) || item === needle) {
					index = i;
					break;
				}
			}

			return index;
		};
	}
	return indexOf.call(this, needle) > -1;
},
	// contains func --end


  prompting: function () {
	// Have Yaver greet the user.
	this.log('\n');
	this.log('         .-"-.     ');
	this.log('       _/.-.-.\\_   ');
	this.log('      ( ( o o ) )  ');
	this.log('       |/  "  \\|   ');
	this.log('        \\ .-. /    ');
	this.log('        /`"""`\\    ');
	this.log('       /       \\   ');
	this.log('         Yaver! \n \n');


	var prompts = [
		{
			name: 'appName',
			message: 'Project Name',
			default: 'my-sample-project'
		},
		{
			name : 'plugins',
			type: 'checkbox',
			message: 'Which jquery plugins you want to use ?',
			choices: [
				{
					name: 'Owl Carousel 2',
					value: 'owlcarousel',
					checked: false
				},
				{
					name: 'Select2',
					value: 'select2',
					checked: false
				},
				{
					name: 'LightSlider',
					value: 'lightslider',
					checked: false
				},
				{
					name: 'Dropzone',
					value: 'dropzone',
					checked: false
				},
				{
					name:'Viewport buggyfill',
					value: 'viewportfixer',
					checked: false
				},
				{
					name: 'Cookie.js',
					value: 'cookie',
					checked: false
				},
				{
					name: 'Google Maps',
					value: 'googlemap',
					checked: false
				},
				{
					name: 'Animation Library',
					value: 'animation',
					checked: false
				}
			]
		},
		{
			name: 'fonts',
			type: 'checkbox',
			message: 'Which fonts you need ?',
			choices: [
				{
					name: 'Font Awesome',
					value: 'fontawesome',
					checked: false
				},
				{
					name: 'Proxima Nova',
					value: 'proximanova',
					checked: false
				},
				{
					name: 'Montserrat',
					value: 'montserrat',
					checked: false
				},
				{
					name: 'Avenir Next',
					value: 'avenirnext',
					checked: false
				},
				{
					name: 'Museo Sans',
					value: 'museosans',
					checked: false
				}
			]
		}
	];

	return this.prompt(prompts).then(function (props) {
	  // To access props later use this.props.someAnswer;
	  this.props = props;

	}.bind(this));
  },
  _fileSystem: function(){
	  var destRoot    = this.destinationRoot(),
		  devDir      = destRoot + '/dev',
		  asDir       = destRoot + '/assets',
		  sourceRoot  = this.sourceRoot();

	  mkdirp(devDir + '/js');
	  mkdirp(devDir + '/stylus');
	  mkdirp(devDir + '/stylus/elements');
	  mkdirp(devDir + '/stylus/pages');
	  
	  mkdirp(asDir  + '/css');
	  mkdirp(asDir  + '/fonts');
	  mkdirp(asDir  + '/img');
	  mkdirp(asDir  + '/js');
	  mkdirp(destRoot + "/demo");

	  // bower file
	  var bowerJson = {
		  name: "nusu",
		  private: true,
		  version: "1.0.0",
		  authors: "Generator Yaver - nusususuzu@gmail.com",
		  license: "MIT",
		  dependencies: {}
	  };
	  // -- bower end
	  // package.json
	  var packagejason = {
		  appName: this.props.appName
	  };

	  // copy the neccesary files
	  this.fs.writeJSON(destRoot + '/bower.json', bowerJson);
	  this.fs.copyTpl(sourceRoot + '/index.html', destRoot + '/index.html', packagejason);
	  this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', packagejason);
	  this.fs.copy(sourceRoot + '/gulpfile.js', destRoot + '/gulpfile.js');

	  // stylus files
	  this.fs.copy(sourceRoot + '/libs/stylus/*', devDir + '/stylus/');
	  this.fs.copy(sourceRoot + '/libs/css/bootstrap/', devDir + '/stylus/libs/bootstrap');
	  this.fs.copy(sourceRoot + '/libs/css/import-bootstrap.styl', devDir + '/stylus/libs/import-bootstrap.styl');
	  this.fs.copy(sourceRoot + '/libs/stylus/basic/*', devDir + '/stylus/basic');


	   // Feature 
	  function hasFeature(list, feature) {
		return list && list.indexOf(feature) !== -1;
	  }

	  this.fontawesome = hasFeature(this.props.fonts, "fontawesome");
	  this.proximanova = hasFeature(this.props.fonts, "proximanova");
	  this.montserrat = hasFeature(this.props.fonts, "montserrat");
	  this.avernirnext = hasFeature(this.props.fonts, "avernirnext");
	  this.museosans = hasFeature(this.props.fonts, "museosans");
	  
	  this.selecttwo = hasFeature(this.props.plugins, "select2");
	  this.owlcarousel = hasFeature(this.props.plugins, "owlcarousel");
	  this.dropzone = hasFeature(this.props.plugins, "dropzone");
	  this.lightslider = hasFeature(this.props.plugins, "lightslider");
	  this.viewportfixer = hasFeature(this.props.plugins, "viewportfixer");
	  this.cookie = hasFeature(this.props.plugins, "cookie");
	  this.animation = hasFeature(this.props.plugins, "animation");
	  this.googlemap = hasFeature(this.props.plugins, "googlemap");

	  if(this.fontawesome){
		this.fs.copy(sourceRoot + '/libs/fonts/fontawesome/*', asDir + '/fonts/');
		this.fs.copy(sourceRoot + '/libs/css/font-awesome.styl', devDir + '/stylus/libs/font-awesome.styl');
	  }

	  if(this.proximanova){
		this.fs.copy(sourceRoot + '/libs/fonts/proximanova/*', asDir + '/fonts/');
		this.fs.copy(sourceRoot + '/libs/css/proximanova.styl', devDir + '/stylus/libs/proximanova.styl');
	  }

	  if(this.avenirnext){
		this.fs.copy(sourceRoot + '/libs/fonts/avenirnext/*', asDir + '/fonts/');
		this.fs.copy(sourceRoot + '/libs/css/avenirnext.styl', devDir + '/stylus/libs/avenirnext.styl');
	  }
	  
	  if(this.montserrat){
		this.fs.copy(sourceRoot + '/libs/fonts/montserrat/*', asDir + '/fonts/');
		this.fs.copy(sourceRoot + '/libs/css/montserrat.styl', devDir + '/stylus/libs/montserrat.styl');
	  }

	  if(this.selecttwo){
		this.fs.copy(sourceRoot + '/libs/js/select2.js', devDir + '/js/libs/select2.js');
		this.fs.copy(sourceRoot + '/libs/css/select2.styl', devDir + '/stylus/libs/select2.styl'); 
	  }

	  if(this.owlcarousel){
		this.fs.copy(sourceRoot + '/libs/js/owl-carousel.js', devDir + '/js/libs/owl-carousel.js');
		this.fs.copy(sourceRoot + '/libs/css/owl-carousel.styl', devDir + '/stylus/libs/owl-carousel.styl');

		//
		// demo assets
		//

		var owlRoot = destRoot + "/demo/owl-carousel/";
		mkdirp(owlRoot);
		this.fs.copy(sourceRoot + '/libs/demo/owl-carousel/*', owlRoot); 
	  }

	  if(this.dropzone){
		this.fs.copy(sourceRoot + '/libs/js/dropzone.js', devDir + '/js/libs/dropzone.js');
		this.fs.copy(sourceRoot + '/libs/css/dropzone.styl', devDir + '/stylus/libs/dropzone.styl'); 
	  }
	  
	  if(this.lightslider){
		this.fs.copy(sourceRoot + '/libs/js/lightslider.min.js', devDir + '/js/libs/lightslider.min.js');
		this.fs.copy(sourceRoot + '/libs/css/lightslider.styl', devDir + '/stylus/libs/lightslider.styl'); 
	  }
	  
	  if(this.viewportfixer){
		this.fs.copy(sourceRoot + '/libs/js/viewport-units-buggyfill.js', devDir + '/js/libs/viewport-units-buggyfill.js');
		this.fs.copy(sourceRoot + '/libs/js/viewport-units-buggyfill.hacks.js', devDir + '/js/libs/viewport-units-buggyfill.hacks.js');
		this.fs.copy(sourceRoot + '/libs/css/viewport.styl', devDir + '/stylus/libs/viewport.styl'); 

		//
		// demo assets
		//

		var fixerRoot = destRoot + "/demo/viewport-buggyfill/";
		mkdirp(fixerRoot);
		this.fs.copy(sourceRoot + '/libs/demo/viewport-buggyfill/*', fixerRoot); 

	  }
	  
	  if(this.cookie){
		this.fs.copy(sourceRoot + '/libs/js/cookie.js', devDir + '/js/libs/cookie.js');

		//
		// demo assets
		//

		var cookieRoot = destRoot + "/demo/cookie/";
		mkdirp(cookieRoot);
		this.fs.copy(sourceRoot + '/libs/demo/cookie/*', cookieRoot); 
	  }

	  if(this.googlemap){
	  	this.fs.copy(sourceRoot + '/libs/js/google-map.js', devDir + '/js/libs/google-map.js');
	  }

	  if(this.animation){
	  	this.fs.copy(sourceRoot + '/libs/css/animation.styl', devDir + '/stylus/libs/animation.styl');
	  	this.fs.copy(sourceRoot + '/libs/js/nuscroll.js', devDir + '/js/libs/nuscroll.js');

		//
		// demo assets
		//

		// var cookieRoot = destRoot + "/demo/cookie/";
		// mkdirp(cookieRoot);
		// this.fs.copy(sourceRoot + '/libs/demo/cookie/*', cookieRoot); 	
	  }

  },
  initializing: function(){
  },
  configuring: function(){
	this.config.save();
  },
  writing: function(){
	this._fileSystem();
  },
  end: function() {
	  this.log("and there you go! one step away from development just type \n gulp ");
  },
  install: function () {
	this.installDependencies();
  }
});
