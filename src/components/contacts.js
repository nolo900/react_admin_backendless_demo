import React from 'react';
import {
    List,
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

export const ContactTitle = ({record}) => {
    return <span>Contact{record ? `: ${record.id}` : ''}</span>;
};

export const ContactList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="first_name"/>
            <TextField source="last_name"/>
            <TextField source="email"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ContactEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export const ContactCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);
