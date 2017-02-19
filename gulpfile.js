"use strict";

const gulp       = require("gulp"),
	  minify     = require("gulp-minify-css"),
	  prefix     = require("gulp-autoprefixer"),
	  sass       = require("gulp-sass"),
	  rename     = require("gulp-rename"),
	  concat     = require("gulp-concat"),
      sourceMaps = require("gulp-sourcemaps"),
      uglify     = require("gulp-uglify"),
      babel      = require("gulp-babel"),
      imageOptim = require("gulp-imagemin"),
      jsdoc      = require('gulp-jsdoc3');

gulp.task("css", function() {
	gulp.src([
			"libs/normalize/normalize.css",
			"libs/bootstrap/css/bootstrap.min.css",
			"libs/animate/animate.css",
			"libs/fa/font-awesome.min.css",
			"libs/owl/owl.carousel.min.css",
			"libs/owl/owl.theme.default.min.css",
			"libs/swipe/swipebox.min.css",
			"scss/main.scss"
		])
		.pipe(sass())
		.pipe(concat("main.min.css"))
		.pipe(prefix("last 5 versions","> 1%","ie 9"))
		.pipe(minify())
		.pipe(gulp.dest("prod/css/"));
});

gulp.task("js", function () {
	gulp.src([
		"libs/jquery/jquery.min.js",
		"libs/bootstrap/js/bootstrap.min.js",
		"libs/owl/owl.carousel.min.js",
		"libs/swipe/jquery.swipebox.min.js",
		"js/*.js"
		])
		.pipe(sourceMaps.init())
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest("prod/js/"));
});

gulp.task("doc", function (cb) {
    gulp.src([ "./js/*.js" ],
    		 { read: false })
        .pipe(jsdoc(cb));
});

gulp.task("images", function() {
    gulp.src([
    		"img/*.png",
    		"img/*.jpg"
    	]).
	    pipe(imageOptim())
	    .pipe(gulp.dest("prod/img/"));
});

gulp.task("watch", function() {
	gulp.watch("scss/**/*.scss", ["css"]);
});

gulp.task("default", ["css", "js"]);