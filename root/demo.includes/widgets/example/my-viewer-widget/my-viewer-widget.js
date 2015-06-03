/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
define( [
   'angular',
   'json-patch'
], function( ng, jsonPatch ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope', 'axEventBus' ];

   function Controller( $scope, eventBus ) {
      var resource = $scope.features.document.resource;
      eventBus.subscribe( 'didReplace.' + resource, function( event ) {
         $scope.model = event.data;
      } );
      eventBus.subscribe( 'didUpdate.' + resource, function( event ) {
         jsonPatch.apply( $scope.model, event.patches );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'myViewerWidget', [] ).controller( 'MyViewerWidgetController', Controller );

} );
