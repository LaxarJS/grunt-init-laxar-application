/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
( function( global ) {
   'use strict';
   global.laxarSpec = {
      title: 'MyNavigationWidget Specification',
      tests: [
         'my-navigation-widget.spec'
      ]
   };
} )( this );
