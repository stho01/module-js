module.exports = function (grunt) {
    var testAppFiles = [
        "src/**/*.js"
    ];
    
    var distFiles = [
        "src/utils/**/*.js",
        "src/optionator/**/*.js",
        "src/modulejs.core/**/*.js"
    ];
    

    grunt.initConfig({
        uglify: {
            build_dist: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    sourceMap: true
                },
                files: [{
                    src: distFiles,
                    dest: 'dist/main.js'
                }]
            },
            minify_dist_build: {
                options: {},
                files: [{
                    src: distFiles,
                    dest: 'dist/main.min.js'
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
                    dest: 'wwwroot/scripts/main.min.js'
                }]
            }
        },
        watch: {
            scripts: {
                files: distFiles,
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
                out: "dist/modularization.js"
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