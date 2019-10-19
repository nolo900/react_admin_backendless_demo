import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import LaunchIcon from '@material-ui/icons/Launch';

const styles = {
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
};

const CustomUrlField = ({ record = {}, source, classes }) =>
    <a href={record[source]} className={classes.link}>
        {record[source]}
        <LaunchIcon className={classes.icon}/>
    </a>;

export default withStyles(styles)(CustomUrlField);
