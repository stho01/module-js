module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');

    return {
        scripts: {
            files: [
                "src/**/*.js",
                "src/application/Main.js"
            ],
            tasks: ["uglify:build_test_app"]
        },
        sass: {
            files: ["content/css/**/*.scss"],
            tasks: ["sass:dev"]
        }
    }
};