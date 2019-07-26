/*
Building steps of the JavaScript bookmarklet
1. Install Node.js
2. Run 'npm install'
2. Run 'npm run build'
3. The bookmarklet is now in the "bookmarklet.js" file
*/

const ClosureCompiler = require('google-closure-compiler').jsCompiler;
const fs = require('fs');

new ClosureCompiler({ js: 'OUHK-CGPA-Calculator.js', compilation_level: 'WHITESPACE_ONLY', output_wrapper: 'javascript:(function(){%output%})();', language_out: 'ES6' }).run([], (exitCode, stdOut, stdErr) => {
    fs.writeFile('bookmarklet.js', stdOut[0].src.replace(/\n/g, ''), (err) => { if (err) throw err; });
});