import postcss from 'postcss';
import { urlRegex, replaceTilde } from './utils';

export default (source, { manual, replacement, map = null }) => {
  const ast = postcss.parse(source);

  if (manual) {
    ast.walkDecls((decl) => {
      if (typeof replacement === 'function') {
        if (urlRegex.test(decl.value)) {
          urlRegex.lastIndex = 0;
          const clonedDecl = replacement(decl.clone(), replaceTilde.bind(null, decl.value));
          if (typeof clonedDecl === 'object'
            && clonedDecl !== null
            && clonedDecl.type === 'decl'
          ) {
            decl.replaceWith(clonedDecl);
          }
        }
      } else {
        const value = replaceTilde(decl.value, replacement);
        if (value !== decl.value) {
          const clonedDecl = decl.clone();
          clonedDecl.value = value;
          decl.replaceWith(clonedDecl);
        }
      }
    });
  } else {
    ast.replaceValues(
      urlRegex,
      { fast: 'url(' },
      typeof replacement === 'function'
        ? replacement
        : (str, $1, $2, $3) => `${$1}${replacement}${$3}`,
    );
  }

  return ast.toResult({ map });
};
