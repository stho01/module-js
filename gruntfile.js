module.exports = function (grunt) {
    // var files = [ "./src/**/*.js" ];
    var files = [
        "src/utils/**/*.js",
        "src/optionator/**/*.js",
        "src/modulejs.core/**/*.js"
    ];
    
    var tsFiles = [];

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
                    src: files,
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
        },
        ts: {
            options: {
                declaration: true,
                sourceMap: false
            },
            default : {
                src: [
                    "src/utils/**/*.ts",
                    "src/optionator/**/*.ts",
                    "src/modulejs.core/**/*.ts"
                ],
                out: "dev/d.ts/modularization.js"
            }
        }
    });


    // load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask("default ts", ["ts"]);
};