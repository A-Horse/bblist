

export interface TaskTrack {
    id: string;
    name: string;
}

export interface TaskTrackNormalized extends TaskTrack {
    cards: string[];
}