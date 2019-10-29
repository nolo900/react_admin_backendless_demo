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

export const ServiceTitle = ({record}) => {
    return <span>Service{record ? `: ${record.title}` : ''}</span>;
};

const ServiceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const ServiceList = props => (
    <List filters={<ServiceFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="title" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ServiceEdit = props => (
    <Edit title={<ServiceTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const ServiceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);