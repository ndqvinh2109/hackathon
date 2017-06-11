/* global module:false */
module.exports = function (grunt) {
    var port = grunt.option('port') || 8000;
    var root = grunt.option('root') || '.';

    if (!Array.isArray(root))
        root = [root];

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*!\n' +
                    ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
                    ' * http://lab.hakim.se/reveal-js\n' +
                    ' * MIT licensed\n' +
                    ' *\n' +
                    ' * Copyright (C) 2016 Hakim El Hattab, http://hakim.se\n' +
                    ' */'
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: root,
                    livereload: true,
                    open: true,
                    hostname: "localhost"
                }
            },

        },

        watch: {

            css: {
                files: ['css/**/*.css']

            },

            js: {
                files: ['Gruntfile.js', 'js/**/*.js']

            },

            html: {
                files: ["index.html", "views/**/*.html"]
            },
            options: {
                livereload: true
            }

        },

        wiredep: {

            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'index.html' // .html support...

                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        }




    });

    // Dependencies


    require('load-grunt-tasks')(grunt);



    // Default task
    grunt.registerTask('default', ['css', 'js']);


    grunt.registerTask('serve', ['connect', 'wiredep', 'watch']);


};