import postcss from 'postcss';
import { urlRegex, replaceTilde } from './utils';

export default (source, { traverse, replacement }) => {
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
