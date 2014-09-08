'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js'],
      },
      unit: {
        src: ['test/**/*.js'],
      },
      demo: {
        src: ['demo/js/src/**/*.js'],
      },
    },

    simplemocha: {
      options: {
        timeout: 5000,
        slow: 5000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec',
        path: 'test'
      },
      unit: {
        src: '<%= jshint.unit.src %>'
      },
    },

    webpack: {
      demo: {
        entry: "./demo/js/src/demo.js",
        output: {
          path: "demo/js",
          filename: "demo.app.js",
        },
        devtool: "#inline-source-map",
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
      },
      lib: {
        files: ['<%= jshint.lib.src %>'],
        tasks: ['jshint:lib', 'unit', 'webpack'],
      },
      unit: {
        files: ['<%= jshint.unit.src %>'],
        tasks: ['jshint:unit', 'unit'],
      },
      demo: {
        files: ['<%= jshint.demo.src %>'],
        tasks: ['jshint:demo', 'webpack'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('unit', ['simplemocha:unit']);
  grunt.registerTask('default', ['jshint', 'unit', 'webpack']);

};
