/* Merger
 *
 * Copyright (c) 20024 Jeff Coster
 * Licensed under the Apache-2.0 licence.
 * see https://github.com/JeffCoster/merger
 * 
 * Root, i.e. top level mapping of html
 *
 **/

import { Type, Property } from '@dipscope/type-manager';
import { InstanceMapping } from "./instance-mapping.js";

@Type()
export class RootMapping
{
    // path, relative to this file, of the html template file, only used for Node.js
    @Property(String) public templatePath?: string;
    // top level (root) instance object, used to map elements  and top level collections
    @Property(InstanceMapping) public instanceMapping: InstanceMapping;
   
    public constructor(instanceMapping: InstanceMapping, templatePath?: string ) {
    
        this.instanceMapping = instanceMapping;
        if (templatePath !== undefined) this.templatePath = templatePath;
        return;
    }
}
