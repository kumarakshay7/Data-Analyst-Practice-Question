(() => {
  function patchQ3() {
    const title = document.getElementById('title');
    const page = document.getElementById('page');
    if (!title || !page || !title.textContent.startsWith('PY-P003')) return;

    const card = page.querySelector('.card');
    const question = card && card.querySelector('.question');
    const meta = card && card.querySelector('.meta');
    if (!question || !meta || card.dataset.q3Patched === '1') return;

    question.innerHTML = '🐍 Find the maximum value in this list: <code>[10, 45, 22, 90, 31]</code>.';
    meta.innerHTML = '<strong>Sample list:</strong> [10, 45, 22, 90, 31]<br><strong>Expected output:</strong> 90<br>Use this sample data first. You can also test your solution with another list.';
    card.dataset.q3Patched = '1';
  }

  const observer = new MutationObserver(patchQ3);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', patchQ3);
  patchQ3();
})();
