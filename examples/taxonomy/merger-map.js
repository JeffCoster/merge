export const mergerMap = {
   "elementFills": [
      {
         "dataSrcJpath": "globals",
         "elementsToDo": [
            {
               "elementTgtCss": "title",
               "elementValueSrcJpath": "pageTitle"
            },
            {
               "elementTgtCss": "#tree-header",
               "elementValueSrcJpath": "treeHeader"
            }
         ]
      }
   ],
   "collections": [
      {
         "dataSrcJpath": "taxonomy",
         "templateId": "",
         "templateClassList": "level1 template",
         "srcIdPath": "id",
         "instanceFill": {
            "elementFills": [
               {
                  "dataSrcJpath": "instance",
                  "elementsToDo": [
                     {
                        "elementTgtCss": "summary",
                        "elementValueSrcJpath": "level1"
                     }
                  ]
               }
            ],
            "collections": [
               {
                  "dataSrcJpath": "sub2s",
                  "templateId": "",
                  "templateClassList": "level2 template",
                  "srcIdPath": "id",
                  "mtCollectionFunctSel": "lastLeafNode",
                  "instanceFill": {
                     "elementFills": [
                        {
                           "dataSrcJpath": "instance",
                           "elementsToDo": [
                              {
                                 "elementTgtCss": "summary",
                                 "elementValueSrcJpath": "level2"
                              }
                           ]
                        }
                     ],
                     "collections": [
                        {
                           "dataSrcJpath": "sub3s",
                           "templateId": "",
                           "templateClassList": "level3 template",
                           "srcIdPath": "id",
                           "mtCollectionFunctSel": "lastLeafNode",
                           "instanceFill": {
                              "elementFills": [
                                 {
                                    "dataSrcJpath": "instance",
                                    "elementsToDo": [
                                       {
                                          "elementTgtCss": "summary",
                                          "elementValueSrcJpath": "level3"
                                       }
                                    ]
                                 }
                              ],
                              "collections": [
                                 {
                                    "dataSrcJpath": "sub4s",
                                    "templateId": "",
                                    "templateClassList": "level4 template",
                                    "srcIdPath": "id",
                                    "mtCollectionFunctSel": "lastLeafNode",
                                    "instanceFill": {
                                       "elementFills": [
                                          {
                                             "dataSrcJpath": "instance",
                                             "elementsToDo": [
                                                {
                                                   "elementTgtCss": "summary",
                                                   "elementValueSrcJpath": "level4"
                                                }
                                             ]
                                          }
                                       ],
                                       "collections": [
                                          {
                                             "dataSrcJpath": "sub5s",
                                             "templateId": "",
                                             "templateClassList": "level5 template",
                                             "srcIdPath": "id",
                                             "mtCollectionFunctSel": "lastLeafNode",
                                             "instanceFill": {
                                                "elementFills": [
                                                   {
                                                      "dataSrcJpath": "instance",
                                                      "elementsToDo": [
                                                         {
                                                            "elementTgtCss": "summary",
                                                            "elementValueSrcJpath": "level5"
                                                         }
                                                      ]
                                                   }
                                                ],
                                                "collections": [
                                                   {
                                                      "dataSrcJpath": "sub6s",
                                                      "templateId": "",
                                                      "templateClassList": "level6 template",
                                                      "srcIdPath": "id",
                                                      "mtCollectionFunctSel": "lastLeafNode",
                                                      "instanceFill": {
                                                         "elementFills": [
                                                            {
                                                               "dataSrcJpath": "instance",
                                                               "elementsToDo": [
                                                                  {
                                                                     "elementTgtCss": "summary",
                                                                     "elementValueSrcJpath": "level6"
                                                                  }
                                                               ]
                                                            }
                                                         ]
                                                      }
                                                   }
                                                ]
                                             }
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               }
            ]
         }
      }
   ]
};
