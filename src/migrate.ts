import { ConfigV1, ConfigV2 } from "./types/config";

export const migrateToV2 = (old: ConfigV1) => {
    if (!old.v) {
        old.v = 1;
    }
    return {
        v: 2,
        docks: old.docks.map((id) => ({
            name: id,
            icon: '',
            shortcut: '',
            id: id,
        })),
        ids: [...old.ids],
    } as ConfigV2;
}

export const migrate = (old: any, version: number) => {
    let conf;
    if (!old.v) {
        conf = migrateToV2(old);
    }
    return conf;
}