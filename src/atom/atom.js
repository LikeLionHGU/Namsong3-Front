import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: localStorage,
});

export const UserTokenState = atom({
  key: "userToken",
  default: { isLogin: false },
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: "token",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
