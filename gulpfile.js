import gulp from 'gulp';
import browserSync from 'browser-sync';
import cssImport from 'gulp-cssimport';
import gulpCssimport from 'gulp-cssimport';
import del from 'del';


export const html = () => gulp
.src('src/*.html')
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream());

export const css = () => gulp
.src('src/css/style.css')
.pipe(gulp.dest('dist/css'))
.pipe(browserSync.stream());

export const js = () => gulp
.src('src/js/**/*.js')
.pipe(gulpCssimport({
    extensions: ['css'],
}))
.pipe(gulp.dest('dist/js'))
.pipe(browserSync.stream());

export const copy = () => gulp
.src([
    'src/fonts/**/*',
    'src/img/**/*'
], {
    base: 'src'
})
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream({
    once: true
}));

export const server = () => {
    browserSync.init({
        ui: false,
        notify: false, 
        // tunnel: true,
        server: {
            baseDir: 'dist'
        }
    })

    gulp.watch('./src/**/*.html', html);
    gulp.watch('./src/css/**/*.css', css);
    gulp.watch('./src/**/*.js', js);
    gulp.watch(['./src/img/**/*', 'src/fonts/**/*'], copy);
};

export const clear = () => del('dist/**/*', {forse: true,});

// запуск
export const base = gulp.parallel(html, css, js, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);

