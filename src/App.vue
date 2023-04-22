<template>
  <div class="graph">
    <v-network-graph>
    
    </v-network-graph>
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
      const isSource = this.edges.some((edge) => edge.source === node);
      const type = isSource ? "source" : "target";

      this.edges.forEach((edge) => {
        if (edge[type] === node) {
          if (this.testCaseCondition) {
            edge.edgeWidth = this.size[size];
          }

          const defaultColor = `hsl(${edge.hue}, 50%, 50%)`;
          this.$refs[edge.source].style.stroke = color ?? defaultColor;
          this.$refs[edge.source].style.strokeWidth = this.size[size];

          this.$refs[edge.target].style.stroke = color ?? defaultColor;
          this.$refs[edge.target].style.strokeWidth = this.size[size];
        }
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

</style>
