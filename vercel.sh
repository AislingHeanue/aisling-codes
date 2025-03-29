#!/bin/bash

echo "Installing go..."
GO_VERSION="1.24.1"
curl -sSL "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" -o go.tgz
tar -xzf go.tgz
export PATH="$PATH:$(pwd)/go/bin"
rm go.tgz

echo "Running prebuild..."
npm run prebuild

echo "Running build..."
vite build
