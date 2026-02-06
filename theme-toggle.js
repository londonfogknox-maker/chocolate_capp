document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    }

    // On page load, check for a saved theme in localStorage
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Optional: If no theme is saved, default to light
        applyTheme('light');
    }

    // Listen for clicks on the toggle
    themeToggle.addEventListener('change', function() {
        let theme = 'light'; // Default to light
        if (this.checked) {
            theme = 'dark'; // If checked, set theme to dark
        }
        localStorage.setItem('theme', theme); // Save the choice
        applyTheme(theme); // Apply the theme
    });
});
