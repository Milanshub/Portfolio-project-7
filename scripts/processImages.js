import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Define input and output directories
const INPUT_DIR = 'public/images/original';
const OUTPUT_DIR = 'public/images';

// Define standard dimensions
const DIMENSIONS = {
  width: 1280,
  height: 720
};

// Process images
async function processImages() {
  try {
    // Create directories if they don't exist
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Get all images from input directory
    const files = await fs.readdir(INPUT_DIR);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        console.log(`Processing ${file}...`);
        
        await sharp(path.join(INPUT_DIR, file))
          .resize(DIMENSIONS.width, DIMENSIONS.height, {
            fit: 'cover',
            position: 'center'
          })
          .toFile(path.join(OUTPUT_DIR, file));
          
        console.log(`✅ Processed ${file}`);
      }
    }
    
    console.log('All images processed successfully!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
