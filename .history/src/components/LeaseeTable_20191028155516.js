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
    ReferenceManyField,
    SingleFieldList,
    ChipField,
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
        <TextInput label="Search" source="companyName" alwaysOn />
    </Filter>
);

export const LeaseeList = props => (
    <List filters={<LeaseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="admin" reference='Leasee'>
                <TextField source="email"/>
            </ReferenceField>
            <ReferenceManyField label="admin" reference="Leasee" target="admin">
                <SingleFieldList>
                    <ChipField source="user" />
                </SingleFieldList>
            </ReferenceManyField>

            <TextField source="companyName" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const LeaseeEdit = props => (
    <Edit title={<LeaseeTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const LeaseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);