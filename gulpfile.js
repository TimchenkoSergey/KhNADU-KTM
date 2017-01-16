/**
 * Created by Anatolych on 09.01.2017.
 */
'user strict';
const gulp        = require('gulp'),
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    htmlhint     = require("gulp-htmlhint"), // Подключаем HTML-валидатор
    babel       = require("gulp-babel"),
    sourceMaps  = require("gulp-sourcemaps");

gulp.task("sass", function(){ // Создаем таск Sass
    return gulp.src([
        'app/scss/**/*.+(sass|scss)']) // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
gulp.task('img', function () {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});
gulp.task('js', function () {
    return gulp.src([
        'app/libs/jquery/jquery.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js',
        'app/libs/bootstrap/js/bootstrap.min.js',
        "app/libs/jquery.spincrement.min.js"
    ])
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('min-css', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('htmlhint', function () {
    return gulp.src("app/*.html")
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
});

gulp.task('clean', function () {
    return del.sync('dist');
});
gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'min-css', 'js'], function() {
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']); // Наблюдение за sass файлами
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('build', ['clean','img', 'sass', 'js'], function () {
    var buildCss  = gulp.src([
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'))
    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));
});
gulp.task('default', ['watch']);

