var stacks = {
  extMan: null,
  fs: null,
  hdir: null,
  configdir: null,
  dir: "",
  init: async function(extManager) {
    //
    // This function adds all the commands for working with stacks and 
    // setting up references to variables that are used.
    //
    stacks.extMan = extManager;
    stacks.fs = stacks.extMan.getLocalFS();
    stacks.hdir = await stacks.fs.getHomeDir();
    stacks.configdir = await stacks.extMan.getConfigDir();
    stacks.dir = await stacks.fs.appendPaht(stacks.configdir, "Stacks");
    const addCommand = stacks.extMan.getCommands().addCommand;
    addCommand('Get Stacks Directory', 'stacks.GetStackDir','Get the path to the stacks directory.', stacks.GetStackDir);
  },
  installKeyMaps: function() {
    let newKeyboard = stacks.extMan.getExtCommand('addKeyboardShort').command;
  },
  GetStackDir: function() {
    return(stacks.dir);
  }
};
return (stacks);
