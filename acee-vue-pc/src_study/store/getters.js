export {
  r_name(state, getters) {
    return [...state.name].reverse().join('');
  },
  r_name_length(state, getters) {
    return getters.r_name.length;
  }
}
