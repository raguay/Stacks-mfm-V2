const stacks = {
  extMan: null,
  fs: null,
  hdir: null,
  configdir: null,
  dir: "",
  defaultStack: "",
  init: async function(extManager) {
    //
    // This function adds all the commands for working with stacks and 
    // setting up references to variables that are used.
    //
    stacks.extMan = extManager;
    stacks.fs = stacks.extMan.getLocalFS();
    stacks.hdir = await stacks.fs.getHomeDir();
    stacks.configdir = await stacks.extMan.getConfigDir();
    stacks.dir = await stacks.fs.appendPath(stacks.configdir, "Stacks");
    let dirExist = await stacks.fs.dirExists(stacks.dir);
    if(!dirExist) {
      // 
      // the directory doesn't exist. Create it and the default stack.
      //
      await stacks.fs.createDir(stacks.dir);
      stacks.defaultStack = await stacks.fs.appendPath(stacks.dir, "Default");
      await stacks.fs.createDir(stacks.defaultStack);
    } else {
      // 
      // The stacks directory exists, so create the path to the default one.
      //
      stacks.defaultStack = await stacks.fs.appendPath(stacks.dir, "Default");
    }
    const addCommand = stacks.extMan.getCommands().addCommand;
    const addExtCommand = stacks.extMan.addExtCommand;
    addExtCommand('Get Stacks Directory', 'Get the path to the stacks directory.', stacks.GetStackDir);
    addExtCommand('Get Stacks List', 'Get a list of Stack directories.', stacks.GetStackNames)
    addCommand('Copy to the Default Stack', 'stacks.CopyToDefaultStack', 'Copy the selection to the default stack.', stacks.CopyToDefaultStack);
    addCommand('Move to the Default Stack', 'stacks.MoveToDefaultStack', 'Move the selection to the default stack.', stacks.MoveToDefaultStack);
    addCommand('Paste from the Default Stack', 'stacks.PasteFromDefaultStack', 'Pastes the file in the default stack to the current directory.', stacks.PasteFromDefaultStack);
    addCommand('Clear the Default Stack', 'stacks.ClearDefaultStack', 'Deletes all of file and directories in the default stack.', stacks.ClearDefaultStack);
  },
  installKeyMaps: function() {
  },
  GetStackDir: function() {
    return(stacks.dir);
  },
  GetStackNames: async function() {
    // 
    // This function reads the stacks directory for subfolders and returns a list of them.
    //
    return(await stacks.fs.getDirList(stacks.dir).map(item => item.name));
  },
  CopyToDefaultStack: async function() {
    // 
    // This function copies the current selection(s) to the default stack.
    //
    const copyEntries = stacks.extMan.getExtCommand("copyEntriesCommand").command;
    const getSelection = stacks.extMan.getExtCommand("getSelectedFiles").command;
    const files = await getSelection();
    await copyEntries(files,stacks.defaultStack,true);
  },
  MoveToDefaultStack: async function() {
    //
    // This function moves the current selection to the default stack.
    //
    const moveEntries = stacks.extMan.getExtCommand("moveEntriesCommand").command;
    const getSelection = stacks.extMan.getExtCommand("getSelectedFiles").command;
    const files = await getSelection();
    await moveEntries(files,stacks.defaultStack,true);
  },
  PasteFromDefaultStack: async function() {
    // 
    // This function pastes all the files and directories in the default stack to the
    // current directory.
    //
    const copyEntries = stacks.extMan.getExtCommand("copyEntriesCommand").command;
    const getCurrentFile = stacks.extMan.getExtCommand("getCurrentFile").command;
    const files = await stacks.fs.getDirList(stacks.defaultStack);
    const currentDirectory = getCurrentFile().dir;
    copyEntries(files, currentDirectory, true);
  },
  ClearDefaultStack: async function() {
    // 
    // This function clears all entries in the default stack.
    //
    const deleteEntries = stacks.extMan.getExtCommand("deleteEntriesCommand").command;
    const files = await stacks.fs.getDirList(stacks.defaultStack);
    await deleteEntries(files);
  }
};
return (stacks);

