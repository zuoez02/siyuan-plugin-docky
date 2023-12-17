<!--
 Copyright (c) 2023 by frostime. All Rights Reserved.
 Author       : frostime
 Date         : 2023-12-17 10:06:19
 FilePath     : /src/components/panel.svelte
 LastEditTime : 2023-12-17 10:38:21
 Description  : 
-->
<script lang="ts">
    import { Protyle } from "siyuan";
    import { onMount } from "svelte";
    import DockyPlugin from "..";

    let block;

    onMount(() => {
        new Protyle(plugin.app, block, {
            action: ['cb-get-all'],
            blockId: blockId,
            render: {
                background: false,
                title: false,
                gutter: true,
                scroll: false,
                breadcrumb: false,
                breadcrumbDocName: false,
            }
        });
    })

    export let blockId: string;
    export let plugin: DockyPlugin;
</script>

<div class="docky-panel-body" bind:this={block}></div>
