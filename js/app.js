// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        mapAPI:'https://maps.googleapis.com/maps/api/js?key=AIzaSyDIcXOw5toqC0QN78V1sWvYtRJbEel90Xg&sensor=false',
        app: '../app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);
