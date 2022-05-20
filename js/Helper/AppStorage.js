class AppStorage {
    storeToken(token) {
        localStorage.setItem("token", token);
    }

    storeUser(user) {
        localStorage.setItem("user", user);
    }

    storeRole(Role) {
        localStorage.setItem("Role", Role);
    }

    storeID(ID) {
        localStorage.setItem("ID", ID);
    }

    store(token, user, Role, ID) {
        this.storeToken(token);
        this.storeUser(user);
        this.storeRole(Role);
        this.storeID(ID);
        // location.reload();
    }

    clear() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("Role");
        localStorage.removeItem("ID");
    }

    getToken() {
        localStorage.getItem("token");
    }

    getUser() {
        localStorage.getItem("user");
    }
}

export default AppStorage = new AppStorage();
