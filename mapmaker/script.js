let alliances = [];
const cities = {
  1: { boost: { iron: 5 }, level: 1 },
  2: { boost: { food: 5 }, level: 1 },
  3: { boost: { iron: 5 }, level: 1 },
  4: { boost: { gather: 5 }, level: 2 },
  5: { boost: { food: 5 }, level: 1 },
  6: { boost: { food: 5 }, level: 1 },
  7: { boost: { iron: 5 }, level: 1 },
  8: { boost: { iron: 5 }, level: 1 },
  9: { boost: { food: 5 }, level: 1 },
  10: { boost: { food: 5 }, level: 1 },
  11: { boost: { food: 5 }, level: 1 },
  12: { boost: { iron: 5 }, level: 1 },
  13: { boost: { iron: 5 }, level: 1 },
  14: { boost: { food: 5 }, level: 1 },
  15: { boost: { food: 5 }, level: 1 },
  16: { boost: { iron: 5 }, level: 1 },
  17: { boost: { iron: 5 }, level: 1 },
  18: { boost: { food: 5 }, level: 1 },
  19: { boost: { iron: 5 }, level: 1 },
  20: { boost: { food: 5 }, level: 1 },
  21: { boost: { iron: 5 }, level: 1 },
  22: { boost: { food: 5 }, level: 1 },
  23: { boost: { coin: 5 }, level: 2 },
  24: { boost: { iron: 5 }, level: 1 },
  25: { boost: { iron: 5 }, level: 1 },
  26: { boost: { iron: 5 }, level: 1 },
  27: { boost: { gather: 5 }, level: 2 },
  28: { boost: { food: 5 }, level: 1 },
  29: { boost: { coin: 5 }, level: 2 },
  30: { boost: { coin: 5 }, level: 2 },
  31: { boost: { iron: 20 }, level: 5 },
  32: { boost: { iron: 10 }, level: 3 },
  33: { boost: { coin: 10 }, level: 3 },
  34: { boost: { coin: 5 }, level: 2 },
  35: { boost: { iron: 5 }, level: 1 },
  36: { boost: { food: 5 }, level: 1 },
  37: { boost: { food: 5 }, level: 1 },
  38: { boost: { food: 5 }, level: 1 },
  39: { boost: { food: 5 }, level: 1 },
  40: { boost: { iron: 10 }, level: 3 },
  41: { boost: { coin: 5 }, level: 2 },
  42: { boost: { coin: 15 }, level: 4 },
  43: { boost: { iron: 10 }, level: 3 },
  44: { boost: { gather: 15 }, level: 4 },
  45: { boost: { construction: 20 }, level: 6 },
  46: { boost: { research: 20 }, level: 6 },
  47: { boost: { training: 5 }, level: 6 },
  48: { boost: { gather: 15 }, level: 4 },
  49: { boost: { food: 15 }, level: 4 },
  50: { boost: { food: 10 }, level: 3 },
  51: { boost: { gather: 5 }, level: 2 },
  52: { boost: { coin: 5 }, level: 1 },
  53: { boost: { food: 10 }, level: 3 },
  54: { boost: { gather: 5 }, level: 2 },
  55: { boost: { food: 5 }, level: 1 },
  56: { boost: { gather: 5 }, level: 2 },
  57: { boost: { iron: 15 }, level: 4 },
  58: { boost: { coin: 10 }, level: 3 },
  59: { boost: { food: 20 }, level: 5 },
  60: { boost: { gather: 15 }, level: 4 },
  61: { boost: { food: 10 }, level: 3 },
  62: { boost: { food: 10 }, level: 3 },
  63: { boost: { gather: 5 }, level: 2 },
  64: { boost: { iron: 5 }, level: 1 },
  65: { boost: { iron: 5 }, level: 1 },
  66: { boost: { coin: 5 }, level: 2 },
  67: { boost: { food: 5 }, level: 1 },
  68: { boost: { iron: 5 }, level: 1 },
  69: { boost: { food: 5 }, level: 1 },
  70: { boost: { coin: 5 }, level: 2 },
  71: { boost: { gather: 5 }, level: 2 },
  72: { boost: { march: 10 }, level: 7 },
  73: { boost: { coin: 20 }, level: 5 },
  74: { boost: { coin: 10 }, level: 3 },
  75: { boost: { iron: 10 }, level: 3 },
  76: { boost: { gather: 15 }, level: 4 },
  77: { boost: { gather: 5 }, level: 2 },
  78: { boost: { iron: 5 }, level: 1 },
  79: { boost: { coin: 5 }, level: 2 },
  82: { boost: { iron: 5 }, level: 1 },
  83: { boost: { gather: 5 }, level: 2 },
  84: { boost: { gather: 20 }, level: 5 },
  85: { boost: { coin: 10 }, level: 3 },
  86: { boost: { gather: 5 }, level: 2 },
  87: { boost: { coin: 5 }, level: 2 },
  88: { boost: { coin: 5 }, level: 2 },
  90: { boost: { food: 5 }, level: 1 }
}

