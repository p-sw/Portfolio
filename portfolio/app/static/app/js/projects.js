view_handler = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('in-view');
            document.querySelector(`section.project-navigation ol li[data-href="${entry.target.id}"]`).classList.add('in-view');
        }
        if (entry.intersectionRatio <= 0) {
            entry.target.classList.remove('in-view');
            document.querySelector(`section.project-navigation ol li[data-href="${entry.target.id}"]`).classList.remove('in-view');
        }
    });
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
                this.addProject(href);
            }
        })
    }

    addProject(href) {
        let project = Project.init(href, this.projectContainer);
    }
}

Project = {
    init: function(href, container) {
        fetch(`/projects/${href}`, {
            method: "GET",
        }).then((res) => {
            return res.json()
        }).then((data) => {
            this.href = data.href;
            this.title = data.title;
            this.short_description = data.short_description;
            this.content = data.content;
            this.start_commit = data.start_commit;
            this.last_commit = data.last_commit;
            return data.href;
        }).then((href) => {
            this.setupNode(container);
        })
    },

    setupNode: function(container) {
        let node = document.createElement("article");
        node.id = this.href;
        node.innerHTML = `
            <div class="project-header">
                <h2>${this.title}</h2>
                <h3>${this.short_description}</h3>
                <p>${this.start_commit} ~ ${this.last_commit}</p>
            </div>
            <div class="project-content">
                ${this.content}
            </div>
        `;
        container.appendChild(node);
        this.startObserve(node);
    },

    startObserve: function(node) {
        view_handler.observe(node);
    }
}