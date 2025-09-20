document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.getElementById('theme-toggler');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
        localStorage.setItem('theme', theme);
    };

    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    themeToggler.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});
