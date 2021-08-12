import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationRounded({ count, page, onChange }) {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Pagination count={count} page={page} onChange={onChange} color="primary" shape="rounded" />
        </div>
    );
}