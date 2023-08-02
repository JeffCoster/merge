## Merger Mapping Schema

This section describes the json schema which controls the json merger mapping.

The mapping is at the heart of merger operation. 

It configures:
* html elements and attributes to the dynamic source data that will fill their content,

* html template sections to the source object collections that drive instantion and filling of the section templates.

> The schema for merger mapping is contained in schema/merger-schema.js.

The following Object Model, depicts the main objects, data fields and object relationships, which are formally specified in the schema.

<img src="schema/mergerObjAndProcessingModel.png" width="100%" height="100%" />

> Structually:

>> the top level mergerSchema object can have zero or more elementFills and zero or more collections

>> a collections object, has an instanceFill object that can contain zero or more collections and zero 
or more elementFills.

>> The dashed flows show merger runtime operations. Where it interprets the mapping to read from datasources and to update the html.

### Schema Object Definitions

#### elementFills

| elementFills[] | |
|:-------------|:--|
| Object Description | Array of elementFill objects, each uses one data source object graph, and maps its content values to the required target html elements, and attributes. |
| dataSrcJpath | jsonPath expression to find the required registered data source in dataSources |

| elementFill[].elementsToDo[] | |
| :------- | :--- |
| Object Description | Array of objects, one object for each html element that needs mapping to source content to fill it |
| elementTgtCss | CSS expression to find a target element in the document or template instance html |
| elementValueSrcJpath | jsonPath expression to find the content value, within the elementFill data source, to use as the target element value
| functionSel | where an extra function is required, for content or target processing, e.g. formatting. This is the registered identifying name of the registered function. See Merger Functions for more detail |

| elementFill.elementToDo.itsAttributes[] | |
| :------- | :--- |
| Object Description | Array of objects, one object for each attribute of parent element that requires source content |
| tgtAttrName | name of the attribute that needs filling for the parent element
| srcJpath | jsonPath expression to find the content value, within the elementFill data source; to use as the attribute value
| functionSel | where an extra function is required, for content or target processing, e.g. formatting. This is the registered identifying name of the registered function |

#### collections

| collections[] | |
|:-------------|:--|
| Object Description | Array of collection objects, each collection maps to one data source object array, and to one target html section template. Each object in the source array drives the creation and filling of an instance of the section template.|
| dataSrcJpath | jsonPath expression to find the required registered data source array in dataSources. |
| templateId or <br> templateClassList | ID or class list used to find the target html section template. ID is normally for top level section templates, and class list for child templates.  |
| srcIdPath | jsonPath to select the ID from the data source, used to form the html ID attribute values of target instances |
| startDataSrcJpath | jsonPath within Data Sources, to a variable used to indicate start index into source object array |
| maxToShowDataSrcJpath | jsonPath within Data Sources, to variable used to indicate max qty to show from source collection |
| mtCollectionFunctSel | registered name that selects the registered function to use for additional processing when the source data collection is empty |

| collection.instanceFill | |
| :---- | :---- |
| Object Description | Contains: zero or one collections array, zero or one elementFills array. Note: collections can contain collections to handle the hierarchical nature of html.

> Important Note:  Within an instanceFill object:

>> All CSS expressions are scoped to the html section template, not the whole document

>> All jsonPath expressions, default in scope, to the source data object that instantiated that instance of the template.
This is the case where the dataSourceJpath, within the instanceFill is left empty or is set to "instance".
This default behaviour can be overriden by specifying a dataSourceJpath to the required data source.








