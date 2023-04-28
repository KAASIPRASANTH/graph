import * as vNG from "v-network-graph";
import { ForceLayout } from "v-network-graph/lib/force-layout";

export function configs() {
  return vNG.defineConfigs({
    view: {
      layoutHandler: new ForceLayout()
    },

    node: {
      selectable:true,
      label: {  direction: "center",visible: true }
    },

    edge: {
      selectable:true,
      normal: {
        width: 5,
        linecap:"butt",
        animate:true,
        animationSpeed:30,
        dasharray:8,
        color:(edge)=>`hsl(${edge.hue},50%,50%`
      },
      margin: 2,
      gap:5,
      type:"straight",
      marker: {
        source:{
          type: "none",
          width: 4,
          height: 4,
          color:null,
          margin:1,
          units:"strokeWidth",
        },
        target: {
          type: "arrow",
          width: 4,
          height: 4,
          color:null,
          margin:1,
          units:12,
        },
      },
      hover: {
        width: 8,
        color: (edge) => `hsl(${edge.hue}, 50%, 50%`
      }
    },
    
  });
}
