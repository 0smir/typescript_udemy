/* /// <reference path="base_component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project_state.ts" />
/// <reference path="../models/project_model.ts" />
/// <reference path="../models/drag_drop_interfaces.ts" />
 */


import { Project, ProjectStatus } from "../models/project_model.js";
import ComponentDefault from "./base_component.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project_state.js";
import { ProjectItem } from "./project_item.js";
import { DragTarget } from "../models/drag_drop_interfaces.js"




// namespace App {
//ProjectList Class
export class ProjectList extends ComponentDefault<HTMLDivElement, HTMLElement>
  implements DragTarget {

  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  renderContent() {
    const ListTd = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = ListTd;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl!.innerHTML = '';

    for (const projItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projItem);
    }
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }

  }
  @autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain');

    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autobind
  dragLeaveHendler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHendler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;

      this.renderProjects();
    });
  }
}
// }