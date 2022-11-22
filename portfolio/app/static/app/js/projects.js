function buildThreshold(base, step, max) {
    let threshold = [base];

    for (let i=0;i<=max/step;i++) {
        threshold.push(base+i*step);
        threshold.push(base-i*step);
    }

    return threshold;
}

view_handler = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.intersectionRatio >= 0.5) {
                document.querySelector(`section.project-navigation ul li[data-href="${entry.target.id}"]`).classList.add('in-view');
            }
        } else {
            entry.target.classList.remove('in-view');
            if (entry.intersectionRatio < 0.5) {
                document.querySelector(`section.project-navigation ul li[data-href="${entry.target.id}"]`).classList.remove('in-view');
            }
        }
    });
}, {
    threshold: buildThreshold(0.5, 0.01, 0.2)
})

class ProjectManager {
    constructor() {
        this.projectContainer = document.querySelector("section.projects");
        fetch("/project-list", {
            method: "GET"
        }).then(res => {
            this.projectList = res.json();
        }).then(() => {
            this.init();
        })
    }

    init() {
        this.projectList.then(projects => {
            for (let href of projects) {
                this.addProject(href, projects.indexOf(href));
                if (document.querySelector("img.loading")) {
                    document.querySelector("img.loading").remove();
                }
            }
        })
    }

    addProject(href, index) {
        let project = new Project(href, this.projectContainer, index);
        project.init();
    }
}

class Project {
    constructor (href, container, index) {
        this.index = index;
        this.container = container;
        this.href = href;
        this.indexNavigator = document.querySelector("section.project-navigation ul");
    }
    init () {
        fetch(`/projects/${this.href}`, {
            method: "GET",
        }).then((res) => {
            return res.json()
        }).then((data) => {
            this.href = data.href;
            this.title = data.title;
            this.short_description = data.short_description;
            this.start_commit = data.start_commit;
            this.last_commit = data.last_commit;
        }).then(() => {
            this.setupNode();
        })
    }

    setupNode () {
        let node = document.createElement("article");
        node.id = this.href;
        node.style.order = this.index;
        node.innerHTML = `
            <div class="project-header">
                <h2>${this.title}</h2>
                <h3>${this.short_description}</h3>
                <p>${this.start_commit} ~ ${this.last_commit}</p>
            </div>
        `;
        this.container.appendChild(node);
        this.startObserve(node);
        this.addToIndexNavigator();
    }

    startObserve (node) {
        view_handler.observe(node);
    }

    addToIndexNavigator () {
        let node = document.createElement("li");
        node.dataset.href = this.href;
        node.style.order = this.index;
        node.innerText = this.title;
        node.onclick = function(e) {
            document.querySelector(`#${e.target.dataset.href}`).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        }
        this.indexNavigator.appendChild(node);
    }
}