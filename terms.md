## Terms and Principles

Terms and principles which are key to Merger:

### Template
A full html page, or partial (fragment), containing the html that merger will use as mark up.
The template usually has no content.

### Section Template
A section of html, within a template, that is the html for sections that may be repeated in the 
rendering of the page or partial. For example: for a list of products or order items. 
This section template is pure mark up for any instance of the list, and as the mark up is the same for all instances, it only needs to appear once. 
A section template must include the class "template", in the list of classes of its bounding tag. 
This is used by Merger to find it, and via a CSS rule to keep it hidden. 
A Section template can include child section templates, for repeating sections within a parent instance.
For example, each product instance could include child instances for its applicable sizes.

### Data Source 
An object or graph of objects containing the dynamic source data that fills template html with content, and drives the 
instantiation and filling of section templates. The data sources, will often be the result of service calls 
but that is not part of merger operation. Merger code needs the data sources to be in scope. Merger can use 
a number of data sources when rendering

### Data Source Registry
Each data source needs to be registered, i.e. declared, so that merger can find and use them at runtime.

### Data Driven
Concept of using data configuration to drive variations in runtime behaviour. This is what Merger uses to significantly reduce the 
amount of code developed to render a page.

### Mapping
Merger is data driven, and the mapping is a graph of json data objects that map data source objects 
and content to template html. Collections of objects are mapped to section templates. Source data values 
are mapped to element or attribute values. The mapping configuration, maps: 
- target html sections templates to source object collections
- target element values to source content values
- attribute values to source content values

The mapping configuration uses:
- CSS expresions to find the required section templates and elements
- attribute names to identify attributes within an element
- jsonPath expressions to find registered data sources
- jsonPath expressions to find object collections within a data source
- jsonPath expressions to find content data within source objects
>- The CSS and jsonPath expressions are usually basic in nature.

### Extension Functions
The mapping configuiration approach, used by Merger, significantly reduces the amount of new code required
for page rendering. However, there is sometimes a need to have custom code, as extension functions, 
for example:

- to format a source price
- to pre or post fix the source content
- to cater for variations in behaviour, e.g. a source template mapped to an empty source collection

### Function Registry
This is used to register custom coded functions, so that they found by mapping configuration using a 
declared name. The signature of extension functions follows the same pattern, with all using the same 
order of optional parameters. 




