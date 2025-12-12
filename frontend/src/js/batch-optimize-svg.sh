#!/bin/bash

# === batch-optimize-svg.sh ===
# USAGE:
# cd /Users/annakotlyar/Desktop/projects/echoapp/frontend/src/js
# chmod +x batch-optimize-svg.sh
# ./batch-optimize-svg.sh ../images/portfolio

# Check if a folder path is provided
if [ -z "$1" ]; then
  echo "❌ Please provide the path to the folder containing SVGs"
  exit 1
fi

INPUT_DIR=$1

echo "🔍 Optimizing SVGs in: $INPUT_DIR (including subfolders)"

# Find all SVG files recursively and optimize them in-place
find "$INPUT_DIR" -type f -name "*.svg" | while read -r file; do
  # Get file size before optimization
  size_before=$(stat -f%z "$file") # macOS
  # For Linux use: size_before=$(stat -c%s "$file")

  echo "⚡ Optimizing: $file (size: $size_before bytes)"

  # Optimize SVG in-place
  npx svgo --multipass "$file" -o "$file"

  # Get file size after optimization
  size_after=$(stat -f%z "$file") # macOS
  # For Linux use: size_after=$(stat -c%s "$file")

  # Calculate reduction
  reduction=$((size_before - size_after))
  reduction_percent=$(awk "BEGIN {printf \"%.2f\", ($reduction/$size_before)*100}")

  echo "✅ Optimized: $file → $size_after bytes (reduced by $reduction bytes / $reduction_percent%)"
done

echo "🎉 All SVGs have been optimized in-place!"
