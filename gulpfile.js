// gulpfile.js

//DEPENDENCIES

  //CORE DEPENDENCIES

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var inject = require('gulp-inject');
    var browserSync = require('browser-sync').create();

  //LINTING/DEBUGGING

    var plumber = require('gulp-plumber');
    var notify = require('gulp-notify');

  //COMPILING 

    var htmlclean = require('gulp-htmlclean');
    var cleanCSS = require('gulp-clean-css');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

  //CLEANUP 

    var del = require('del');
    
  //GIT

    var git = require('gulp-git');

  //IMAGES

    var imagemin = require('gulp-imagemin');
    var imageminPngquant = require('imagemin-pngquant');
    var imageminZopfli = require('imagemin-zopfli');
    var imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
    var imageminGiflossy = require('imagemin-giflossy');

  //NUNJUCKS - TEMPLATE ENGINE  

    var nunjucksRender = require('gulp-nunjucks-render');

//FUNCTIONS     

    function errorHandler(err) {
      console.log(err.toString());
      this.emit('end');
    }

    function customPlumber(errTitle) {
    return plumber({
      //CUSTOMIZING ERROR TITLE
      title:errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: true,
    })
    }



//DEFAULT TASK

  gulp.task('default', ['nunjucks', 'inject', 'watch']);


//PATH VARIABLES

  var paths = {

    //FOLDERS

      htmlfolder: 'src/content/html',
      tmpCSSfolder: 'tmp/css',
      dist:       'dist',
      distCSSfolder:    'dist/css',
      distJSfolder:'dist/js',

    //SRC - THESE ARE THE FILES YOU WILL BE WORKING WITH      
       
      srcCONTENT:  'src/content/*.nunjucks',
      html: 'src/content/html/*.{html,htm}', 
      srcCSS:  'src/**/*.scss',
      srcJS:   'src/**/*.js',  
      srcIMG:  'src/**/*.{gif,png,jpg}',
      templates: 'src/templates/',

    //TMP - THESE FILES WILL APPEAR ON YOUR VIRTUAL SERVER FOR DEVELOPMENT

      tmp:      'tmp',
      tmpIndex: 'tmp/**/*.{html,htm}',        
      tmpCSS:   'tmp/**/*.css',
      tmpJS:    'tmp/**/*.js',
      tmpIMG:   'tmp/**/*.{gif,png,jpg}',
      


    //DIST - THESE FILES ARE FULLY PROCESSED, COMPRESSED, MINIFIED AND READY FOR DEPLOYMENT
      
      distIndex:  'dist/**/*.{html,htm}',        
      distCSS:    'dist/css/*.css',            
      distJS:     'dist/**/*.js',
      distIMG:    'dist/**/*.{gif,png,jpg}',


    //SHAREPOINT ASSET FOLDERS

      sharepoint:       'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/',
      sharepointPages:       'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/pages',
      sharepointPageFiles:   'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/pages/**/*.html',

      sharepointCSS:    'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/css/',
      sharepointJS:     'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/js/',
      sharepointIMG:    'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/img/',
      //sharepointIndex:  'C:/Users/ncoblentz/WorldVentures Holdings, LLC/Rovia Travel Support - Site Assets/pages/**/*.{html, htm, aspx}',


    // STYLESHEETS
    
      roviaSheet:       'src/style.scss',
      serviceSheet:     'src/service.scss',
      salesSheet:       'src/sales.scss',
      airSheet:         'src/air.scss',
      leadershipSheet:  'src/leadership.scss',

      roviaCompiled:       'tmp/css/style.css',
      serviceCompiled:    'tmp/css/service.css',
      salesCompiled:       'tmp/css/sales.css',
      airCompiled:         'tmp/css/air.css',
      leadershipCompiled:  'tmp/css/leadership.css'
  };



  //TEMPLATE ENGINE

    gulp.task('nunjucks', function() {
    // GET ALL MY CONTENT FILES  
    return gulp.src(paths.srcCONTENT) 

      // RUN 'EM THROUGH THE TEMPLATE ENGINE
      .pipe(nunjucksRender ({path: ['src/templates']}))

      // DROP 'EM OFF IN SRC/CONTENT/HTML    
      .pipe(gulp.dest(paths.sharepointPages));  

    });

// COPY HTML/CSS/JS

