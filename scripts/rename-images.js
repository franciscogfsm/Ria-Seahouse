const fs = require('fs');
const path = require('path');

const imageDescriptions = {
  'WhatsApp Image 2025-01-09 at 21.39.12 (1).jpeg': 'living-room-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.12.jpeg': 'living-room-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (1).jpeg': 'kitchen-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (2).jpeg': 'kitchen-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (3).jpeg': 'dining-area-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (4).jpeg': 'master-bedroom-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (5).jpeg': 'master-bedroom-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13 (6).jpeg': 'second-bedroom-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.13.jpeg': 'second-bedroom-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14 (1).jpeg': 'third-bedroom-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14 (2).jpeg': 'bathroom-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14 (3).jpeg': 'bathroom-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14 (4).jpeg': 'balcony-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14 (5).jpeg': 'balcony-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.14.jpeg': 'exterior-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.15 (1).jpeg': 'exterior-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.15 (2).jpeg': 'view-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.15 (3).jpeg': 'view-2.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.15 (4).jpeg': 'beach-1.jpg',
  'WhatsApp Image 2025-01-09 at 21.39.15 (5).jpeg': 'beach-2.jpg',
  // Add mappings for remaining images...
};

const imagesDir = path.join(process.cwd(), 'public', 'images');

try {
  const files = fs.readdirSync(imagesDir);
  
  files.forEach(file => {
    if (imageDescriptions[file]) {
      const oldPath = path.join(imagesDir, file);
      const newPath = path.join(imagesDir, imageDescriptions[file]);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${file} to ${imageDescriptions[file]}`);
    }
  });

  console.log('Image renaming completed successfully!');
} catch (error) {
  console.error('Error renaming images:', error);
}