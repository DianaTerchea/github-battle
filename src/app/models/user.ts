export type Language = 'Typescript'| 'JavaScript' | 'C++' | 'Java';

export class User {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    reposUrl: string;
    publicRepos: number;
    followers: number;
    constructor() {}

    setUserNameAndId(login: string, id: number){
        this.login = login;
        this.id = id;
    }

    setAvatarRepoAddressAndLink(avatar: string, address: string, link: string){
        this.avatarUrl = avatar;
        this.htmlUrl = address;
        this.reposUrl = link;
    }

    setRepoAndFollowers(repo: number, follow: number) {
        this.publicRepos = repo;
        this.followers = follow;
    }
}

export class Repo {
    owner: string;
    avatar: string;
    repoUrl: string;
    forks: number;

    constructor(owner: string) {
        this.owner = owner;
    }
    setForks(forks: number) {
        this.forks = forks;
    }

    setAvatarAndRepos(avatar: string, repoUrl: string) {
        this.avatar = avatar;
        this.repoUrl = repoUrl;
    }
}

export class Stats {
    repoName: string;
    addition: number[] = [];
    deletion: number[] = [];
    commits: number[] = [];

    constructor(repo: string) {
        this.repoName = repo;
    }
}