const { tokenize } = require("../dist/parser");
console.log(tokenize(`
<div class="hidden">{{ext}}</div>
`))