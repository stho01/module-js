let path = require("path");

module.exports = function (grunt) {
    let buildFile   = path.resolve("./src/_build.json"),
        data        = grunt.file.readJSON(buildFile),
        config      = {};
    
    data.forEach((pgk) => {
        let dest = (pgk.dest || "build/") + pgk.name,
            jsFiles = pgk.files.map(file => file + ".js");
        
        config[pgk.name] = {
            files: [{ src : jsFiles, dest: `${dest}.js` }],
            options: { mangle: false, compress: false, beautify: true, sourceMap: true }};
        config[`${pgk.name}_minify`] = {
            files: [{ src: jsFiles, dest: `${dest}.min.js` }]};
        
        grunt.registerTask(pgk.name, [`uglify:${pgk.name}`, `uglify:${pgk.name}_minify`])
    });
    
    return config;
};