// COPY THOSE NEWLY PROCESSED FILES INTO THE TMP FOLDER
  gulp.task('html', function () {
    return gulp.src(paths.sharepointPageFiles).pipe(gulp.dest(paths.tmp)); 
  });

// COPY MY SCSS FILES INTO THE TMP FOLDER

        gulp.task('rovia-sass', function() {
        return gulp.src(paths.roviaSheet)
            .pipe(customPlumber('Error Running Sass'))
            .pipe(sass())
            .pipe(gulp.dest(paths.tmpCSSfolder)) 
            .pipe(browserSync.reload({
              stream: true
            }))
    });  

        gulp.task('service-sass', function() {
        return gulp.src(paths.serviceSheet)
            .pipe(customPlumber('Error Running Sass'))
            .pipe(sass())
            .pipe(gulp.dest(paths.tmpCSSfolder)) 
            .pipe(browserSync.reload({
              stream: true
            }))
    });  
        gulp.task('sales-sass', function() {
        return gulp.src(paths.salesSheet)
            .pipe(customPlumber('Error Running Sass'))
            .pipe(sass())
            .pipe(gulp.dest(paths.tmpCSSfolder)) 
            .pipe(browserSync.reload({
              stream: true
            }))
    });  

        gulp.task('air-sass', function() {
        return gulp.src(paths.airSheet)
            .pipe(customPlumber('Error Running Sass'))
            .pipe(sass())
            .pipe(gulp.dest(paths.tmpCSSfolder)) 
            .pipe(browserSync.reload({
              stream: true
            }))
    }); 


    gulp.task('sass', ['rovia-sass', 'service-sass', 'sales-sass', 'air-sass']);

// COPY MY SCRIPTS INTO TMP/

  gulp.task('js', function () {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp)); 
  });


// COPY MY IMAGES TO THE TMP FOLDER
  gulp.task('img', function () {
    return gulp.src(paths.srcIMG).pipe(gulp.dest(paths.tmp));
  });


// COPY ALL THE THINGS!!!

  gulp.task('copy', ['html', 'js', 'sass', 'img']);


  // COMPILE ALL MY SASS AND MOVE IT TO TMP
   

// DO ALL THAT STUFF WE JUST SAID IN ONE COMMAND, AND SOME MORE COOL STUFF TOO!!!

  gulp.task('inject', ['copy'], function () {

  // MAKE MY PATH VARIABLES EVEN SHORTER AND MORE SUCCINCT SO I CAN PASS THEM INTO THIS NEXT FUNCTION
      
      var css = gulp.src(paths.tmpCSS);
      var js = gulp.src(paths.tmpJS);
      var img =gulp.src(paths.tmpIMG);
    
  // LINK MY STYLESHEETS IN THE HEAD OF EACH WEB PAGE AND MY SCRIPTS JUST BELOW THE FOOTER WHERE THEY BELONG

      return gulp.src(paths.tmpIndex)
        .pipe(inject( css, { relative:true  } ))
        .pipe(inject( js,  { relative:true  } ))
        //.pipe(inject( img,  { relative:true } )) I"M NOT SURE IF I ACTUALLY NEED THIS PIECE.
        .pipe(gulp.dest(paths.tmp));
    });


    gulp.task('inject:dist', ['copy:dist', 'copy-to-sharepoint'], function () {
      var css = gulp.src(paths.distCSS);
      var js = gulp.src(paths.distJS);
      var img = gulp.src(paths.distIMG);
    
    return gulp.src(paths.distIndex)
      .pipe(inject( css, { relative:true } ))
      .pipe(inject( js, { relative:true } ))
      .pipe(inject( img, { relateive:true } ))
      .pipe(gulp.dest(paths.dist));
});


//SERVER, BROWSER-SYNC  

  //CREATE A VIRTUAL SERVER USING THE FILES IN THE TMP FOLDER, AND MAKE SURE MY SASS IS FRESHLY COMPILED


  
    gulp.task('browserSync', function() {
      browserSync.init ({
        server: {
          baseDir: './tmp'

        },
      })
    })

    gulp.task('watch', ['browserSync', 'sass'], function () {         

    gulp.watch(paths.srcCSS, ['sass'])
    gulp.watch(paths.srcCONTENT, ['nunjucks'])
    gulp.watch(paths.html, ['inject'])
    gulp.watch('./tmp/**/*.html').on('change', browserSync.reload);
    });


