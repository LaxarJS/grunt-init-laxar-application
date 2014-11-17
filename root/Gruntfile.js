/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var path = require( 'path' );

   var serverPort = {%= laxar_port %};
   var liveReloadPort = 30000 + serverPort;

   grunt.initConfig( {
      pkg: grunt.file.readJSON( 'package.json' ),
      connect: {
         options: {
            port: serverPort
         },
         default: {}
      },
      jshint: {
         options: {
            jshintrc: __dirname + '/.jshintrc'
         }
      },
      compress: {
         default: {
            options: {
               archive: '<%= pkg.name %>-<%= pkg.version %>.zip',
               mode: 'zip'
            },
            files: [ {
               src: [
                  '*.+(css|html|js|json)',
                  'application/**',
                  'bower_components/**',
                  'includes/+(controls|lib|themes|widgets)/**',
                  'static/**',
                  'var/**',
                  '!includes/**/+(bower_components|node_modules)/**'
               ],
               filter: 'isFile'
            } ]
         }
      },
      portal_angular_dependencies: {
         default: {
            options: {},
            dest: 'var/static/portal_angular_dependencies.js',
            src: [ 'application/flow/*.json' ]
         }
      },
      css_merger: {
         default: {
            src: [ 'application/flow/*.json' ]
         }
      },
      directory_tree: {
         application: {
            dest: 'var/listing/application_resources.json',
            src: [
               'application/flow/**/*.json',
               'application/layouts/**/*.css',
               'application/layouts/**/*.html',
               'application/pages/**/*.json'
            ],
            options: {
               embedContents: [
                  'application/flow/**/*.json',
                  'application/layouts/**/*.html',
                  'application/pages/**/*.json'
               ]
            }
         },
         bower_components: {
            dest: 'var/listing/bower_components_resources.json',
            src: [
               'bower_components/laxar_uikit/themes/**/*.css',
               'bower_components/laxar_uikit/controls/**/*.+(css|html)'
            ],
            embedContents: [ 'bower_components/laxar_uikit/controls/**/*.html' ]
         },
         includes: {
            dest: 'var/listing/includes_resources.json',
            src: [
               'includes/themes/**/*.+(css|html)',
               'includes/widgets/*/*/*.+(css|html|json)',
               '!includes/widgets/*/*/+(package|bower).json',
               'includes/widgets/*/*/!(bower_components|node_modules|spec)/**/*.+(css|html|json)'
            ],
            options: {
               embedContents: [
                  'includes/themes/**/controls/**/*.html',
                  'includes/widgets/*/*/widget.json',
                  'includes/widgets/*/*/*.theme/*.html',
                  'includes/widgets/*/*/*.theme/css/*.css'
               ]
            }
         }
      },
      requirejs: {
         default: {
            options: {
               mainConfigFile: 'require_config.js',
               name: '../init',
               out: 'var/build/optimized_init.js',
               optimize: 'uglify2'
            }
         }
      },
      watch: {
         options:  {
            livereload: liveReloadPort
         },
         Gruntfile: {
            files: __filename,
            options: {
               /* reload Grunt config */
               reload: true
            }
         },
         application: {
            files: [ '<%= directory_tree.application.src %>' ],
            tasks: [ 'directory_tree:application' ],
            options: {
               event: [ 'added', 'deleted' ]
            }
         },
         includes: {
            files: [ '<%= directory_tree.includes.src %>' ],
            tasks: [ 'directory_tree:includes' ],
            options: {
               event: [ 'added', 'deleted' ],
               reload: true
            }
         }
      }
   } );

   // Find all widget.json files,
   // take their directory names,
   // create or update the configuration
   grunt.file.expand( 'includes/widgets/*/*/widget.json' )
      .map( path.dirname )
      .forEach( function( widget ) {
         var config = grunt.config( 'widget.' + widget );
         grunt.config( 'widget.' + widget, grunt.util._.defaults( {}, config ) );
         grunt.config( 'watch.' + widget, {
            files: [
               widget + '/!(bower_components|node_modules)',
               widget + '/!(bower_components|node_modules)/**'
            ]
         } );
      } );

   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-contrib-compass' );
   grunt.loadNpmTasks( 'grunt-contrib-compress' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );

   grunt.registerTask( 'server', [ 'connect' ] );
   grunt.registerTask( 'build', [ 'directory_tree', 'portal_angular_dependencies' ] );
   grunt.registerTask( 'optimize', [ 'build', 'css_merger', 'requirejs' ] );
   grunt.registerTask( 'test', [ 'server', 'widgets' ] );
   grunt.registerTask( 'default', [ 'build', 'test' ] );
   grunt.registerTask( 'dist', [ 'optimize', 'compress' ] );
   grunt.registerTask( 'start', [ 'build', 'server', 'watch' ] );

};
