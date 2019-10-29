import React from 'react';
import {
    List,
    Authenticated,
    Filter,
    Datagrid,
    TextField,
    TextInput,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    DisabledInput,
    SimpleForm,
    Edit,
    Create,
    EditButton } from 'react-admin';

export const UserTitle = ({record}) => {
    return <span>User{record ? `: ${record.id}` : ''}</span>;
};

export const UserList = ({permissions, ...props}) => (
    
    <List {...props}>
    {/* {permissions === 'admin' && */}
        <Datagrid rowClick="edit">
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <TextField source="email"/>
            <TextField source="phone"/>
            <EditButton/>
        </Datagrid>
        {/* } */}
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);