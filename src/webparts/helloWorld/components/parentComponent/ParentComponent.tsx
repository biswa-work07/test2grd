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
                <b> Hi, I am Parent .</b>
                {
                    editCollectionItems.length > 0 ? (
                        editCollectionItems.map((item) => <div>Edit Mode :
                           <span className='indent' key={item}>{item["ID"]},</span>
                        </div>)
                    ) : (
                            <div>Add mode</div>
                        )
                }

                <hr></hr>
            </div>
        );
    }
}
