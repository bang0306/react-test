module.exports = {
  // testEnvironment: 'jsdom', // default
  // 对CSS按照js模块处理，对应`auto-scaling-text.test.js`
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock')
  },
  // 在执行测试之前运行加载对应的模块，可以用来初始化、polyfill等，这里用它来polyfill localStorage，因为jsdom并未实现
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework')
}