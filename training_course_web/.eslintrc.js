module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // 处理Iview结束标签报错
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //下面是核心设置，会覆盖vscode关于prettier的设置
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 160,
        endOfLine: 'auto'
      }
    ]
  }
};
