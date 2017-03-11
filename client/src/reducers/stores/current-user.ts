export interface ICurrentUserStore {
  email: string;
  name: string;
  token: string;
}

export const initialCurrentUserStore = Object.seal({
  email: '',
  name: '',
  token: '',
});
