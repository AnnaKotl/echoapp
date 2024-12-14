export function activateAdvantages() {
    const advantages = document.querySelectorAll('.team-list .advantage');
    if (!advantages.length) return;

    let currentIndex = 0;

    function highlightNextAdvantage() {
        advantages.forEach((adv) => adv.classList.remove('active'));
        advantages[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % advantages.length;
    }

    setInterval(highlightNextAdvantage, 1500);
    highlightNextAdvantage();
}