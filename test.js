var monModule = require('./monmodule');
var markdown = require('markdown').markdown;

monModule.direBonjour();
monModule.direByeBye();

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));