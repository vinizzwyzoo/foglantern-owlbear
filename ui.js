const OBR = window.OBR;

/* =========================
   FOG OPACITY
========================= */

async function setFogOpacity(opacity) {
  const scene = await OBR.scene.getScene();

  await OBR.scene.updateScene({
    fog: {
      ...scene.fog,
      opacity: opacity
    }
  });
}

document
  .getElementById("fogOpacity")
  .addEventListener("input", (e) => {
    setFogOpacity(Number(e.target.value));
  });

/* =========================
   LANTERNS
========================= */

async function addLantern() {
  const selected = await OBR.player.getSelection();

  if (!selected.length) {
    alert("Select a token first!");
    return;
  }

  await OBR.items.updateItems(
    selected.map(id => ({
      id,
      light: {
        enabled: true,
        radius: 6,
        falloff: 0.5,
        intensity: 1
      }
    }))
  );
}

document
  .getElementById("addLantern")
  .addEventListener("click", addLantern);
