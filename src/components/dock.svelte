<script lang="ts">
  import Panel from "./panel.svelte";
  import DockyPlugin from "..";
  import { onMount } from "svelte";
  import { openTab, showMessage } from "siyuan";
  import { Dock, DockIcon } from "siyuan-kit-svelte";
  import { edit } from "@/utils/dock";

  let ids = [];
  let docks = [];

  const addFromClipboard = async () => {
    const id = await navigator.clipboard.readText();
    if (!id) {
      return;
    }
    if (ids.some((i) => i === id)) {
      showMessage(plugin.i18n.alreadyExist + ":" + id);
    }
    ids.unshift(id);
    save();
  };

  onMount(() => {
    ids = [...config.ids];
    docks = [...config.docks];
  });

  const open = (id) => {
    openTab({
      app: plugin.app,
      doc: {
        id,
      },
    });
  };

  const addDock = async (id: string) => {
    if (docks.some((d) => d.id === id)) {
      return;
    }
    const dock = await edit(plugin.i18n, {
      name: "",
      id,
      icon: "iconEmoji",
      shortcut: "",
    });
    if (!dock) {
      return;
    }
    docks.push(dock);
    plugin.addToDock(id);
    await save();
    window.location.reload();
  };

  const editDock = async (id: string) => {
    const dockIndex = docks.findIndex((d) => d.id === id);
    if (dockIndex < 0) {
      return;
    }
    const dock = docks[dockIndex];

    const newDock = await edit(plugin.i18n, dock);
    if (!newDock) {
      return;
    }
    docks.splice(dockIndex, 1, newDock);
    await save();
    window.location.reload();
  };

  const removeDock = async (id) => {
    if (docks.every((d) => d.id !== id)) {
      return;
    }
    docks.splice(
      docks.findIndex((d) => d.id === id),
      1
    );
    await save();
    window.location.reload();
  };

  const save = async () => {
    const newConf = {
      ids: [...ids],
      docks: [...docks],
    };
    await plugin.updateConfig(newConf);
    ids = ids;
    docks = docks;
  };

  const moveUp = (index) => {
    if (index === 0) {
      return;
    }
    const v = ids[index];
    if (!v) {
      return;
    }
    ids.splice(index, 1);
    ids.splice(index - 1, 0, v);
    save();
  };

  const moveDown = (index) => {
    if (index === ids.length - 1) {
      return;
    }
    const v = ids[index];
    if (!v) {
      return;
    }
    ids.splice(index, 1);
    ids.splice(index + 1, 0, v);
    save();
  };

  const deleteBlock = (index) => {
    const id = ids.splice(index, 1);
    if (docks.some((d) => d.id === id[0])) {
      removeDock(id[0]);
    }
    save();
  };

  export let plugin: DockyPlugin;
  export let config: {
    docks: string[];
    ids: string;
  };
</script>

<Dock title={plugin.i18n.title} icon="iconDocky">
  <svelte:fragment slot="actions">
    <DockIcon type="min" label={plugin.i18n.min} icon="iconMin"></DockIcon>
    <DockIcon
      type="text"
      label={plugin.i18n.add}
      icon="iconAdd"
      on:click={() => addFromClipboard()}
    ></DockIcon>
  </svelte:fragment>
  <div slot="content">
    {#if ids.length === 0}
      <div class="docky-hint">{plugin.i18n.addBlock}</div>
    {:else}
      {#each ids as id, index (id)}
        <div class="docky-panel">
          <div class="actions">
            <button
              class="b3-button b3-tooltips b3-tooltips__sw"
              aria-label={plugin.i18n.open}
              on:click={() => open(id)}
              ><svg><use xlink:href="#iconFocus"></use></svg></button
            >
            <button
              class="b3-button b3-tooltips b3-tooltips__sw"
              aria-label={plugin.i18n.moveUp}
              on:click={() => moveUp(index)}
              ><svg><use xlink:href="#iconUp"></use></svg></button
            >
            <button
              class="b3-button b3-tooltips b3-tooltips__sw"
              aria-label={plugin.i18n.moveDown}
              on:click={() => moveDown(index)}
              ><svg><use xlink:href="#iconDown"></use></svg></button
            >
            <button
              class="b3-button b3-tooltips b3-tooltips__sw"
              aria-label={plugin.i18n.remove}
              on:click={() => deleteBlock(index)}
              ><svg><use xlink:href="#iconTrashcan"></use></svg></button
            >
            {#if docks.some((d) => d.id === id)}
              <button
                class="b3-button b3-tooltips b3-tooltips__sw"
                aria-label={plugin.i18n.removeDock}
                on:click={() => removeDock(id)}
                ><svg><use xlink:href="#iconHideDock"></use></svg></button
              >
              <button
                class="b3-button b3-tooltips b3-tooltips__sw"
                aria-label={plugin.i18n.editDock}
                on:click={() => editDock(id)}
                ><svg><use xlink:href="#iconEdit"></use></svg></button
              >
            {:else}
              <button
                class="b3-button b3-tooltips b3-tooltips__sw"
                aria-label={plugin.i18n.addDock}
                on:click={() => addDock(id)}
                ><svg><use xlink:href="#iconDock"></use></svg></button
              >
            {/if}
          </div>
          <Panel blockId={id} {plugin}></Panel>
        </div>
      {/each}
    {/if}
  </div>
</Dock>
