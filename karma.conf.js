// Karma configuration
// Generated on Thu Nov 26 2015 15:28:29 GMT+0100 (CET)

// start test by using:
// karma start karma.conf.js

// Because livereload for debug.html doesn't working, I've implemented hack.
// open {node_modules}/karma-jasmine/lib/adapter.js
// and paste inside function:
//
// document.write('<script src="/socket.io/socket.io.js"></script>');
// document.write('<script>(function () { ' +
//     '    var socket = io(window.location.host, { path: "/socket.io" }); ' +
//     '    socket.on("execute", function () { window.location.reload(); }); ' +
//     '}());</script>');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'index.html',
      'static/js/vendor/angular-mock.js', // local lib file, because karma have problems to load external files in proper time
      'app/app.js',
      'app/controllers/*.js',
      'app/factories/*.js',
      'app/directives/*.js',
      'templates/*.html',
      'spec/unit/*.js',
      { pattern: 'static/js/vendor/jquery.js', included: false },
      { pattern: 'static/css/main.css', included: false }
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['html', 'progress'],


    // web server port
    port: 9876,
    // port: 8080,

    // captureTimeout: 5000,
    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
