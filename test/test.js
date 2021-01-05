const fs = require("fs");
const path = require("path");
const { tokenizer, parser, generate } = require("../dist/parser");

const tokens = tokenizer(`
<div
  class="main"
>
  <img class="image" src="{{item.img}}"/>
  <div class="title">hello {{item.desc}}</div>
  <span class="icon"></span>
</div>
`);

const ast = parser(tokens);

const code = generate(ast);

fs.writeFileSync(path.resolve(__dirname, './AST.json'), JSON.stringify(ast, null, '\t'))
fs.writeFileSync(path.resolve(__dirname, './CODE.js'), code)