export class User {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    reposUrl: string;
    publicRepos: number;
    followers: number;

   /* User(userResponse: any) {
        this.login = userResponse.login;
        this.id = userResponse.id;
        this.avatarUrl = userResponse.avatar_url;
        this.htmlUrl = userResponse.html_url;
        this.reposUrl = userResponse.repos_url;
        this.publicRepos = userResponse.public_repos;
        this.followers = userResponse.followers;
    }*/
}
