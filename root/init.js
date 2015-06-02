/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
require( [
   'laxar',
   'laxar-application-dependencies',
   'json!laxar-application/var/listing/application_resources.json',
   'json!laxar-application/var/listing/bower_components_resources.json',
   'json!laxar-application/var/listing/includes_resources.json'
], function( ax, applicationDependencies, applicationListing, bowerComponentsListing, includesListing ) {
   'use strict';

   // prepare file listings for efficient asset loading
   // listing contents are determined by the Gruntfile.js
   window.laxar.fileListings = {
      application: applicationListing,
      bower_components: bowerComponentsListing,
      includes: includesListing
   };

   ax.bootstrap( applicationDependencies );
} );
