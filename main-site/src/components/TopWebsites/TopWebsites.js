import React, {useEffect} from "react";
import {Box, CircularProgress, List, makeStyles} from "@material-ui/core";
import uuid from "uuid";
import {useLoading, useStores} from "package/util/hooks";
import {Routes} from "package/util/routes";
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

const TopWebsites = observer(() => {
    const {websiteStore, loadingStore} = useStores();
    const loading = loadingStore.loading;
    const classes = useStyles();

    useEffect(() => {
        useLoading(loading, () => {
            fetch(Routes.topWebsites(5))
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(res => {
                    const {sites} = res;
                    websiteStore.websites = sites;
                })
        });
    }, []);

    const showWebsites = () => {
        if (!loadingStore.loading) {
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