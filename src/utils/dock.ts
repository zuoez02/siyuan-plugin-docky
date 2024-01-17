import { Dialog } from "siyuan"
import Setting from '../components/setting.svelte';

export const edit = async (i18n: any, setting) => {
    return new Promise((resolve) => {
        const dialog = new Dialog({
            title: i18n.dock.title,
            content: '<div class="content"></div>',
            width: '700px',
            destroyCallback(result) {
                resolve(result);
            },
        });
        const d = new Setting({
            target: dialog.element.querySelector('.content'),
            props: {
                i18n,
                setting
            }
        });

        d.$on('cancel', () => dialog.destroy(null));
        d.$on('confirm', ({ detail }) => {
            dialog.destroy(detail);
        });
    })

}