module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '79',
                    ie: '11',
                }
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime"  // with @babel/runtime, enables async await syntax
    ]
}