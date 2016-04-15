module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      target: {
        files: {
          'build/css/<%= pkg.name%>.min.css': ['src/css/*.css']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          name: './start',
          out: 'build/js/<%= pkg.name %>.min.js',
          // optimize: 'none'
          optimize: 'uglify'
        }
      }
    },
    watch:{
      css: {
        files: 'src/css/*.css',
        tasks: ['cssmin']
      },
      scripts: {
        files: 'src/js/*.js',
        tasks: ['requirejs']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  
  grunt.registerTask('default', ['cssmin', 'requirejs', 'watch']);
};