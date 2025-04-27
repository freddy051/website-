// Smooth scrolling without showing '#' in URL
function smoothScroll(event, sectionId) {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    target.scrollIntoView({ behavior: 'smooth' });
}
