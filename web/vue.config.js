module.exports = {
    outputDir: "../static",
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3005',
                    changeOrigin: true
                }
            }
        }
    }
}