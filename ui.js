const OBR = window.OBR;

let currentTokenId = null;

/* =========================
   WHEN EXTENSION IS READY
========================= */

OBR.onReady(async () => {

  /* =========================
     CONTEXT MENU (RIGHT CLICK)
  ========================= */

  OBR.contextMenu.register({
    id: "lantern.attach",
    label: "Attach Lantern",
    icon: "/icon.svg",

    filter: {
      every: [
        { key: "layer", operator: "==", value: "CHARACTER" }
      ]
    },

    onClick: async (context) => {
      const tokenId = context.items[0];
      currentTokenId = tokenId;

      const [token] = await OBR.items.getItems([tokenId]);

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
            enabled: true,
            radius: 6,
            intensity: 1
          }
        }
      }]);

      updateUI(token.name);
    }
  });

});

/* =========================
   UI ELEMENTS
========================= */

const tokenName = document.getElementById("tokenName");
const radius = document.getElementById("radius");
const intensity = document.getElementById("intensity");
const removeBtn = document.getElementById("remove");

/* =========================
   UI FUNCTIONS
========================= */

function updateUI(name) {
  tokenName.textContent = `Token: ${name}`;
  removeBtn.disabled = fa
