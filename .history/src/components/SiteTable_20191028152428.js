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
            <DateField source="siteName"/>
            <DateField source="created"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const SiteEdit = props => (
    <Edit title={<SiteTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="lat" />
            <DisabledInput source="lon" />
            <TextInput source="siteId" />
            <TextInput source="siteName" />
            <DisabledInput source="created" />
            
        </SimpleForm>
    </Edit>
);

export const SiteCreate = props => (
    <Create {...props}>
        <SimpleForm>
            
            <DisabledInput source="lat" />
            <DisabledInput source="lon" />
            <TextInput source="siteId" />
            <TextInput source="siteName" />
        </SimpleForm>
    </Create>
);