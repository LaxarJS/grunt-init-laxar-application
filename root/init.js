/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
require( [
   'laxar-application-dependencies',
   'laxar'
], function( applicationModules, ax ) {
   'use strict';

   ax.bootstrap( applicationModules );
} );
