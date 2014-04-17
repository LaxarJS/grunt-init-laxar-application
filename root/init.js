/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
require( [
   'portal_angular_dependencies',
   'laxar'
], function( widgetModules, ax ) {
   'use strict';

   ax.bootstrap( widgetModules );
} );
