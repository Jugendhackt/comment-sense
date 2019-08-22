import React, {useState, useEffect} from "react";

function ShowUser(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch(`${props.ipAdress}/users/login/`, {
            method: "POST",
            body: JSON.stringify({
                userName: "",
                password: "",
            })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }, []);

    return (
        <h2>Test</h2>
    )

}

export default ShowUser;