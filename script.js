// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
    });
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar com efeito ao scroll
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

// Animação dos itens ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .feature, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Botão de compra - WhatsApp
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-product');
        const sizes = e.target.getAttribute('data-sizes');
        const whatsappNumber = '5527998242810'; // Número do WhatsApp
        
        let message = `Olá! Gostaria de comprar: *${productName}*\n\n`;
        
        if (sizes) {
            message += `Tamanhos/Opções disponíveis:\n${sizes.replace(/\|/g, '\n')}\n\n`;
            message += `Por favor, me informe qual tamanho deseja.`;
        }
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
});

// Mesa Uno - Galeria de miniaturas
const mesaUnoItem = document.querySelector('.gallery-item-large');
if (mesaUnoItem) {
    const thumbnails = mesaUnoItem.querySelectorAll('.thumbnail');
    const mainImages = mesaUnoItem.querySelectorAll('.main-images img');
    
    // Array com os URLs das imagens
    const imageUrls = [
        'https://i.imgur.com/DpdwgmD.jpg',
        'https://i.imgur.com/tgQJjAq.jpg',
        'https://i.imgur.com/FYl3LyU.jpg',
        'https://i.imgur.com/3wWrkW5.jpg'
    ];
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Remove active de todos
            thumbnails.forEach(t => t.classList.remove('active'));
            mainImages.forEach(img => img.classList.remove('active'));
            
            // Adiciona active no clicado
            thumb.classList.add('active');
            
            // Atualiza a imagem principal
            const primaryImg = mainImages[0];
            primaryImg.src = imageUrls[index];
            primaryImg.classList.add('active');
        });
    });
}

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Preload das imagens hover para transição suave
document.addEventListener('DOMContentLoaded', () => {
    const hoverImages = document.querySelectorAll('.img-hover');
    hoverImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
});
