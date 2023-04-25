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
       Node:<input type="number" v-model="nodeVal" required>
       Source:<input type="number" v-model="sourceVal" required>
       Destination:<input type="number" v-model="destinationVal" required>
       Cost:<input type="number" v-model="Cost" required>
       <el-button @click="addNode"><b>Add</b></el-button>
    </label>
  </div>
</template>

<script>
import { nodes, edges, size, hues } from "./data";
import {configs} from "./configs";
//import {ref} from "vue";
//const nextNodeIndex = ref(Object.keys(nodes).length+1);
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
    addNode(){
      if(this.nodeVal) this.nodes[this.nodeVal] = {edgeWidth: 1, hue: 160 };
      if(this.sourceVal && this.destinationVal){
        let s = this.sourceVal.toString();
        let d = this.destinationVal.toString();
        this.edges[this.counter] = { source: s, target: d, edgeWidth: 1, hue: 80, cost: this.Cost };
        this.counter++;
      } 
    },
    handleHoverNode(node, size, color) {
    for(let i=1;i<=1000;i++){
      if(edges[i]!=null && (edges[i].source === node || edges[i].target === node)){
        edges[i].edgeWidth = this.size[size];
        const defaultColor = `hsl(${edges[i].hue}, 50%, 50%)`;
          this.$refs[edges[i].source].style.stroke = color ?? defaultColor;
          this.$refs[edges[i].source].style.strokeWidth = this.size[size];

          this.$refs[edges[i].target].style.stroke = color ?? defaultColor;
          this.$refs[edges[i].target].style.strokeWidth = this.size[size];
      }
    }
    },

    handleHoverEdge(edge, size, color) {
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
