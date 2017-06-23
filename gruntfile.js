module.exports = function (grunt) {
    var files = [ "./src/**/*.js" ];

    grunt.initConfig({
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    sourceMap: true
                },
                files: [{
                    src: [files],
                    dest: 'wwwroot/scripts/main.js'
                }]
            },
            minify_build: {
                options: {},
                files: [{
                    src: [files],
                    dest: 'wwwroot/scripts/main.min.js'
                }]
            }
        },
        watch: {
            scripts: {
                files: files,
                tasks: ["uglify:build"]
            },
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
        }
    });

    // load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
};