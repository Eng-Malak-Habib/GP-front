import Token from "./Token";
import AppStorage from "./AppStorage";

class User {
    responseAfterLogin(res) {
        console.log(res.data);
        const access_token = res.data.access_token;
        const username = res.data.data.name;
        const Role = res.data.data.Role;
        const ID = res.data.data.id;
        // console.log(Token.isValid(access_token));
        if (Token.isValid(access_token)) {
            AppStorage.store(access_token, username, Role, ID);
        }
        // location.reload();
    }

    hasToken() {
        const storeToken = localStorage.getItem("token");
        if (storeToken) {
            return Token.isValid(storeToken) ? true : false;
        }
        false;
    }

    loggedIn() {
        return this.hasToken();
    }
    logOut() {
        AppStorage.clear();
    }

    name() {
        if (this.loggedIn()) {
            return localStorage.getItem("user");
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(localStorage.getItem("token"));
            return payload.sub;
        }
        return false;
    }
}

export default User = new User();
