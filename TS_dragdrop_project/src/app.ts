// Code goes here!

class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  formEl: HTMLFormElement;

  constructor() {
    this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostEl = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.formEl = importedNode.firstElementChild as HTMLFormElement;

    this.attach();
  }
  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.formEl);
  }
}

const projInput = new ProjectInput();