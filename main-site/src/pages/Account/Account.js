import React from "react";
import {observer} from "mobx-react-lite";
import {ChangeUserData} from "./ChangeUserData";

export const Account = observer(() => {
    
    return (
        <ChangeUserData/>
    );
});

export default Account;