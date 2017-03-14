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
                    dest: 'wwwroot/scripts/main.js'
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

    // Javascript
    grunt.registerTask('Build Javascript', ['uglify:build']);
    grunt.registerTask('Minify Javascript', ['uglify:minify_build']);
    grunt.registerTask('Watch Javascript', ['watch:scripts']);

    // SASS
    grunt.registerTask('Build SASS', ['sass:dev']);
    grunt.registerTask('Watch SASS', ['watch:sass']);

};