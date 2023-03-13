## Terms 

Terms and principles which are key to Merger:

### Template
A full html page, or partiaal/fragment, containg the html that merger will use.
The template usually has no content.

### Section Template
A section of html, within a template, that is the html for sections that will be repeated in the 
rendering of the page or oartial. For example, for a list of products or order items. 
This html is the mark up for one instance of the list, e.g. one product or order item. 
A section template is always hidden, its bounding teg includes the class "template". 
Section templates can include child section templates, for a reapeating section with an instance.
e.g. for the sizes of a product.

### Data Source 
An object or graph of objects containing the dynamic source data that fill template html, and drive the 
instantiation of instances of section templates. The data sources, will often be the result of service calls 
but that is not part of merger operation. Merger code needs the data sources to be in scope. Merger can use 
a number of data sources when rendering

### Data Source Registry
Each data source needs to be registered, i.e. declared, so that merger can find and use it at runtime.

### Data Driven
Concept of using data configuration to drive variations in runtime behaviour. Can significantly reduce the 
amount of code required.

fMerger is data driven, and the mapping is a graph of json data objects that map data source objects 
and content to template html. Collections of objects are mapped to section templates. Source data values 
are mapped to element or attribute values. The mapping configuration, maps: 
1. target html sections templates to source object collections
2. target element values to source content values
3. attribute values to source content values

The mapping configuration uses:
CSS expresions to find the required section templates and elements
attribute names to identify attributes within an element
jsonPath expressions to find registered data sources
jsonPath expressions to find object collections within a data source

### Extension Functions
The mapping configuiration approach, used by Merger, significantly reduces the amount of new code required
for page rendering. However, sometinmes there is need to have custom code, as extension functions, 
for example:

- to format a source price
- to pre/post fix the source content
- to cater for variations in behaviour, e.g. a source template mapped to an empty source collection

### Function Registry
This is used to register custom coded functions, so that the found by mapping configuratio using a 
declared name. The signature of extension functions follows the same pattern, with all using the same 
order of parameters, which are in turn - optional. 




