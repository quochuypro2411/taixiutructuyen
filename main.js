// ============================================
// MAIN APPLICATION ENTRY POINT
// ============================================

import { Router } from './utils/router.js';
import { MockWebSocket } from './utils/websocket.js';
import { animator } from './utils/animations.js';

// Import pages
import { LandingPage } from './pages/Landing.js';
import { LobbyPage } from './pages/Lobby.js';
import { WalletPage } from './pages/Wallet.js';
import { PromotionsPage } from './pages/Promotions.js';
import { VIPPage } from './pages/VIP.js';
import { ProfilePage } from './pages/Profile.js';

// Initialize router
const router = new Router();

// Register pages
router.register('landing', LandingPage);
router.register('lobby', LobbyPage);
router.register('wallet', WalletPage);
router.register('promotions', PromotionsPage);
router.register('vip', VIPPage);
router.register('profile', ProfilePage);

// Initialize WebSocket (using mock for development)
const ws = new MockWebSocket();
ws.connect();

// WebSocket event listeners
ws.on('connected', () => {
    console.log('✅ Connected to game server');
});

ws.on('gameResult', (data) => {
    console.log('🎲 Game result:', data);
    // Handle game result updates
});

ws.on('countdown', (data) => {
    // Update countdown timers
    const timers = document.querySelectorAll('[id$="Countdown"]');
    timers.forEach(timer => {
        const mins = Math.floor(data.seconds / 60);
        const secs = data.seconds % 60;
        timer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    });
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize router
    router.init();

    // Navigate to landing page
    router.navigate('landing');

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                animator.scrollToElement(target, 80);
            }
        });
    });

    // Add entrance animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card-casino, .feature-icon, .promo-card').forEach(el => {
        observer.observe(el);
    });
});

// Export for global access
window.router = router;
window.ws = ws;
window.animator = animator;

console.log('🎰 Premium Sic Bo Casino initialized');
console.log('🎨 Design: Neon Golden Cyber-Asian Casino');
console.log('⚡ Ready to play!');
