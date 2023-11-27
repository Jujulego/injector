let scope;

export function getCurrentScope(global) {
  return scope ?? global;
}

export function setCurrentScope(next) {
  scope = next;
}
