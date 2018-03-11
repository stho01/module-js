module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ts');
  
  var files = [
      "src/utils/**/*.ts",
      "src/optionator/**/*.ts",
      "src/modulejs/**/*.ts"
  ];
  
  return {
    "options": {
      "declaration": true,
      "sourceMap": false,
      "lib": [
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
      src: files,
      out: "dist/content/scripts/typings/stho/modulejs.js"
    }
  }
};