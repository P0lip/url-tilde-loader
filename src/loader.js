import loaderUtils from 'loader-utils';
import transform from './parser';

export default function (content, map) {
  if (this.cacheable) this.cacheable();
  const { manual, replacement = '~/../' } = loaderUtils.getOptions(this) || {};

  if (typeof map === 'string') {
    map = JSON.stringify(map);
  } else if (typeof map === 'object' && map !== null && map.sources) {
    map.sources = map.sources.map(source => source.replace(/\\/g, '/'));
    map.sourceRoot = '';
  }

  try {
    const result = transform(content, {
      manual,
      replacement,
      map: map
        ? {
          prev: map,
          sourcesContent: true,
          inline: false,
          annotation: false,
        }
        : null,
    });
    this.callback(null, result.css, result.map);
  } catch (ex) {
    this.callback(ex, null);
  }
}