class Alliance {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.cityIds = [];
  }

  addCity(cityId) {
    if (!this.cityIds.includes(cityId)) {
      this.cityIds.push(cityId);
      updateMapColors();
      saveState();
    }
  }

  removeCity(cityId) {
    this.cityIds = this.cityIds.filter(id => id !== cityId);
    updateMapColors();
    saveState();
  }

  calculateBoosts() {
    const boosts = {};
    this.cityIds.forEach(cityId => {
      const city = cities[cityId];
      Object.keys(city.boost).forEach(boostType => {
        if (!boosts[boostType]) {
          boosts[boostType] = 0;
        }
        boosts[boostType] += city.boost[boostType];
      });
    });
    return boosts;
  }
}

function updateMapColors() {
  document.querySelectorAll("path").forEach(path => {
    let cityId = parseInt(path.id);
    let alliance = alliances.find(a => a.cityIds.includes(cityId));
    path.style.fill = alliance ? alliance.color : "#00000000";
  });
}

function updateAllianceList() {
  let allianceList = document.getElementById("alliances-list");
  allianceList.innerHTML = "";

  alliances.sort((a, b) => b.cityIds.length - a.cityIds.length || a.name.localeCompare(b.name));

  alliances.forEach(alliance => {
    let boosts = alliance.calculateBoosts();
    let boostsText = Object.entries(boosts).length > 0 ? `
      <table class="boosts-table">
        <tr><th>Boost</th><th>Value</th></tr>
        ${Object.entries(boosts).map(([boostType, boostValue]) => `
          <tr><td>${boostType}</td><td>${boostValue}%</td></tr>
        `).join("")}
      </table>
    ` : "";

    let div = document.createElement("div");
    div.classList.add("alliance-card");
    div.innerHTML = `
      <div>
        <div class="alliance-info">
          <span class="color-box" style="background-color:${alliance.color}" data-name="${alliance.name}"></span>
          <span class="alliance-name" onclick="changeAllianceName('${alliance.name}')">${alliance.name}</span>
          <span class="city-count">${alliance.cityIds.length}</span>
        </div>
        <br>
        ${boostsText}
      </div>
      <button class="btn btn-danger delete-btn" onclick="deleteAlliance('${alliance.name}')">Delete</button>
    `;
    allianceList.appendChild(div);
  });
}

function changeAllianceName(currentName) {
  let newName = prompt("Enter new name for the alliance:", currentName);
  if (newName && newName.trim() !== "") {
    let alliance = alliances.find(a => a.name === currentName);
    if (alliance) {
      alliance.name = newName.trim();
      updateAllianceList();
      saveState();
    }
  }
}

function deleteAlliance(allianceName) {
  if (confirm(`Delete alliance "${allianceName}"?`)) {
    alliances = alliances.filter(a => a.name !== allianceName);
    updateAllianceList();
    updateMapColors();
    saveState();
  }
}

