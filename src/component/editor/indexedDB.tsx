/* eslint-disable no-console */
const options: any = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function Sample() {
  let db: any;
  let isLoad = false;

  const openRequest = window.indexedDB.open('my_database', 1);

  openRequest.addEventListener('error', () =>
    console.error("La base de données n'a pas pu s'ouvrir")
  );

  openRequest.addEventListener('success', () => {
    console.log('Base de données ouverte avec succès');
    db = openRequest.result;
    isLoad = true;
    // displayData();
  });

  openRequest.addEventListener('upgradeneeded', (e: any) => {
    db = e.target.result;
    const objectStore = db.createObjectStore('my_os', {
      keyPath: 'id',
      autoIncrement: true,
    });

    // Define what data items the objectStore will contain
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });
    objectStore.createIndex('date', 'date', { unique: false });

    console.log('Configuration de la base de données terminée');
  });

  function addData(monTitre: any, monBody: any) {
    const cur = new Date(Date.now());
    const newItem = {
      title: monTitre,
      body: monBody,
      date: cur.toLocaleDateString(undefined, options),
    };

    const transaction = db.transaction(['my_os'], 'readwrite');

    const objectStore = transaction.objectStore('my_os');

    objectStore.add(newItem);

    transaction.addEventListener('complete', () => {
      console.log(
        'Transaction terminée: modification de la base de données terminée.'
      );
      // displayData();
    });

    transaction.addEventListener('error', () =>
      console.error("Transaction non ouverte en raison d'une erreur")
    );
  }

  function clearDb() {
    const transaction = db.transaction(['my_os'], 'readwrite');
    const objectStore = transaction.objectStore('my_os');
    objectStore.clear();

    transaction.addEventListener('complete', () => {
      console.log('Base de données effacée.');
    });
  }

  function displayData(setState: any) {
    const objectStore = db.transaction('my_os').objectStore('my_os');
    objectStore.getAll().addEventListener('success', (e: any) => {
      setState(e.target.result);
    });
  }

  function clearAndadd(monTitre: any, monBody: any) {
    const transaction = db.transaction(['my_os'], 'readwrite');
    const objectStore = transaction.objectStore('my_os');
    objectStore.clear();

    transaction.addEventListener('complete', () => {
      console.log('Effacé. Ajouter ensuite...');
      addData(monTitre, monBody);
    });
  }

  function updateItem(key: number, myTitle: string, myBody: any) {
    const transaction = db.transaction(['my_os'], 'readwrite');
    const objectStore = transaction.objectStore('my_os');

    const request = objectStore.get(key);

    request.onsuccess = () => {
      const myItem = request.result;
      const cur = new Date(Date.now());

      // Change the name property
      myItem.title = myTitle;
      myItem.body = myBody;
      myItem.date = cur.toLocaleDateString(undefined, options);

      // const updateRequest = objectStore.put(myItem);
      objectStore.put(myItem);

      // updateRequest.onsuccess = () => {displayData();}
    };
  }

  function getData(key: number, setState: any) {
    const transaction = db.transaction(['my_os'], 'readwrite');
    const objectStore = transaction.objectStore('my_os');
    const request = objectStore.get(key);
    request.onsuccess = () => {
      setState(request.result);
    };
  }

  function getLoad() {
    return isLoad;
  }

  return {
    addData,
    clearDb,
    displayData,
    clearAndadd,
    updateItem,
    getData,
    getLoad,
  };
}
