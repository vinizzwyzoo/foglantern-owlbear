const OBR = window.OBR;

let tokenId = null;

const tokenName = document.getElementById("tokenName");
const radius = document.getElementById("radius");
const intensity = document.getElementById("intensity");
const removeBtn = document.getElementById("remove");

OBR.onReady(async () => {
  tokenId = await OBR.storage.getItem("activeLantern");

  if (tokenId) {
    const [token] = await OBR.items.getItems([tokenId]);
    tokenName.textContent = `Token: ${token.name}`;
    removeBtn.disabled = false;
  }
});

async function updateLantern() {
  if (!tokenId) return;

  await OBR.items.updateItems([{
    id: tokenId,
    light: {
      enabled: true,
      radius: Number(radius.value),
      falloff: 0.5,
      intensity: Number(intensity.value)
    }
  }]);
}

radius.oninput = updateLantern;
intensity.oninput = updateLantern;

removeBtn.onclick = async () => {
  if (!tokenId) return;

  await OBR.items.updateItems([{
    id: tokenId,
    light: { enabled: false }
  }]);

  tokenName.textContent = "No token selected";
  tokenId = null;
  removeBtn.disabled = true;
};
