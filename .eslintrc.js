module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react',
    ],
    'rules': {
        'react/jsx-indent': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 'off',
        'max-len': ['error', { code: 100, ignoreComments: true }]
    }
}
