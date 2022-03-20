import { atom } from 'recoil';

interface AuthState {
  isLoggedIn: boolean;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
  },
});
