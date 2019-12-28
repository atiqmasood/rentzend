import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card as MuiCard, CardContent, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    }
});

export default function Card({ header, children }) {
    const classes = useStyles();

    return (
        <MuiCard className={classes.card}>
            <CardContent>
                <CardHeader
                    title={ header && header }
                />
                { children && children }
            </CardContent>
        </MuiCard>
    );
}