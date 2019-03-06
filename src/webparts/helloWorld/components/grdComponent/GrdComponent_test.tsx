import * as React from 'react';
import { IgridProps } from './IgridProps';
import {IItem,ICountry,IGrdState} from './IgridState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";






export default class GrdComponent1 extends React.Component<IgridProps,IGrdState, any> {

    public render(): React.ReactElement<IgridProps> {
        return (
            <div>
                Hi
            </div>
        );
    }
}
