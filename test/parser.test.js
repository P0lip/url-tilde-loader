import fs from 'fs-extra';
import path from 'path';
import transform from 'src/parser';

const BASE_DIR = path.resolve(__dirname, 'fixtures');

describe('#transform', () => {
  test('supports scss', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style1.scss'), 'utf-8');
    expect(transform(content, {
      replacement: '~/../',
    }).css).toMatchSnapshot();
  });

  test('traversal method works in the same way', async () => {
    const content = await fs.readFile(path.resolve(BASE_DIR, 'style1.css'), 'utf-8');
    expect(transform(content, {
      replacement: '~/../',
      traverse: true,
    }).css).toMatchSnapshot();
  });
});
