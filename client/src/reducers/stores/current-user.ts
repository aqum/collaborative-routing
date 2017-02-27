export interface ICurrentUserStore {
  email: string;
  name: string;
}

export const initialCurrentUserStore = Object.seal({
  email: '',
  name: '',
});
