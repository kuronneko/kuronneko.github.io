
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // when we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

  /*==================== ACCORDION SKILLS ====================*/
  const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header');
  
  function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = 'skills__content skills__close';
  }
  if (itemClass === 'skills__content skills__close') {
      this.parentNode.className = 'skills__content skills__open';
  }
  }
  
  skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills)
  });

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

//i added this two lines to set darktheme to default
document.body.classList.toggle(darkTheme)
themeButton.classList.toggle(iconTheme)

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== API FETCH ====================*/

async function getPersona() {
    let response = await fetch("https://portfolio.cyberpunkwaifus.xyz/api/persona/get/81658d64-be06-4cdb-821d-cac9d2a42099")
    let data = await response.json()
    return data;
}

getPersona().then(data => {
    setPersonaInfo(data);
    setPersonaSocials(data);
    setProjects(data);
/*     setSkills(data); */
    swiperPortfolio.update();
    fetch("https://iplogger.cyberpunkwaifus.xyz/api/network/get/3a62a1aa-9933-4ad1-88ae-0f5892cf9366");
    document.getElementById('cover-spin').remove(); //style.display = "none";
}).catch(error => {
    alert(error)
}).finally(() => {
    console.log('Api fetch completed')
});

/*==================== PERSONA FUNCTIONS ====================*/

function setPersonaInfo(data) {
    let personaNames = document.querySelectorAll("[id='persona-name']");
    for (let i = 0; i < personaNames.length; i++) {
        personaNames[i].textContent = data.name + ' ' + data.lastname;
    }
    let personaTitles = document.querySelectorAll("[id='persona-title']");
    for (let i = 0; i < personaTitles.length; i++) {
        personaTitles[i].textContent = data.title;
    }
    document.getElementById('persona-description').innerHTML = data.description.replace(/\n/g, '<br>');
    document.getElementById('persona-about').innerHTML = data.about.replace(/\n/g, '<br>');
    document.getElementById('persona-experience').textContent = + '0' + data.experience.toString() + '+';
    document.getElementById('persona-projects').textContent = + '0' + getProjectsQuantityByStatus(data).toString() + '+';
    document.getElementById('persona-location').textContent = data.city.name + ", " + data.city.country.name;
}

function setPersonaSocials(data) {
    let personaGithubs = document.querySelectorAll("[id='persona-github']");
    for (let i = 0; i < personaGithubs.length; i++) {
        personaGithubs[i].href = getSocialsContent(data, 'GitHub')
    }
    document.getElementById('persona-email').textContent = getSocialsContent(data, 'Email');
    document.getElementById('persona-whatsapp').textContent = "+" + getSocialsContent(data, 'WhatsApp').toString().substring(0, 2) + " " + getSocialsContent(data, 'WhatsApp').toString().substring(2, 3) + " " + getSocialsContent(data, 'WhatsApp').toString().substring(3, 7) + " " + getSocialsContent(data, 'WhatsApp').toString().substring(7);
    document.getElementById('persona-whatsapp-link').href = "https://wa.me/" + getSocialsContent(data, 'WhatsApp') + "?text=Hi, " + data.name + " ";
    document.getElementById('persona-instagram').href = getSocialsContent(data, 'Instagram');
    document.getElementById('persona-twitter').href = getSocialsContent(data, 'Twitter');
}

function setSkills(data){
    let skillsBackEndHeader = document.getElementById('skills-backend-header');
    let skillsBackEndContent = document.getElementById('skills-backend-content');
    let skillsFrontEndHeader = document.getElementById('skills-frontend-header');
    let skillsFrontEndContent = document.getElementById('skills-frontend-content');
    let skillsDesignHeader = document.getElementById('skills-design-header');
    let skillsDesignContent = document.getElementById('skills-design-content');
    let skillsOtherHeader = document.getElementById('skills-other-header');
    let skillsOtherContent = document.getElementById('skills-other-content');
    skillsBackEndHeader.innerHTML += `
    <span class="skills__subtitle">More than ${data.experience.toString()} years</span>
    `;
    skillsFrontEndHeader.innerHTML += `
    <span class="skills__subtitle">More than ${data.experience.toString()} years</span>
    `;
    skillsDesignHeader.innerHTML += `
    <span class="skills__subtitle">More than ${data.experience.toString()} years</span>
    `;
    skillsOtherHeader.innerHTML += `
    <span class="skills__subtitle">More than ${data.experience.toString()} years</span>
    `;
    data.skills.forEach(element => {
        if(element.type.name == 'BackEnd'){
            skillsBackEndContent.innerHTML += `
            <div class="skills__data">
            <div class="skills__titles">
                <h3 class="skills__name">${element.name}</h3>
                <span class="skills__number">${element.level}%</span>
            </div>
            <div class="skills__bar">
                <span class="skills__percentage" style="width:${element.level}%"></span>
            </div>
            </div>
            `;
        }
        if(element.type.name == 'FrontEnd'){
            skillsFrontEndContent.innerHTML += `
            <div class="skills__data">
            <div class="skills__titles">
                <h3 class="skills__name">${element.name}</h3>
                <span class="skills__number">${element.level}%</span>
            </div>
            <div class="skills__bar">
                <span class="skills__percentage" style="width:${element.level}%"></span>
            </div>
            </div>
            `;
        }
        if(element.type.name == 'Design'){
            skillsDesignContent.innerHTML += `
            <div class="skills__data">
            <div class="skills__titles">
                <h3 class="skills__name">${element.name}</h3>
                <span class="skills__number">${element.level}%</span>
            </div>
            <div class="skills__bar">
                <span class="skills__percentage" style="width:${element.level}%"></span>
            </div>
            </div>
            `;
        }
        if(element.type.name == 'Other'){
            skillsOtherContent.innerHTML += `
            <div class="skills__data">
            <div class="skills__titles">
                <h3 class="skills__name">${element.name}</h3>
                <span class="skills__number">${element.level}%</span>
            </div>
            <div class="skills__bar">
                <span class="skills__percentage" style="width:${element.level}%"></span>
            </div>
            </div>
            `;
        }
        
    })
}

