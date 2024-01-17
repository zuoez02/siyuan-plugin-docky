<script lang="ts">
  import SettingItem from "../libs/setting-item.svelte";
  import { createEventDispatcher } from "svelte";
  import Icons from "./icons.svelte";

  const dispatch = createEventDispatcher();

  const confirm = () => {
    dispatch("confirm", setting);
  };

  const cancel = () => {
    dispatch("cancel", setting);
  };

  export let i18n: any;

  export let setting: {
    name: string;
    id: string;
    icon: string;
    shortcut: string;
  };
</script>

<div class="dialog__content">
  <div class="config__tab-container">
    <SettingItem
      type="input"
      title={i18n.dock.name}
      text={i18n.dock.nameDesc}
      settingKey="name"
      settingValue={setting.name}
      placeholder=""
      on:changed={(event) => (setting.name = event.detail.value)}
    />
    <SettingItem
      type="input"
      title={i18n.dock.icon}
      text={i18n.dock.iconDesc}
      settingKey="icon"
      settingValue={setting.icon}
      placeholder=""
      on:changed={(event) => (setting.icon = event.detail.value)}
    />
    <SettingItem
      type="input"
      title={i18n.dock.shortcut}
      text={i18n.dock.shortcutDesc}
      settingKey="shortcut"
      settingValue={setting.shortcut}
      placeholder=""
      on:changed={(event) => (setting.shortcut = event.detail.value)}
    />
    <div>
      <Icons on:copy={(detail) => (setting.icon = detail.detail)}></Icons>
    </div>
  </div>
</div>
<div class="b3-dialog__action">
  <button class="b3-button b3-button--cancel" on:click={() => cancel()}
    >取消</button
  >
  <div class="fn__space"></div>
  <button class="b3-button b3-button--text" on:click={() => confirm()}
    >保存</button
  >
</div>
