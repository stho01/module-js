module.exports = function (grunt) {
    let testAppFiles = [
        "src/**/*.js"
    ];
    
    let distFiles = [
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
                    dest: 'dist/modulejs.js'
                }]
            },
            minify_dist_build: {
                options: {},
                files: [{
                    src: distFiles,
                    dest: 'dist/modulejs.min.js'
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
        },
        watch: {
            scripts: {
                files: testAppFiles,
                tasks: ["uglify:build_test_app"]
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
                sourceMap: false,
                lib: [
                    "dom",
                    "es5",
                    "es2015.core",
                    "es2015.collection",
                    "es2015.promise",
                    "es2015.iterable",
                    "es2015.symbol",
                    "es2015.symbol.wellknown",
                    "es2015.generator"
                ]
            },
            default : {
                src: [
                    "src/utils/**/*.ts",
                    "src/optionator/**/*.ts",
                    "src/modulejs.core/**/*.ts"
                ],
                out: "dist/modulejs.js"
            }
        }
    });


    // load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-ts');

    //grunt.registerTask("default ts", ["ts"]);
    grunt.registerTask("Build Distribution", ["ts", "uglify:build_dist", "uglify:build_test_app"]);
    grunt.registerTask("Build Test Application", ["uglify:build_test_app"]);
};