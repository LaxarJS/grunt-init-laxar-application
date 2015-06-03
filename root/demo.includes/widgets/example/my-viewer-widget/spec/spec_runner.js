/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
( function( global ) {
   'use strict';
   global.laxarSpec = {
      title: 'MyViewerWidget Specification',
      tests: [
         'my-viewer-widget.spec'
      ]
   };
} )( this );
