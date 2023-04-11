# merger
Merging dynamic source content to html templates by data configuration (mapping)

## Objectives:
- keep html separate from any code: so that it easier to understand and maintain
- keep content separate from the html
- keep content separate from the code
- facilitate the rendering of dynamic web pages with minimal additional coding
- handle dynamic hierarchies of html sections, sourced from dynamic source object hierarchies
- solution to function equally in NodeJS or Browser

## Overview Of Typical Steps to use Merger to Render in a Browser
1. with static html, which is often a preview example of the dynamic page
    - remove example preview content, leaving mark up
    - collapse each repeated html section into a template (hidden) section
2. prepare content source objects
    - each Data Source needs to be available to the merger JS code, as a const
    - each Data Source needs to be registered in the Data Sources object
3. add merger boiler plate JS, in a script, in the html
4. configure json data to map source content json to target html sections
    - element text maps directly to corresponding source field 
    - attribute value maps directly to corresponding source field 
    - source object collections map to html template sections, for instantion of templates and content filling
5. load the html page, merger runs and renders the page

>_Note: Steps 4 and 5 can be iterated over, to configure and test in parts_
