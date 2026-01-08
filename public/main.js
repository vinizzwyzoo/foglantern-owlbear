const OBR = window.OBR;

OBR.onReady(() => {
  OBR.contextMenu.register({
    id: "lantern.attach",
    label: "Attach Lantern",
    icon: "/icon.svg",

    filter: {
      every: [
        { key: "layer", operator: "==", value: "CHARACTER" }
      ]
    },

    onClick: async (ctx) => {
      const tokenId = ctx.items[0];

      await OBR.items.updateItems([{
        id: tokenId,
        light: {
          enabled: true,
          radius: 6,
          falloff: 0.5,
          intensity: 1
        }
      }]);
    }
  });
});
