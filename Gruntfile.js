'use strict'
module.exports = function (grunt) {

    grunt.initConfig({
        jsdoc2md: {
            dist: {
                src: 'src/EventEmitter.js',
                dest: 'README.md'
            }
        },

        copy: {
            dist: {
                files: {
                    'dist/EventEmitter.js': ['src/EventEmitter.js']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/EventEmitter.min.js': ['dist/EventEmitter.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy:dist', 'uglify:dist', 'jsdoc2md:dist']);
};
