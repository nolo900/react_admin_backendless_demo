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

export const ServiceCompanyTitle = ({record}) => {
    return <span>ServiceCompany{record ? `: ${record.title}` : ''}</span>;
};

const ServiceCompanyFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const ServiceCompanyList = props => (
    <List filters={<ServiceCompanyFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="title" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ServiceCompanyEdit = props => (
    <Edit title={<ServiceCompanyTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const ServiceCompanyCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);