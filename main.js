var stacks = {
  extMan: null,
  fs: null,
  hdir: null,
  configdir: null,
  init: async function(extManager) {
    //
    // This function adds all the commands for working with stacks and 
    // setting up references to variables that are used.
    //
    stacks.extMan = extManager;
    stacks.fs = stacks.extMan.getLocalFS();
    stacks.hdir = await stacks.fs.getHomeDir();
    stacks.configdir = await stacks.extMan.getConfigDir();
    var addCommand = stacks.extMan.getCommands().addCommand;
  },
  installKeyMaps: function() {
    var newKeyboard = stacks.extMan.getExtCommand('addKeyboardShort').command;
    newKeyboard('normal', false, false, false, 'Escape', () => {
      stacks.extMan.getExtCommand('changeMode').command('normal');
    });
  }
};
return (stacks);
