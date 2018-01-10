import loaderUtils from 'loader-utils';
import transform from './parser';

export default function (content, map) {
  if (this.cacheable) this.cacheable();
  const { traverse, replacement = '~/../' } = loaderUtils.getOptions(this) || {};

  if (typeof map === "string") {
    map = JSON.stringify(map);
  }

  if (map.sources) {
    map.sources = map.sources.map(function (source) {
      return source.replace(/\\/g, '/');
      });
    map.sourceRoot = '';
  }

  try {
    const result = transform(content, {
      traverse,
      replacement,
      map: map ? {
        prev: map,
        sourcesContent: true,
        inline: false,
        annotation: false
      } : null,
    });
    this.callback(null, result.css, result.map);
  } catch (ex) {
    this.callback(ex, null);
  }
}
