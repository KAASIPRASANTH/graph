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
          :r="config.radius * scale"
          fill="gray"
          stroke="black"
          :stroke-width="size.default"
        />
        <text
        x="0"
        y="0"
        :font-size=20
        :text-anchor="textAnchor"
        :dominant-baseline="dominantBaseline"
        :fill="white"
        :transform="`translate(${x} ${y})`"
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
      <input type="checkbox" v-model="testCaseCondition" />
      <span>Toggle: On node hover change edge style</span>
    </label>
  </div>
</template>

<script>
import { nodes, edges, size, hues } from "./data";
import { configs } from "./configs";

export default {
  data: () => ({
    nodes,
    edges,
    hues,
    size,
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
    handleHoverNode(node, size, color) {
      
     this.edges.forEach((edge) => {
        //if (edge["source"] === node || edge["target"] === node) {
          if (this.testCaseCondition) {
            edge.edgeWidth = this.size[size];
          }

          const defaultColor = `hsl(${edge.hue}, 50%, 50%)`;
          this.$refs[edge.source].style.stroke = color ?? defaultColor;
          this.$refs[edge.source].style.strokeWidth = this.size[size];

          this.$refs[edge.target].style.stroke = color ?? defaultColor;
          this.$refs[edge.target].style.strokeWidth = this.size[size];
        //}
      });
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
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0;
  padding: 0;
}
</style>
