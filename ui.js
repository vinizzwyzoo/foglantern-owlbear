import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(() => {
  const fogSlider = document.getElementById("fogOpacity");
  const applyFog = document.getElementById("applyFog");
  const addLantern = document.getElementById("addLantern");

  applyFog.onclick = async () => {
    const opacity = parseFloat(fogSlider.value);
    await OBR.scene.fog.setOpacity(opacity);
  };

  addLantern.onclick = async () => {
    const selected = await OBR.interaction.getSelectedItems();

    for (const item of selected) {
      if (item.type !== "TOKEN") continue;

      await OBR.scene.items.addItems([
        {
          id: crypto.randomUUID(),
          type: "LIGHT",
          position: item.position,
          visible: true,
          locked: false,
          light: {
            radius: 6,
            intensity: 1,
            falloff: 0.6,
            color: "#f8e16c"
          }
        }
      ]);
    }
  };
});