module.exports = {

devServer: {
open: true,

host: '127.0.0.1',

disableHostCheck: true, // 加这个就没事啦。

port: 3000,

https: false,

hotOnly: false,

proxy: null,

before: app => {
}
}