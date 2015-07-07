module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
    },

    exec: {
      run: '/Applications/Electron.app/Contents/MacOS/Electron /Users/Wes/Desktop/Repos/Personal/IRC'
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
};
