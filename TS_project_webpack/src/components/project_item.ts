import ComponentDefault from "./base_component";
import { Draggable } from "../models/drag_drop_interfaces";
// import{ type Draggable } from "../models/drag_drop_interfaces";// it's correct, some projects need to show directly type of imported object
import { Project } from "../models/project_model";
import { autobind } from "../decorators/autobind";


// namespace App {
// project item class
export class ProjectItem extends ComponentDefault<HTMLUListElement, HTMLLIElement>
  implements Draggable {

  private project: Project;
  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }
  @autobind
  dragEndHandler(event: DragEvent) {
    console.log('dragEndHandler', event);
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
// }