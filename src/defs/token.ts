export interface Token<T>{
  readonly id: symbol;
  readonly _type?: T;
}