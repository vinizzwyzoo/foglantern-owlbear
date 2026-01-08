const OBR = window.OBR;

OBR.onReady(() => {
  console.log("Fog Lantern loaded");

  OBR.contextMenu.register({
    id: "lantern.test",
    label: "TEST MENU",

    onClick: async (ctx) => {
      console.log("Clicked!", ctx);

      if (!ctx.items || ctx.items.length === 0) return;

      const id = ctx.items[0];

      await OBR.items.updateItems([{
        id,
        light: {
          enabled: true,
          radius: 6,
          falloff: 0.4,
          intensity: 1
        }
      }]);
    }
  });
});
