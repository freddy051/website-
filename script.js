// Remove # from URL on navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Stop normal jumping behavior
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, null, ' '); // Clear the # from the URL
  });
});
