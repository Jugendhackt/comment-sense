import React, { useEffect, useContext } from "react";
import { List, makeStyles, CircularProgress, Box } from "@material-ui/core";
import uuid from "uuid";
import { ipAddress } from "../../constants";
import { Website } from "./Website";
import {WebsiteStoreContext} from "../../stores/WebsiteStore";
import {observer} from "mobx-react-lite";

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

const TopWebsites = observer((props) => {
    const websiteStore = useContext(WebsiteStoreContext);

    const classes = useStyles();

    useEffect(() => {
        fetch(`${ipAddress}/api/sites/`)
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(res => {
                websiteStore.websites = res.sites;
            })
    }, []);

    function showWebsites() {
        if (Array.isArray(websiteStore.websites) && websiteStore.websites.length) {
            return Array.from(websiteStore.websites).map(item => {
                return <Website url={item.url} comments={item.comments} key={uuid.v4()} />
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
});

export { TopWebsites };