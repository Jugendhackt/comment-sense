import Routes from "../../../util/routes/routes";
import {ipAddress} from "../../../util/constants";

//5264273458d4df8ed8d22a8d06e464a8af5d572388544c993af0597f700fcc1a test sid

test("checkSid route", () => {
    expect(Routes.checkSid()).toBe(null);
    expect(Routes.checkSid("test")).toBe(`${ipAddress}/api/checksid?sid=test`);
});

test("changeUser route", () => {
    expect(Routes.changeUser()).toBe(`${ipAddress}/api/user/`);
});

test("getComments route", () => {
    const url = "http://test.com";
    const username = "test";
    expect(Routes.getComments()).toBe(null);
    expect(Routes.getComments(url)).toBe(`${ipAddress}/api/comments?site=${url}`);
    expect(Routes.getComments(url, username)).toBe(`${ipAddress}/api/comments?site=${url}&username=${username}`);
});

test("postComment route", () => {
    expect(Routes.postComment()).toBe(`${ipAddress}/api/comments/`);
});

test("getUser route", () => {
    const sid = "test";
    expect(Routes.getUser()).toBe(null);
    expect(Routes.getUser(sid)).toBe(`${ipAddress}/api/user?sid=${sid}`);
});

test("signOut route", () => {
    const sid = "test";
    expect(Routes.signOut()).toBe(null);
    expect(Routes.signOut(sid)).toBe(`${ipAddress}/api/signout?sid=${sid}`);
});

test("signIn route", () => {
    const username = "test";
    const password = "test";
    expect(Routes.signIn()).toBe(null);
    expect(Routes.signIn(username)).toBe(null);
    expect(Routes.signIn(username, password)).toBe(`${ipAddress}/api/signin?username=${username}&password=${password}`);
});

test("signUp route", () => {
    expect(Routes.signUp()).toBe(`${ipAddress}/api/signup/`);
});

test("topComments route", () => {
    const username= "test";
    const count = 3;
    expect(Routes.topComments()).toBe(null);
    expect(Routes.topComments(username)).toBe(null);
    expect(Routes.topComments(count)).toBe(`${ipAddress}/api/comments?count=${count}`);
    expect(Routes.topComments(count, username)).toBe(`${ipAddress}/api/comments?count=${count}&username=${username}`);
});

test("topWebsites route", () => {
    const count = 3;
    const countStr = "3";
    expect(Routes.topWebsites()).toBe(null);
    expect(Routes.topWebsites(countStr)).toBe(null);
    expect(Routes.topWebsites(count)).toBe(`${ipAddress}/api/sites?count=${count}`);
});

test("voteComment route", () => {
    expect(Routes.voteComment()).toBe(`${ipAddress}/api/comments/`);
});