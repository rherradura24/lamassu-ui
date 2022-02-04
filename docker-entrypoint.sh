#!/bin/sh
set -e

rm -rf ./env-config.js
cat /tmpl/env-config.js.tmpl | envsubst \$DOMAIN > ./env-config.js