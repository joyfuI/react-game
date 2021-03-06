/**
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 80, // 줄바꿈 너비
  tabWidth: 2, // 탭 너비
  useTabs: false, // 공백 대신 탭 사용
  semi: true, // 세미콜론
  singleQuote: true, // * 큰따옴표 대신 작은따옴표 사용
  quoteProps: 'as-needed', // Object 키 따옴표 여부. "as-needed": 필요한 경우에만 따옴표, "consistent": 모두 따옴표, "preserve": 입력 존중
  jsxSingleQuote: false, // jsx에서 큰따옴표 대신 작은따옴표 사용
  trailingComma: 'none', // * 후행 쉼표. "es5": 오브젝트, 배열 등 es5에서 지원하는 경우만, "none": 금지, "all": 가능한 경우
  bracketSpacing: true, // 오브젝트 리터럴에서 대괄호 사이 공백
  jsxBracketSameLine: false, // jsx에서 > 앞에 줄바꿈 안함
  arrowParens: 'always', // 화살표 함수 매개변수 괄호. "always": 항상 괄호, "avoid": 가능하면 생략
  requirePragma: false, // 특수 주석 달린 파일만 포맷팅
  insertPragma: false, // 특수 주석 삽입
  proseWrap: 'preserve', // 마크다운 텍스트 줄바꿈?
  htmlWhitespaceSensitivity: 'css', // HTML 공백 감도?
  vueIndentScriptAndStyle: false, // vue에서 script/style 태그 들여쓰기
  endOfLine: 'lf', // 줄바꿈 문자. "lf", "crlf", "cr", "auto": 첫번째 줄바꿈 문자로 통일
  embeddedLanguageFormatting: 'auto' // 임베디드된 다른 언어도 포맷팅. "auto": 식별 할 수 있면 포맷팅, "off": 안함
};
