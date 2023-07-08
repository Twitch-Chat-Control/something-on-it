export interface ILink {
    type: 'mave';
    value: string
}

export interface ITiming {
    time: string;
    description: string
}

export interface IEpisode {
    title: string;
    season: number;
    episode: number;
    recording_sourse: string;
    links: ILink[];
    timings: ITiming[];
}