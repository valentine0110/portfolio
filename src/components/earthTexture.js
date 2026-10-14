// High-Precision Procedural Planetary Earth & Cloud Texture Generator
// Generates high-resolution equirectangular 2048x1024 textures:
// 1. Cyber Earth Texture: Realistic continents, ocean bathymetry, night city lights, and data highways.
// 2. Clouds Texture: Semi-transparent atmospheric cloud cover with realistic swirls and storms.

/**
 * Generates the main equirectangular Earth texture
 */
export function createCyberEarthTexture() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Deep Space Oceanic Abyss with Sub-surface Gradient
  const oceanGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    height * 0.1,
    width / 2,
    height / 2,
    width * 0.6
  );
  oceanGrad.addColorStop(0, '#040d1e');
  oceanGrad.addColorStop(0.6, '#020713');
  oceanGrad.addColorStop(1, '#010308');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Helper: Convert Lat/Lon [-90..90, -180..180] to Canvas [X, Y]
  const toXY = (lat, lon) => [
    ((lon + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ];

  // Helper: Draw continent with coastal shelf glow & vector stroke
  const drawContinent = (coords, fill = '#0a1d37', stroke = 'rgba(0, 242, 254, 0.45)') => {
    // A. Shallow Coastal Shelf Glow
    ctx.beginPath();
    coords.forEach(([lat, lon], idx) => {
      const [x, y] = toXY(lat, lon);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
    ctx.lineWidth = 12;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // B. Continent Landmass Core
    ctx.beginPath();
    coords.forEach(([lat, lon], idx) => {
      const [x, y] = toXY(lat, lon);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();

    // C. Crisp Vector Coastline
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.6;
    ctx.stroke();
  };

  // 2. High-Accuracy Continents Coordinates
  // Eurasia (Europe, Middle East, Russia, China, India, SE Asia)
  const eurasia = [
    [71, 26], [71, 55], [73, 85], [75, 110], [70, 145], [66, 170],
    [62, 178], [58, 162], [52, 142], [42, 131], [38, 126], [32, 121],
    [22, 114], [21, 108], [11, 104], [8, 100], [15, 96], [22, 91],
    [22, 88], [17, 82], [10, 79], // Cape Comorin (South India)
    [13, 74], [18, 73], [22, 69], [25, 62], [24, 57], [16, 54],
    [12, 44], [22, 38], [28, 34], [31, 32], [37, 27], [41, 29],
    [45, 14], [44, 8], [48, -4], [53, 5], [58, 8], [63, 10], [70, 20]
  ];
  drawContinent(eurasia, 'rgba(12, 26, 48, 0.96)', 'rgba(0, 242, 254, 0.55)');

  // Africa
  const africa = [
    [36, -5], [37, 10], [32, 24], [31, 32], [23, 37], [12, 44],
    [11, 51], [2, 45], [-5, 39], [-15, 40], [-26, 33], [-34, 19],
    [-33, 16], [-20, 12], [-8, 12], [4, 9], [5, -1], [5, -8],
    [11, -16], [21, -17], [30, -10], [36, -5]
  ];
  drawContinent(africa, 'rgba(12, 25, 46, 0.96)', 'rgba(0, 242, 254, 0.5)');

  // North America
  const northAmerica = [
    [71, -156], [70, -135], [68, -100], [60, -75], [55, -60], [47, -53],
    [43, -65], [36, -75], [26, -80], [25, -82], [29, -89], [26, -97],
    [20, -97], [15, -89], [9, -79], [8, -83], [14, -92], [20, -105],
    [28, -114], [33, -118], [42, -124], [49, -125], [57, -136], [60, -145],
    [64, -165], [66, -168], [71, -156]
  ];
  drawContinent(northAmerica, 'rgba(12, 25, 46, 0.96)', 'rgba(0, 242, 254, 0.5)');

  // South America
  const southAmerica = [
    [12, -72], [10, -62], [5, -53], [-3, -40], [-7, -35], [-20, -40],
    [-24, -46], [-34, -53], [-42, -63], [-53, -68], [-54, -73], [-44, -74],
    [-35, -72], [-18, -71], [-5, -80], [2, -79], [7, -76], [12, -72]
  ];
  drawContinent(southAmerica, 'rgba(12, 25, 46, 0.96)', 'rgba(0, 242, 254, 0.5)');

  // Australia
  const australia = [
    [-11, 136], [-15, 145], [-25, 153], [-34, 151], [-38, 145],
    [-38, 140], [-34, 136], [-32, 126], [-34, 115], [-22, 114],
    [-17, 122], [-14, 129], [-11, 136]
  ];
  drawContinent(australia, 'rgba(12, 25, 46, 0.96)', 'rgba(0, 242, 254, 0.5)');

  // Greenland
  const greenland = [
    [82, -30], [80, -20], [75, -20], [70, -25], [60, -43],
    [64, -52], [73, -56], [78, -69], [82, -50], [82, -30]
  ];
  drawContinent(greenland, 'rgba(12, 25, 46, 0.9)', 'rgba(0, 242, 254, 0.4)');

  // Japan Archipelago
  const japan = [
    [45, 142], [43, 145], [39, 140], [35, 135], [33, 130],
    [35, 132], [38, 138], [42, 141], [45, 142]
  ];
  drawContinent(japan, 'rgba(14, 28, 52, 0.96)', 'rgba(0, 242, 254, 0.55)');

  // British Isles
  const uk = [
    [58, -5], [58, -2], [54, 0], [51, 1], [50, -5],
    [52, -5], [55, -6], [58, -5]
  ];
  drawContinent(uk, 'rgba(14, 28, 52, 0.96)', 'rgba(0, 242, 254, 0.55)');

  // 3. Latitude & Longitude Precision Graticule
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
  ctx.lineWidth = 1;

  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Equator Highlight
  const eqY = height / 2;
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(0, eqY);
  ctx.lineTo(width, eqY);
  ctx.stroke();
  ctx.setLineDash([]);

  // 4. Metropolitan City Lights Clusters (Civilization Web)
  const cityClusters = [
    // India Metros
    [28.6, 77.2, 5], // Delhi
    [19.1, 72.9, 6], // Mumbai
    [13.0, 80.3, 4], // Chennai
    [12.9, 77.6, 5], // Bengaluru
    [17.4, 78.5, 4], // Hyderabad
    [22.6, 88.4, 4], // Kolkata
    // East Asia
    [35.7, 139.7, 7], // Tokyo
    [37.6, 127.0, 5], // Seoul
    [31.2, 121.5, 6], // Shanghai
    [39.9, 116.4, 6], // Beijing
    [22.3, 114.2, 5], // Hong Kong
    // Europe
    [51.5, -0.1, 6],  // London
    [48.8, 2.3, 6],   // Paris
    [52.5, 13.4, 4],  // Berlin
    [41.9, 12.5, 4],  // Rome
    // North America
    [40.7, -74.0, 7], // New York
    [34.0, -118.2, 6], // Los Angeles
    [41.8, -87.6, 5], // Chicago
    [37.8, -122.4, 5], // San Francisco
    [29.7, -95.4, 4],  // Houston
    // Middle East, Oceania, S.America
    [25.2, 55.3, 5],  // Dubai
    [1.3, 103.8, 5],  // Singapore
    [-33.8, 151.2, 5], // Sydney
    [-23.5, -46.6, 5], // Sao Paulo
  ];

  cityClusters.forEach(([lat, lon, radius]) => {
    const [cx, cy] = toXY(lat, lon);
    const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 3.5);
    rad.addColorStop(0, '#ffffff');
    rad.addColorStop(0.25, '#67e8f9');
    rad.addColorStop(0.65, 'rgba(0, 242, 254, 0.45)');
    rad.addColorStop(1, 'rgba(0, 242, 254, 0)');

    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 5. Global Subsea / Satellite Data Arcs from Primary Node (India: 20°N, 78°E)
  const [hubX, hubY] = toXY(20.5, 78.5);

  const targets = [
    [35.7, 139.7], // Tokyo
    [51.5, -0.1],  // London
    [37.8, -122.4],// SF
    [1.3, 103.8],  // Singapore
    [25.2, 55.3],  // Dubai
    [-33.8, 151.2], // Sydney
    [40.7, -74.0], // NY
  ];

  targets.forEach(([lat, lon]) => {
    const [tx, ty] = toXY(lat, lon);
    ctx.beginPath();
    ctx.moveTo(hubX, hubY);
    const midX = (hubX + tx) / 2;
    const midY = Math.min(hubY, ty) - 55;
    ctx.quadraticCurveTo(midX, midY, tx, ty);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([5, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Primary Hub Concentric Pulse Radar
  ctx.beginPath();
  ctx.arc(hubX, hubY, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#00f2fe';
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.arc(hubX, hubY, 20, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(hubX, hubY, 32, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Subtle digital circuit data points
  for (let i = 0; i < 350; i++) {
    const rx = Math.random() * width;
    const ry = Math.random() * height;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(0, 242, 254, 0.28)' : 'rgba(139, 92, 246, 0.25)';
    ctx.fillRect(rx, ry, 2, 2);
  }

  return canvas;
}

/**
 * Generates an ethereal cloud and cyclone weather system canvas
 */
export function createEarthCloudsTexture() {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Transparent base
  ctx.clearRect(0, 0, width, height);

  // Soft atmospheric cloud bands and storms
  for (let i = 0; i < 90; i++) {
    const cx = Math.random() * width;
    const cy = 60 + Math.random() * (height - 120);
    const radiusX = 40 + Math.random() * 120;
    const radiusY = 15 + Math.random() * 45;
    const rot = (Math.random() - 0.5) * 0.4;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radiusX);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.4, 'rgba(165, 243, 252, 0.22)');
    grad.addColorStop(0.8, 'rgba(0, 242, 254, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.scale(1, radiusY / radiusX);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, radiusX, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Polar Ice Cloud Caps
  const northCap = ctx.createLinearGradient(0, 0, 0, 80);
  northCap.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
  northCap.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = northCap;
  ctx.fillRect(0, 0, width, 80);

  const southCap = ctx.createLinearGradient(0, height, 0, height - 80);
  southCap.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
  southCap.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = southCap;
  ctx.fillRect(0, height - 80, width, 80);

  return canvas;
}
