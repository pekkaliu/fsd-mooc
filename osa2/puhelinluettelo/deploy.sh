#!/bin/sh
npm run build
rm -rf ../../../fsd-mooc-part3/build/
cp -r build ../../../fsd-mooc-part3
