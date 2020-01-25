#!/bin/bash
cd ~/public_html/aethon-client/

npm run build

pm2 delete aethon 

pm2 start npm --name aethon -- start
