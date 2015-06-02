/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
'use strict';

var path = require('path');
var semver = require('./semver');

function toCamelCase( string ) {
   return string.replace( /(^|_)([a-z])/g, function( x, y, initial ) {
      return initial.toUpperCase();
   } );
}

function toSentenceCase( string ) {
   return string.replace( /(^|_|-)([a-z])/g, function( x, y, initial ) {
      return ( y ? ' ' : '' ) + initial.toUpperCase();
   } );
}

function toTitleCase( string ) {
   return string.replace( /(^|[_-]|([a-z]))([A-Za-z])/, function( x, y, last, initial ) {
      return ( last ? last + ' ' : '' ) + initial.toUpperCase();
   } );
}

function extend( object /*, source1, source2, ..., sourceN */ ) {
   return [].reduce.call( arguments, function( object, source ) {
      for( var key in source ) {
         if( source.hasOwnProperty( key ) ) {
            object[ key ] = source[ key ];
         }
      }
      return object;
   }, {} );
}

function stripType( string, type ) {
   return string.replace( new RegExp( '[-_]' + type + '$', 'i' ), '' );
}


module.exports = function prompts( options, init, callback ) {
   var type = options.type;
   var typeTitle = toTitleCase( type );

   var isApp = /application$/.test(type);

   var promptList = [
      extend( init.prompt( 'name' ), {
         message: typeTitle + ' name',
         default: function( value, props, done ) {
            done( null, path.basename( process.cwd() ) );
         },
         sanitize: function( value, props, done ) {
            done( null, stripType( value, type ) );
         }
      } ),
      extend( init.prompt( 'title' ), {
         message: typeTitle + ' title',
         default: function( value, props, done ) {
            var title = isApp ? toSentenceCase( props.name ) : ( toCamelCase( stripType( props.name, type ) ) + typeTitle );
            done( null, title );
         }
      } ),
      init.prompt( 'description', 'My new LaxarJS ' + type ),
      extend( init.prompt( 'licenses' ), {
         validator: /^(?:[\w\-\.\d]+(?:\s+[\w\-\.\d]+)*)$/,
         default: 'none',
         sanitize: function( value, props, done ) {
            done( value && value !== 'none' ? value.split( /\s+/ ) : [] );
         }
      } ),
      init.prompt( 'homepage' ),
      init.prompt( 'author_name' ),
      init.prompt( 'version', '0.1.0-pre' ),
      {
         name: 'laxar_port',
         message: 'Development server port',
         default: 8000,
         validator: /\d+/,
         warning: 'Must be a valid HTTP port number'
      },
      {
         name: 'generate_example',
         message: 'Should a set of example widgets be generated? (Y/n)',
         default: 'Y',
         validator: /y(es)?|no?/i,
         warning: 'Either yes (Y) or no (N)',
         sanitize: function( value, props, done ) {
            done( null, value.toLowerCase().indexOf( 'y' ) === 0 );
         }
      }
   ];

   return promptList;
};
