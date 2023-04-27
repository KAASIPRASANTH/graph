<template>
  <div class="graph">
    <v-network-graph
      :nodes="nodes"
      :edges="edges"
      :configs="configs"
      :event-handlers="eventHandlers"
    >
      <template #override-node="{ nodeId, scale, config, ...slotProps }">
        <circle
          v-bind="slotProps"
          :ref="nodeId"
          :r="2*config.radius * scale"
          fill="gray"
          stroke="black"
          :stroke-width="size.default"
        />
        <text
        x="0"
        y="0"
        :font-size="20 * scale"
        :text-anchor="middle"
        :dominant-baseline="central"
        :fill="white"
      >{{ nodeId }}</text>
        
      </template>

      <template #edge-label="{ edge, ...slotProps }">
         <v-edge-label
           :text="`${edge.cost}`"
           align="center"
           font-size=10
           fill="white"
           vertical-align="below"
            v-bind="slotProps"
         />
      </template>
    </v-network-graph>

    
    <label class="switch">
      &nbsp;&nbsp;Node:&nbsp;&nbsp;<input type="number" v-model="nodeVal" required>
      &nbsp;&nbsp;&nbsp;&nbsp;Source:&nbsp;&nbsp;<input type="number" v-model="sourceVal" required>
      &nbsp;&nbsp;&nbsp;&nbsp;Destination:&nbsp;&nbsp;<input type="number" v-model="destinationVal" required>
      &nbsp;&nbsp;&nbsp;&nbsp;Cost:&nbsp;&nbsp;<input type="number" v-model="Cost" required>
      <el-button @click="addNode"><b>&nbsp;&nbsp;Add&nbsp;&nbsp;</b></el-button>
      <el-button @click="BFS"><b>BFS&nbsp;&nbsp;</b></el-button>
      <el-button @click="DFS"><b>DFS</b></el-button>
    </label>
  </div>
</template>

<script>
import { nodes, edges, size, hues } from "./data";
import {configs} from "./configs";

export default {
  data: () => ({
    nodes,
    edges,
    hues,
    size,
    nodeVal:0,
    sourceVal:0,
    destinationVal:0,
    counter:11,
    Cost:0,
    curr:1,
    edgeCount:0,
    testCaseCondition: false,
  }),
  
  computed: {
    configs,
    eventHandlers() {
      return {
        "node:pointerover": ({ node }) => {
          this.handleHoverNode(node, "hover");
        },

        "node:pointerout": ({ node }) => {
          this.handleHoverNode(node, "default", "lightgrey");
        },

        "edge:pointerover": ({ edge }) => {
          this.handleHoverEdge(edge, "hover");
        },

        "edge:pointerout": ({ edge }) => {
          this.handleHoverEdge(edge, "default", "lightgrey");
        },
      };
    },
  },

  methods: {
    BFS(){
      this.edgeCount=0;
      //creating data part
      let vertices = [];
      let adj = {};
      for(let v=1;v<=1000;v++){
        if(nodes[v]!=null){
          vertices.push(v);
          adj[v] = [];
        }
      }
      for(let i=1;i<=1000;i++){
        if(edges[i]!=null){
          let s=parseInt(edges[i].source);
          let d=parseInt(edges[i].target);
          adj[s].push(d);
        }
      }

      var visited = {};
      var r = {};
      for(let i=1;i<=1000;i++){
        r[i] = [];
      }
      let q = []

      visited[1] = true;
      q.push(1);

      let flag=1;
      while(q.length>0){
        var len = q.length;
        while(len-->0){
          var curr = q[0];
          r[flag].push(curr);
          q.shift();
          var list = adj[curr]
          for(var i in list){
            var neigh = list[i];
            if(!visited[neigh]){
              visited[neigh] = true;
              q.push(neigh);
            }
          }
        }
        flag++;
      }

      
      for(let f=1;f<=10;f++){
        var l = r[f];
        if(f == this.curr){
          for(var v in l){
            let source = l[v];
            this.$refs[source+""].style.strokeWidth = this.size["hover"];
          }
        }
      }
      
      this.curr++;
    },
    doDFS(curr,adj,visited,res){
      visited[curr] = true;
      res.push(curr);
      var l = adj[curr];
      for(var v in l){
        var next = l[v];
        if(!visited[next]){
          this.doDFS(next,adj,visited,res);
        }
      }
    },
    DFS(){
      this.curr=1;
      console.log("started");
      let vertices = [];
      let adj = {};
      for(let v=1;v<=1000;v++){
        if(nodes[v]!=null){
          vertices.push(v);
          adj[v] = [];
        }
      }
      for(let i=1;i<=1000;i++){
        if(edges[i]!=null){
          let s=parseInt(edges[i].source);
          let d=parseInt(edges[i].target);
          adj[s].push(d);
        }
      }
      var visited = {};
      let res = [];
      for(let v=0;v<=10;v++){
        let node = vertices[v];
        if(!visited[node]){
          this.doDFS(node,adj,visited,res);
        }
      }
      for(let vertex=0;vertex<res.length;vertex++){
        if(vertex == this.edgeCount){
          let source = res[vertex];
          if(this.nodes[source]) this.$refs[source+""].style.strokeWidth = this.size["hover"];
        }
      }
      this.edgeCount++;
    },
    addNode(){
      this.edgeCount=0;
      this.curr=1;
      if(this.nodeVal) this.nodes[this.nodeVal] = {edgeWidth: 1, hue: 160 };
      if(this.sourceVal && this.destinationVal){
        let s = this.sourceVal.toString();
        let d = this.destinationVal.toString();
        this.edges[this.counter] = { source: s, target: d, edgeWidth: 1, hue: 80, cost: this.Cost };
        this.counter++;
      } 
    },
    handleHoverNode(node, size, color) {
      this.curr=1;
      this.edgeCount=0;
    for(let i=1;i<=1000;i++){
      if(edges[i]!=null && (edges[i].source === node || edges[i].target === node)){
        edges[i].edgeWidth = this.size[size];
        const defaultColor = `hsl(${edges[i].hue}, 50%, 50%)`;
          this.$refs[edges[i].source].style.stroke = defaultColor;
          this.$refs[edges[i].source].style.strokeWidth = this.size[size];

          this.$refs[edges[i].target].style.stroke = defaultColor;
          this.$refs[edges[i].target].style.strokeWidth = this.size[size];
      }
      console.log(color);
    }
    },

    handleHoverEdge(edge, size, color) {
      this.curr = 1;
      this.edgeCount=0;
      const { source, target, hue } = this.edges[edge];
      const defaultColor = `hsl(${hue}, 50%, 50%)`;

      this.$refs[source].style.strokeWidth = this.size[size];
      this.$refs[target].style.strokeWidth = this.size[size];

      this.$refs[source].style.stroke = color ?? defaultColor;
      this.$refs[target].style.stroke = color ?? defaultColor;
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color:black;
}

.graph,
.v-network-graph > svg {
  width: 100vw !important;
  height: 100vh !important;
}

.switch {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #eee;
  cursor: pointer;
}

.switch input {
  background-color: #ffffff;
}
</style>
