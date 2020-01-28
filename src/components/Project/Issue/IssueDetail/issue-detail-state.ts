import { IssueDetailComponent } from './IssueDetail';
import {
  ProjectIssueRecordFiled,
  ProjectIssueRecord
} from '../../../../typings/project-issue.typing';

export class IssueDetailState {
  private changedFields = {};

  constructor(
    private detailComponent: IssueDetailComponent & {
      issue: ProjectIssueRecord;
      actions: any;
      issueID: string;
      toastManager: any;
    }
  ) {}

  onFieldChange = (fieldName: ProjectIssueRecordFiled) => {
    const issue = this.detailComponent.props.issue;
    const changedFields = this.changedFields;
    return (value: any): void => {
      if (value !== issue!.get(fieldName)) {
        changedFields[fieldName] = true;
      }
      this.detailComponent.props.actions.changeIssueDirect(
        this.detailComponent.props.issueID,
        {
          [fieldName]: value
        }
      );
    };
  };

  onFieldBlur = (fieldName: ProjectIssueRecordFiled) => {
    return (value: any): void => {
      this.updateIssue({
        [fieldName]: value
      });
    };
  };

  updateIssue = (
    changedPartialIssue: any,
    option: {
      force?: boolean;
    } = {}
  ) => {
    let didChangedPartialIssue: any;
    if (option.force) {
      didChangedPartialIssue = changedPartialIssue;
    } else {
      didChangedPartialIssue = Object.keys(changedPartialIssue).reduce(
        (result: any, key: string) => {
          if (this.changedFields[key]) {
            result[key] = changedPartialIssue[key];
          }
          return result;
        },
        {}
      );
    }

    if (Object.keys(didChangedPartialIssue).length === 0) {
      return;
    }
    this.detailComponent.props.actions.updateProjectIssueDetailRequest(
      {
        issueId: this.detailComponent.props.issueID,
        partialIssue: changedPartialIssue
      },
      {
        callback: (error: Error) => {
          if (!error) {
            this.detailComponent.props.toastManager.add('更新成功', {
              appearance: 'success',
              autoDismiss: true
            });
            Object.keys(didChangedPartialIssue).forEach((k: string) => {
              this.changedFields[k] = false;
            });
            return;
          }
          this.detailComponent.props.toastManager.add('更新失败', {
            appearance: 'error',
            autoDismiss: true
          });
        }
      }
    );
  };
}
