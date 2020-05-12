#!/bin/bash
cd ~/public_html/vishwjeet-client/

npm run build

pm2 delete vishwjeet 

pm2 start npm --name vishwjeet -- start
