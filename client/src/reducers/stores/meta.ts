export interface IMetaStore {
  isFetching: boolean;
}

export const initialMetaStore = Object.seal({
  isFetching: false,
});
