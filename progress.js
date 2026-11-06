// Ticks each step when its button is clicked, remembered in this browser only.
(function () {
  var key = 'ae-access:' + location.pathname, saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
  var steps = [].slice.call(document.querySelectorAll('.st'));
  var bar = document.querySelector('.bar b'), count = document.querySelector('.bar span');
  function render() {
    var n = 0;
    steps.forEach(function (s, i) {
      var on = !!saved[i]; if (on) n++;
      s.classList.toggle('on', on);
      s.querySelector('.num').setAttribute('aria-pressed', on);
    });
    if (bar) bar.style.width = (n / steps.length * 100) + '%';
    if (count) count.textContent = n + ' of ' + steps.length + ' done';
  }
  function set(i, v) { saved[i] = v; try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {} render(); }
  steps.forEach(function (s, i) {
    s.querySelector('.num').addEventListener('click', function () { set(i, !saved[i]); });
    [].forEach.call(s.querySelectorAll('.go'), function (a) { a.addEventListener('click', function () { set(i, true); }); });
  });
  render();
})();
