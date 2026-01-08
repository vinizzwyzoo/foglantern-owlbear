const OBR = window.OBR;

OBR.onReady(() => {
  OBR.contextMenu.register({
    id: "lantern.attach",
    label: "Attach Lantern",
    icon: "/icon.svg",

    filter: {
      every: [
        {
          key: "layer",
          operator: "==",
          value: "CHARACTER"
        }
      ]
    },

    onClick: async (context) => {
      const tokenId = context.items[0];

      await OBR.items.updateItems([{
        id: tokenId,
        light: {
          enabled: true,
          radius: 6,
          falloff: 0.5,
          intensity: 1
        },
        metadata: {
          lantern: {
            enabled: true
          }
        }
      }]);

      // salva token ativo para a UI
      await OBR.storage.setItem("activeLantern", tokenId);
    }
  });
});
