var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var irc = require('irc');

require('crash-reporter').start();

var src = path.resolve(__dirname + '/..');
var html = src + '/html';

exports.Stream = require('./stream.js');
var Stream = exports.Stream;

exports.Client = irc.Client('irc.esper.net', 'Meow', {channels: ['#Strikingwolf']});
var Client = exports.Client;

Client.addListener('message', function (nick, to, text, message) {
  Stream.add(nick + ": " + text + " => " + to);
});

Client.addListener('action', function (nick, to, text, message) {
  Stream.add('* ' + nick + " " + text + " => " + to);
})

exports.windows = [];
var windows = exports.windows;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  var argv = require('minimist')(process.argv.slice(1));
  var devMode = argv.dev || false;

  windows[0] = new BrowserWindow({width: 800, height: 600});

  if (devMode) {
    for (w in windows) {
      w.openDevTools();
    }
  }

  windows[0].loadUrl('http://www.google.com');

  windows[1] = new BrowserWindow({width: 800, height: 600});
  windows[1].loadUrl('file://' + html + '/index.html');
  windows[1].openDevTools();

  function closeListener(arr, i) {
    arr[i].on('closed', function () {
      arr[i] = null;
    });
  }

  for (var i = 0; i < windows.length; i++) {
    closeListener(windows, i);
  }

  while (true) {
    console.log(Stream.last);
  }
});