//DIST BUILD


  //MINIFY ALL MY HTML, THEN DROP IT INTO 'DIST' FOR DEPLOYMENT

    gulp.task('html:dist', function () {
      return gulp.src(paths.tmpIndex)
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dist));
    });

  //MINIFY ALL 4 STYLESHEETS, DROP OFF IN DIST/CSS FOLDER


      gulp.task('rovia-compile', function () {
      return gulp.src(paths.roviaCompiled) 
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.distCSSfolder));
        
    });

      gulp.task('service-compile', function () {
      return gulp.src(paths.serviceCompiled) 
        .pipe(concat('service.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.distCSSfolder));
        
    });

      gulp.task('sales-compile', function () {
      return gulp.src(paths.salesCompiled) 
        .pipe(concat('sales.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.distCSSfolder));
        
    });

      gulp.task('air-compile', function () {
      return gulp.src(paths.airCompiled)  
        .pipe(concat('air.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.distCSSfolder));
        
    });

  //DO ALL 4 AT ONCE

    gulp.task('css:dist', ['rovia-compile', 'service-compile', 'sales-compile', 'air-compile']);    


    gulp.task('copy-to-sharepoint', function () {
      return gulp.src(paths.distCSS).pipe(gulp.dest(paths.sharepointCSS));
    })
    

  //COMPILE MY SCRIPTS INTO ONE BIG UGLY MINIFIED .JS FILE AND DROP IT INTO 'DIST/JS' FOR DEPLOYMENT

    gulp.task('js:dist', function () {
      return gulp.src(paths.srcJS) 
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJSfolder))
        .pipe(gulp.dest(paths.sharepointJS));  
    });
  
  //COMPRESS ALL IMAGES - WE CAN DO PLENTY OF FINE TUNING FROM HERE IF NEEDED

    gulp.task('imagemin', function() {
        return gulp.src(['src/**/*.{gif,png,jpg}'])
            .pipe(imagemin([ //png
                
                imageminPngquant({
                    speed: 1,
                    quality: 98 //lossy settings
                }),
                imageminZopfli({
                    more: true
                }),
                //gif
                // imagemin.gifsicle({
                //     interlaced: true,
                //     optimizationLevel: 3
                // }),
                //gif very light lossy, use only one of gifsicle or Giflossy

                imageminGiflossy({
                    optimizationLevel: 3,
                    optimize: 3, //keep-empty: Preserve empty transparent frames
                    lossy: 2
                }),
                //svg
                imagemin.svgo({
                    plugins: [{
                        removeViewBox: false
                    }]
                }),
                //jpg lossless
                imagemin.jpegtran({
                    progressive: true
                }),
                //jpg very light lossy, use vs jpegtran
                imageminMozjpeg({
                    quality: 90
                })
            ]))
            .pipe(gulp.dest('dist'));
        });
    gulp.task('img:dist', ['imagemin']);


  //COPY EVERTTHING TO DIST

    gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'img:dist']);
  


  // DO ALL THE BUILD STUFF AND GET ME MY FILES, PLEASE AND THANK YOU!

    //gulp.task('build', ['inject:dist']);
    gulp.task('build', ['inject:dist']);

  // SERVE-DIST TASK: FOR WHEN I WANNA SEE THE FINAL PRODUCT IN MY BROWSER.  LOOK HOW FAST IT IS!!!
   
    gulp.task('serve-dist',function() {

        browserSync.init({ server: "./dist"  });
      });


// CLEANUP - IT'S JUST LIKE STARTING OVER.  CLEAN UP ALL YOUR DTMP, DIST AND LEFTOVER CSS, LEAVING ONLY YOUR PRISTINE SRC FIILES.


  gulp.task('clean', function () {
    del([paths.tmp, paths.dist]);    
  });
  

// GIT

  // COMMIT + PROMPT... I'm not too sure about this one yet...
    gulp.task('commit', function(){
        var message;
        gulp.src('./*', {buffer:false})
        .pipe(prompt.prompt({
            type: 'input',
            name: 'commit',
            message: 'Please enter commit message...'
        }, function(res){
            message = res.commit;
        }))
        .pipe(git.commit(message));
    });

  // PUSH ORIGIN MASTER: PUSH EVERYTHING TO MY REPO ONCE EVERYTHING IS COMMITTED

    gulp.task('push', function() {
      git.push('origin', 'master', function (err) 
        {
         if (err) throw err; 
       }); 
      });