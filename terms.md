## Terms and Principles

Terms and principles which are key to Merger:

### Template
A full html page, or partial (fragment), containing the html that merger will use as mark up.
The template usually has no content.

### Section Template
A section of html, within a template, that is the html for sections that may be repeated in the 
rendering of the page or partial. For example: for a list of products or order items. 
A section template is pure mark up for any instance of the list, and as the mark-up is the same for all instances, it only needs to appear once. 
A section template must declare the class "template", as the last in the list of classes of the section bounding tag. 
This allows Merger to find the section template, and via a CSS rule, to keep the template hidden. 
A Section template can include child section templates, for repeating sections within a parent instance.
For example, each product instance could include child instances for its applicable sizes.
A section template, should be placed, at the position where the list of its instances are required.

### Data Sources 
An object, or graph of objects, containing the dynamic source content, that 
 - fills template mark-up with content
 - drives the instantiation, and filling, of section templates. 

The data sources, will often be the result of service calls, but that is not part of merger operation. Merger code needs the data sources to be in scope. Merger can use a number of content sources when rendering.

### Data Driven
Concept of using data configuration, to drive variations in runtime behaviour. This is how Merger reduces the amount of code developed to render a page.

### Mapping
Merger is data driven, and the mapping is a graph of JSON data objects that map data source objects 
and content to targets in the template html. The mapping configuration, maps: 
- target html section templates to source object collections
- target html element values to source content values
- target attribute values to source content values

The mapping configuration uses:
- CSS expressions 
-- to find the required section templates and elements
- attribute names 
-- to identify attributes within an element
- jsonPath expressions, to find 
-- registered data sources
-- object collections within a data source
-- content data within source objects
> The CSS and jsonPath expressions are usually relative to the current context of the processing. This simplifys them, and improves efficiency.

### Html IDs
It is regularly desired, to fill in html id attribute values, that are both unique and meaningful in nature. Merger can map to specific source fields, for use as IDs, and these are combined with class names, to achieve this.
A parent object ID can be used to prefix a child object to help ensure uniqueness.
This topic is explained more fully by the examples and their documentation.

### Extension Functions
The mapping configuration approach, used by Merger, significantly reduces the amount of code development. However, it is sometimes a necessary to develop custom code, as delegated functions, 
for example:

- to format a price in a particular way
- to pre- or post-fix the source content, prior to insertion in the html
- to cater for variations in behaviour, e.g. a source template mapped to an empty source collection

### Function Registry
This is used to register custom coded functions; so that they found by mapping configuration using a declared name. All extension functions have the same pattern of parameters.




<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MDI1MzM1NDAsMTc1NTE3OTI5NF19
-->