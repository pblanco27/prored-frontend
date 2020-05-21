export function disable(isDisabled = true) {
  this.setState({
    config: {
      ...this.state.config,
      isLoading: isDisabled,
      isDisabled: isDisabled,
    },
  });
}
