export interface Service<Key, Data> {
  read: (key: Key) => Data;
  write: (key: Key, value: Data) => boolean;
}
