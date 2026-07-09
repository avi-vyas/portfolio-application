# PortfolioApplication 

![Repo Size](https://img.shields.io/github/repo-size/avi-vyas/portfolio-application?style=flat-square) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white) 

## Description

`PortfolioApplication` is a meticulously crafted, client-side rendered personal portfolio designed to showcase the skills and experience of a Developer. This application presents a comprehensive overview of the developer's profile, projects, professional journey, and contact information through a clean, modern, and interactive web interface.

Built with a focus on a premium, minimal, and senior-engineer aesthetic, it leverages vanilla JavaScript for dynamic content loading and page orchestration, along with a custom CSS design system. While the backend logic is simulated for demonstration purposes, the frontend is engineered to reflect backend development paradigms, including a mock "Actuator" endpoint and Java/Spring Boot thematic elements.

##  Features

This portfolio application is rich with features designed for a seamless user experience and a touch of developer-centric charm:

*   **Dynamic Page Rendering** : Utilizes `app.js` to orchestrate navigation, footer, scroll reveal effects, and render page-specific content (Home, About, Projects, Experience, Resume, Contact) by loading data from local JSON files.
*   **Responsive Navigation & Footer** : A fully responsive navigation bar and an interactive footer that displays rotating status lines and a hint for hidden features.
*   **Hero Section with System Status** : The homepage features a prominent hero section introducing the developer, along with a dynamic "System Status" card, mimicking a backend service's operational overview.
*   **About Me Section** : Details the developer's summary and showcases core strengths in a card-based grid, alongside an architectural diagram illustrating the problem-solving approach (Java + Design Thinking).
*   **Skills Overview** : Presents a categorized list of technical skills (tooling, languages, mental models) fetched dynamically, enhancing the `About` and `Resume` pages.
*   **Projects Showcase** : A "Service Registry" section displaying individual project cards, each with a name, status, tech stack, highlights, and links to GitHub repositories or mock detail pages.
*   **Experience Timeline** : Professional experience is laid out as a "Release History" timeline, with each role depicted as a major version, including achievements and impact.
*   **Resume Snapshot** : Provides a concise summary of experience, key skills, systems worked on, and domain exposure, with a direct link to download the full resume (PDF).
*   **Interactive Contact Form** : A front-end only contact form (`POST /collaborate`) with basic validation, simulating a successful request via a toast notification.
*   **Scroll Reveal Animations** : Elements gracefully fade in as they enter the viewport, enhancing visual appeal.
*   **Thematic Boot Screen** : A retro terminal-style loading screen appears on first visit, simulating a Java Spring Boot application startup process.
*   **Developer Easter Eggs** :
    *   `Shift + J`: Activates a "Java Mode Activated" modal, displaying a classic `System.out.println` message.
    *   Typing `springboot`: Triggers an "ApplicationContext Loaded Successfully" toast message.
    *   Clicking the `PA` brand logo: Reveals the application version (`v3.2.1 Stable`) in a toast.
*   **Mock Actuator Endpoint** ⚙️: A hidden `/actuator-me` page displays a formatted JSON response, mimicking a Spring Boot Actuator endpoint with developer details.

##  Tech Stack

The project is primarily a static site rendered on the client-side, incorporating modern web development practices:

*   **Languages**: HTML5, CSS3, JavaScript, JSON, Markdown
*   **Styling**: Custom CSS Design System (no external CSS framework like Bootstrap)
*   **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)
*   **Conceptual Frameworks/Runtimes (Thematic)**: Java 17, Spring Boot 3.x, Tomcat (as hinted in boot screen and descriptions)
*   **JavaScript Libraries**: Vanilla JavaScript for all client-side logic.

##  Installation

Getting this portfolio application up and running is straightforward as it's a client-side only project.

1.  **Clone the Repository** :

    ```bash
    git clone https://github.com/avi-vyas/portfolio-application.git
    cd portfolio-application
    ```

2.  **Open in Browser** :
    Simply open the `index.html` file in your preferred web browser. All content will be loaded dynamically.

    ```bash
    open index.html # On macOS
    start index.html # On Windows
    xdg-open index.html # On Linux
    ```

    Alternatively, you can serve it with a local web server (e.g., `python -m http.server`) if you encounter any browser security restrictions for local file access.

## Usage

This application is designed as a personal portfolio. Here's how to interact with it:

