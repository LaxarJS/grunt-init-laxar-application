/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope', 'axEventBus', 'axFlowService' ];

   function Controller( $scope, eventBus, flowService ) {
      // navigation through plain old links...
      $scope.links = $scope.features.links.map( function( link ) {
         return {
            htmlLabel: link.htmlLabel,
            href: flowService.constructAnchor( link.target )
         };
      } );

      // ...or programmatically by using events (form submission etc.)
      $scope.handleClick = function( button ) {
         eventBus.publish( 'navigateRequest.' + button.target, {
            target: button.target
         } );
      };
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( 'myNavigationWidget', [] ).controller( 'MyNavigationWidgetController', Controller );

} );
