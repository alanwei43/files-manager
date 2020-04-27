module.exports = {
    outputDir: "../static",
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3009',
                    changeOrigin: true
                }
            }
        }
    }
}