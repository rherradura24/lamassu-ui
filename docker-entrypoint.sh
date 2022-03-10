#!/bin/bash
set -e

rm -rf /usr/share/nginx/html/env-config.js
cat /tmpl/env-config.js.tmpl | envsubst \$DOMAIN > /usr/share/nginx/html/env-config.js

nginx -g "daemon off;"