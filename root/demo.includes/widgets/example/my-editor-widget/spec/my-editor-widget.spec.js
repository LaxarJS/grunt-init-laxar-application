/**
 * Copyright  {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
 */
define( [
   '../my-editor-widget',
   'laxar/laxar_testing'
], function( widgetModule, ax ) {
   'use strict';

   describe( 'A MyEditorWidget', function() {

      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( 'example/my-editor-widget' );
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

      describe( 'upon entry navigation', function() {

         beforeEach( function() {
            testBed.eventBusMock.publish( 'didNavigate' );
            jasmine.Clock.tick( 0 );
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         it( 'publishes the initial state of its document resource', function() {
            expect( testBed.scope.eventBus.publish ).toHaveBeenCalledWith(
               'didReplace.myDocument',
               jasmine.any( Object )
            );
         } );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'after the document title was edited', function() {

            beforeEach( function() {
               testBed.scope.model.htmlTitle = 'Hey!';
               testBed.scope.$apply();
            } );

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'publishes the corresponding update to the document resource', function() {
               expect( testBed.scope.eventBus.publish ).toHaveBeenCalledWith(
                  'didUpdate.myDocument',
                  { resource: 'myDocument', patches: [
                     { op: 'replace', path : '/htmlTitle', value : 'Hey!' }
                  ] }
               );
            } );

         } );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         describe( 'after the document text was edited', function() {

            beforeEach( function() {
               testBed.scope.model.htmlText= 'Ho!';
               testBed.scope.$apply();
            } );

            /////////////////////////////////////////////////////////////////////////////////////////////////////

            it( 'publishes the corresponding update to the document resource', function() {
               expect( testBed.scope.eventBus.publish ).toHaveBeenCalledWith(
                  'didUpdate.myDocument',
                  { resource: 'myDocument', patches: [
                     { op: 'replace', path : '/htmlText', value : 'Ho!' }
                  ] }
               );
            } );

         } );

      } );
   } );
} );
