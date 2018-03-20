#!/bin/sh

git add .

git commit -m 'bak_'+$(date +"%Y_%m_%d_%H_%M_%S")

git push
