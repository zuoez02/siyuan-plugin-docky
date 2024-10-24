# Sidebar Tools

Tools for adding your blocks to the sidebar.

## Usage

1. Install the plugin and enable it.
2. A Dock for sidebar tools appears in the upper right corner.
3. Copy the id of the block you want to pin, and click the "+" in the upper right corner of the sidebar tool.
4. You can adjust the order, delete, and bind to the dock bar here.

## TODO

- [x] Customize dock icon.
- [x] Customize dock name.

## Changelog
- v0.4.5: Fix the display problem of action buttons when the block does not exist.
- v0.4.4: Adapt to v2.12.4.
- v0.4.3: Add opening the corresponding document in the button.
- v0.4.1: Support editing existing docks. If shortcut key editing doesn't work, try operating the tab in Siyuan and then refresh. This is a problem of Siyuan. It should be fine after the next version v2.12.4.
- v0.4.0: When adding a Dock, you can interactively configure the name, icon, and shortcut key. Click the icon button below to apply it to the input box.
- v0.3.0: (Experimental function) Support modifying icons and names through configuration files: Find `data/storage/petal/siyuan-plugin-docky/config.json` under the workspace, and modify the icon corresponding to the id to Siyuan's built-in icon library (not Emoji) and name. The shortcut is a shortcut key configuration in Siyuan format. Currently, it is not fully mastered. You can refer to community discussions to obtain the configuration method.
- v0.2.0: Add zoom function.
- v0.1.0: Correct Panel configuration.
- v0.1.0: First version.

## Contribution

- frostime: Sidebar zoom function; I18n.