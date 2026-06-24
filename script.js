// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.gallery-item, .feature, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// IMAGE HOVER SWAP
document.querySelectorAll('.gallery-item').forEach(item => {
    const mainImg = item.querySelector('.main-img');
    if (!mainImg) return;
    const originalSrc = mainImg.src;
    const hoverSrc = mainImg.dataset.hover;
    const container = item.querySelector('.main-image-container');

    if (container && hoverSrc && hoverSrc !== originalSrc) {
        container.addEventListener('mouseenter', () => {
            mainImg.src = hoverSrc;
        });
        container.addEventListener('mouseleave', () => {
            mainImg.src = originalSrc;
        });
    }

    let showingOriginal = true;
    if (container) {
        container.addEventListener('click', () => {
            if (hoverSrc && hoverSrc !== originalSrc) {
                showingOriginal = !showingOriginal;
                mainImg.src = showingOriginal ? originalSrc : hoverSrc;
            }
        });
    }
});

// MODAL DE DETALHES
document.addEventListener('click', function(e) {
    let btn = null;
    if (e.target.classList.contains('btn-details')) {
        btn = e.target;
    } else if (e.target.closest('.main-image-container')) {
        btn = e.target.closest('.gallery-item').querySelector('.btn-details');
    }

    if (btn) {
        const data = btn.dataset;

        document.getElementById('modalName').textContent = data.product;
        document.getElementById('modalDesc').textContent = data.desc;

        const sizesList = document.getElementById('modalSizes');
        sizesList.innerHTML = '';
        const sizeEntries = (data.sizesWhatsapp || '').split('|').map(s => s.trim()).filter(Boolean);
        sizeEntries.forEach(entry => {
            const match = entry.match(/^(.*)\(([^)]+)\)$/);
            const li = document.createElement('li');
            if (match) {
                const label = match[1].trim();
                const price = match[2].trim();
                li.innerHTML = `<span>${label}</span><strong>${price}</strong>`;
            } else {
                li.textContent = entry;
            }
            sizesList.appendChild(li);
        });

        document.getElementById('modalBuyBtn').dataset.product = data.product;
        document.getElementById('modalBuyBtn').dataset.sizes = data.sizesWhatsapp || '';
        document.getElementById('modalGiftCheck').checked = false;

        const imgs = [data.img1, data.img2, data.img3, data.img4].filter(Boolean);
        document.getElementById('modalMainImg').src = imgs[0];

        const thumbsContainer = document.getElementById('modalThumbs');
        thumbsContainer.innerHTML = '';
        imgs.forEach((src, i) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = 'Foto ' + (i + 1);
            if (i === 0) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                document.getElementById('modalMainImg').src = src;
                thumbsContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbsContainer.appendChild(thumb);
        });

        document.getElementById('productModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// Fechar modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
        document.getElementById('productModal').classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('productModal').classList.remove('active');
        document.body.style.overflow = '';
    }
});

// WhatsApp
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-product');
        const sizes = e.target.getAttribute('data-sizes');
        const whatsappNumber = '5527998242810';

        let wantsGiftBox = false;
        const productModal = document.getElementById('productModal');
        if (productModal && productModal.classList.contains('active')) {
            const giftCheck = document.getElementById('modalGiftCheck');
            wantsGiftBox = giftCheck && giftCheck.checked;
        }

        let message = `Olá! Gostaria de comprar: *${productName}*\n\n`;
        if (sizes) {
            message += `Tamanhos/Opções disponíveis:\n${sizes.replace(/\|/g, '\n')}\n\n`;
            message += `Por favor, me informe qual tamanho deseja.\n\n`;
        }
        if (wantsGiftBox) {
            message += `🎁 *Com Caixa presente (+R$ 40,00)*\n`;
        }
        const encodedMessage = encodeURIComponent(message);
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', { send_to: 'AW-18251460330/ZTvWCN61hMUcEOrd_P5D' });
        }
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
});

// Conversão gtag para links WhatsApp diretos (contato, consulta, botão flutuante)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag === 'function') {
            gtag('event', 'conversion', { send_to: 'AW-18251460330/ZTvWCN61hMUcEOrd_P5D' });
        }
    });
});

// Preload
document.querySelectorAll('.main-img').forEach(img => {
    if (img.dataset.hover) {
        const temp = new Image();
        temp.src = img.dataset.hover;
    }
});
