var require = {
   baseUrl: 'bower_components',
   deps: [],
   paths: {
      // LaxarJS Core:
      requirejs: 'requirejs/require',
      text: 'requirejs-plugins/lib/text',
      json: 'requirejs-plugins/src/json',
      angular: 'angular/angular',
      'angular-mocks': 'angular-mocks/angular-mocks',
      'angular-route': 'angular-route/angular-route',
      'angular-sanitize': 'angular-sanitize/angular-sanitize',
      jjv: 'jjv/lib/jjv',
      jjve: 'jjve/jjve',
      // LaxarJS Core (tests only):
      jasmine: 'jasmine/lib/jasmine-core/jasmine',
      q_mock: 'q_mock/q',

      // LaxarJS Patterns:
      'json-patch': 'fast-json-patch/src/json-patch-duplex',

      // LaxarJS UIKit:
      jquery: 'jquery/dist/jquery',
      jquery_ui: 'jquery_ui/ui',
      'bootstrap-tooltip': 'bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
      'bootstrap-affix': 'bootstrap-sass-official/assets/javascripts/bootstrap/affix',
      trunk8: 'trunk8/trunk8',

      // LaxarJS application parts:
      'laxar-path-root': '..',
      'laxar-path-layouts': '../application/layouts',
      'laxar-path-pages': '../application/pages',
      'laxar-path-widgets': '../includes/widgets',
      'laxar-path-themes': '../includes/themes',
      'laxar-path-flow': '../application/flow/flow.json',

      // LaxarJS application modules:
      'laxar-application-dependencies': '../var/static/laxar_application_dependencies'
   },
   packages: [
      {
         name: 'laxar-application',
         location: '..',
         main: 'init'
      },
      {
         name: 'laxar',
         location: 'laxar',
         main: 'laxar'
      },
      {
         name: 'laxar_patterns',
         location: 'laxar_patterns',
         main: 'laxar_patterns'
      },
      {
         name: 'laxar_uikit',
         location: 'laxar_uikit',
         main: 'laxar_uikit'
      },
      {
         name: 'moment',
         location: 'moment',
         main: 'moment'
      }
   ],
   shim: {
      angular: {
         // use `deps: [ 'jquery' ]` if you need a jQuery-compatible angular.element()
         deps: [],
         exports: 'angular'
      },
      'angular-mocks': {
         deps: [ 'angular' ],
         init: function( angular ) {
            'use strict';
            return angular.mock;
         }
      },
      'angular-route': {
         deps: [ 'angular' ],
         init: function ( angular ) {
            'use strict';
            return angular;
         }
      },
      'angular-sanitize': {
         deps: [ 'angular' ],
         init: function ( angular ) {
            'use strict';
            return angular;
         }
      },
      'bootstrap-affix': {
         deps: [ 'jquery' ]
      },
      'bootstrap-tooltip': {
         deps: [ 'jquery' ]
      },
      'json-patch': {
         exports: 'jsonpatch'
      },
      'trunk8': {
         deps: [ 'jquery' ]
      }
   }
};
