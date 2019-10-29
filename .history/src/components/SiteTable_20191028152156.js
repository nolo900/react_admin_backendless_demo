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

export const SiteTitle = ({record}) => {
    return <span>Site{record ? `: ${record.title}` : ''}</span>;
};

const SiteFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="siteId" alwaysOn />
    </Filter>
);

export const SiteList = props => (
    <List filters={<SiteFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="lat"/>
            <TextField source="lon" />
            <DateField source="siteId"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const SiteEdit = props => (
    <Edit title={<SiteTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const SiteCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);