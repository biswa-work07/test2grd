import * as React from 'react';
import { IpatentProps } from './IpatentProps';
import { IItem, ICountry, IparentState } from './IparentState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";


export default class ParentComponent extends React.Component<IpatentProps, IparentState, any> {

    public render(): React.ReactElement<IpatentProps> {

        //const { pId } = this.state;
        const { parentAddEditId, context, editCollectionItems } = this.props;

        return (
            <div>
                Hi, I am Parent .
                <br></br>Edited Items id's :
                {editCollectionItems.map((item) => (
                    <div><span className='indent' key={item}>{item["ID"]}</span><br></br></div>
                ))}

                <hr></hr>
            </div>
        );
    }
}
