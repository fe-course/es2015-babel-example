# es2015-babel-example

用babel和es6来编写一个npm模块，模块主要功能是：

根据一个 URL 来下载文件到本地，或者本地直接文件的复制，同时提供下载/复制进度信息。

## 用法

```
let download = require('url-download');

let source = '一个 URL 或者本地文件名';
let target = '要存储到的本地位置，null|false|undefined 表示自动生成一个临时文件';
// 用于获取进度通知的函数，可以省略
let progress = (size, total) => console.log(`进度：${size}/${total}`);

download(source, target, progress)
  .then(filename => console.log(`已保存到：${filename}`))
  .catch(err => console.log(`出错：${err}`));

// 也可以使用 callback 模式
download(source, target, progress, (err, filename) => {
  if (err) console.log(`出错：${err}`);
  else console.log(`已保存到：${filename}`);
});
```
