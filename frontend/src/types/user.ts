class User {
    _id?: string | undefined;
    username?: string | undefined;
    email: string | undefined;
    password: string | undefined;
    constructor() {
        this._id = undefined;
        this.email = undefined;
        this.username = undefined;
        this.password = undefined;
    }
}

export default User;
