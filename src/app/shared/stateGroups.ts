export interface State {
  name: string;
  code: string;
  flag: string;
}

export interface StateGroup {
  name: string;
  state: State[];
}