function getDetails(details, poz) {
    if (details[poz] === undefined) {
        return 'empty'
    } else {
        return details[poz].description;
    }
}

function setProjects(data) {
    let projectsWrapperDiv = document.getElementById('swiper-wrapper');
    let projectsModalDiv = document.getElementById('project-portfolio-modals');

    //order array by updated_at
    //const sortedActivities = data.projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    //order by random
    const sortedActivities = [...data.projects].sort(() => Math.random() - 0.5);

    sortedActivities.forEach(element => {
        if (element.status != 0) {
            projectsWrapperDiv.innerHTML += `
            <div class="portfolio__content grid swiper-slide" id="${element.name.toLowerCase()}">
            <img src="${element.image}" alt="" class="portfolio__img">
            <div class="portfolio__data">
                <h3 class="portfolio__title">${element.title}</h3>
                <p class="portfolio__description">${element.description}</p>
                <a class="button button--flex button--small button--link services__button">
                    More details...
                </a><br><br>
                <a href="${element.demo}" id="project-demo" target="_blank"
                    class="button button--flex button--small portfolio__button">
                    Visit
                    <i class="uil uil-arrow-right button__icon"></i>
                </a>
                <a href="${element.source}" id="project-source" target="_blank"
                class="button button--flex button--small portfolio__button">
                Source Code
                <i class="uil uil-arrow-right button__icon"></i>
            </a>
            </div>
        </div>
            `;
            //remove project button who dont have demo or source
            let projectDemo = document.querySelectorAll("[id='project-demo']");
            let projectSource = document.querySelectorAll("[id='project-source']");
            for (let i = 0; i < projectDemo.length; i++) {
                if (projectDemo[i].href.includes('#')) {
                    projectDemo[i].remove();//remove empty demo
                }
            }
            for (let i = 0; i < projectSource.length; i++) {
                if (projectSource[i].href.includes('#')) {
                    projectSource[i].remove();//remove empty source
                }
            }
            projectsModalDiv.innerHTML += `
            <div class="services__modal" id="${element.name.toLowerCase()}">
            <div class="services__modal-content">
                <h4 class="services__modal-title">${element.title}</h4>
                <i class="uil uil-times services__modal-close"></i>
                <img src="${element.image}" alt="" class="portfolio__img-modal">
                <p class="portfolio__att-subtitle">${element.description}</p>
                <br>
                <ul class="services__modal-services grid">
                        <li class="services__modal-service">
                        <i class="uil uil-check-circle sirves__modal-icon"></i>
                        <p class="portfolio__att">&nbsp;${getDetails(element.details, 0)}</p>
                        </li>
                        <li class="services__modal-service">
                        <i class="uil uil-check-circle sirves__modal-icon"></i>
                        <p class="portfolio__att">&nbsp;${getDetails(element.details, 1)}</p>
                        </li>
                        <li class="services__modal-service">
                        <i class="uil uil-check-circle sirves__modal-icon"></i>
                        <p class="portfolio__att">&nbsp;${getDetails(element.details, 2)}</p>
                        </li>
                        <li class="services__modal-service">
                        <i class="uil uil-check-circle sirves__modal-icon"></i>
                        <p class="portfolio__att">&nbsp;${getDetails(element.details, 3)}</p>
                        </li>
                        <li class="services__modal-service">
                        <i class="uil uil-check-circle sirves__modal-icon"></i>
                        <p class="portfolio__att">&nbsp;${getDetails(element.details, 4)}</p>
                        </li>
                </ul>
            </div>
        </div>
        `;
            //remove empty li project details
            let projectDetailP = document.querySelectorAll("[class='portfolio__att']");
            let projectDetailMainDiv = document.querySelectorAll("[class='services__modal-service']");
            for (let i = 0; i < projectDetailMainDiv.length; i++) {
                for (let i = 0; i < projectDetailP.length; i++) {
                    if (projectDetailP[i].textContent.includes('empty')) {
                        projectDetailMainDiv[i].remove();//remove empty details
                    }
                }
            }

        }
    });

    /*==================== SERVICES MODAL ====================*/
    // modal functions set inside setProjects()
    const modalViews = document.querySelectorAll('.services__modal'),
        modalBtns = document.querySelectorAll('.services__button'),
        modalCloses = document.querySelectorAll('.services__modal-close')

    let modal = function (modalClick) {
        modalViews[modalClick].classList.add('active-modal')
    }

    modalBtns.forEach((modalBtn, i) => {
        modalBtn.addEventListener('click', () => {
            modal(i)
        })
    })

    modalCloses.forEach((modalClose) => {
        modalClose.addEventListener('click', () => {
            modalViews.forEach((modalView) => {
                modalView.classList.remove('active-modal')
            })
        })
    })

}

function getSocialsContent(data, socialName) {
    let socialNameContent = data.socials.filter(({ name }) => name.includes(socialName) ?? false);
    if (socialNameContent.length > 0) {
        return socialNameContent[0].content;
    } else {
        return '';
    }
}
function getProjectsQuantityByStatus(data) {
    const projects = data.projects;
    let count = 0;
    projects.forEach(element => {
        if (element.status == 1) {
            count += 1;
        }
    });
    return count;
}
/* function getProjectStatus(data, projectName){
    let projectStatus = data.projects.filter(({name}) => name.includes(projectName) ?? false);
    if(projectStatus.length > 0){
        return projectStatus[0].status;
    }else{
        return '';
    }
} */


