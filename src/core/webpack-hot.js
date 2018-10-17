export default function hot() {
  if (process.env == 'development' && process.dev) {
    if (module.hot) {
      module.hot.accept();
    }
  }
}