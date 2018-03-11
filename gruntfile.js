var tsConfig        = require("./grunt/ts.config");
var scssConfig      = require("./grunt/scss.config");
var uglifyConfig    = require("./grunt/uglify.config");
var watchConfig     = require("./grunt/uglify.config");

module.exports = function (grunt) {
    grunt.initConfig({
        uglify  : uglifyConfig(grunt),
        sass    : scssConfig(grunt),
        ts      : tsConfig(grunt),
        watch   : watchConfig(grunt) 
    });

    // load tasks.
    grunt.registerTask("Build Distribution", ["ts","uglify:build_dist","uglify:minify_dist_build"]);
    grunt.registerTask("Build Test Application",    ["uglify:build_test_app"]);
};