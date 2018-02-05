export const urlRegex = /(url\(['"]?)(~+)([^)]+\)(?:$|\s))/g;

// a bit cheaper than matching against the entire urlRegex
export const containsURL = str => typeof str === 'string' && str.includes('url');

export function replaceTilde(str, replacement) {
  if (containsURL(str)) {
    return str.replace(urlRegex, `$1${replacement}$3`);
  }

  return str;
}
