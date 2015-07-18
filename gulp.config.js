module.exports = function() {

  var src = './src/',
      tmp = './.tmp';

  var config = {

    tmp: tmp,

    // all js for vet
    alljs : [
      './src/**/*.js',
      './*.js'
    ],

    scss: [src + 'assets/styles/**/*.scss']
  };

  return config;

};