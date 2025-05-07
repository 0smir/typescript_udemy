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

enum ProjectStatus { Active, Finished }

//Project Type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus) {

  }
}

//Project State Managment

// type Listener = (items: Project[]) => void;
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  // private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  // addListener(listenerFn: Listener) {
  //   this.listeners.push(listenerFn);
  // }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // const newProject = {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople
    // };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // with .slice() method we create a new copy of this.projects Array
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
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null &&
    typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

//Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> { // use generic to make class more flexible
  templateEl: HTMLTemplateElement;
  hostEl: T;// now we can spacify types of elements
  element: U; // now we can spacify types of elements

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostEl = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract configure?(): void;
  abstract renderContent(): void;

}

// project item class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {

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
  configure() { }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

//ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  // templateEl: HTMLTemplateElement;
  // hostEl: HTMLDivElement;
  // element: HTMLElement; //for section element
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    // this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
    // this.hostEl = document.getElementById('app')! as HTMLDivElement;
    // const importedNode = document.importNode(this.templateEl.content, true);
    // this.element = importedNode.firstElementChild as HTMLElement;
    // this.element.id = `${type}-projects`;

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
      // const listItem = document.createElement('li');
      // listItem.textContent = projItem.title;
      // listEl!.appendChild(listItem);
      new ProjectItem(this.element.querySelector('ul')!.id, projItem);
    }
  }

  configure() {
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

//Project Input Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;


  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputEl = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
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

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  renderContent() { }

  // private attach() {
  //   this.hostEl.insertAdjacentElement('afterbegin', this.element);
  // }
}

const projInput = new ProjectInput();
const activeList = new ProjectList('active');
const finishedList = new ProjectList('finished');



