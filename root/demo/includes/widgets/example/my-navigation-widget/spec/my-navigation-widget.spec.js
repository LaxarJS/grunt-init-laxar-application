/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 */
define( [
   '../my-navigation-widget',
   'laxar/laxar_testing'
], function( widgetModule, ax ) {
   'use strict';

   describe( 'A MyNavigationWidget', function() {

      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( 'example/my-navigation-widget' );
         testBed.injections = {
            axFlowService: { constructAnchor: function() { return '#/mockPlace'; } }
         };
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with links', function() {

         beforeEach( function setup() {
            spyOn( testBed.injections.axFlowService, 'constructAnchor' ).andCallThrough();

            testBed.featuresMock = {
               links: [ { htmlLabel: 'home', target: 'someTarget' } ]
            };
            testBed.setup();
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'uses the configured targets to generate the corresponding URLs', function() {
            expect( testBed.injections.axFlowService.constructAnchor ).toHaveBeenCalledWith( 'someTarget' );
            expect( testBed.scope.links[ 0 ] ).toEqual( { href: '#/mockPlace', htmlLabel: 'home' } );
         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'with buttons', function() {

         var buttons;

         beforeEach( function setup() {
            buttons = [ { htmlLabel: 'submit', target: '_self' } ];
            testBed.featuresMock = { buttons: buttons };
            testBed.setup();
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'allows to navigate through events', function() {
            testBed.scope.$apply( function() {
               testBed.scope.handleClick( buttons[ 0 ] );
            } );
            expect( testBed.scope.eventBus.publish ).toHaveBeenCalledWith( 'navigateRequest._self', {
               target: '_self'
            } );
         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );

} );
