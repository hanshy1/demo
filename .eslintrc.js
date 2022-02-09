module.exports = {
    // 
    parser: 'vue-eslint-parser',
    parserOptions: {
      'parser': '@typescript-eslint/parser',
    },
    extends: [
      //    'plugin:@typescript-eslint/recommended',
      'plugin:vue/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 
      'vue/html-closing-bracket-newline': [2, {'multiline': 'never'}],
      // 
      'no-multi-spaces': 2,
      // 
      'no-multiple-empty-lines': [2, {'max': 1}],
      // 
      'func-call-spacing': [2, 'never'],
      // 
      'no-unneeded-ternary': 2,
      // 
      'semi': [2, 'never'],
      // 
      'quotes': [2, 'single'],
      // 
      'indent': [2, 2],
      // 
      'space-in-parens': [2, 'never'],
      // 
      'no-console': 0,
      // 
      'comma-spacing': 2,
      // 
      'computed-property-spacing': 2,
      // 
      'key-spacing': 2,
      // 
      'keyword-spacing': 2,
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/no-this-alias': 0,
      // Supported Rules
      '@typescript-eslint/adjacent-overload-signatures': 'warn',
      '@typescript-eslint/array-type': 'off',
      // '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/ban-types': 'warn',
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      '@typescript-eslint/no-extraneous-class': 'off',
      //    '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-for-in-array': 'warn',
      //    '@typescript-eslint/no-implied-eval': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-misused-new': 'warn',
      //    '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/no-type-alias': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      //    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      //'@typescript-eslint/no-unsafe-assignment': 'warn',
      //    '@typescript-eslint/no-unsafe-call': 'warn',
      //    '@typescript-eslint/no-unsafe-member-access': 'warn',
      //    '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unused-vars-experimental': 'off',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/prefer-includes': 'off',
      '@typescript-eslint/prefer-namespace-keyword': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      //    '@typescript-eslint/prefer-regexp-exec': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/require-array-sort-compare': 'off',
      //    '@typescript-eslint/restrict-plus-operands': 'warn',
      //    '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/triple-slash-reference': 'warn',
      '@typescript-eslint/type-annotation-spacing': 'off',
      '@typescript-eslint/typedef': 'off',
      //    '@typescript-eslint/unbound-method': 'warn',
      '@typescript-eslint/unified-signatures': 'off',
      
      // Extension Rules
      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/func-call-spacing': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/keyword-spacing': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-array-constructor': 'warn',
      '@typescript-eslint/no-dupe-class-members': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-extra-parens': 'off',
      '@typescript-eslint/no-extra-semi': 'warn',
      '@typescript-eslint/no-invalid-this': 'off',
      '@typescript-eslint/no-loss-of-precision': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/quotes': 'off',
      //'@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/space-before-function-paren': 'off'
    },
    // 
    'overrides': [
      {
        'files': ['*.js'],
        'rules': {
          '@typescript-eslint/no-var-requires': 'off',
          '@typescript-eslint/explicit-function-return-type': 'off'
        }
      }
    ]
  }
  