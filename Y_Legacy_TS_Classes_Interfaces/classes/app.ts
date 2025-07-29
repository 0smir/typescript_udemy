console.log('Time to get started...');

abstract class Department {
  static fiscalYear = 2025;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = name;
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  prontEmployeesInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  createEmployee(name: string) {
    return {
      name: name
    }
  }
}

console.log(Department.fiscalYear)

// let id = new Date().getTime(),
//   idText = id.toString();
// let accounting = new Department('d1', 'Accounting');
// let employee1 = accounting.createEmployee('Elis');
// console.log('employee1', employee1);
// accounting.describe();
// console.log(accounting);
// accounting.addEmployee('Helga');
// accounting.addEmployee('Max');
// accounting.prontEmployeesInformation();

class IDDepartment extends Department {
  // admins: string[];

  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department ' + this.id);
  }

}

let IT = new IDDepartment('d1', []);
IT.describe();


class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostResentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No report found');
  }

  set mostResentReport(value: string) {
    if (!value) {
      throw new Error('Please set a new value!');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting!');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('c1', []);
    return this.instance;
  }

  describe() {
    console.log(`Accounting department - ID: ${this.id}`);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// let accountingDep = new AccountingDepartment('d2', []);
let accountingDep = AccountingDepartment.getInstance();
let accountingDep2 = AccountingDepartment.getInstance();
console.log(accountingDep, accountingDep2);

accountingDep.describe();
// console.log(accountingDep);
// accountingDep.addReport('Hey, we got error!');
// accountingDep.printReports();

// accountingDep.addEmployee('Max');
// accountingDep.addEmployee('Isabella');
// accountingDep.prontEmployeesInformation();

// accountingDep.mostResentReport = 'Yeah, this is resent report!!';
// accountingDep.mostResentReport = '';

// console.log("latest_rep: ", accountingDep.mostResentReport);




