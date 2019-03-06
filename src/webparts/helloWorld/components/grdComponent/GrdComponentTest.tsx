import * as React from 'react';
import { IgridProps } from './IgridProps';
import { IItemGrd, IGrdState } from './IgridState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";

///////////////////////////////////////////////////////////
//https://sharepoint.github.io/sp-dev-fx-controls-react/ 
//////////////////////////////////////////////////////////

//1. npm install @pnp/spfx-controls-react --save --save-exact
//2. Configure
// Once the package is installed, you will have to configure the resource file of 
// the property controls to be used in your project. You can do this by opening the config/config.json 
// and adding the following line to the localizedResources property:
// "ControlStrings": "node_modules/@pnp/spfx-controls-react/lib/loc/{locale}.js"

import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import Utility from './../../lib/Utility';
export default class GrdComponentTest extends React.Component<IgridProps, IGrdState, any> {

    constructor(props: IgridProps) {
        super(props);

        this.state = {
            disabled: false,
            checked: false,
            selectedItem: null,
            hideDialog: true,
            showModal: false,
            drpOptions: [],
            ID:0,
            Contact_x0020_Name:"",
            CSN_x0020__x0023_:"",
            Ship_x0020_To_x0020_Address:"",
            items: [
                {
                    Id: 0,
                    Company: "",
                    Contact: "",
                    Country: null,
                    fileContent: null
                } as IItemGrd
            ] as IItemGrd[],
            editItem: { Company: '', Contact: '', Country: { Id: 0, CountryName: '' }, Id: 0, fileContent: null, isEditable: false }
        } as IGrdState;
    }


    private _getSelection(items: any[]) {
        console.log('Selected items:', items);
    }


    public componentDidMount() {
        this.loadDefaultGrid();
    }

    private async loadDefaultGrid() {

        const _util = new Utility();
        const _data = await _util.loadAsyncGridDocumentLibrary(0);
        this.setState({
            items: _data.map((i) => ({
                ID: i.Id,
                Contact_x0020_Name: i.Contact_x0020_Name,
                CSN_x0020__x0023_: i.CSN_x0020__x0023_,    
                Ship_x0020_To_x0020_Address:i.Ship_x0020_To_x0020_Address         ,
                fileContent: null,
                isEditable: false
              }))
          });
    }



    public render(): React.ReactElement<IgridProps> {

        const { disabled, checked, drpOptions, editItem ,items} = this.state;

        const viewFields: IViewField[] = [
            {
              name: 'Title',
              displayName: 'Last Name',
              sorting: true,
              maxWidth: 80
            },
            {
              name: 'FirstName',
              displayName: 'First Name',
              sorting: true,
              maxWidth: 80
            },
            {
              name: 'Company',
              displayName: "Company",
              sorting: true,
              maxWidth: 80
            },
            {
              name: 'WorkPhone',
              displayName: "Business Phone",
              sorting: true,
              maxWidth: 80
            },
            {
              name: 'HomePhone',
              displayName: "Home Phone",
              sorting: true,
              maxWidth: 80
            }
          ];
          
          const groupByFields: IGrouping[] = [
            {
              name: "Company",
              order: GroupOrder.ascending
            }
          ];


        return (
            <div>
                Hi
                <ListView
                    items={items}
                    viewFields={viewFields}
                    iconFieldName="ServerRelativeUrl"
                    compact={true}
                    selectionMode={SelectionMode.multiple}
                    selection={this._getSelection}
                    showFilter={true}
                    defaultFilter="John"
                    filterPlaceHolder="Search..."
                    groupByFields={groupByFields} />
            </div>
        );
    }
}
