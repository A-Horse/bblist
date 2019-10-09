import './CardDetail.scss';

import React, { Component } from 'react';
import { withRouter, RouterProps, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectIssueRecord, ProjectIssueRecordFiled } from '../../../typings/kanban-card.typing';
import Input from '../../widget/Input/Input';

export interface InputProps {
  issueId: string;
}

export interface ReduxProps {
  issue?: ProjectIssueRecord;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class IssueDetailComponent extends Component<InputProps & ReduxProps> {
  onFieldChange = (fieldName: ProjectIssueRecordFiled) => {
    return (value: any): void => {
      this.props.issue!.update(fieldName, () => value);
    };
  };

  render() {
    const { issue } = this.props;
    console.log('issue', issue);
    if (!issue) {
      return <div>loading</div>;
    }

    return (
      <div>
        <Input value={issue.get('title')} onChange={this.onFieldChange('title')} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  return {
    issue: state.project.get('cardMap').get(props.issueId)
  };
};

export const IssueDetail = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssueDetailComponent)
);
