#!/bin/bash
cd ~/public_html/aethon-client/

npm run generate

# pm2 delete aethon 

# pm2 start npm --name aethon -- start
