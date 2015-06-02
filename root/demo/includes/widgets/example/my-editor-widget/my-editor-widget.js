/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 */
define( [
   'angular',
   'laxar'
], function( ng, ax ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope', 'axEventBus' ];

   var defaults = {
      htmlTitle: 'A document resource',
      htmlText: 'This resource is shared by two widgets using the LaxarJS <em>Event-Bus</em>.'
                + '\n\n<b>Try editing</b> the resource contents!'
   };

   function Controller( $scope, eventBus ) {

      var resource = $scope.features.document.resource;
      eventBus.subscribe( 'didNavigate', function() {
         $scope.model = ax.object.deepClone( defaults );
         eventBus.publish( 'didReplace.' + resource, {
            resource: resource,
            data: $scope.model
         } );
      } );

      // We could also simply use didReplace all the time here.
      // This is just to show how incremental updates can be generated:
      Object.keys( defaults ).forEach( function( key ) {
         $scope.$watch( 'model.' + key, function( newValue, previousValue ) {
            if( newValue === previousValue  ) { return; }
            eventBus.publish( 'didUpdate.' + resource, {
               resource: resource,
               patches: [ { op: 'replace', path: '/' + key, value: newValue } ]
            } );
         } );
      } );

   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'myEditorWidget', [] ).controller( 'MyEditorWidgetController', Controller );

} );
