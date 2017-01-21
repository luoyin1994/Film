//引入
var express    = require('express')
var path       = require('path')
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var _          = require('underscore')
var Movie      = require('./models/movie')
var app        = express()

mongoose.connect('127.0.0.1:27017/imooc')

//视图
/*这里设置render的目录*/
app.set('views', './views/pages')
app.set('view engine', 'jade')
app.locals.moment = require('moment')//app.locals.moment引用时可以把moment用到jade模板中

//静态文件目录/*重点*/
app.use(express.static(path.join(__dirname, 'public')))

//body-parser
app.use(bodyParser.urlencoded({extended: false}))

//端口
var port = process.env.PORT || 8080
app.listen(port)

//index page
app.get('/', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title : 'imooc 首页',
            movies: movies
        })
    })
})

//detail page
app.get('/movie/:id', function (req, res) {/*路由中:id是关于数字的集合*/
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err)
        }
        res.render('detail', {
            title: 'imooc ' + movie.title,
            movie: movie
        })
    })
})

//admin page
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imooc 后台录入页',
        movie: {
            doctor  : '',
            title   : '',
            language: '',
            country : '',
            summary : '',
            flash   : '',
            poster  : '',
            year    : ''
        }
    })
})

//admin update movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})
//admin post movie
app.post('/admin/movie/new', function (req, res) {
    var movie    = req.body
    var id       = movie._id
    var movieObj = movie
    var _movie
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err)
                }
                //这里不能重定向
                // res.redirect('/movie/' + movie._id)
            })
        })

    } else {
        _movie = new Movie({
            doctor  : movieObj.doctor,
            title   : movieObj.title,
            language: movieObj.language,
            country : movieObj.country,
            summary : movieObj.summary,
            flash   : movieObj.flash,
            poster  : movieObj.poster,
            year    : movieObj.year
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

//list page
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title : 'imooc 后台列表页',
            movies: movies
        })
    })
})

// list delete movie
app.delete('/admin/list', function (req, res) {
    var id = req.query.id
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
})

console.log('imooc started on http://localhost:' + port)
