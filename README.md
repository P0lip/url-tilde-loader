# url-tilde-loader

Simple loader to replace all '~' in url() with given substring.
You may find in helpful if you have troubles with css-loader with modules turned on.

## Install

```sh
yarn add url-tilde-loader --dev
```

## Usage

```js
// In your webpack config
{
  test: /\.s?css$/,
  use: [
    'style-loader',
    {
      loader: "css-loader",
      options: {
        modules: true,
      },
    },
    {
      loader: 'url-tilde-loader'
      options: {
        replacement: '~/../', // string to replace with
      },
    },
  ]
}
```

You can also pass function if you need to customize the replacement behaviour, for instance,
```js
{
  loader: 'url-tilde-loader'
  options: {
    // receives exactly the same args as String.prototype.replace does
    replacement: (str, $1, $2, $3) => `${$1}/../${$3}`,
  }
}
```

or in case you are brave enough, you can manipulate any matching declaration!

```js
{
  loader: 'url-tilde-loader'
  options: {
    manual: true,
    // for a list of available methods/props, please visit http://api.postcss.org/Declaration.html
    replacement(decl) {
      
    }
  }
}
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|manual|`{Boolean}`|`false`|Passes [PostCSS node](http://api.postcss.org/Declaration.html) to the replacement func|
|replacement|`{String|Function}`|`undefined`|Replacement|

## LICENSE

[MIT](https://github.com/P0lip/url-tilde-loader/blob/master/LICENSE)
