'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var loaderUtils = _interopDefault(require('loader-utils'));
var postcss = _interopDefault(require('postcss'));

const urlRegex = /(url\(['"]?)(~+)([^)]+\)(?:$|\s))/g;

function replaceTilde(str, replacement) {
  if (typeof str === 'string' && str.includes('url')) { // a bit cheaper than matching against the entire urlRegex
    return str.replace(urlRegex, `$1${replacement}$3`);
  }

  return str;
}

var transform = (source, { traverse, replacement }) => {
  const ast = postcss.parse(source);

  if (traverse) {
    ast.walkDecls((decl) => {
      const value = replaceTilde(decl.value, replacement);
      if (value !== decl.value) {
        const clonedDecl = decl.clone();
        clonedDecl.value = value;
        decl.replaceWith(clonedDecl);
      }
    });
  } else {
    ast.replaceValues(
      urlRegex,
      { fast: 'url(' },
      (str, $1, $2, $3) => `${$1}${replacement}${$3}`,
    );
  }

  return ast.toResult();
};

function loader (content) {
  const { traverse, replacement = '~/../' } = loaderUtils.getOptions(this) || {};
  try {
    this.callback(null, transform(content, {
      traverse,
      replacement,
    }));
  } catch (ex) {
    this.callback(ex, null);
  }
}

module.exports = loader;
//# sourceMappingURL=loader.js.map
