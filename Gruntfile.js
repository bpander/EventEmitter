'use strict'
module.exports = function (grunt) {

    grunt.initConfig({
        jsdoc2md: {
            readme: {
                src: 'src/EventEmitter.js',
                dest: 'README.md'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown')
    grunt.registerTask('default', 'jsdoc2md')
};
