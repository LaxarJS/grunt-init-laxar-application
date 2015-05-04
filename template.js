/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
'use strict';

// Basic template description.
exports.description = 'Create a LaxarJS application';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about getting started with your LaxarJS ' +
  'application, please see the docs at ' +
  'https://github.com/LaxarJS/laxar/blob/master/README.md';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You can now start developing your application!' +
  '\n\n' +
  'Before getting started, run _npm install_ to get tools and dependencies. ' +
  'After that, you can run _npm start_ to start your application. To find ' +
  'out more about developing applications with LaxarJS, please have a look at ' +
  'the manuals:' +
  '\n\n' +
  'https://github.com/LaxarJS/laxar/blob/master/docs/manuals/index.md';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ) {

   var options = { type: 'application' };
   var prompts = require( './prompts' )( options, init );

   init.process( options, prompts, function( err, props ) {

      // Files to copy (and process).
      var files = init.filesToCopy( props );

      if( props.author_name === 'aixigo AG' && props.licenses[0] === 'MIT' ) {
      } else {
         init.addLicenseFiles(files, props.licenses);
      }

      // Actually copy (and process) files.
      init.copyAndProcess( files, props );

      // All done!
      done();

   });

};
