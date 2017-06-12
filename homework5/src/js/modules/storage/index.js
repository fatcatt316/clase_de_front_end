const LOCAL_STORAGE_NAMESPACE = 'joke-database-dot-gov';

const storageKeyName = (key) => {
  return `${LOCAL_STORAGE_NAMESPACE}.${key}`;
};

const Storage = {
  save(value, key) {
    window.localStorage.setItem(storageKeyName(key), value);
  },
  load(key) {
    return window.localStorage.getItem(storageKeyName(key));
  },
};

export default Storage;
