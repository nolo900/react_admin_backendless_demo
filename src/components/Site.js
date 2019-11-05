import React from 'react';
import {
    List,
    Filter,
    Datagrid,
    TextField,
    TextInput,
    DateField,
    DateInput,
    Query,
    Show,
    ShowButton,
    SimpleShowLayout,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    DisabledInput,
    SimpleForm,
    Edit,
    Create,
    EditButton } from 'react-admin';
import {ServiceLogList} from "./ServiceLog";

export const SiteTitle = ({record}) => {
    return <span>Site{record ? `: ${record.title}` : ''}</span>;
};

const SiteFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="siteName" alwaysOn />
    </Filter>
);

export const SiteList = props => (
    <List filters={<SiteFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="siteName" />
            <TextField source="description"/>
            <TextField source="qrData"/>
            <ShowButton {...props} />
        </Datagrid>
    </List>
);

export const SiteEdit = props => (
    <Edit title={<SiteTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="qrData"/>
            <TextInput source="siteName" />
            <LongTextInput source="description"/>
        </SimpleForm>
    </Edit>
);

export const SiteCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="siteName" />
            <LongTextInput source="description"/>
        </SimpleForm>
    </Create>
);

export const SiteShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="siteName" />
            <SiteServiceList/>
        </SimpleShowLayout>

    </Show>
);


const siteServicePayload = {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'created', order: 'desc' },
    filter: {},
};

export const SiteServiceList = props => (
    <Query type="GET_LIST" resource="ServiceLog" payload={siteServicePayload}>
        {({ data, total, loading, error }) => {
            if (loading) { return <p>LOADING...</p>; }
            if (error) { console.log(error); return <p>ERROR</p>; }
            console.log('props =>',props);
            return (
                <div>
                    <h5>Site Service History</h5>
                    <pre>DATA BELOW IS NOT SCOPED TO THIS SITE, QUERY NEEDS TO BE MODIFIED</pre>
                    <ul>
                        {data.map(logItem => <li key={logItem.id}>{logItem.timeIn} | {logItem.timeOut} => {logItem.comments}</li>)}
                    </ul>
                </div>
            );
        }}
    </Query>
);
