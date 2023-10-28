## Stacks for Modal File Manager

This is an extension for [Modal File Manager](https://GitHub.com/raguay/ModalFileManager) to create, add files/directories, copy files/directories, and paste files/directories from a hidden directory location to simulate stacks of files/directories. This is currently a minimal set of commands that will be expanded upon as I have time.

Commands added to the command prompt are:

| Command Prompt Name | Program Name | Description |
| --- | --------- | ------- |
| Copy to the Default Stack | CopyToDefaultStack | Copy the selection or current cursor entry to the default stack. |
| Move to the Default Stack | MoveToDefaultStack | Move the selection or current cursor entry to the default stack. |
| Paste from the Default Stack | PasteFromDefaultStack | Pastes the files and directories in the default stack to the current directory. |
| Clear the Default Stack | ClearDefaultStack | Deletes all files and directories in the default stack. |

Commands for extension use are:

| Command Name | Description | Program Name |
| --- | ------ | --- |
| Get Stacks Directory | Get the path to the stacks directory. | GetStackDir | 
| Get Stacks List | Get a list of Stack directories. | GetStackNames |

