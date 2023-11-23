<script lang="ts">
    import { Protyle } from "siyuan";
    import { onMount } from "svelte";
    import DockyPlugin from "..";

    let block;

    onMount(() => {
        new Protyle(plugin.app, block, {
            blockId: blockId,
            render: {
                background: false,
                title: false,
                gutter: false,
                scroll: true,
                breadcrumb: false,
                breadcrumbDocName: false,
            }
        });
    })

    export let blockId: string;
    export let plugin: DockyPlugin;
</script>

<div bind:this={block}></div>