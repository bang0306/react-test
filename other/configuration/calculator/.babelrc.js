const isTest = process.env.NODE_ENV === 'test'
// 一般情况下，babel和webpack同时使用时是不会对import进行编译的，因为wepack自带这个功能
// 在测试状态下，没了webpack，而jest又不认识import语法，所以需要编译
// jest运行时会修改NODE_ENV为'test'
module.exports = {
  presets: [['env', {modules: isTest ? 'commonjs' : false}], 'react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null
  ].filter(Boolean),
}

/*
Solution snippets below
































































const isTest = String(process.env.NODE_ENV) === 'test'


for the env plugin modules config:
isTest ? 'commonjs' : false

For dynamic import config in plugins
isTest ? 'dynamic-import-node' : null
 */
