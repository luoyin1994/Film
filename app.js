//引入
var express    = require('express')
var path       = require('path')
var bodyParser = require('body-parser')
var app        = express()

//视图
/*这里设置render的目录*/
app.set('views', './views/pages')
app.set('view engine', 'jade')

//静态文件目录/*重点*/
app.use(express.static(path.join(__dirname + 'bower_components')))

//body-parser
app.use(bodyParser.urlencoded({extended: false}))

//端口
var port = process.env.PORT || 3000
app.listen(port)

//index page
app.get('/', function (req, res) {
    res.render('index', {
        title : 'imooc 首页',
        movies: require('./testdata/pages/index/movies')
    })
})

//detail page
app.get('/movie/:id', function (req, res) {/*路由中:id是关于数字的集合*/
    res.render('detail', {
        title: 'imooc 详情页',
        movie: require('./testdata/pages/detail/movie.json')
    })
})

//admin page
app.get('/admin/new', function (req, res) {
    res.render('admin', {
        title : 'imooc 后台录入页',
        inputs: require('./testdata/pages/admin/input')
    })
})

//list page
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title : 'imooc 后台列表页',
        // ths: require('./testdata/test.json')
        ths   : require('./testdata/pages/list/th.json'),
        movies: require('./testdata/pages/list/movies.json')
    })
})

console.log('imooc started on http://localhost:' + port)
