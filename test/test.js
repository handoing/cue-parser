const fs = require("fs");
const path = require("path");
const { tokenizer, parser, generate } = require("../dist/parser");

const tokens = tokenizer(`
<div class="main">
  <p>{{name}}</p>
  {{#if showHello}}
    <p>hello</p>
  {{#else}}
    <p>yellow</p>
  {{/if}}
</div>
`);

const ast = parser(tokens);

const code = generate(ast);

fs.writeFileSync(path.resolve(__dirname, './AST.json'), JSON.stringify(ast, null, '\t'))
fs.writeFileSync(path.resolve(__dirname, './CODE.js'), code)