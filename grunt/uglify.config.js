module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    var testAppFiles = [ "src/**/*.js", "src/application/Main.js" ];
    var distFiles = [ "src/utils/**/*.js", "src/optionator/**/*.js", "src/modulejs/**/*.js" ];

    return {
        build_dist: {
            options: {
                mangle: false,
                compress: false,
                beautify: true,
                sourceMap: true
            },
            files: [{
                src: distFiles,
                dest: 'dist/content/scripts/stho/modulejs.js'
            }]
        },

        minify_dist_build: {
            options: {},
            files: [{
                src: distFiles,
                dest: 'dist/content/scripts/stho/modulejs.min.js'
            }]
        },

        build_test_app: {
            options: {
                mangle: false,
                compress: false,
                beautify: true,
                sourceMap: true
            },
            files: [{
                src: testAppFiles,
                dest: 'wwwroot/scripts/main.js'
            }]
        }
    }
};