/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Class for Collection mapping objects
 * 
 **/

import {extFunctions} from "./merger-extensions.js"
import { Type, Property } from '@dipscope/type-manager';
import { InstanceMapping } from "./instance-mapping.js";

@Type()
export class CollectionMapping
{
   // json path to content source object used to instantiate and fill collection
   @Property(String) public dataSrcJpath: string;      
   // json path to optional variable used as start index point into content collection, zero is first
   @Property(String) public startDataSrcJpath: number;
   // json path to optional variable used as max number of instances to create and fill
   @Property(String) public maxToShowDataSrcJpath: number;
   // id of the html section template for this collection
   @Property(String) public templateId: string;
   // class list of template to use instead of id. Use this instead of id for child collections, to ensure unique IDs
   @Property(String) public templateClassList: string;

   // mapping for each instantiated object of collection
   @Property(InstanceMapping) public instanceMapping: InstanceMapping;
   
   public constructor(dataSrcJpath: string, instanceMapping: InstanceMapping, templateId?: string, templateClassList?: string,
            functionSel?: string, startDataSrcJpath?: number, maxToShowDataSrcJpath?: number, ) {
        
        this.dataSrcJpath = dataSrcJpath;
        this.instanceMapping = instanceMapping;

        if (typeof templateId !== "undefined") this.templateId = templateId;
        if (typeof templateClassList !== "undefined") this.templateClassList = templateClassList;

        if (typeof startDataSrcJpath !== "undefined") this.startDataSrcJpath = startDataSrcJpath;
        if (typeof maxToShowDataSrcJpath !== "undefined") this.maxToShowDataSrcJpath = maxToShowDataSrcJpath;

        return;
    }
}