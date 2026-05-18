const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const palette = document.getElementById("palette");

const colorThief = new ColorThief();

upload.addEventListener("change", () => {

  const file = upload.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    preview.onload = () => {
      generatePalette(preview);
    };

    preview.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

function generatePalette(img) {

  palette.innerHTML = "";

  const colors = colorThief.getPalette(img, 20);

  colors.forEach(color => {

    const [r, g, b] = color;

    const hex = rgbToHex(r, g, b);

    const div = document.createElement("div");

    div.classList.add("color");

    div.style.background = hex;

    div.textContent = hex;

    div.addEventListener("click", () => {

      navigator.clipboard.writeText(hex);

      alert(`Copiado ${hex}`);
    });

    palette.appendChild(div);
  });
}

function rgbToHex(r, g, b) {

  return "#" + [r, g, b]
    .map(x => x.toString(16).padStart(2, "0"))
    .join("");
}