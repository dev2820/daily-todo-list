import { vi, afterEach } from "vitest";

const mockLocalStorage = (() => {
  let _state: Record<string, string> = {};
  const getItem = (key: string) => {
    if (_state[key] === undefined) return null;

    return _state[key];
  };
  const setItem = (key: string, value: string) => {
    _state[key] = value;
  };
  const removeItem = (key: string) => {
    delete _state[key];
  };
  const clear = () => {
    _state = {};
  };
  const $setup = (state: Record<string, string> = {}) => {
    _state = state;
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    $setup,
    get $state() {
      return { ..._state } as const;
    },
  };
})();

vi.stubGlobal("localStorage", mockLocalStorage);

afterEach(() => {
  mockLocalStorage.clear();
});
