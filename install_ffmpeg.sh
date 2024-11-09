#!/bin/bash
# Script para instalar FFmpeg en Railway

# Descargar FFmpeg
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz -o ffmpeg.tar.xz

# Descomprimir el archivo descargado
tar -xJf ffmpeg.tar.xz

# Mover los binarios a una carpeta conocida (por ejemplo, /usr/local/bin)
mv ffmpeg-*/ffmpeg /usr/local/bin/ffmpeg
mv ffmpeg-*/ffprobe /usr/local/bin/ffprobe

# Dar permisos de ejecución
chmod +x /usr/local/bin/ffmpeg
chmod +x /usr/local/bin/ffprobe

# Limpiar archivos
rm -rf ffmpeg* 
