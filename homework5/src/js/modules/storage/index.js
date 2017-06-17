const LOCAL_STORAGE_NAMESPACE = 'joke-database-dot-gov';

const storageKeyName = (key) => {
  return `${LOCAL_STORAGE_NAMESPACE}.${key}`;
};

const Storage = {
  save(value, key) {
    window.localStorage.setItem(storageKeyName(key), value);
  },
  add(value, key) {
    let values = this.load(key);
    values.push(value);
    this.save(JSON.stringify(values), key);
  },
  load(key) {
    return JSON.parse(window.localStorage.getItem(storageKeyName(key))) || [];
  },
  erase(key) {
    window.localStorage.removeItem(storageKeyName(key));
  },
};

export default Storage;
