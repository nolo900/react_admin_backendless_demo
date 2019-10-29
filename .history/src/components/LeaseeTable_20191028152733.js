import React from 'react';
import {
    List,
    Filter,
    Datagrid,
    TextField,
    TextInput,
    DateField,
    DateInput,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    DisabledInput,
    SimpleForm,
    Edit,
    Create,
    EditButton } from 'react-admin';

export const LeaseeTitle = ({record}) => {
    return <span>Leasee{record ? `: ${record.title}` : ''}</span>;
};

const LeaseeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const LeaseeList = props => (
    <List filters={<LeaseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="admin"/>
            <TextField source="title" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const LeaseeEdit = props => (
    <Edit title={<LeaseeTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="admin" />
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const LeaseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="admin" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);