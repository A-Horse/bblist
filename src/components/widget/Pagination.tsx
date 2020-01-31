import React, { PureComponent } from 'react';

export class AppPagination extends PureComponent<{
  pageSize: number;
  total: number;
  currentPage: number;
  onPageChanged?: (pageNumber: number) => void;
}> {
  ref: HTMLCokePaginationElement | undefined = undefined;

  componentDidMount() {
    this.ref!.addEventListener(
      'pageChanged',
      this.onPageChanged as EventListener
    );
  }

  onPageChanged = (event: CustomEvent<any>) => {
    if (!this.props.onPageChanged) {
      return;
    }
    this.props.onPageChanged(event.detail);
  };

  setRef = (ref?: HTMLCokePaginationElement) => {
    this.ref = ref;
  };

  render() {
    return (
      <coke-pagination
        pagesize={this.props.pageSize}
        total={this.props.total}
        ref={this.setRef}
        currentpage={this.props.currentPage}
      />
    );
  }
}
