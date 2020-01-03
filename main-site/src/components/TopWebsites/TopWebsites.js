import React, {useEffect} from "react";
import {Box, CircularProgress, List, makeStyles} from "@material-ui/core";
import uuid from "uuid";
import {ipAddress, useStores, topWebsitesRoute} from "package";
import {Website} from "../Website";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles(() => ({
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

export const TopWebsites = observer((props) => {
    const {websiteStore} = useStores();

    const classes = useStyles();

    useEffect(() => {
        fetch(topWebsitesRoute(5))
            .then(res => {
                if (res.status === 200){
                    return res.json();
                }
            })
            .then(res => {
                websiteStore.handleWebsites(res.sites);
            })
    }, []);

    const showWebsites = () => {
        if (Array.isArray(websiteStore.websites) && websiteStore.websites.length) {
            return Array.from(websiteStore.websites).map(item => {
                return <Website url={item.url} comments={item.comments} key={uuid.v4()}/>
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

export default TopWebsites;