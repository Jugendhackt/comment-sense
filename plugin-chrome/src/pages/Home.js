import React from "react";
import { observer } from "mobx-react-lite";
import {CommentList} from "../components/CommentList";

const Home = observer((props) => {
    
    return (
        <>
            <CommentList />
        </>
    );
});

export { Home };