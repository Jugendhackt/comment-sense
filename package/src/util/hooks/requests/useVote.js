import {Routes} from "../../routes";

const useVote = async (sid, id, username, vote) => {
    const body = JSON.stringify({
        sid: sid,
        id: id,
        username: username,
        vote: vote
    });
    const response = await fetch(Routes.voteComment(),{method: "PATCH", body: body});
    return response.status === 200;
};

export default useVote;