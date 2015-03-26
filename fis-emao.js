var fis = module.exports = require('fis');

fis.cli.name = 'fis-emao';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
//目录规范
fis.config.merge({
    roadmap : {
        path : [
            {
                //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/modules\/([^\/]+)\/\1\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1'
            },
            {
                //modules目录下的其他文件
                reg : /^\/modules\/(.*)\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id是去掉modules和.js后缀中间的部分
                id : '$1'
            },
            {
                //其他css文件
                reg : "**.css",
                //css文件会做csssprite处理
                useSprite : true
            },
            {
                //readme文件，不要发布
                reg : /\/readme.md$/i,
                release : false
            },
            {
                //bat脚本，不要发布
                reg : /\/*.bat$/i,
                release : false
            }
        ]
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager: {
            autoload: {
                useInlineMap: true,
                include: '/page/**',
                optDeps: false
            }
        },
        spriter:{
            csssprites:{
                margin:20
            }
        }
    }
});
