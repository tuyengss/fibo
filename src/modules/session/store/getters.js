export function me(state) {
  return state.user;
}

export function notifications(state) {
  return state.notifications;
}

export function messages(state) {
  return state.messages;
}

export function searchText(state) {
  return state.searchText;
}

export const screens = state => state.screens;
export const profile = state => state.profile;
