import Awesomplete from 'awesomplete';
import JSONEditor from 'jsoneditor';
// import JiraClient from 'jira-connector'
// import gravis from '../node_modules/gravis/dist/gravis.js';
import * as gravis from 'gravis';

// configure search box
let searchbox = document.getElementById("search");
let awesome = new Awesomplete(searchbox, {
    list: ["dog","dozer","dove","cat","cathy","candle","man","mango"],
    minChars: 2,
    maxItems: 10000,
  });

// configure jsoneditor
let container = document.getElementById("jsoneditor");
let options = {};
let editor = new JSONEditor(container, options);
// document.getElementById("sidenav").style.width = "400px";

// configure graph
let graph = new gravis.Graph();
let w = 1000; let h = 500;
let vis = new gravis.Vis(graph, w, h);
// vis._sim.velocityDecay(0.3)
//         .force("center", null)
//         .force("charge", d3.forceManyBody().strength(-300))//.distanceMax(200))
//         .force("gravity", d3.forceManyBody().strength(300).distanceMin(250))
//         .force("link", d3.forceLink().distance(50).strength(0.3))
//         // .force("collision", d3.forceCollide(20));
let int = new gravis.Interact(vis);
let act = new gravis.Actions(int);
act.highlight_selected_entity();
act.highlight_hover_entity();
act.create_node_on_shift_click();
act.delete_selected_node();

let root = {id: 0, name: "_ROOT", type: "CCDB", fx: w/2, fy: h/2};
graph.add(root);
vis.update();

// tie graph selection to jsoneditor;
function update_nav(editor, then) {
  return async (d) => {
    let safe = Object.assign({}, d)
    delete safe.links;
    editor.set(safe);
    editor.setName(safe.name);
    editor.setMode("form");
    editor.expandAll();
    then();
  }
}

function openNav() {
    document.getElementById("sidenav").style.width = "400px";
    document.getElementById("force").style.marginRight = "400px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0px";
    document.getElementById("force").style.marginRight = "0px";
}

int.dispatch.on("select.nav", update_nav(editor, openNav));
int.dispatch.on("deselect.nav", update_nav(editor, ()=>{}));

export {
  searchbox,
  Awesomplete,
  JSONEditor,
  editor,
};
