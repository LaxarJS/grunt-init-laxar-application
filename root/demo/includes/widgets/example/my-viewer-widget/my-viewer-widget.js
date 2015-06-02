/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
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
