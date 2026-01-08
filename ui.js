const OBR = window.OBR;

let currentTokenId = null;

/* =========================
   CONTEXT MENU
========================= */

OBR.contextMenu.create({
  id: "attach-lantern",
  icons: [{ icon: "/icon.svg", label: "Lantern" }],
  filter: {
    every: [{ key: "layer", value: "CHARACTER" }]
  },
  onClick: async (context) => {
    const id = context.items[0];
    currentTokenId = id;

    const [item] = await OBR.items.getItems([id]);

    await OBR.items.updateItems([{
      id,
      metadata: {
        lantern: {
          enabled: true,
          radius: 6,
          intensity: 1
        }
      },
      light: {
        enabled: true,
        radius: 6,
        falloff: 0.5,
        intensity: 1
      }
    }]);

    updateUI(item.name);
  }
});

/* =========================
   UI
========================= */

const tokenName = document.getElementById("tokenName");
const radius = document.getElementById("radius");
const intensity = document.getElementById("intensity");
const removeBtn = document.getElementById("remove");

function updateUI(name) {
  tokenName.textContent = `Token: ${name}`;
  removeBtn.disabled = false;
}

/* =========================
   UPDATE LIGHT
========================= */

async function updateLantern() {
  if (!currentTokenId) return;

  await OBR.items.updateItems([{
    id: currentTokenId,
    light: {
      enabled: true,
      radius: Number(radius.value),
      falloff: 0.5,
      intensity: Number(intensity.value)
    },
    metadata: {
      lantern: {
        enabled: true,
        radius: Number(radius.value),
        intensity: Number(intensity.value)
      }
    }
  }]);
}

radius.addEventListener("input", updateLantern);
intensity.addEventListener("input", updateLantern);

/* =========================
   REMOVE
========================= */

removeBtn.onclick = async () => {
  if (!currentTokenId) return;

  await OBR.items.updateItems([{
    id: currentTokenId,
    light: { enabled: false },
    metadata: { lantern: { enabled: false } }
  }]);

  tokenName.textContent = "No token selected";
  currentTokenId = null;
  removeBtn.disabled = true;
};
