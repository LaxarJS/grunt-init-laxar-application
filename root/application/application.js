// See https://github.com/LaxarJS/laxar/blob/master/docs/manuals/configuration.md
window.laxar = {
   name: '{%= name %}',
   description: '{%= description %}',

   portal: {
      theme: 'default',
      useMergedCss: window.laxarMode === 'RELEASE'
   },

   file_resource_provider: {
      fileListings: {
         'application': 'var/listing/application_resources.json',
         'bower_components': 'var/listing/bower_components_resources.json',
         'includes': 'var/listing/includes_resources.json'
      },
      useEmbedded: window.laxarMode === 'RELEASE'
   }
};
