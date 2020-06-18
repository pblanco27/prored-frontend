export function loading(isLoading = true) {
  this.setState({
    config: {
      ...this.state.config,
      isLoading: isLoading,
    },
  });
}
