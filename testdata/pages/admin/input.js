/*包含的文件会被执行，但是暴露出来的接口是由export和module.exports控制*/
require("../../../function/toFirstCase")

var indexs = [
    {
        "name"   : "title",
        "name_zh": "电影名字"
    },
    {
        "name"   : "doctor",
        "name_zh": "电影导演"
    },
    {
        "name"   : "country",
        "name_zh": "国家"
    },
    {
        "name"   : "language",
        "name_zh": "语种"
    },
    {
        "name"   : "poster",
        "name_zh": "海报地址"
    },
    {
        "name"   : "flash",
        "name_zh": "片源地址"
    },
    {
        "name"   : "year",
        "name_zh": "上映年代"
    },
    {
        "name"   : "summary",
        "name_zh": "电影简介"
    }
]

for (var i = 0, len = indexs.length; i < len; i++) {
    indexs[i].name = indexs[i].name.toFirstCase()
}

module.exports = indexs