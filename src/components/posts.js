// import React from 'react';
// import {
//     List,
//     Filter,
//     Datagrid,
//     TextField,
//     TextInput,
//     LongTextInput,
//     SelectInput,
//     ReferenceInput,
//     ReferenceField,
//     DisabledInput,
//     SimpleForm,
//     Edit,
//     Create,
//     EditButton } from 'react-admin';
//
// export const PostTitle = ({record}) => {
//     return <span>Post{record ? `: ${record.title}` : ''}</span>;
// };
//
// const PostFilter = (props) => (
//     <Filter {...props}>
//         <TextInput label="Search" source="q" alwaysOn />
//         <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
//             <SelectInput optionText="name" />
//         </ReferenceInput>
//     </Filter>
// );
//
// export const PostList = props => (
//   <List filters={<PostFilter/>} {...props}>
//       <Datagrid rowClick="edit">
//           <TextField source="id"/>
//           <ReferenceField source="userId" reference="users">
//               <TextField source="name" />
//           </ReferenceField>
//           <TextField source="title" />
//           <EditButton/>
//       </Datagrid>
//   </List>
// );
//
// export const PostEdit = props => (
//     <Edit title={<PostTitle/>} {...props}>
//         <SimpleForm>
//             <DisabledInput source="id" />
//             <ReferenceInput source="userId" reference="users">
//                 <SelectInput optionText="name" />
//             </ReferenceInput>
//             <TextInput source="title" />
//             <LongTextInput source="body" />
//         </SimpleForm>
//     </Edit>
// );
//
// export const PostCreate = props => (
//     <Create {...props}>
//         <SimpleForm>
//             <ReferenceInput source="userId" reference="users">
//                 <SelectInput optionText="name" />
//             </ReferenceInput>
//             <TextInput source="title" />
//             <LongTextInput source="body" />
//         </SimpleForm>
//     </Create>
// );
