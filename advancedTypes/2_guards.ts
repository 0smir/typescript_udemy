//======= Discrimination Unions =======

type DBSource = {
  type: 'db';
  connectionUrl: string
};

const dbSource: DBSource = {
  connectionUrl: 'some-connection-url'
};


type FileSource = {
  type: 'file';
  path: string;
};

const fileSRC: FileSource = {
  path: 'some/path/to/file.csv'
};

type Source = FileSource | DBSource;



function loadData(src: Source) {
  //Open file OR reach out to data base server
  // We need to use 'if'-condition, due we don't know which type we use write now
  if ('path' in src) {
    //src.path; => use this to open file
    //...
    return;
  }
  //src.connectionUrl; => reach out DB
};



//Discrimination Union pattern - add sheared prop-ty with different values to all Types
function loadDataInfo(src: Source) {
  if (src.type === 'file') {
    console.log(src.path);
    //src.path; => use this to open file
    //...
    return;
  }
  console.log(src.connectionUrl)
  //src.connectionUrl; => reach out DB
}