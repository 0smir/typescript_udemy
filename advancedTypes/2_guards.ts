//======= Discrimination Unions =======

type DBSource = {
  type: 'db';  //shared type which defined in all Types instance
  connectionUrl: string
};

const dbSource: DBSource = {
  type: 'db',
  connectionUrl: 'some-connection-url'
};


type FileSource = {
  type: 'file'; //shared type which defined in all Types instance
  path: string;
};

const fileSRC: FileSource = {
  type: 'file',
  path: 'some/path/to/file.csv'
};

type Source = FileSource | DBSource;


function isFile(src: Source) { // one more correct way to use discrimination type && type guards 
  return src.type === 'file';
}

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


function loadInfo(src: Source) { // additional way to detect shared type to get correct logic in fn
  if (isFile(src)) {
    console.log(src.path);
    //src.path; => use this to open file
    //...
    return;
  }
  console.log(src.connectionUrl)
  //src.connectionUrl; => reach out DB
}
