module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn', // 미사용 변수 경고. https://eslint.org/docs/rules/no-unused-vars
    'no-alert': 'off', // alert 허용. https://eslint.org/docs/rules/no-alert
    'no-plusplus': 'off', // 단항연산자 허용. https://eslint.org/docs/rules/no-plusplus
    'no-bitwise': 'off', // 비트연산자 허용. https://eslint.org/docs/rules/no-bitwise
    'no-continue': 'off', // continue 허용. https://eslint.org/docs/rules/no-continue
    'react/no-array-index-key': 'warn', // key로 배열 인댁스 사용 시 경고. https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    'jsx-a11y/label-has-associated-control': 'off' // label에 컨트롤이 연결있는지 확인하는 건데 버그인지 연결해도 인식하지 못함. https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
  }
};