function saveState() {
  const mapState = {
    alliances: alliances.map(alliance => ({
      name: alliance.name,
      color: alliance.color,
      cityIds: alliance.cityIds
    }))
  };
  localStorage.setItem("alliances", JSON.stringify(mapState));
}

function loadState() {
  const saved = localStorage.getItem('alliances');
  if (saved) {
    const loadedAlliances = JSON.parse(saved);
    alliances = loadedAlliances.alliances.map(allianceData => {
      const alliance = new Alliance(allianceData.name, allianceData.color);
      alliance.cityIds = allianceData.cityIds;
      return alliance;
    });
    updateAllianceList();
    updateMapColors();
  }
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

document.getElementById("allianceInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let name = event.target.value.trim();
    if (name && !alliances.some(a => a.name === name)) {
      alliances.push(new Alliance(name, getRandomColor()));
      event.target.value = "";
      updateAllianceList();
      saveState();
    }
  }
});

let currentPopup = null;
let mouseClickPosition = { x: 0, y: 0 };
let popupThreshold = 300;

function createAllianceOptions(alliances) {
  const options = alliances
    .map(alliance => {
      let option = document.createElement("option");
      option.value = alliance.name;
      option.textContent = alliance.name;
      return option;
    })
    .sort((a, b) => a.textContent.localeCompare(b.textContent));
  return options;
}

document.getElementById("territory-map").addEventListener("mousemove", function (event) {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none"; // Default to hide

  document.querySelectorAll("path").forEach(path => {
    const rect = path.getBoundingClientRect();
    if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
      let cityId = parseInt(path.id);
      let city = cities[cityId]; // Get city data
      let alliance = alliances.find(a => a.cityIds.includes(cityId));

      let allianceName = alliance ? alliance.name : "Unclaimed";
      let boosts = city.boost
        ? Object.entries(city.boost)
          .map(([type, value]) => `${type}: ${value}%`)
          .join(", ")
        : "No boosts";

      tooltip.innerHTML = `
                           Owner: ${allianceName}<br>
                           Level: ${city.level}<br>
                           Boosts: ${boosts}`;

      tooltip.style.display = "block";
      tooltip.style.left = event.pageX + 10 + "px";
      tooltip.style.top = event.pageY + 10 + "px";
    }
  });
});

document.getElementById("territory-map").addEventListener("mouseleave", function () {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
});

function showPopupForPath(event, path) {
  let cityId = parseInt(path.id);
  let allianceSelect = document.getElementById("alliance-select");
  allianceSelect.innerHTML = '<option value="" disabled selected>Select an alliance</option><option value="none">None</option>';
  const options = createAllianceOptions(alliances);
  options.forEach(option => allianceSelect.appendChild(option));
  currentPopup = document.getElementById("zone-info");
  currentPopup.style.cssText = `top:${event.pageY + 10}px; left:${event.pageX + 10}px; display:block;`;

  mouseClickPosition.x = event.pageX;
  mouseClickPosition.y = event.pageY;

  document.addEventListener("mousemove", function closePopupIfMovedTooFar(event) {
    let distance = Math.sqrt(
      Math.pow(event.pageX - mouseClickPosition.x, 2) + Math.pow(event.pageY - mouseClickPosition.y, 2)
    );
    if (distance > popupThreshold) {
      currentPopup.style.display = "none";
      document.removeEventListener("mousemove", closePopupIfMovedTooFar);
    }
  });

  allianceSelect.onchange = function () {
    if (this.value === "none") {
      alliances.forEach(a => a.removeCity(cityId));
      currentPopup.style.display = "none";
      updateAllianceList();
    } else {
      let selectedAlliance = alliances.find(a => a.name === this.value);
      if (selectedAlliance) {
        alliances.forEach(a => a.removeCity(cityId));
        selectedAlliance.addCity(cityId);
        currentPopup.style.display = "none";
        updateAllianceList();
      }
    }
  };
}

document.querySelectorAll("path").forEach(path => {
  path.addEventListener("click", function (event) {
    showPopupForPath(event, path);
  });
});

