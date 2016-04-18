// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery:'https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min',
        jqueryui: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
        downloadXML:'downloadXML',
        api:'https://maps.googleapis.com/maps/api/js?key=AIzaSyDIcXOw5toqC0QN78V1sWvYtRJbEel90Xg',
        app: '../app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
