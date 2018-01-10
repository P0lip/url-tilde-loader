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
        traverse: false, // use manual traversing
      },
    },
  ]
}
```
## LICENSE

[MIT](https://github.com/P0lip/url-tilde-loader/blob/master/LICENSE)
