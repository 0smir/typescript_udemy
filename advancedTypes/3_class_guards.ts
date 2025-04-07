class UserItem {
  constructor(public name: string) { }
  join() {
    console.log('name: ', this.name)
  }
};

class AdminItem {
  constructor(readonly permissions: string[]) { }

  scan() {
    console.log('permissions: ', this.permissions.toString())
  }
}

const userUnt = new UserItem('Helga');
const adminUnt = new AdminItem(['ban', 'restore']);

type Entity = UserItem | AdminItem;

function init(entity: Entity) {
  // .join() OR .scan() ...
  //We use instanceof JS-feature to check is entity belong to this or other class
  if (entity instanceof UserItem) {
    entity.join();
    return;
  }
  entity.scan();
}

init(userUnt);
init(adminUnt);