import { Plugin } from 'siyuan';
import Dock from '@/components/dock.svelte';
import { migrate } from './migrate';
import "./index.scss";
import Panel from './components/panel.svelte';
import { SettingUtils } from './libs/setting-utils';
import fetch from 'sync-fetch';

const updateZoom = (settings: any) => {
    let zoom: string;
    if (settings.enableZoom === false) {
        zoom = "unset";
    } else {
        zoom = settings.zoomFactor.toString();
    }
    //设置 全局 css 变量
    document.documentElement.style.setProperty('--plugin-docky-zoom', zoom);
}


export default class DockyPlugin extends Plugin {
    config: {
        v: 2;
        docks: string[];
        ids: string[];
    } = {
            v: 2,
            docks: [],
            ids: []
        }
    settingUtils: SettingUtils;
    declare data: {
        settings: {
            enableZoom: boolean;
            zoomFactor: number;
        }
    }

    onload() {
        this.addIcons(`<symbol id="iconDocky" viewbox="0 0 1024 1024">
        <path d="M928 160v704h-832V320H704V160z" fill="#212121" opacity=".1" p-id="7191"></path><path d="M608 224h-576v-192h576z" fill="#005DBA" opacity=".1" p-id="7192"></path><path d="M0 256V0h640v256z m64-64h512V64H64z" fill="#005DBA" p-id="7193"></path><path d="M960 160v704l-32 32h-832l-32-32V320h64v512h768V192h-192V128h224z" fill="#212121" p-id="7194"></path>
        </symbol>`)

        this.settingUtils = new SettingUtils(
            this,
            'settings',
            async (settings: { enableZoom: boolean; zoomFactor: number }) => {
                this.data.settings = settings;
                updateZoom(settings);
                this.settingUtils.save();
            },
            '500px',
            '300px'
        );
        this.settingUtils.addItem({
            key: 'enableZoom',
            value: false,
            type: 'checkbox',
            title: this.i18n.setting.enableZoom.title,
            description: this.i18n.setting.enableZoom.description,
        });
        this.settingUtils.addItem({
            key: 'zoomFactor',
            value: 1,
            type: 'slider',
            title: this.i18n.setting.zoomFactor.title,
            description: this.i18n.setting.zoomFactor.description,
            slider: {
                min: 0.5,
                max: 1,
                step: 0.025,
            }
        });
        this.settingUtils.load();

        this.loadConfig();
        this.showDockyDock();
    }

    onLayoutReady(): void {
        this.settingUtils.load().then(() => {
            updateZoom(this.data.settings);
        })
    }

    loadConfig() {
        const res = fetch('/api/file/getFile', {
            method: 'POST',
            body: JSON.stringify({ "path": "/data/storage/petal/siyuan-plugin-docky/config.json" }),
        })
        const data = res.json();
        if (data.code === 404) {
            this.saveConfig();
        } else {
            const conf = migrate(data, this.config.v);
            if (conf) {
                this.config = conf;
                this.saveConfig();
            } else {
                this.config = data;
            }
        }
        this.config.docks.forEach((d) => this.addToDock(d));
    }

    async saveConfig() {
        await this.saveData('config.json', this.config);
    }

    showDockyDock() {
        this.addDock({
            type: 'docky',
            config: {
                position: 'RightTop',
                size: {
                    width: 200,
                    height: 200,
                },
                icon: 'iconDocky',
                title: this.i18n.title,
            },
            data: {
                config: this.config,
                plugin: this,
            },
            init() {
                new Dock({
                    target: this.element,
                    props: {
                        config: this.data.config,
                        plugin: this.data.plugin,
                    }
                })
            },
        })
    }

    async updateConfig(config) {
        this.config.docks = [...config.docks];
        this.config.ids = [...config.ids];
        await this.saveConfig();
    }

    addToDock(dock) {
        this.addDock({
            type: 'docky' + dock.id,
            config: {
                position: 'RightTop',
                size: {
                    width: 200,
                    height: 200,
                },
                icon: dock.icon || 'iconEmoji',
                title: dock.name || 'Docky:' + dock.id,
                hotkey: dock.shortcut || undefined,
            },
            data: {
                blockId: dock.id,
                plugin: this,
            },
            init() {
                new Panel({
                    target: this.element,
                    props: {
                        blockId: this.data.blockId,
                        plugin: this.data.plugin,
                    }
                })
            }
        })
    }
}