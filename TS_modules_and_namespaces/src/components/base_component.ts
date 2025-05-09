// namespace App {
//Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> { // use generic to make class more flexible
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
// }