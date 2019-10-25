import React, { useEffect, useState } from "react";
import { List, makeStyles, CircularProgress, Box } from "@material-ui/core";
import { ipAddress } from "../../constants";

import { Website } from "./Website";

const useStyles = makeStyles(theme => ({
    progress: {
        margin: "5%"
    },
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

function TopWebsites(props) {
    const [websites, setWebsites] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        fetch(`${ipAddress}/sites/top/`)
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                setWebsites(res.sites);
            })
    }, []);

    function showWebsites() {
        if (Array.isArray(websites) && websites.length) {
            return Array.from(websites).map(item => {
                return <Website url={item.url} count={item.count} />
            });
        } else {
            return (
                <Box className={classes.box}>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                    <CircularProgress size={100} className={classes.progress}/>
                </Box>
            );
        }
    };

    return (
        <List>
            {showWebsites()}
        </List>
    );
};

export { TopWebsites };