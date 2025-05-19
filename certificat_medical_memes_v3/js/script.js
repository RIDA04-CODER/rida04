// Script pour les animations et interactions
document.addEventListener('DOMContentLoaded', function() {
    // Référence au bouton de certificat et à la modal
    const certificateBtn = document.getElementById('certificateBtn');
    const certificateModal = new bootstrap.Modal(document.getElementById('certificateModal'));
    const printCertificateBtn = document.getElementById('printCertificate');

    // Animation de confettis lorsqu'on clique sur le bouton de certificat
    certificateBtn.addEventListener('click', function() {
        createConfetti();
        setTimeout(() => {
            certificateModal.show();
        }, 500);
    });

    // Fonction pour créer des confettis
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);

        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff8800'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
        }

        // Supprimer les confettis après l'animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 7000);
    }

    // Fonction pour l'impression du certificat
    printCertificateBtn.addEventListener('click', function() {
        const certificateContent = document.querySelector('.certificate-container').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Certificat Médical</title>
                    <style>
                        body {
                            font-family: 'Times New Roman', Times, serif;
                            padding: 20px;
                        }
                        .certificate-container {
                            border: 2px solid #007bff;
                            padding: 20px;
                            border-radius: 10px;
                            position: relative;
                        }
                        .certificate-stamp {
                            position: absolute;
                            bottom: 30px;
                            right: 50px;
                            width: 100px;
                            height: 100px;
                            border: 2px solid #007bff;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            opacity: 0.7;
                            transform: rotate(-15deg);
                        }
                        .certificate-stamp::before {
                            content: "APPROUVÉ";
                            color: #007bff;
                            font-weight: bold;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="certificate-container">
                        ${certificateContent}
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    });

    // Animation des images de mèmes au scroll
    const memeImages = document.querySelectorAll('.meme-image');
    
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Initialiser les images avec une opacité réduite et un décalage
    memeImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'translateY(50px)';
        image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(image);
    });

    // Animation de texte flottant pour les messages
    const messageCards = document.querySelectorAll('.message-card .card-text');
    messageCards.forEach(text => {
        text.style.transition = 'transform 3s ease-in-out';
        setInterval(() => {
            text.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                text.style.transform = 'translateY(0)';
            }, 1500);
        }, 3000);
    });

    // Effet de survol 3D pour les cartes
    const cards = document.querySelectorAll('.meme-card, .message-card, .conclusion-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.transition = 'transform 0.5s ease';
        });
    });

    // Animation de texte multicolore pour le titre principal
    const title = document.querySelector('.header-section h1');
    
    function animateColorfulText() {
        const text = title.textContent;
        title.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.1}s`;
            span.style.animation = 'colorful 3s infinite';
            title.appendChild(span);
        }
        
        // Ajouter le style pour l'animation colorée
        const style = document.createElement('style');
        style.textContent = `
            @keyframes colorful {
                0% { color: #2575fc; }
                25% { color: #4e44ce; }
                50% { color: #3498db; }
                75% { color: #2980b9; }
                100% { color: #2575fc; }
            }
        `;
        document.head.appendChild(style);
    }
    
    animateColorfulText();
});
