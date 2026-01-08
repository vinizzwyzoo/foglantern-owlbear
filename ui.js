const OBR = window.OBR;

/* =========================
   UI ELEMENTS
========================= */

const fogSlider = document.getElementById("fogOpacity");
const fogValue = document.getElementById("fogValue");

const radiusSlider = document.getElementById("radius");
const radiusValue = document.getElementById("radiusValue");

const intensitySlider = document.getElementById("intensity");
const intensityValue = document.getElementById("intensityValue");

/* =========================
   FOG
========================= */

async function setFogOpacity(opacity) {
  const scene = await OBR.scene.getScene();

  await OBR.scene.updateScene({
    fog: {
      ...scene.fog,
      opacity
    }
  });
}

fogSlider.addEventListener("input", () => {
  fogValue.textContent = fogSlider.value;
  setFogOpacity(Number(fogSlider.value));
});

/* =========================
   LANTERN
========================= */

async function updateLantern(enabled) {
  const selected = await OBR.player.getSelection();

  if (!selected.length) {
    alert("Select a token first!");
    return;
  }

  await OBR.items.updateItems(
    selected.map(id => ({
      id,
      light: {
        enabled,
        radius: Number(radiusSlider.value),
        falloff: 0.5,
        intensity: Number(intensitySlider.value)
      }
    }))
  );
}

async function removeLantern() {
  const selected = await OBR.player.getSelection();

  if (!selected.length) {
    alert("Select a token first!");
    return;
  }

  await OBR.items.updateItems(
    selected.map(id => ({
      id,
      light: {
        enabled: false
      }
    }))
  );
}

/* =========================
   UI EVENTS
========================= */

radiusSlider.addEventListener("input", () => {
  radiusValue.textContent = radiusSlider.value;
});

intensitySlider.addEventListener("input", () => {
  intensityValue.textContent = intensitySlider.value;
});

document
  .getElementById("addLantern")
  .addEventListener("click", () => updateLantern(true));

document
  .getElementById("removeLantern")
  .addEventListener("click", removeLantern);
