import { atom, selector } from "recoil";
import * as api from "../controller/api";
import { getRootNavigation } from "../navigations/navigations";
interface userAtomProps {
  user_id: number;
  e_mail: string;
  image: string;
  nickname: string;
  phone_number: string;
  platform: string;
  update_date: Date;
  register_date: Date;
  token: string;
  socket_id: number | string;
}

interface systemAtomProps {
  isReady: boolean;
  isSocketConnected: boolean;
  appState: string;
  extensionStates: {
    name: string;
    active: boolean;
  }[]
}

export const userAtom = atom<userAtomProps>({
  key: "userAtom",
  default: {
    user_id: null,
    e_mail: null,
    image: null,
    nickname: null,
    phone_number: null,
    platform: null,
    update_date: null,
    register_date: null,
    token: null,
    socket_id: null,
  },
});

export const systemAtom = atom<systemAtomProps>({
  key: "systemAtom",
  default: {
    isReady: false,
    isSocketConnected: false,
    appState: "forground",
    extensionStates: [
      {
        name: "chatGPT",
        active: false,
      },
      {
        name: "youtube ad block",
        active: false
      }
    ],
  },
});

export const requestSetSystemItem = selector({
  key: "requestSetSystemItem",
  get: ({ get }) => get(systemAtom),
  set: ({ set, get }, systemItemObect) => {
    let system = get(systemAtom);
    set(systemAtom, { ...system, ...systemItemObect });
  },
});

export const requestSetUserItem = selector({
  key: "requestSetUserItem",
  get: ({ get }) => get(userAtom),
  set: ({ set, get }, userItemObect) => {
    let user = get(userAtom);
    set(userAtom, { ...user, ...userItemObect });
  },
});
