export interface ConfigV1 {
    v: 1 | undefined;
    docks: string[];
    ids: string[];
}

export interface ConfigV2 {
    v: 2;
    docks: { icon: string; name: string; shortcut: string; id: string; }[];
    ids: string[];
}