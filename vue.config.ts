const path = require("path");

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
    transpileDependencies:['@dcloudio/uni-ui']
}