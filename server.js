const server = require("express")();
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");
const template = require("fs").readFileSync("./index.html", "utf-8");

const renderer = createRenderer({
  template,
  directives: {
    custom(node) {
      node.data.style = {
        color: "green"
      };
    },
    show(node) {
      node.data.style = {
        color: "blue"
      };
    }
  }
});

server.get("*", (req, res) => {
  Vue.component("Hello", {
    template: `<div>Am i green?</div>`
  });

  Vue.component("World", {
    template: `<div v-custom>Am i green?</div>`
  });

  Vue.component("Foo", {
    template: `<div>Am i blue?</div>`
  });

  Vue.component("Bar", {
    template: `<div v-show>Am i blue?</div>`
  });

  const app = new Vue({
    template: `
    <main>
      <h2>Green text = directive 👍</h2>
      <Hello v-custom/>
      <World/>
      <Foo v-show/>
      <Bar/>
    </main>`
  });

  renderer.renderToString(app, (err, html) => {
    res.end(html);
  });
});

server.listen(8080);

console.log("http://localhost:8080");
