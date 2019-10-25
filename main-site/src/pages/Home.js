import React from "react";
import { Grid } from "@material-ui/core";
import { TopWebsites } from "../components/TopWebsites/index";
import { TopComments } from "../components/TopComments/index";

function Home() {
    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <TopWebsites />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TopComments />
            </Grid>
        </Grid>
    );
};

export { Home };