const path = require("path");
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir: string) {
    // @ts-ignore
    return path.join(__dirname, dir);
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                '@assets': resolve('src/assets'),
                '@config': resolve('src/config'),
                '@static': resolve('src/static'),
                '@services': resolve('src/services'),
                '@pages': resolve('src/pages'),
                '@plugins': resolve('src/plugins'),
                '@components': resolve('src/components'),
                '@store': resolve('src/store'),
                '@utils': resolve('src/utils'),
            },
        },
    },
    chainWebpack: config => {
        config.plugin('CompressionPlugin').use(
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html)$/,// 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 不删除源文件
                minRatio: 0.8 // 压缩比
            })
        )
    },
    transpileDependencies: ['@dcloudio/uni-ui']
}