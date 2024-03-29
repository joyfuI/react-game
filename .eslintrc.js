module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn', // 미사용 변수 경고. https://eslint.org/docs/rules/no-unused-vars
    'no-plusplus': 'off', // 단항연산자 허용. https://eslint.org/docs/rules/no-plusplus
    'no-bitwise': 'off', // 비트연산자 허용. https://eslint.org/docs/rules/no-bitwise
    'no-continue': 'off', // continue 허용. https://eslint.org/docs/rules/no-continue
    'class-methods-use-this': 'off', // 클래스 메소드를 강제하지 않음. https://eslint.org/docs/rules/class-methods-use-this
    'no-param-reassign': ['error', { props: false }], // 매개변수의 프로퍼티 재할당 허용. https://eslint.org/docs/rules/no-param-reassign
    'react/no-array-index-key': 'off', // key로 배열 인댁스 사용 허용. https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ], // 화살표 함수 컴포넌트 허용. https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'import/no-cycle': 'off', // 순환 참조 허용. https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-cycle.md
  },
};
