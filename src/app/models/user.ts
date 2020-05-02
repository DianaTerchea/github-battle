export class User {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    reposUrl: string;
    publicRepos: number;
    followers: number;

    User(login, id, avatar_url, html_url, repos_url, public_repos, followers){
        this.login = login;
        this.avatarUrl = avatar_url;
        this.htmlUrl = html_url;
        this.reposUrl = repos_url;
        this.publicRepos = public_repos;
        this.followers = followers;
    }
}
