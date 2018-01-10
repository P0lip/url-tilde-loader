import { replaceTilde } from 'src/utils';

describe('#replaceTilde', () => {
  test('replaces every tilde in url with given newSubstr', () => {
    const newSubstr = '!replace';
    [{
      url: 'url(~simpleCase)',
      expected: `url(${newSubstr}simpleCase)`,
    }, {
      url: 'url(\'~test.svg\')',
      expected: `url('${newSubstr}test.svg')`,
    }, {
      url: 'url("~test.svg")',
      expected: `url("${newSubstr}test.svg")`,
    }, {
      url: 'url("~~~~test.svg")',
      expected: `url("${newSubstr}test.svg")`,
    }, {
      url: 'url("~test.svg") test url("~test.svg")',
      expected: `url("${newSubstr}test.svg") test url("${newSubstr}test.svg")`,
    }, {
      url: 'url("~test.svg") test url("test.svg")',
      expected: `url("${newSubstr}test.svg") test url("test.svg")`,
    }].forEach(({ url, expected }) => {
      expect(replaceTilde(url, newSubstr)).toBe(expected);
    });
  });

  test('replaces urls only if they contain a tilde char', () => {
    ['url(simpleCase)', 'url(\'test.svg\')', 'url("test.svg") test url("test.svg")']
      .forEach((url) => {
        expect(replaceTilde(url)).toBe(url);
      });
  });

  test('returns original string if url is not found', () => {
    ['1px solid black', '', 'box-shadow: rgba(0, 0, 0, 1)']
      .forEach((value) => {
        expect(replaceTilde(value)).toBe(value);
      });
  });
});
