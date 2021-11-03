module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
    },
    overrides: [
        {
            files: [
                '*.vue',
            ],
            extends: [
                'plugin:vue/vue3-essential',
            ],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: {
                    '<template>': 'espree',
                    js: 'espree',
                    ts: '@typescript-eslint/parser',
                },
                project: ['./tsconfig.json'],
                extraFileExtensions: ['.vue'],
            },
        },
    ],
}
