document.addEventListener("DOMContentLoaded", function () {
    AOS.init();

    let typedInstance;  // Variable para almacenar la instancia de Typed.js

    // Función para inicializar Typed.js
    function initTyped() {
        if (typedInstance) {
            typedInstance.destroy();  // Destruye la instancia previa de Typed.js si existe
        }
        typedInstance = new Typed("#typed-output", {
            strings: i18next.t('typedStrings', { returnObjects: true }),
            typeSpeed: 10,
            backSpeed: 25,
            startDelay: 500,
            loop: false,
            showCursor: false
        });
    }

    // Función para inicializar Swiper
    function initSwiper() {
        const isMobile = window.innerWidth <= 768;

        new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            effect: isMobile ? 'slide' : 'cards',
            cardsEffect: {
                perSlideOffset: 8,
                perSlideRotate: 2,
                slideShadows: false,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            }
        });
    }

    // Función para inicializar los eventos del menú
    function initMenu() {
        const menu = document.getElementById('menu');
        const openBtn = document.getElementById('openBtn');
        const closeBtn = document.getElementById('closeBtn');
        const openBtnFixed = document.getElementById('openBtnFixed');
        const closeBtnFixed = document.getElementById('closeBtnFixed');
        const fixedMenu = document.getElementById('fixedMenu');
        const goTopBtn = document.getElementById('go-top');
        const showMenuHeight = 250;

        function closeMenu() {
            openBtn.classList.remove('hidden');
            closeBtn.classList.add('hidden');
            menu.classList.add('hidden');
            menu.classList.remove('visible');
        }

        function closeMenuFixed() {
            openBtnFixed.classList.remove('hidden');
            closeBtnFixed.classList.add('hidden');
            menu.classList.add('hidden');
            menu.classList.remove('visible');
            fixedMenu.style.backgroundColor = 'rgba(0,0,0,0.2)';
        }

        openBtn.addEventListener('click', function () {
            openBtn.classList.add('hidden');
            closeBtn.classList.remove('hidden');
            menu.classList.add('visible');
            menu.classList.remove('hidden');
        });

        closeBtn.addEventListener('click', closeMenu);
        openBtnFixed.addEventListener('click', function () {
            openBtnFixed.classList.add('hidden');
            closeBtnFixed.classList.remove('hidden');
            menu.classList.add('visible');
            menu.classList.remove('hidden');
            fixedMenu.style.backgroundColor = '#2c3e50';
        });
        closeBtnFixed.addEventListener('click', closeMenuFixed);

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function () {
                closeMenu();
                closeMenuFixed();
            });
        });

        window.addEventListener('scroll', function () {
            if (window.scrollY > showMenuHeight) {
                fixedMenu.style.top = '0';
                goTopBtn.style.opacity = '1';
                goTopBtn.style.visibility = 'visible';
            } else {
                fixedMenu.style.top = '-100px';
                goTopBtn.style.opacity = '0';
                goTopBtn.style.visibility = 'hidden';
            }
        });
    }

    // Función para inicializar los eventos del formulario
    function initForm() {
        const formOverlay = document.getElementById('formOverlay');
        const closeFormButton = document.querySelector('.closeBtn');
        const openFormButton = document.querySelector('.contact-btn');

        function showForm() {
            formOverlay.style.opacity = '1';
            formOverlay.style.visibility = 'visible';
        }

        function hideForm() {
            formOverlay.style.opacity = '0';
            formOverlay.style.visibility = 'hidden';
        }

        closeFormButton.addEventListener('click', hideForm);
        openFormButton.addEventListener('click', showForm);

        formOverlay.addEventListener('click', (e) => {
            if (e.target === formOverlay) {
                hideForm();
            }
        });

        const form = document.getElementById("contactForm");
        const message = document.querySelector('.message');

        function showMessage() {
            message.style.opacity = '1';
            message.style.visibility = 'visible';
        }

        function hideMessage() {
            setTimeout(function(){
                message.style.opacity = '0';
                message.style.visibility = 'hidden';
            },3000);
        }

        form.addEventListener("submit", handleSubmit);

        async function handleSubmit(event) {
            event.preventDefault();
            var status = document.getElementById("my-form-status");
            var data = new FormData(event.target);
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = `Gracias por tu mensaje, nos pondremos en contacto contigo pronto. <i class="fa-solid fa-check"></i>`;
                    form.reset();
                    hideForm();
                    showMessage();
                    hideMessage();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = `Ocurrió un problema el enviar el formulario, por favor intenta más tarde o comunicate directamente al correo ortizjose451@gmail.com`;
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = `Ocurrió un problema el enviar el formulario, por favor intenta más tarde o comunicate directamente al correo ortizjose451@gmail.com`;
            });
        }
    }

    function downloadCV() {
        // Crea un enlace temporal
        const link = document.createElement('a');
        link.href = 'documents/FRANCISCO ORTIZ - CV ACT.pdf';
        link.download = 'Francisco_Ortiz_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const downloadCVBtn = document.querySelector('.cv');
    downloadCVBtn.addEventListener('click', downloadCV);

    // Inicialización
    function init() {
        initTyped();
        initSwiper();
        initMenu();
        initForm();
        window.scrollToTop = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // i18next initialization
    i18next.init({
        lng: 'es',
        debug: true,
        resources: {
            es: {
                translation: {
                    "projects": "Proyectos",
                    "technologies": "Tecnologías",
                    "contact": "Contacto",
                    "contactBtn": "CONTACTAR",
                    "aboutMe": "Sobre mí",
                    "aboutMeText1": "¡Hola! Soy Francisco Ortiz, un entusiasta desarrollador full stack con experiencia en la creación de aplicaciones web y móviles. Actualmente, estoy cursando la carrera de Ingeniería en Sistemas de Información, donde continúo expandiendo mis conocimientos en tecnologías como JavaScript, React, Node.js, y más.",
                    "aboutMeText2": "Disfruto del desafío de transformar ideas en productos funcionales que mejoren la experiencia del usuario. Mi objetivo es seguir aprendiendo y creciendo en el campo del desarrollo de software, siempre buscando nuevas oportunidades para aplicar mis habilidades y conocimientos.",
                    "downloadCV": "Descargar CV",
                    "techStack": "Stack de tecnologías",
                    "projectsTitle": "Proyectos",
                    "contactFormTitle": "Contactar",
                    "fullNameLabel": "Nombre completo",
                    "phoneLabel": "Número de teléfono",
                    "emailLabel": "Correo electrónico",
                    "messageLabel": "Mensaje",
                    "sendButton": "Enviar",
                    "thankYouMessage": "Gracias por tu mensaje, nos pondremos en contacto contigo pronto.",
                    "contactTitle": "Contacto",
                    "messagePlaceholder" : "Deja un mensaje...",
                    "typedStrings": [
                        "Transformando ideas en experiencias <span class='span1'>digitales</span> innovadoras."
                    ],
                }
            },
            en: {
                translation: {
                    "projects": "Projects",
                    "technologies": "Technologies",
                    "contact": "Contact",
                    "contactBtn": "CONTACT",
                    "aboutMe": "About Me",
                    "aboutMeText1": "Hello! I'm Francisco Ortiz, an enthusiastic full-stack developer with experience in creating web and mobile applications. I am currently pursuing a degree in Information Systems Engineering, where I continue to expand my knowledge in technologies such as JavaScript, React, Node.js, and more.",
                    "aboutMeText2": "I enjoy the challenge of transforming ideas into functional products that enhance the user experience. My goal is to keep learning and growing in the field of software development, always looking for new opportunities to apply my skills and knowledge.",
                    "downloadCV": "Download CV",
                    "techStack": "Tech Stack",
                    "projectsTitle": "Projects",
                    "contactFormTitle": "Contact",
                    "fullNameLabel": "Full Name",
                    "phoneLabel": "Phone Number",
                    "emailLabel": "Email",
                    "messageLabel": "Message",
                    "sendButton": "Send",
                    "thankYouMessage": "Thank you for your message, we will get back to you soon.",
                    "contactTitle": "Contact",
                    "messagePlaceholder" : "Leave a message..",
                    "typedStrings": [
                        "Transforming ideas into innovative <span class='span1'>digital</span> experiences. ",
                    ],
                }
            }
        }
    }, function(err, t) {
        // Initialize the i18next plugin
        updateContent();
        initTyped();  // Inicializa Typed.js después de actualizar el contenido
    });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            element.innerHTML = i18next.t(element.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(element) {
            const key = element.getAttribute('data-i18n-placeholder');
            element.setAttribute('placeholder', i18next.t(key));
        });
    }

    function setWidthText(language){
        const text1 = document.querySelector('.text1');
        const text2 = document.querySelector('.text2');
        const text4 = document.querySelector('.text4');
        if(language === 'es'){
            text1.style.width = '125px';   
            text2.style.width = '285px';     
            text4.style.width = '140px';            
        }else{
            text1.style.width = '135px'; 
            text2.style.width = '150px';    
            text4.style.width = '116px';            
        }
    }

    function handleLanguage(language){
        i18next.changeLanguage(language, function(err, t) {
            if (err) return console.error('Something went wrong changing language', err);
            updateContent();
            initTyped();  // Re-inicializa Typed.js después de cambiar el idioma
        });
    }
    function addLanguageEventListeners() {
        const buttons = document.querySelectorAll('.btn-language');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const language = this.id.split('-')[0];
                setWidthText(language);
                handleLanguage(language);
                buttons.forEach(btn => btn.style.color = 'white');
                this.style.color = 'yellowgreen';
            });
        });
    }
    
    addLanguageEventListeners();

    
    init();
});
