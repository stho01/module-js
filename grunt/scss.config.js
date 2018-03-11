module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    return {
        dev: {
            options: {
                style: 'expanded'
            },
            files: {
                "wwwroot/content/main.css": "content/css/main.scss"
            }
        }
    }
};