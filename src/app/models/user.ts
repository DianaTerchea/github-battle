export type Language = 'Typescript'| 'JavaScript' | 'C++' | 'Java';

export class User {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    reposUrl: string;
    publicRepos: number;
    followers: number;
}

export class Repo {
    owner: string;
    avatar: string;
    repoUrl: string;
    forks: number;
}
