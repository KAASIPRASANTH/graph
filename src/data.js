export const hues = [200, 320, 80, 160, 0, 240, 120, 280, 40];
export const size = {
  default: 1,
  hover: 12
};

export const nodes = {
  1: { edgeWidth: 1, hue: 200 },
  2: { edgeWidth: 1, hue: 160 },
  3: { edgeWidth: 1, hue: 320 },
  4: { edgeWidth: 1, hue: 160 },
  5: { edgeWidth: 1, hue: 80 },
  6: { edgeWidth: 1, hue: 160 },
  7: { edgeWidth: 1, hue: 160 },
  8: { edgeWidth: 1, hue: 160 },
 // 9: {name: "9", edgeWidth: 1, hue: 160 }
};

export const edges = {
  1:{ source: "1", target: "2", edgeWidth: 1, hue: 200, cost: 10},
  2:{ source: "1", target: "3", edgeWidth: 1, hue: 200, cost: 20},

  3:{ source: "2", target: "4", edgeWidth: 1, hue: 80, cost: 20 },
  4:{ source: "2", target: "5", edgeWidth: 1, hue: 320, cost: 20 },

  5:{ source: "3", target: "4", edgeWidth: 1, hue: 160, cost: 20 },
  6:{ source: "3", target: "7", edgeWidth: 1, hue: 320, cost: 20 },

  7:{ source: "4", target: "6", edgeWidth: 1, hue: 80, cost: 20 },
  8:{ source: "4", target: "7", edgeWidth: 1, hue: 160, cost: 20 },

  9:{ source: "5", target: "6", edgeWidth: 1, hue: 160, cost: 20 },

  10:{ source: "6", target: "8", edgeWidth: 1, hue: 80, cost: 20 },

  11:{ source: "7", target: "8", edgeWidth: 1, hue: 360, cost: 20 }
};
