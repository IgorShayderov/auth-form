#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:IgorShayderov/auth-form.git main:gh-pages

cd -
