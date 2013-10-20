'use strict';
var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {
  grunt.initConfig({
    dev: 'dev/',
    prod: 'prod/',
    //@notice: connect（サーバースタート）
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')({
                port: LIVERELOAD_PORT
              }),
              mountFolder(connect, 'prod/')
            ];
          }
        }
      }
    },
    //@notice: open（ページ開く）
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    //@notice: watch (ファイルの変更監視)
    watch: {
      livereload: {
        options: {
            livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= prod %>*.html',
          '<%= prod %>styles/*.css',
          '<%= prod %>scripts/*.js',
          '<%= prod %>images/*'
        ]
      },
      jade: {
        files: '<%= dev %>*.jade',
        tasks: ['jade']
      },
      stylus: {
        files: '<%= dev %>stylus/*.styl',
        tasks: ['stylus']
      },
      coffee: {
        files: '<%= dev %>coffee/*.coffee',
        tasks: ['coffee']
      }
    },
    //@notice: jade（コンパイル）
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          '<%= prod %>index.html': '<%= dev %>index.jade'
        }
      }
    },
    //@notice: stylus（コンパイル）
    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: {
          '<%= prod %>styles/app.css': '<%= dev %>stylus/main.styl'
        }
      }
    },
    //@notice: coffee（コンパイル）
    coffee: {
      compile: {
        files: {
          '<%= prod %>scripts/app.js': '<%= dev %>coffee/main.coffee'
        }
      },
    },
    //@notice: copy(ファイルコピー)
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'dev/images/',
            src: ['**'],
            dest: 'prod/images/'
          }
        ]
      }
    }
    //@todo: 連結、圧縮、画像最適化、置換、コピーのタスクを準備する
  });

  //@notice Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('compile', ['jade', 'stylus', 'coffee', 'copy']);
  grunt.registerTask('default', ['compile',  'connect', 'open', 'watch']);
};


