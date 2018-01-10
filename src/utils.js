
export const urlRegex = /(url\(['"]?)(~+)([^)]+\)(?:$|\s))/g;

export function replaceTilde(str, replacement) {
  if (typeof str === 'string' && str.includes('url')) { // a bit cheaper than matching against the entire urlRegex
    return str.replace(urlRegex, `$1${replacement}$3`);
  }

  return str;
}