*   **Navigate**: Use the top navigation bar to visit `Home`, `About`, `Projects`, `Experience`, `Resume`, and `Contact` pages.
*   **Explore Content**: Browse the various sections to learn about Avi Vyas's skills, projects, and professional background.
*   **View Projects**: On the `Projects` page, click "GitHub Repository" to see the source code for listed projects or "View Details" for more information (which currently triggers a toast notification).
*   **Download Resume**: On the `Resume` page, click the `GET /resume.pdf` button to download the developer's resume.
*   **Contact**: Fill out the form on the `Contact` page to send a mock message. The form will validate inputs and provide a success toast.
*   **Discover Hidden Features**: Try the [Easter Eggs](#-developer-easter-eggs-) for fun interactive elements.
*   **Check Actuator**: Access the mock `/actuator-me.html` endpoint via the footer link or directly in the URL to see a simulated API response.

##  How to Use

This portfolio serves as an interactive resume and showcase. Its primary use cases are:

### As a Job Seeker / Professional

*   **Online Presence**: Provides a professional, detailed online presence for showcasing skills and experience to potential employers or collaborators.
*   **Project Showcase**: Offers a dedicated section to highlight individual projects, their tech stacks, and achievements.
*   **Experience Overview**: Presents a chronological timeline of professional experience, making career progression clear.
*   **Direct Contact**: Facilitates easy communication through a dedicated contact form and links to professional social profiles.

### As a Developer / Code Enthusiast

*   **Learning Resource**: The clean, modular vanilla JavaScript code (`app.js`, `data-loader.js`, `easter-eggs.js`) and well-structured HTML/CSS can serve as a learning resource for building static sites with dynamic content loading.
*   **Design Inspiration**: The custom CSS design system demonstrates how to achieve a modern, minimalist aesthetic without reliance on heavy frameworks.
*   **Extensibility**: The `pageRenderers` pattern in `app.js` makes it easy to add new pages and content sections.
*   **Data-Driven Content**: The use of `data/*.json` files for content allows for easy updates without touching the HTML/JS logic.

##  Project Structure

The repository is organized into a clean and intuitive structure:

```
portfolio-application/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   ├── data-loader.js
│   │   └── easter-eggs.js
│   └── pdf/
│       └── resume.pdf
├── data/
│   ├── experience.json
│   ├── profile.json
│   ├── projects.json
│   └── skills.json
├── about.html
├── actuator-me.html
├── contact.html
├── experience.html
├── index.html
├── projects.html
├── README.md
└── resume.html
```

*   `index.html`: The main entry point and home page.
*   `*.html`: Individual pages of the portfolio (About, Projects, Experience, Resume, Contact, Actuator).
*   `assets/css/style.css`: Contains the entire custom CSS design system for the application.
*   `assets/js/app.js`: Core JavaScript for page orchestration, component rendering, and global functionalities (toasts, navbar, footer).
*   `assets/js/data-loader.js`: Utility for asynchronously loading JSON data from the `data/` directory.
*   `assets/js/easter-eggs.js`: Implements hidden interactive features and thematic responses.
*   `assets/pdf/resume.pdf`: Placeholder for the downloadable resume.
*   `data/*.json`: JSON files containing all the dynamic content for the portfolio, such as profile information, skills, project details, and experience entries.

## API Reference

While this is primarily a frontend application, it includes a conceptual API endpoint to enhance the backend developer persona:

### `/actuator/me`

*   **Endpoint**: `GET /actuator-me.html`
*   **Description**: A simulated public endpoint, accessible via a subtle link in the footer or direct navigation. It presents a formatted JSON response containing basic developer information, mirroring a Spring Boot Actuator endpoint.
*   **Response (Example)**:
    ```json
    {
      "name": "Avi Vyas",
      "role": "Backend Engineer",
      "status": "RUNNING",
      "uptime": "Always Learning",
      "bugs_fixed": 9999
    }
    ```

### `POST /collaborate`

*   **Endpoint**: `POST /contact.html` (simulated via form submission)
*   **Description**: The contact form visually represents a `POST /collaborate` API call. Upon successful validation and submission, it triggers a client-side toast notification (`Request Accepted Successfully`), simulating a backend response without actual server-side processing.


## Important Links


*   **Live Demo**: https://avi-vyas.github.io/portfolio-application/
