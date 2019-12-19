
function downloadFile(data, name = 'file', type = 'text/plain') {
  const { URL: { createObjectURL, revokeObjectURL } } = window;

  const blob = new Blob([data], { type });
  const url = createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('download', name);
  anchor.click();

  window.setTimeout(() => { revokeObjectURL(url); }, 100);
}