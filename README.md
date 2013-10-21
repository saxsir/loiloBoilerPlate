# boiler-plate

- gruntとbowerはglobalにインストール済みを想定
- html, css, jsはprodディレクトリに生成, 他の人がいじることもあるから圧縮しない

## grunt task(default)
1. grunt jade - Compile dev/*.jade then create prod/*.html
1. grunt stylus - Compile dev/stylus/*.styl then create prod/styles/*.css
1. grunt csso - Optimize prod/styles/*.css
1. grunt jsbeautifier - Optimize prod/*.html and prod/styles/*.css
1. grunt uglify - Compress dev/scripts/app.js(you can edit this by Gruntfile.js) 
1. grunt concat - Concat dev/scripts/*.js(you choosed) with '\n;' then create prod/scripts/app.min.js
1. grunt copy:image - Copy dev/images/* to prod/images/ 
1. grunt connect - Start server at localhost:9000
1. grunt open - Open localhost:9000
1. grunt watch - Watch files you editied

個人的にcoffee script書けないのでjsで書く。  
jsは圧縮するやつと連結するやつは自分で指定する。