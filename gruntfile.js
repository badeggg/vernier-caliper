module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      target: {
        files: {
          'build/<%= pkg.name%>.min.css': ['src/css/*.css']
        }
      }
    },
    uglify: {
      options: {
        
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('default', ['cssmin']);
};