const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

// Color scheme for calorie tracker app
const PRIMARY_COLOR = '#FF6B35'; // Orange
const SECONDARY_COLOR = '#FF8C42'; // Light Orange
const WHITE = '#FFFFFF';

// Read the chef SVG
const chefSvgPath = path.join(__dirname, '..', 'assets', 'chef-icon.svg');
const chefSvgContent = fs.readFileSync(chefSvgPath, 'utf8');

async function createIcon() {
  // Create main icon (512x512) with chef logo
  const iconSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SECONDARY_COLOR};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${PRIMARY_COLOR};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background with gradient -->
      <rect width="512" height="512" fill="url(#bgGradient)" rx="100"/>
      
      <!-- Decorative circles -->
      <circle cx="256" cy="256" r="220" fill="${WHITE}" opacity="0.1"/>
      <circle cx="256" cy="256" r="180" fill="${WHITE}" opacity="0.15"/>
      
      <!-- Chef icon in white -->
      <g transform="translate(106, 86) scale(10)">
        ${chefSvgContent.replace(/fill="#000000"/g, `fill="${WHITE}"`).replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
      </g>
      
      <!-- Bottom text badge -->
      <rect x="156" y="420" width="200" height="50" fill="${WHITE}" rx="25" opacity="0.95"/>
      <text x="256" y="452" text-anchor="middle" font-size="24" font-weight="bold" fill="${PRIMARY_COLOR}" font-family="Arial, sans-serif">CALORIE</text>
    </svg>
  `;
  
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));
  
  console.log('✅ icon.png created');
}

async function createAdaptiveIcon() {
  // Create adaptive icon foreground (512x512) with chef
  const adaptiveSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <!-- Chef icon centered and scaled -->
      <g transform="translate(106, 86) scale(10)">
        ${chefSvgContent.replace(/fill="#000000"/g, `fill="${PRIMARY_COLOR}"`).replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
      </g>
    </svg>
  `;
  
  await sharp(Buffer.from(adaptiveSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));
  
  console.log('✅ adaptive-icon.png created');
}

async function createSplash() {
  // Create splash screen with chef logo
  const splashSvg = `
    <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="splashBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SECONDARY_COLOR};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${PRIMARY_COLOR};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E85D2E;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1080" height="1920" fill="url(#splashBg)"/>
      
      <!-- Decorative circles -->
      <circle cx="540" cy="700" r="300" fill="${WHITE}" opacity="0.08"/>
      <circle cx="540" cy="700" r="240" fill="${WHITE}" opacity="0.12"/>
      <circle cx="540" cy="700" r="180" fill="${WHITE}" opacity="0.15"/>
      
      <!-- Large chef icon -->
      <g transform="translate(190, 330) scale(20)">
        ${chefSvgContent.replace(/fill="#000000"/g, `fill="${WHITE}"`).replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
      </g>
      
      <!-- App name with shadow -->
      <text x="540" y="1050" text-anchor="middle" font-size="90" font-weight="bold" fill="#00000020" font-family="Arial, sans-serif">Calorie Tracker</text>
      <text x="540" y="1045" text-anchor="middle" font-size="90" font-weight="bold" fill="${WHITE}" font-family="Arial, sans-serif">Calorie Tracker</text>
      
      <!-- Tagline -->
      <text x="540" y="1140" text-anchor="middle" font-size="38" fill="${WHITE}" opacity="0.9" font-family="Arial, sans-serif">Track your meals like a chef</text>
      
      <!-- Decorative food icons -->
      <g transform="translate(200, 1400)" opacity="0.3">
        <circle cx="0" cy="0" r="35" fill="${WHITE}"/>
        <text x="0" y="15" text-anchor="middle" font-size="40">🍽️</text>
      </g>
      <g transform="translate(880, 1400)" opacity="0.3">
        <circle cx="0" cy="0" r="35" fill="${WHITE}"/>
        <text x="0" y="15" text-anchor="middle" font-size="40">👨‍🍳</text>
      </g>
      <g transform="translate(540, 1550)" opacity="0.3">
        <circle cx="0" cy="0" r="35" fill="${WHITE}"/>
        <text x="0" y="15" text-anchor="middle" font-size="40">📊</text>
      </g>
    </svg>
  `;
  
  await sharp(Buffer.from(splashSvg))
    .resize(1284, 2778)
    .png()
    .toFile(path.join(assetsDir, 'splash-icon.png'));
  
  console.log('✅ splash-icon.png created');
}

async function createFavicon() {
  // Create favicon (48x48) with chef
  const faviconSvg = `
    <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="favBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SECONDARY_COLOR};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${PRIMARY_COLOR};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill="url(#favBg)" rx="10"/>
      <g transform="translate(6, 5.5) scale(1.125)">
        ${chefSvgContent.replace(/fill="#000000"/g, `fill="${WHITE}"`).replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
      </g>
    </svg>
  `;
  
  await sharp(Buffer.from(faviconSvg))
    .resize(48, 48)
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  
  console.log('✅ favicon.png created');
}

async function generateAll() {
  try {
    await createIcon();
    await createAdaptiveIcon();
    await createSplash();
    await createFavicon();
    console.log('\n🎉 All assets generated successfully!');
  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

generateAll();
