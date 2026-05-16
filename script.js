let topZ = 10;

/* launcher click */
document.querySelectorAll(".app-btn")
  .forEach(btn => {
    btn.addEventListener("click", () => {
      const app = btn.dataset.app;
      openApp(app, btn);
    });
  });


/* ================= OPEN APP ================= */

function openApp(name, btn) {
  let existing =
    document.getElementById(name);

  if (existing) {
    existing.classList.remove("hidden");
    bringToFront(existing);
    return;
  }

  createWindow(name, btn);
}


/* ================= CREATE WINDOW ================= */

function createWindow(name, btn) {

  const win = document.createElement("div");
  win.className = "window";
  win.id = name;

  win.innerHTML = `
    <div class="window-header">

      <span>${name}</span>

<div class="window-controls">
  <button onclick="closeWindow('${name}')">×</button>
</div>

    </div>

    <div class="window-body">
      ${getContent(name)}
    </div>
  `;

  document
    .getElementById("window-layer")
    .appendChild(win);
  const rect =
    btn.getBoundingClientRect();

  win.style.left =
    rect.left + "px";

  win.style.top =
    rect.bottom + 20 + "px";
  makeDraggable(win);

  bringToFront(win);
}


/* ================= CONTENT ================= */

function getContent(name) {

  const pages = {
    about: `
  <div class="about-wrapper">

    <div class="about-profile">
      <img src="Assets/Profile.png" alt="profile">

      <div class="about-intro">
        <h2>Radhit Rabbani</h2>
        <p>IDN-based Freelancer</p>
      </div>
    </div>

    <div class="about-scroll">

      <section>
        <p>
          hi! call me Rad. Nice to meet you :)
        </p>
      </section>

      <section>
        <h3>EXPERIENCE</h3>
        <div class="bullet">
        <ul>
        <li>Graphic Designer</li>
        <li>Video Editor</li>
        <li>Talent Manager</li>
        <li>Social Media Manager</li>
        <li>Article Writer</li>
        </ul>
      </section>

      <section>
        <h3>EDUCATION</h3>
    <div class="edu-item">
        <h4>Bachelor of Religious Studies</h4>
        <p>(Graduated in 2024)</p>
    </div>
      </section>

      <section>
        <h3>INTERESTS</h3>
    <div class="bullet">
        <ul>
          <li>Writings</li>
          <li>Arts! Pixels, Digitals, 3D</li>
          <li>Video Games</li>
          <li>Music Composition</li>
          <li>Knights</li>
        </ul>
    </div>
      </section>

      <section>
      <div class="edu-item">
        <h3>LANGUAGE PROFICIENCY</h3>
        <ul type="none">
          <li>Indonesian (Native)</li>
          <li>English (Fluent)</li>
        </ul>
      </div>
      </section>

    </div>
  </div>
`,

    projects: `
<div class="projects-wrapper">

  <section class="project-card">
<span class="project-type">[ YouTube ]</span>
    <h3>YouTube Work</h3>

    <p>
      My work includes channel management, video editing and thumbnail design
    </p>

    <div class="tag-list">
      <span>Capcut</span>
      <span>Photopea</span>
    </div>

    <a href="https://ytjobs.co/talent/profile/537456?r=720&utm_campaign=share-profile&utm_ref=talent" target="_blank" class="project-link">
      <strong>&#128279 YT Jobs</strong>
    </a>

  </section>

  <div class="divider"></div>

  <section class="project-card">
  <span class="project-type">[ Website ]</span>
    <h3>Mission Log</h3>

    <p>
      To do list web app with neon blue theme features a draggable window and animated interface.
    </p>

    <div class="tag-list">
      <span>HTML</span>
      <span>CSS</span>
      <span>JavaScript</span>
    </div>

    <a href="https://mission-log-gold.vercel.app" target="_blank" class="project-link">
      <strong>&#128279 Live</strong>
    </a>

  </section>

</div>
`,

    links: `
  <h2>Find Me</h2>

  <div class="social-links">

    <a href="https://www.youtube.com/@Radbuns"
       target="_blank">
      <i class="fab fa-youtube"></i>

    </a>

    <a href="https://www.instagram.com/radhit.rabbani/"
       target="_blank">
      <i class="fab fa-instagram"></i>

    </a>

    <a href="https://www.behance.net/radhitrabbani"
       target="_blank">
      <i class="fab fa-behance"></i>

    </a>

    <a href="https://www.linkedin.com/in/radhit-rabbani/"
       target="_blank">
      <i class="fab fa-linkedin"></i>

    </a>

  </div>
`,

    resume: `
      <h2>Resume</h2>
      <p>Download CV.</p>
    `
  };

  return pages[name];
}


/* ================= DRAG ================= */

function makeDraggable(win) {

  const header =
    win.querySelector(".window-header");

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", e => {

    dragging = true;

    offsetX =
      e.clientX - win.offsetLeft;

    offsetY =
      e.clientY - win.offsetTop;

    bringToFront(win);
  });

  document.addEventListener("mousemove", e => {

    if (!dragging) return;

    win.style.left =
      e.clientX - offsetX + "px";

    win.style.top =
      e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}


/* ================= WINDOW STATE ================= */


function closeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;

  const duration = 200;

  win.style.animation =
    `windowClose ${duration}ms ease-in forwards`;

  setTimeout(() => {
    win.remove();
  }, duration);
}

/* ================= Z INDEX ================= */

function bringToFront(win) {
  topZ++;
  win.style.zIndex = topZ;
}
