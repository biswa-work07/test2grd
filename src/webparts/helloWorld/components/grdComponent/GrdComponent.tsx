import * as React from 'react';
import { IgridProps } from './IgridProps';
import { IItemGrd, IGrdState } from './IgridState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";
import { Button } from 'office-ui-fabric-react/lib/Button';
import { ConsoleListener, Web, Logger, LogLevel, ODataRaw } from "sp-pnp-js";
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import {
  SPHttpClient,
  SPHttpClientResponse,
  SPHttpClientConfiguration
} from "@microsoft/sp-http";
import Utility from './../../lib/Utility';

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



///////////////////////////////////////////////////////////
//context menu
///////////////////////////////////////////////////////////
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import ContextualMenuListView from './ContextualMenuListView';
import { IECBProps, IECBState } from './IECBProps';
///////////////////////////////////////////////////////////
//context menu
///////////////////////////////////////////////////////////



export default class GrdComponent extends React.Component<IgridProps, IGrdState, any> {


  constructor(props: IgridProps) {
    super(props);

    this.state = {
      disabled: false,
      checked: false,
      selectedItem: null,
      hideDialog: true,
      showModal: false,
      drpOptions: [],
      ID: 0,
      Contact_x0020_Name: "",
      CSN_x0020__x0023_: "",
      Ship_x0020_To_x0020_Address: "",
      editLink: "",
      filrUrl: "",
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

    //const _restData = await _util.loadRestGridDocumentLibrary(0, this.props.context); //working code for rest

    //Working code for get by id
    // for (let i = 0; i < _data.length; i++) {
    //   let _fileData = await _util.getAsyncDocuments(_data[i].Id);
    //   console.log(_fileData['File'].Name);
    // }

    //console.log(this.props.context.pageContext.web.absoluteUrl);

    const urlData = _util.getOnlyRootUrl(this.props.context.pageContext.web.absoluteUrl, '/', 3);


    this.setState({
      items: _data.map((filedta) => ({
        ID: filedta.Id,
        Contact_x0020_Name: filedta.Contact_x0020_Name,
        CSN_x0020__x0023_: filedta.CSN_x0020__x0023_,
        Ship_x0020_To_x0020_Address: filedta.Ship_x0020_To_x0020_Address,
        ServerRelativeUrl: urlData + filedta.File.ServerRelativeUrl,
        fileContent: null,
        isEditable: false,
        editLink: null
      }))
    });

    //console.log(this.state);

  }

  // private fetchDatafromSharePointList() {
  //   let siteUrl = this.props.context.pageContext.web.absoluteUrl;
  //   this.props.context.spHttpClient
  //     .get(
  //       `${
  //         this.props.context.pageContext.web.absoluteUrl
  //       }/_api/lists/GetByTitle('CANISTER ORDER FORM PNP')/items`,
  //       SPHttpClient.configurations.v1
  //     )
  //     .then((response: SPHttpClientResponse) => {
  //       response.json().then((responseJSON: any) => {
  //         console.log("print - " + responseJSON.value[0]);
  //       });
  //     });
  // }

  public render(): React.ReactElement<IgridProps> {

    const { disabled, checked, drpOptions, editItem, items } = this.state;

    const viewFields: IViewField[] = [
      {
        name: 'Contact_x0020_Name',
        displayName: 'Contact Name',
        sorting: true,
        maxWidth: 280
      },
      {
        name: "",
        sorting: false,
        maxWidth: 40,
        render: (rowitem: IgridProps) => {
          const element: React.ReactElement<IECBProps> = React.createElement(
            ContextualMenuListView
          );
          return element;
        }
      },
      {
        name: 'CSN_x0020__x0023_',
        displayName: 'CSN #',
        sorting: true,
        maxWidth: 80
      },
      {
        name: 'Ship_x0020_To_x0020_Address',
        displayName: "Ship Address",
        sorting: true,
        maxWidth: 180
      }
    ];

    const groupByFields: IGrouping[] = [
      {
        name: "CSN_x0020__x0023_",
        order: GroupOrder.descending
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
          defaultFilter=""
          filterPlaceHolder="Search..."
          groupByFields={groupByFields} />
      </div>
    );
  }
}
