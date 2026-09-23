// Python practical UI patch
// Sample rendering is handled by python_samples_force_fix.js.
// This file intentionally contains no MutationObserver so question changes remain responsive.
(() => {
  const page = document.getElementById('page');
  if (page) page.setAttribute('data-python-ui-patch', 'safe-v2');
})();
