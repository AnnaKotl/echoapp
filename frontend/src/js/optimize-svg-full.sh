#!/bin/bash
# === optimize-svg-full.sh ===
# Usage: ./optimize-svg-full.sh /path/to/svg-folder

if [ -z "$1" ]; then
  echo "❌ Please specify SVG folder path"
  exit 1
fi

SVG_DIR="$1"
TEMP_DIR="$SVG_DIR/temp_base64"
mkdir -p "$TEMP_DIR"

echo "🔍 Optimizing SVGs in: $SVG_DIR"

# Loop through all SVGs recursively
find "$SVG_DIR" -type f -name "*.svg" | while read -r svg; do
  echo "⚡ Processing: $svg"

  # Check for Base64 images
  if grep -q 'xlink:href="data:image/' "$svg"; then
    echo "   Found embedded Base64 image(s)"

    # Replace each embedded image
    grep -oP 'xlink:href="data:image/[^"]+"' "$svg" | while read -r base64_line; do
      # Extract Base64 data
      base64_data=$(echo "$base64_line" | sed -E 's/xlink:href="data:image\/[^;]+;base64,//' | sed 's/"//')

      # Save PNG
      PNG_FILE="$TEMP_DIR/$(basename "$svg" .svg)-$(date +%s%N).png"
      echo "$base64_data" | base64 --decode > "$PNG_FILE"

      # Compress PNG
      pngquant --quality=65-90 --force --output "$PNG_FILE" "$PNG_FILE"

      # Replace Base64 with PNG reference
      REL_PATH=$(basename "$PNG_FILE")
      sed -i.bak "s|$base64_line|xlink:href=\"$REL_PATH\"|" "$svg"
      echo "   Replaced Base64 with $REL_PATH"
    done
  else
    echo "   No embedded Base64 images"
  fi

  # Run SVGO to optimize SVG itself
  npx svgo "$svg" -o "$svg"
  echo "   SVG vector optimized"
done

echo "✅ Done! Optimized SVGs are in place, PNGs in temp folder: $TEMP_DIR"
