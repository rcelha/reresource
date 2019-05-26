// {
//     "presets": [
//         "@babel/env",
//         "@babel/typescript"
//     ],
//     "plugins": [
//         "@babel/proposal-class-properties",
//         "@babel/proposal-object-rest-spread"
//     ]
// }

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',

  ],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};
