/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
( function( global ) {
   'use strict';
   global.laxarSpec = {
      title: 'MyEditorWidget Specification',
      tests: [
         'my-editor-widget.spec'
      ]
   };
} )( this );
