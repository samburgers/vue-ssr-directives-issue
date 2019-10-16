const server = require("express")();
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");
const template = require("fs").readFileSync("./index.html", "utf-8");

const renderer = createRenderer({
  template,
  directives: {
    example(node) {
      node.data.style = {
        color: "green"
      };
    }
  }
});

server.get("*", (req, res) => {
  Vue.component("Hello", {
    template: `<div>Am i green?</div>`
  });

  Vue.component("World", {
    template: `<div v-example>Am i green?</div>`
  });

  const app = new Vue({
    template: `
    <main>
      <h2>Green text = directive 👍</h2>
      <Hello v-example/>
      <World/>
    </main>`
  });

  renderer.renderToString(app, (err, html) => {
    res.end(html);
  });
});

server.listen(8080);

console.log("http://localhost:8080");
