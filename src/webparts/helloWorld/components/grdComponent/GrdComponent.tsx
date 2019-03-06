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


export default class GrdComponent extends React.Component<IgridProps, IGrdState, any> {


    public constructor(props: IgridProps, state: IGrdState) {

        super(props);
        this.state = {
            ID: 0,
            disabled: false,
            checked: false,
            drpOptions: [],
            Contact_x0020_Name: "",
            CSN_x0020__x0023_: "",
            Ship_x0020_To_x0020_Address: "",
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


    public componentDidMount() {
        this.loadDefaultGrid();
    }

    private async loadDefaultGrid() {

        const _util = new Utility();
        const _data = await _util.loadAsyncGridDocumentLibrary(0);

        //Promise sample (working)
        // _util.loadGridDocumentLibrary(0).then((response) => {
        //     console.log(response);
        // });
    }


    public render(): React.ReactElement<IgridProps> {
        return (
            <div>




            </div>
        );
    }
}
