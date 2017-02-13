
var which = require('which'),
    childProcess = require('child_process');

exports.run = function run (command) {
  return new Promise(function (resolve, reject) {
    which(command.cmd, function(err, cmdpath){
      if (err) {
        reject(new Error('Can\'t install! `' + command.cmd + '` doesn\'t seem to be installed.'));
        return;
      }
      var cmd = childProcess.spawn(cmdpath, command.args, {stdio: 'inherit', cwd: command.cwd || process.cwd()});
      cmd.on('close', function (code) {
        if (code !== 0) {
          return reject(new Error(command.cmd + ' exited with non-zero code ' + code));
        }
        resolve();
      });
    });
  });
};
