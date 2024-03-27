export const usePageStatusStore = defineStore('pageStatusStore', {
  state: () => ({
    value: 'uploading',
  }),
  actions: {
    setSucess() {
      this.value = 'success';
    },
  }
})
