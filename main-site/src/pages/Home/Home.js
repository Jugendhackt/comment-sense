import React from "react";
import {Grid} from "@material-ui/core";
import {TopWebsites} from "package/components/TopWebsites";
import {TopComments} from "package/components/TopComments";

const Home = () =>  {
    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <TopWebsites/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TopComments/>
            </Grid>
        </Grid>
    );
};

export default Home;