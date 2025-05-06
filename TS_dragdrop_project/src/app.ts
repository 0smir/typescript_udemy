// Code goes here!
//autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor) {

  const originMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

// //Project Type
// class Project {

// }

//Project State Managment
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() { }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople
    };
    this.projects.push(newProject);
    for (const lictenerFn of this.listeners) {
      lictenerFn(this.projects.slice()); // with .slice() method we create a new copy of this.projects Array
    }
  }
}

const projectState = ProjectState.getInstance();

//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}


//validation logic
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && (validatableInput.value.toString().trim().length !== 0);
  }
  if (validatableInput.minLength != null &&
    typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length > validatableInput.maxLength;
  }

  if (validatableInput.min != null &&
    typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value > validatableInput.min;
  }
  if (validatableInput.max != null &&
    typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

//ProjectList Class
class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement; //for section element
  assignedProjects: any[];

  constructor(private type: 'active' | 'finished') {
    this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostEl = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }
  private renderProjects() {
    const ListEl = document.getElementById(`${this.type}-projects-list`);
    for (const projItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projItem.title;
      ListEl?.appendChild(listItem);
    }
  }

  private attach() {
    this.hostEl.insertAdjacentElement('beforeend', this.element);
  }

  private renderContent() {
    const ListTd = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = ListTd;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }
}

//Project Input Class
class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  formEl: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;


  constructor() {
    this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostEl = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.formEl = importedNode.firstElementChild as HTMLFormElement;
    this.formEl.id = 'user-input';

    this.titleInputEl = this.formEl.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputEl = this.formEl.querySelector('#description')! as HTMLInputElement;
    this.peopleInputEl = this.formEl.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputEl.value;
    const enteredDescription = this.descriptionInputEl.value;
    const enteredPeople = this.peopleInputEl.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10
    };
    //validation
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid values, please check');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputEl.value = '';
    this.descriptionInputEl.value = '';
    this.peopleInputEl.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) { // check is userInput is tuple (same as Array) 
      const [title, description, people] = userInput;
      // console.log("title, description, people: ", title, description, people);
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.formEl.addEventListener('submit', this.submitHandler);
    // this.formEl.addEventListener('submit', this.submitHandler.bind(this));
  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.formEl);
  }
}

const projInput = new ProjectInput();
const activeList = new ProjectList('active');
const finishedList = new ProjectList('finished');



