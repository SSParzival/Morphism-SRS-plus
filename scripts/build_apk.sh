#!/usr/bin/env bash
# ==============================================================================
# Morphism SRS Plus — High Performance Android APK Build Script
# Compiles, dexes, packages, aligns, and signs morphism-srs-plus.apk
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ANDROID_DIR="$ROOT_DIR/android"
TOOLS_DIR="$ROOT_DIR/android_tools"
BUILD_DIR="$ANDROID_DIR/build"

JAVA_BIN="$TOOLS_DIR/jdk/bin/java"
JAVAC_BIN="$TOOLS_DIR/jdk/bin/javac"
AAPT2_BIN="$TOOLS_DIR/aapt2"
ANDROID_JAR="$TOOLS_DIR/android.jar"
R8_JAR="$TOOLS_DIR/r8.jar"
SIGNER_JAR="$TOOLS_DIR/uber-apk-signer.jar"

echo "=================================================================="
echo "⚡ Building Morphism SRS Plus Android APK (.apk)"
echo "=================================================================="

# Ensure shared assets exist in Android assets folder
mkdir -p "$ANDROID_DIR/app/src/main/assets"
if [ ! -f "$ANDROID_DIR/app/src/main/assets/tex-svg.js" ] && [ -f "$ROOT_DIR/assets/tex-svg.js" ]; then
    cp "$ROOT_DIR/assets/tex-svg.js" "$ANDROID_DIR/app/src/main/assets/"
fi
if [ ! -f "$ANDROID_DIR/app/src/main/assets/chart.js" ] && [ -f "$ROOT_DIR/assets/chart.js" ]; then
    cp "$ROOT_DIR/assets/chart.js" "$ANDROID_DIR/app/src/main/assets/"
fi

# Ensure build tools exist
if [ ! -d "$TOOLS_DIR/jdk" ] || [ ! -f "$AAPT2_BIN" ] || [ ! -f "$ANDROID_JAR" ] || [ ! -f "$R8_JAR" ] || [ ! -f "$SIGNER_JAR" ]; then
    echo "➔ Setting up portable Android build toolchain..."
    mkdir -p "$TOOLS_DIR"
    cd "$TOOLS_DIR"
    curl -L -s -o jdk17.tar.gz "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.21%2B9/OpenJDK17U-jdk_x64_linux_hotspot_17.0.21_9.tar.gz"
    tar -xzf jdk17.tar.gz && rm jdk17.tar.gz && mv jdk-17* jdk
    curl -L -s -o aapt2.jar "https://dl.google.com/dl/android/maven2/com/android/tools/build/aapt2/8.2.0-10154469/aapt2-8.2.0-10154469-linux.jar"
    unzip -q -o aapt2.jar aapt2 && rm aapt2.jar && chmod +x aapt2
    curl -L -s -o r8.jar "https://dl.google.com/dl/android/maven2/com/android/tools/r8/8.2.33/r8-8.2.33.jar"
    curl -L -s -o android.jar "https://github.com/Sable/android-platforms/raw/master/android-33/android.jar"
    curl -L -s -o uber-apk-signer.jar "https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar"
    cd "$ROOT_DIR"
fi

# 1. Clean and setup build directory
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/compiled_res" "$BUILD_DIR/gen" "$BUILD_DIR/classes" "$BUILD_DIR/release"

# 2. Compile Android Resources with aapt2
echo "➔ [1/5] Compiling Android XML & Mipmap Resources..."
"$AAPT2_BIN" compile --dir "$ANDROID_DIR/app/src/main/res" -o "$BUILD_DIR/compiled_res.zip"

# 3. Link APK package and generate R.java
echo "➔ [2/5] Linking APK package with Android SDK 33..."
"$AAPT2_BIN" link \
    -I "$ANDROID_JAR" \
    --manifest "$ANDROID_DIR/app/src/main/AndroidManifest.xml" \
    -o "$BUILD_DIR/app-unaligned.apk" \
    -A "$ANDROID_DIR/app/src/main/assets" \
    --java "$BUILD_DIR/gen" \
    --auto-add-overlay \
    "$BUILD_DIR/compiled_res.zip"

# 4. Compile Java Sources
echo "➔ [3/5] Compiling MainActivity and Java sources..."
"$JAVAC_BIN" \
    -source 1.8 -target 1.8 \
    -bootclasspath "$ANDROID_JAR" \
    -cp "$ANDROID_JAR" \
    -d "$BUILD_DIR/classes" \
    "$BUILD_DIR/gen/org/morphism/srs/plus/R.java" \
    "$ANDROID_DIR/app/src/main/java/org/morphism/srs/plus/MainActivity.java"

# 5. Compile Bytecode to classes.dex with D8
echo "➔ [4/5] Translating Java bytecode to Android DEX (classes.dex)..."
"$JAVA_BIN" \
    -cp "$R8_JAR" \
    com.android.tools.r8.D8 \
    --min-api 24 \
    --output "$BUILD_DIR/" \
    "$BUILD_DIR/classes/org/morphism/srs/plus/"*.class

# Inject classes.dex into unaligned APK
(cd "$BUILD_DIR" && zip -uj app-unaligned.apk classes.dex > /dev/null)

# 6. Zipalign and Cryptographically Sign APK (v1, v2, v3 signatures)
echo "➔ [5/5] Aligning and signing APK..."
"$JAVA_BIN" \
    -jar "$SIGNER_JAR" \
    --apks "$BUILD_DIR/app-unaligned.apk" \
    --out "$BUILD_DIR/release" > /dev/null

OUTPUT_SIGNED="$BUILD_DIR/release/app-aligned-debugSigned.apk"
FINAL_APK="$ROOT_DIR/morphism-srs-plus.apk"

if [ -f "$OUTPUT_SIGNED" ]; then
    cp "$OUTPUT_SIGNED" "$FINAL_APK"
    echo "=================================================================="
    echo "🎉 SUCCESS! Android APK generated successfully:"
    echo "   📁 $FINAL_APK ($(du -h "$FINAL_APK" | cut -f1))"
    echo ""
    echo "📲 To install on your Android device:"
    echo "   adb install $FINAL_APK"
    echo "   (or copy the file to your phone and open it to install)"
    echo "=================================================================="
else
    echo "❌ Error: Could not find output signed APK."
    exit 1
fi
