var jsBuild = require("./grunt/JavascriptBuild");

module.exports = function (grunt) {
    var files = [ "./src/**/*.js" ];

    grunt.initConfig({
        uglify: jsBuild(grunt),
        watch: {
            sass: {
                files: ["content/css/**/*.scss"],
                tasks: ["sass:dev"]
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "wwwroot/content/main.css": "content/css/main.scss"
                }
            }
        },
        shell: {
            options: {
                stderr: false
            },
            target: {
                command: 'ls'
            },
            another: 'ls ./src' // shorthand
        }
    });

    // load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-shell');
};