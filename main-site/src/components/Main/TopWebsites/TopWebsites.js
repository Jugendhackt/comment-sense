import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import ipAddress from "../../../ipAddress";

import Website from "./Website";

function TopWebsites(props) {

    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        fetch(`${ipAddress}/sites/top/`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setWebsites(res.sites);
            })
            .catch(e => {
                props.history.push("/error/");
            })
    }, []);

    function showWebsites() {
        return websites.map(item => {
            return <Website lang={props.lang} website={item.url} comments={item.count} url={item.url}/>
        });
    }

    return (
        <>
            <h2>Test</h2>
            {showWebsites()}
        </>
    );
}

export default withRouter(TopWebsites);