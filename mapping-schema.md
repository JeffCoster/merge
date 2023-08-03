## Merger Mapping Schema

This section describes the json schema which controls the json merger mapping.

The configured mapping is what drives Merger operations. 

It maps:
* html elements and attributes to the dynamic source data that fills their content,

* html template sections to the source object collections that drive instantion and filling of the section templates.

> Note: The schema for merger mapping is contained in schema/merger-schema.js.

The following Object Model, depicts the main objects, data fields and object relationships, which are formally specified in the schema.

<img src="schema/mergerObjAndProcessingModel.png" width="100%" height="100%" />

> Structually:

>> the top level mergerSchema object can have zero or more elementFills and zero or more collections

>> a collections object, has an instanceFill object that can contain zero or more collections and zero 
or more elementFills.

>> The dashed flows show merger runtime operations, that read from the data sources, and update the html, according to the specified mapping.

### Schema Object Definitions

#### elementFills

| elementFills[] | |
|:-------------|:--|
| Object Description | Array of elementFill objects, each object uses one data source object graph, and maps its content values to the required target html elements, and attributes. |
| dataSrcJpath | jsonPath expression to find the required registered data source in dataSources |

| elementFill[].elementsToDo[] | |
| :------- | :--- |
| Object Description | Array of objects, each object maps a html element value to the source content that will fill it |
| elementTgtCss | CSS expression to find a target element in the document or template instance html |
| elementValueSrcJpath | jsonPath expression to find the content within the elementFill data source, to use as the target element value
| functionSel | optional registered name of a function to use for additional processing, e.g. for formatting. See Merger Functions for more detail |

| elementFill.elementToDo.itsAttributes[] | |
| :------- | :--- |
| Object Description | Array of objects, one object for each attribute of parent element that requires source content |
| tgtAttrName | name of the attribute that needs filling for the parent element
| srcJpath | jsonPath expression to find the content value, within the elementFill data source; to use as the attribute value
| functionSel | optional registered name of a function to use for additional processing, e.g. for formatting. |

#### collections

| collections[] | |
|:-------------|:--|
| Object Description | Array of collection objects, each collection maps to one data source object array, and to one target html section template. Each object in the source array drives the creation and filling of an instance of the section template.|
| dataSrcJpath | jsonPath expression to find the required data source array in dataSources. |
| templateId or <br> templateClassList | ID or class list used to find the target html section template. Id is normally for top level section templates, and class list for child templates.  |
| srcIdPath | jsonPath to select the Id within each data source object, used to form the Id values of the target instances |
| startDataSrcJpath | jsonPath within Data Sources, to a variable used to indicate start index into source object array |
| maxToShowDataSrcJpath | jsonPath within Data Sources, to a variable used to indicate max qty to show from source collection |
| mtCollectionFunctSel | registered name that selects the registered function to use for additional processing when the source data array is empty |

| collection.instanceFill | |
| :---- | :---- |
| Object Description | Contains: zero or one (child) collections array, zero or one elementFills array. Note: collections can contain collections to handle the hierarchical nature of html. The elementFills array maps content from each source object to its corresponding instance of the section template.

> Important Note:  Within an instanceFill object:

>> All CSS expressions are scoped to the html section template, not the whole document

>> All jsonPath expressions, default in scope, to the source data object that instantiated that instance of the template.
This is the case where the dataSourceJpath, within the instanceFill is left empty or is set to "instance".
This default behaviour can be overriden by specifying a dataSourceJpath to the required data source.








