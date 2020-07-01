const clearConsole = require('react-dev-utils/clearConsole')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

//用于输出打包耗时登一系列信息
const compilerHooks = [
    {
        apply: compiler => {
            compiler.hooks.invalid.tap('invalid', function() {
                console.log('Compiling...')
            })
            compiler.hooks.done.tap('done', function(stats) {
                const rawMessages = stats.toJson({}, true)
                const messages = formatWebpackMessages(rawMessages)
                if (!messages.errors.length && !messages.warnings.length) {
                    clearConsole()
                }
                if (messages.errors.length) {
                    console.log('Failed to compile.')
                    messages.errors.forEach(e => console.log(e))
                    return
                }
                if (messages.warnings.length) {
                    console.log('Compiled with warnings.')
                    messages.warnings.forEach(w => console.log(w))
                }
            })
        }
    }
]

module.exports = { compilerHooks }
