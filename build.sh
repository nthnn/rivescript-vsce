#!/bin/sh
npm install
npm audit fix --force
npx vsce package
