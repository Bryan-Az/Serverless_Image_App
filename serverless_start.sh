#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 6
npm install -g serverless@beta
serverless create --template aws-nodejs