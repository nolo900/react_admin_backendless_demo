import React from 'react';
import {
    List,
    Datagrid,
    DateField,
    TextField,
    TextInput,
    ReferenceField,
    Filter,
} from 'react-admin';

const ServiceLogFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="site.siteName" alwaysOn />
        <TextInput label="Site" source="site.siteName" />
    </Filter>
);

export const ServiceLogList = props => (
    <List {...props} filters={<ServiceLogFilter/>} >
        <Datagrid rowClick="edit">
            <ReferenceField label="Site" source="site.objectId" reference="site">
                <TextField source="id" />
            </ReferenceField>
            {/*<TextField source="site.siteName" />*/}
            {/*<TextField source="user.firstName" />*/}
            {/*<TextField source="user.lastName" />*/}
            <DateField source="timeIn" />
            <DateField source="timeOut" />
            <TextField source="comments" />
        </Datagrid>
    </List>
)
