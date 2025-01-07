// js/header.js (or similar)
const profileMenu = document.querySelector('.profile-menu');
const headerAvatar = document.getElementById('header-avatar');

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        headerAvatar.src = user.avatar;
    }

    const profileContainer = document.querySelector('.profile-avatar-container');
    profileContainer.addEventListener('mouseenter', () => {
        profileMenu.style.display = 'block';
    });

    profileContainer.addEventListener('mouseleave', () => {
        profileMenu.style.display = 'none';
    });
});