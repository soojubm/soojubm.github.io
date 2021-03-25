const editorEle = document.getElementById('editor');

// Handle the `paste` event
editorEle.addEventListener('paste', function(e) {
    // Prevent the default action
    e.preventDefault();

    // Get the copied text from the clipboard
    const text = (e.clipboardData)
        ? (e.originalEvent || e).clipboardData.getData('text/plain')
        // For IE
        : (window.clipboardData ? window.clipboardData.getData('Text') : '');
    
    if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, text);
    } else {
        // Insert text at the current position of caret
        const range = document.getSelection().getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
});





const upload = function(fileEle, backendUrl) {
  return new Promise(function(resolve, reject) {
      // Get the list of selected files
      const files = fileEle.files;

      // Create a new FormData
      const formData = new FormData();

      // Loop over the files
      [].forEach.call(files, function(file) {
          formData.append(fileEle.name, file, file.name);
      });

      // Create new Ajax request
      const req = new XMLHttpRequest();
      req.open('POST', backendUrl, true);

      // Handle the events
      req.onload = function() {
          if (req.status >= 200 && req.status < 400) {
              resolve(req.responseText);
          }
      };
      req.onerror = function() {
          reject();
      };

      // Send it
      req.send(formData);
  });
};




const fileEle = document.getElementById('upload');

upload(fileEle, '/path/to/back-end').then(function(response) {
    // `response` is what we got from the back-end
    // We can parse it if the server returns a JSON
    const data = JSON.parse(response);
    ...
});