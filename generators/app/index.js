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
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('Yaver') + ' saygılarını sunar!'
    ));

    var prompts = [
        {
            name: 'appName',
            message: 'Uygulamanın adı nedir?',
            default: 'projeAdi'
        },
        {
            name: 'cssMid',
            type: 'checkbox',
            message: 'Stylus mu Sass mı ?',
            choices: [
                {
                    name: 'stylus',
                    value: 'stylus',
                    checked: true
                },
                {
                    name: 'sass',
                    value: 'sass',
                    checked: false,
                }
            ]
        },
        {
            name : 'plugins',
            type: 'checkbox',
            message: 'Hangi jquery pluginleri eklensin?',
            choices: [
                {
                    name: 'owlcarousel',
                    value: 'owlcarousel',
                    checked: false
                },
                {
                    name: 'select2',
                    value: 'select2',
                    checked: false
                },
                {
                    name: 'lightslider',
                    value: 'lightslider',
                    checked: false
                },
                {
                    name: 'dropzone',
                    value: 'dropzone',
                    checked: false
                }
            ]
        },
        {
            name: 'fonts',
            type: 'checkbox',
            message: 'Hangi fontlar eklensin?',
            choices: [
                {
                    name: 'fontawesome',
                    value: 'fontawesome',
                    checked: false
                },
                {
                    name: 'proximanova',
                    value: 'proximanova',
                    checked: false
                },
                {
                    name: 'museosans',
                    value: 'museosans',
                    checked: false
                }
            ]
        },
        {
            name: 'deploy',
            type: 'confirm',
            message: 'Uygulama sizin için otomatik deploy edilsin mi?',
            default: false
        }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

    }.bind(this));
  },
  _deploying: function(){
      // continue to process
      // server hakkındaki sorular
      if(this.props.deploy){
          var done = this.async();
          var sshSorulari = [
              {
                  name: 'serverIp',
                  message: 'ip veya domain',
                  default: '108.174.149.249'
              },
              {
                  name: 'serverUsername',
                  message: 'username',
                  default: 'root'
              },
              {
                  name: 'serverPassword',
                  message: 'password',
                  default: '****'
              },
              {
                  name: 'serverPort',
                  message: 'port',
                  default: '22'
              },
              {
                  name: 'serverKey',
                  message: 'ssh-dsa Private key konumu',
                  default: '/Users/nusu/.ssh/id_dsa'
              },
              {
                  name: 'serverPublicKey',
                  message: 'ssh-dsa Public key konumu',
                  default: '/Users/nusu/.ssh/id_dsa.pub'
              }
          ];
          return this.prompt(sshSorulari).then(function( props ){
              this.serverInf = props;
              done();
          }.bind(this));
      }
  },
  _fileSystem: function(){
      var destRoot    = this.destinationRoot(),
          devDir      = destRoot + '/dev',
          asDir       = destRoot + '/assets',
          sourceRoot  = this.sourceRoot();

      mkdirp(devDir + '/' + this.props.cssMid[0]);
      mkdirp(devDir + '/js');
      //mkdirp(devDir + '/yaver');
      mkdirp(devDir + '/stylus');
      mkdirp(devDir + '/stylus/elements');
      mkdirp(devDir + '/stylus/pages');
      
      mkdirp(asDir  + '/css');
      mkdirp(asDir  + '/fonts');
      mkdirp(asDir  + '/img');
      mkdirp(asDir  + '/js');
      
      // deploy file
     if(this.props.deploy){
        var createConfig = {
            "ip": this.serverInf.serverIp,
            "username": this.serverInf.serverUsername,
            "password": this.serverInf.serverPassword,
            "port": this.serverInf.serverPort,
            "privateKey": this.serverInf.serverKey,
            "publicKey": this.serverInf.serverPublicKey
        };
        this.fs.writeJSON(destRoot + '/config.json', createConfig);
      }
      // -- deploy end

      // bower file
      var bowerJson = {
          name: "nusu",
          private: true,
          version: "1.0.0",
          authors: "Nusu Alabuğa - nusususuzu@gmail.com",
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
      //this.fs.copy(sourceRoot + '/libs/yaver/*', devDir + '/yaver/');

      // stylus files
      this.fs.copy(sourceRoot + '/libs/stylus/*', devDir + '/stylus/');
      this.fs.copy(sourceRoot + '/libs/css/bootstrap/', devDir + '/stylus/libs/bootstrap');
      this.fs.copy(sourceRoot + '/libs/stylus/basic/*', devDir + '/stylus/basic');


       // Feature 
      function hasFeature(list, feature) {
        return list && list.indexOf(feature) !== -1;
      }

      this.fontawesome = hasFeature(this.props.fonts, "fontawesome");
      this.proximanova = hasFeature(this.props.fonts, "proximanova");
      this.museosans = hasFeature(this.props.fonts, "museosans");
      
      this.selecttwo = hasFeature(this.props.plugins, "select2");
      this.owlcarousel = hasFeature(this.props.plugins, "owlcarousel");
      this.dropzone = hasFeature(this.props.plugins, "dropzone");
      this.lightslider = hasFeature(this.props.plugins, "lightslider");

      if(this.fontawesome){
        this.fs.copy(sourceRoot + '/libs/fonts/fontawesome/*', asDir + '/fonts/');
        this.fs.copy(sourceRoot + '/libs/css/font-awesome.styl', devDir + '/stylus/libs/font-awesome.styl');
      }

      if(this.proximanova){
        this.fs.copy(sourceRoot + '/libs/fonts/proximanova/*', asDir + '/fonts/');
        this.fs.copy(sourceRoot + '/libs/css/proximanova.styl', devDir + '/stylus/libs/proximanova.styl');
      }

      if(this.selecttwo){
        this.fs.copy(sourceRoot + '/libs/js/select2.js', devDir + '/js/select2.js');
        this.fs.copy(sourceRoot + '/libs/css/select2.styl', devDir + '/stylus/libs/select2.styl'); 
      }

      if(this.owlcarousel){
        this.fs.copy(sourceRoot + '/libs/js/owl-carousel.js', devDir + '/js/owl-carousel.js');
        this.fs.copy(sourceRoot + '/libs/css/owl-carousel.styl', devDir + '/stylus/libs/owl-carousel.styl'); 
      }

      if(this.dropzone){
        this.fs.copy(sourceRoot + '/libs/js/dropzone.js', devDir + '/js/dropzone.js');
        this.fs.copy(sourceRoot + '/libs/css/dropzone.styl', devDir + '/stylus/libs/dropzone.styl'); 
      }
      
      if(this.lightslider){
        this.fs.copy(sourceRoot + '/libs/js/lightslider.min.js', devDir + '/js/lightslider.min.js');
        this.fs.copy(sourceRoot + '/libs/css/lightslider.styl', devDir + '/stylus/libs/lightslider.styl'); 
      }

  },
  initializing: function(){
  },
  configuring: function(){
    this._deploying();
    this.config.save();
  },
  writing: function(){
    this._fileSystem();
  },
  end: function() {
      this.log("bitti");
  },
  /*install: function () {
    this.installDependencies();
  }*/
});
