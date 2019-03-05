#!/bin/bash

hugo new site .
hugo new theme realeyes-web

### Get example themes and remove the git info
cd themes
git clone https://github.com/darshanbaral/mero.git
rm -rf mero/.git

git clone https://github.com/JugglerX/hugo-hero-theme
mv hugo-hero-theme hero
rm -rf hero/.git
cd ..
# Change config.yaml to use whatever theme you want

### Create a blog post
hugo new blog/first.md

### Create an index page to paginate the blog
hugo new blog/_index.md

# Add some text to _index.md so we know if we hit the body block
echo "Some text!" >> content/blog/_index.md
# Set draft to false in doc

### Serve with drafts enabled to see it in action
hugo serve -D

# https://gohugo.io/themes/creating/ for theme creation info

