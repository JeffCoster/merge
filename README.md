# merger
Merging dynamic source content to html templates by data configuration (mapping)

## Objectives:
- keep html separate from any type of code: so that it easier to understand and maintain
- keep content separate from the html
- keep content separate from the code
- facilitate the construction of dynamic web pages with none or minimal additional coding
- solution to function equally in NodeJS or Browser

## Overview Of How
1. with example html
  - remove example content, leaving mark up
  - collapse each repeated html section into one example template (hidden) section
2 use configured json data to map source content json to target html sections
  - element text maps directly to corresponding source field 
  - attribute value maps directly to corresponding source field 
  - source object collections map to html template sections, for instantion of templates and content filling

