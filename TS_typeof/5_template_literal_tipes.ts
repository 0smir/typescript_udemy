const myUserName = 'Helga';
const greeting = `Hi there, ${myUserName}!`; //JS feature

type ReadPermissions = 'no-read' | 'read';
type WritePermissions = 'no-write' | 'write';


//example creating by heand
// type FilePermissions =
//   | 'no-read-write'
//   | 'read-no-write'
//   | 'no-read-no-write'
//   | 'read-write';


//example of creating union type same as: no-read-write'| 'read-no-write'| 'no-read-no-write'| 'read-write
type FilePermissions = `${ReadPermissions}-${WritePermissions}`;

type DataFile = {
  data: string;
  permissions: FilePermissions;
};

type DataFileEventNames = `${keyof DataFile}Canged`;// returns union type: 'dataCanged' | 'permissionsCanged'

type DataFileEvent = {
  // [Key in DataFileEventNames]: string;
  [Key in DataFileEventNames]: () => void;
}

