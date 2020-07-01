export function loading(isLoading = true) {
  if (this._isMounted) {
    this.setState({
      config: {
        ...this.state.config,
        isLoading: isLoading,
      },
    });
  }
}
