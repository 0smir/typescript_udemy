type FileData = {
  path: string;
  content: string;
};

type DataBaseData = {
  connectionUrl: string;
  credentials: string;
};

type Status = {
  isOpen: boolean;
  errorMessage?: string;
};


// intersection type feature - is combine two types by using ampersand (&) simbol 
type AccessedFileData = FileData & Status; //'merging' of all fields from types to One
type AccessDataBaseData = DataBaseData & Status;



//in case of interfaces
interface FileInfo {
  path: string;
  content: string;
};

interface DataBaseInfo {
  connectionUrl: string;
  credentials: string;
};

interface StatusInfo {
  isOpen: boolean;
  errorMessage?: string;
};

// in case of interface you can use extend key-word to combine data
interface AccessedFilenfo extends FileInfo, StatusInfo { } //'merging' of all fields from interface to One
interface AccessDataBasenfo extends DataBaseData, StatusInfo { }
