#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 14
npm install -g serverless
# deploying to aws
serverless create --template aws-nodejs
serverless deploy