document.getElementById("alliances-list").addEventListener("click", function (event) {
  if (event.target.classList.contains("color-box")) {
    let alliance = alliances.find(a => a.name === event.target.dataset.name);
    let colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = alliance.color;
    colorInput.addEventListener("input", function () {
      alliance.color = colorInput.value;
      updateAllianceList();
      updateMapColors();
      saveState();
    });
    colorInput.click();
  }
});

function exportStyledMapImage() {
  const svgElement = document.querySelector("svg");
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const img = new Image();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const exportWidth = 1920;
  const exportHeight = 1200;
  canvas.width = exportWidth;
  canvas.height = exportHeight;

  const backgroundColor = "#1e1e1e";
  const textColor = "#ffffff";
  const mapX = 500;
  const mapTop = 40;
  const mapWidth = exportWidth - mapX;
  const mapHeight = exportHeight - mapTop - 30;
  const maxItemsPerColumn = 15;
  const columnSpacing = 220;
  const squareSize = 40;
  const textMargin = 10;
  const fontSize = 30;
  const lineHeight = squareSize + 20;

  const viewBox = svgElement.viewBox.baseVal;
  const originalWidth = viewBox.width;
  const originalHeight = viewBox.height;
  const originalX = viewBox.x;
  const originalY = viewBox.y;

  const scaleX = mapWidth / originalWidth;
  const scaleY = mapHeight / originalHeight;

  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Alliances", 40, 60);

    let column = 0;
    let yPosition = 120;
    alliances.forEach((alliance, index) => {
      if (index > 0 && index % maxItemsPerColumn === 0) {
        column++;
        yPosition = 120;
      }
      const xOffset = 50 + (column * columnSpacing);

      ctx.fillStyle = alliance.color;
      ctx.fillRect(xOffset, yPosition - (squareSize / 2), squareSize, squareSize);

      ctx.fillStyle = textColor;
      const text = alliance.name + " (" + alliance.cityIds.length + ")";
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, xOffset + squareSize + textMargin, yPosition, textWidth);

      yPosition += lineHeight;
    });

    ctx.drawImage(img, mapX, mapTop, mapWidth, mapHeight);

    alliances.forEach(alliance => {
      alliance.cityIds.forEach(cityId => {
        const path = document.getElementById(cityId);
        if (!path) return;

        const bbox = path.getBBox();
        const textX = mapX + ((bbox.x - originalX) * scaleX) + ((bbox.width * scaleX) / 2);
        const textY = mapTop + ((bbox.y - originalY) * scaleY) + ((bbox.height * scaleY) / 2);

        ctx.font = `bold 24px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillText(alliance.name, textX - 2, textY + 2);

        ctx.fillStyle = textColor;
        ctx.fillText(alliance.name , textX, textY);
      });
    });

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "territory_map.png";
    downloadLink.click();

    // document.getElementById("map").src = pngUrl;

    URL.revokeObjectURL(url);
  };

  img.src = url;
}

// Add a button to trigger the styled export
document.getElementById("export-image-btn").addEventListener("click", exportStyledMapImage);

document.getElementById("import-btn").addEventListener("click", function() {
  const input = prompt("Paste the JSON data to import:");
  if (input) {
    try {
      const importedData = JSON.parse(input);
      alliances = [];
      importedData.forEach(allianceData => {
        const alliance = new Alliance(allianceData.name, allianceData.color);
        alliance.cityIds = allianceData.cityIds;
        alliances.push(alliance);
      });
      updateAllianceList();
      updateMapColors();
      saveState();
    } catch (err) {
      alert('Failed to import data.');
    }
  }
});

document.getElementById("export-btn").addEventListener("click", function () {
  const exportData = alliances.filter(alliance => alliance.cityIds.length > 0).map(alliance => ({
    name: alliance.name,
    color: alliance.color,
    cityIds: alliance.cityIds
  }));

  const jsonExport = JSON.stringify(exportData);

  const textarea = document.createElement('textarea');
  textarea.value = jsonExport;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  alert("Exported data copied to clipboard!");
});

loadState();
// exportStyledMapImage();



