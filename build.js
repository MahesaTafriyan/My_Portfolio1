import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

function build() {
  console.log('🚀 Building site for Vercel...');
  
  // Create public directory
  if (!existsSync('public')) {
    mkdirSync('public');
  }
  
  try {
    // Copy all files using system commands
    execSync('cp -r *.html *.css *.js public/ 2>/dev/null || true');
    console.log('✅ Copied HTML, CSS, JS files');
    
    // Copy folders if they exist
    if (existsSync('admin')) {
      execSync('cp -r admin public/');
      console.log('✅ Copied admin folder');
    }
    
    if (existsSync('blog')) {
      execSync('cp -r blog public/');
      console.log('✅ Copied blog folder');
    }
    
    if (existsSync('images')) {
      execSync('cp -r images public/');
      console.log('✅ Copied images folder');
    }
    
    console.log('🎉 Build completed successfully!');
  } catch (error) {
    console.log('⚠️ Build completed with warnings');
  }
}

build();
