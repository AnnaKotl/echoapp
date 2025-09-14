export function lazyLoadCSS(paths = []) {
  paths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    link.media = 'all';
    document.head.appendChild(link);
  });
}
