import * as React from 'react';
import { IpatentProps } from './IpatentProps';
import {IItem,ICountry,IparentState} from './IparentState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";


export default class ParentComponent extends React.Component<IpatentProps,IparentState, any> {

    public render(): React.ReactElement<IpatentProps> {
        return (
            <div>
                Hi, I am Parent .
            </div>
        );
    }
}
