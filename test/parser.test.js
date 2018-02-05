import fs from 'fs-extra';
import path from 'path';
import transform from 'src/parser';

const BASE_DIR = path.resolve(__dirname, 'fixtures');

describe('#transform', () => {
  test('replaces tilde with given replacement string', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style1.css'), 'utf-8');
    expect(transform(content, {
      replacement: '/replacement/',
    }).css).toMatchSnapshot();
  });

  test('generates source map', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style1.css'), 'utf-8');
    expect(transform(content, {
      replacement: '/replacement/',
      map: {
        inline: false,
      },
    }).map).toMatchSnapshot();
  });

  test('accepts func as a replacement', async () => {
    const replacement = jest.fn();
    replacement
      .mockReturnValueOnce('woohoo')
      .mockReturnValueOnce(' url(dooooge.png)')
      .mockReturnValueOnce('woooow')
      .mockReturnValueOnce('to the mooooon!!!!');
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style2.css'), 'utf-8');
    expect(transform(content, {
      replacement,
    }).css).toMatchSnapshot();

    expect(replacement).toHaveBeenCalledTimes(4);
    expect(replacement.mock.calls).toEqual([
      ['url(~ball.svg) ', 'url(', '~', 'ball.svg) ', 7, 'square url(~ball.svg) url(~ball2.svg)'],
      ['url(~ball2.svg)', 'url(', '~', 'ball2.svg)', 22, 'square url(~ball.svg) url(~ball2.svg)'],
      ["url('~assets/test.svg')", "url('", '~', "assets/test.svg')", 7, "repeat url('~assets/test.svg')"],
      ["url('~assets/test.svg')", "url('", '~', "assets/test.svg')", 10, "2px solid url('~assets/test.svg')"],
    ]);
  });

  test('supports scss', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style1.scss'), 'utf-8');
    expect(transform(content, {
      replacement: '~/../',
    }).css).toMatchSnapshot();
  });

  test('manual mode works without replacement function', async () => {
    const style1 = await fs.readFile(path.resolve(BASE_DIR, 'style1.css'), 'utf-8');
    const style2 = await fs.readFile(path.resolve(BASE_DIR, 'style2.css'), 'utf-8');
    const setup = {
      replacement: '~/../',
    };
    expect(transform(style1, { manual: true, ...setup }).css).toBe(transform(style1, setup).css);
    expect(transform(style2, { manual: true, ...setup }).css).toBe(transform(style2, setup).css);
  });

  test('replacement function receives decl in manual mode', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style2.css'), 'utf-8');
    expect(transform(content, {
      replacement(decl, replaceTilde) {
        if (decl.prop === 'background') { // replace tildes only for background rule
          decl.value = replaceTilde('~/../../');
        }

        return decl;
      },
      manual: true,
    }).css).toMatchSnapshot();
  });

  test('replacement function validates returned decl', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style2.css'), 'utf-8');
    expect(transform(content, {
      replacement() {
        return null;
      },
      manual: true,
    }).css).toMatchSnapshot();
  });
});
