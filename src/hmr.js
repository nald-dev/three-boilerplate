export function initHMR(params) {
  if (module.hot) {
    module.hot.accept()

    module.hot.dispose(params.onDispose)
  }
}
