import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ipAddress } from "../../constants";


const CommentList = observer((props) => {
    useEffect(() => {
        fetch(`${ipAddress}/api/comments`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
            });
    }, []);

    return (
        <>
        </>
    );
});

export { CommentList };