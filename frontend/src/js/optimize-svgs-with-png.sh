#!/bin/bash

# === optimize-svgs-with-png.sh ===
# Recursively optimize SVGs and embedded PNGs in macOS
# Usage: ./optimize-svgs-with-png.sh /path/to/images

if [ -z "$1" ]; then
  echo "❌ Please provide the path to your SVG folder."
  exit 1
fi

INPUT_DIR="$1"
echo "🔍 Optimizing all SVGs in: $INPUT_DIR (recursively)"

# Check dependencies
command -v svgo >/dev/null 2>&1 || { echo "❌ svgo is required. Install with: npm install -g svgo"; exit 1; }
command -v pngquant >/dev/null 2>&1 || { echo "❌ pngquant is required. Install with: brew install pngquant"; exit 1; }

# Process all SVG files
find "$INPUT_DIR" -type f -name "*.svg" | while read -r file; do
  echo "⚡ Optimizing SVG: $file"

  # 1. Extract embedded Base64 PNGs (if any)
  TEMP_DIR="$(dirname "$file")/temp_base64"
  mkdir -p "$TEMP_DIR"

  # Extract Base64 images
  grep -o 'data:image/png;base64,[^"]*' "$file" | while read -r base64data; do
    PNG_NAME=$(echo "$base64data" | md5)
    PNG_PATH="$TEMP_DIR/$PNG_NAME.png"

    # Convert Base64 to PNG
    echo "$base64data" | sed 's/data:image\/png;base64,//' | base64 --decode > "$PNG_PATH"

    # Optimize PNG
    pngquant --quality=65-90 --speed 1 --force --output "$PNG_PATH" "$PNG_PATH"

    # Encode back to Base64
    NEW_BASE64=$(base64 "$PNG_PATH" | tr -d '\n')

    # Replace in SVG
    sed -i '' "s|$base64data|data:image/png;base64,$NEW_BASE64|g" "$file"
  done

  # 2. Optimize SVG itself
  npx svgo "$file" --multipass --pretty --enable=removeXMLNS --disable=removeUnknownsAndDefaults

done

# Remove temp folder
rm -rf "$INPUT_DIR"/**/temp_base64

echo "✅ All SVGs (and embedded PNGs) optimized in place!"
