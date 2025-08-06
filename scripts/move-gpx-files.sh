#!/bin/bash

# Script to move GPX files from src/assets/hikes to public/hikes
# This ensures GPX files are publicly accessible for downloads

echo "Moving GPX files from src/assets/hikes to public/hikes..."

# Find all GPX files in src/assets/hikes and copy them to public/hikes
find src/assets/hikes -name "*.gpx" -exec sh -c '
    # Create the target directory structure
    target_dir="public/hikes/$(dirname "{}" | sed "s|src/assets/hikes/||")"
    mkdir -p "$target_dir"

    # Copy the file
    cp "{}" "$target_dir/"

    echo "Copied: {} -> $target_dir/$(basename "{}")"
' \;

echo "Done! All GPX files have been moved to public/hikes/"
echo "You can now safely delete the GPX files from src/assets/hikes/ if desired."
