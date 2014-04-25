/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
/*global module,__dirname,__filename */
module.exports = function( grunt ) {
   'use strict';

   var path = require( 'path' );
   var _ = grunt.util._;

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
      css_merger: { default: {} },
      widget_json_merger: { default: {} },
      directory_tree: {
         layouts: {
            dest: 'var/listing/application_layouts.json',
            src: [
               'application/layouts/**/*.css',
               'application/layouts/**/*.html'
            ]
         },
         themes: {
            dest: 'var/listing/includes_themes.json',
            src: [
               'includes/themes/**/*.css',
               'includes/themes/**/*.html'
            ]
         },
         uikit_themes: {
            dest: 'var/listing/laxar_uikit_themes.json',
            src: [
               'bower_components/laxar_uikit/themes/**/*.css',
               'bower_components/laxar_uikit/themes/**/*.html'
            ]
         },
         uikit_controls: {
            dest: 'var/listing/laxar_uikit_controls.json',
            src: [
               'bower_components/laxar_uikit/controls/**/*.css',
               'bower_components/laxar_uikit/controls/**/*.html'
            ]
         },
         widgets: {
            dest: 'var/listing/includes_widgets.json',
            src: [
               'includes/widgets/*/*/*.+(css|html|json)',
               'includes/widgets/*/*/!(bower_components|node_modules)/**/*.+(css|html|json)'
            ]
         }
      },
      requirejs: {
         default: {
            options: {
               mainConfigFile: 'require_config.js',
               name: '../init',
               out: 'var/build/optimized_init.js'
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
         layouts: {
            files: [ '<%= directory_tree.layouts.src %>' ],
            tasks: [ 'directory_tree:layouts' ],
            options: {
               event: [ 'added', 'deleted' ]
            }
         },
         themes: {
            files: [ '<%= directory_tree.themes.src %>' ],
            tasks: [ 'directory_tree:themes' ],
            options: {
               event: [ 'added', 'deleted' ]
            }
         },
         widgets: {
            files: [ '<%= directory_tree.widgets.src %>', 'includes/widgets/*' ],
            tasks: [ 'directory_tree:widgets' ],
            options: {
               reload: true
            }
         }
      }
   } );

   /* Find all widget.json files,
    * take their directory names,
    * create or update the configuration */
   grunt.file.expand( 'includes/widgets/*/*/widget.json' )
             .map( path.dirname )
             .forEach( function( widget ) {
      var config = grunt.config( 'widget.' + widget );
      grunt.config( 'widget.' + widget, _.defaults( {}, config ) );
      grunt.config( 'watch.' + widget, {
         files: [ widget + '/!(bower_components|node_modules)',
                  widget + '/!(bower_components|node_modules)/**' ]/*,
         tasks: [ 'widget:' + widget ]*/
      } );
   } );

   grunt.loadNpmTasks( 'grunt-laxar' );
   grunt.loadNpmTasks( 'grunt-contrib-compass' );
   grunt.loadNpmTasks( 'grunt-contrib-compress' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );

   grunt.registerTask( 'server', [ 'connect' ] );
   grunt.registerTask( 'build', [ 'directory_tree', 'portal_angular_dependencies' ] );
   grunt.registerTask( 'optimize', [ 'widget_json_merger', 'css_merger', 'requirejs' ] );
   grunt.registerTask( 'test', [ 'server', 'widgets' ] );
   grunt.registerTask( 'default', [ 'build', 'test' ] );
   grunt.registerTask( 'dist', [ 'build', 'optimize', 'compress' ] );
   grunt.registerTask( 'start', [ 'build', 'server', 'watch' ] );
};