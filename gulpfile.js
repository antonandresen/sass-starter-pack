const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass
gulp.task('sass', () => {
  // Compile every scss file from src/scss and put the compiled css into src/css.
  return gulp
    .src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Watch & serve
gulp.task(
  'serve',
  gulp.series(['sass'], () => {
    browserSync.init({
      server: './src',
    });

    gulp.watch(['src/scss/*.scss'], gulp.series(['sass']));
    gulp.watch(['*.html']).on('change', browserSync.reload);
  }),
);

// Default task
gulp.task('default', gulp.series(['serve']));
