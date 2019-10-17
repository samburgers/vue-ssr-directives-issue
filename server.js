const server = require("express")();
const Vue = require("vue");
const { createRenderer } = require("vue-server-renderer");
const template = require("fs").readFileSync("./index.html", "utf-8");

const renderer = createRenderer({
  template,
  directives: {
    // Custom directive
    custom(node) {
      node.data.style = {
        color: "green"
      };
    },
    // Vue directive
    show(node) {
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
    template: `<div v-custom>Am i green?</div>`
  });

  Vue.component("Foo", {
    template: `<div>Am i green?</div>`
  });

  Vue.component("Bar", {
    template: `<div v-show>Am i green?</div>`
  });

  const app = new Vue({
    template: `
    <main>
      <h2>Green text = directive 👍</h2>
      <div v-custom>Am i green?</div>
      <Hello v-custom/>
      <World/>
      <div v-show>Am i green?</div>
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
