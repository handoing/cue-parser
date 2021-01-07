const fs = require("fs");
const path = require("path");
const { tokenizer, parser, generate } = require("../dist");

const tokens = tokenizer(`
<div
  class="main"
>
  <img class="image" on-click={{this.onChange($event)}} src="{{item.img}}"/>
  <div class="title">hello {{item.title}}</div>
  <span class="icon"></span>
</div>
`);

const ast = parser(tokens);

const code = generate(ast);

fs.writeFileSync(path.resolve(__dirname, './AST.json'), JSON.stringify(ast, null, '\t'))
fs.writeFileSync(path.resolve(__dirname, './CODE.js'), code)