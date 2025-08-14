// Efeito de digitação na seção home
document.addEventListener("DOMContentLoaded", function () {
  // Configuração do efeito de digitação
  const typed = new Typed(".typing-text", {
    strings: ["Suporte", "Analista", "Suporte", "Curioso"], // Substitua por suas profissões/habilidades
    typeSpeed: 30,
    backSpeed: 60,
    backDelay: 1200,
    loop: true,
  });

  // Alternar tema claro/escuro
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Verificar preferência do usuário no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Alternar tema ao clicar no botão
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Salvar preferência no localStorage
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Alterar ícone
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  // Ativar link ativo na navegação conforme scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Animar barras de habilidades quando a seção é visível
  const skillItems = document.querySelectorAll(".skill-item");

  function animateSkills() {
    skillItems.forEach((item) => {
      const progress = item.querySelector(".progress");
      const percent = item.querySelector(
        ".skill-info span:last-child"
      ).textContent;
      progress.style.width = "0";

      // Usar setTimeout para garantir que a transição CSS funcione
      setTimeout(() => {
        progress.style.width = percent;
      }, 100);
    });
  }

  // Observar quando a seção de habilidades entra na viewport
  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(skillsSection);

  // Menu mobile (para telas pequenas)
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector(".header").appendChild(menuToggle);

  menuToggle.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
    menuToggle.innerHTML = navbar.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Redimensionamento em tempo real
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      document.querySelector(".navbar").classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Fechar menu ao clicar em um link (para mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelector(".navbar").classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Envio do formulário de contato (simulação)
  document
    .getElementById("whatsappForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtenha os valores do formulário
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Formate a mensagem para o WhatsApp
      const whatsappMessage =
        `Novo contato via portfólio:%0A%0A` +
        `*Nome:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Telefone:* ${phone || "Não informado"}%0A` +
        `*Assunto:* ${subject || "Não especificado"}%0A` +
        `*Mensagem:*%0A${message}`;

      // Substitua SEU_NUMERO pelo seu número com código do país (ex: 5511999999999)
      const whatsappUrl = `https://wa.me/5575998045087?text=${whatsappMessage}`;

      // Abre o WhatsApp em nova aba
      window.open(whatsappUrl, "_blank");

      // Opcional: Limpa o formulário após envio
      this.reset();

      // Opcional: Mostra mensagem de confirmação
      alert("Você será redirecionado para o WhatsApp para completar o envio!");
    });
  // Função para ajustar a timeline em mobile
  function adjustTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (window.innerWidth <= 768) {
      timelineItems.forEach((item) => {
        item.style.left = "0";
        const date = item.querySelector(".timeline-date");
        if (date) {
          date.style.position = "relative";
          date.style.top = "auto";
        }
      });
    }
  }

  // Executa ao carregar e redimensionar
  window.addEventListener("load", adjustTimeline);
  window.addEventListener("resize", adjustTimeline);
});
