export class SigninResp {
    id: number;
    username: string;
    email: string;
    telephone: string;
    approved: string;
    roles: string[];
    tokenType: string;
    accessToken: string;
    lastname: string;
    firstname: string;

}

export class ChangedUser {
    id: number;
    username: string;
    email: string;
    telephone: string;
    approved: string;
    lastname: string;
    firstname: string;
    image: [];

}

export class ChangedUserPass {
    password: string;
    id: number;
    username: string;
    email: string;
    telephone: string;
    approved: string;
    lastname: string;
    firstname: string;
    image: [];

}
