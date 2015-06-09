/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
define( [
   '../my-viewer-widget',
   'laxar/laxar_testing'
], function( widgetModule, ax ) {
   'use strict';

   describe( 'A MyViewerWidget', function() {

      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( 'example/my-viewer-widget' );
         testBed.featuresMock = {
            document: {
               resource: 'myDocument'
            }
         };
         testBed.setup();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'subscribes to (incremental) changes to its document resource', function() {

         expect( testBed.scope.eventBus.subscribe ).toHaveBeenCalledWith(
            'didReplace.myDocument',
            jasmine.any( Function )
         );

         expect( testBed.scope.eventBus.subscribe ).toHaveBeenCalledWith(
            'didUpdate.myDocument',
            jasmine.any( Function )
         );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'having received a document resource', function() {

         beforeEach( function() {
            testBed.eventBusMock.publish( 'didReplace.myDocument', {
               resource: 'myDocument',
               data: { htmlTitle: 'Title', htmlText: 'and text' }
            } );
            jasmine.Clock.tick( 0 );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'reflects the resource state', function() {
            expect( testBed.scope.model ).toEqual( { htmlTitle: 'Title', htmlText: 'and text' } );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'and subsequent updates', function() {

            beforeEach( function() {
               testBed.eventBusMock.publish( 'didUpdate.myDocument', {
                  resource: 'myDocument',
                  patches: [
                     { op: 'replace', path : '/htmlTitle', value : 'Hey!' },
                     { op: 'replace', path : '/htmlText', value : 'Ho!' }
                  ]
               } );
               jasmine.Clock.tick( 0 );
            } );

            //////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'reflects the updated resource state', function() {
               expect( testBed.scope.model ).toEqual( { htmlTitle: 'Hey!', htmlText: 'Ho!' } );
            } );

         } );

      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );
} );
