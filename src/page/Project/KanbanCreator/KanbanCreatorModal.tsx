import './KanbanCreatorModal.scss';
import { Field, Formik, ErrorMessage } from 'formik';
import { FormField } from '../../../widget/FormField/FormField';
import { Input } from '../../../widget/Input/Input';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import { createKanbanRequest } from '../../../actions/project/kanban.action';
import { ProjectRecord } from '../../../typings/project.typing';
import { AppModal } from '../../../widget/Modal/AppModal';
import { ModalFooter } from '../../../widget/Modal/ModalFooter/ModalFooter';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { ConfirmButtonGroup } from '../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('看板名称为必填项'),
});

class KanbanCreatorComponent extends Component<{
  toggle: boolean;
  onClose: () => void;
  project: ProjectRecord;
  actions: ActionCreatorsMapObject;
  noKanbanExist?: boolean;
}> {
  handleCancel = () => {
    this.props.onClose();
  };

  handleSubmit = (values: any) => {
    this.props.actions.createKanbanRequest(
      {
        ...values,
        projectId: this.props.project.get('id'),
      },
      {
        noKanbanExist: this.props.noKanbanExist,
      }
    );
  };

  render() {
    return (
      <AppModal
        className="KanbanCreatorModal"
        onRequestClose={this.handleCancel}
        isOpen={this.props.toggle}
      >
        <ModalHeader title="新建看板" onClose={this.props.onClose} />

        <Formik
          validationSchema={FormSchema}
          initialValues={{ name: '' }}
          onSubmit={(values, actions) => {
            this.handleSubmit(values);
            actions.setSubmitting(false);
            this.props.onClose();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="KanbanCreatorModal--main">
                <FormField errorMessage={<ErrorMessage name="name" />}>
                  <Field name="name">
                    {({ field, form: { touched, errors }, meta }) => (
                      <div>
                        <Input
                          name="name"
                          placeholder="输入看板名称"
                          value={field.value}
                          onChangeEvent={field.onChange}
                        />
                      </div>
                    )}
                  </Field>
                </FormField>
              </div>
              <ModalFooter>
                <ConfirmButtonGroup
                  confirmButtonHtmlType="submit"
                  onConfirm={() => {}}
                  onCancel={this.props.onClose}
                />
              </ModalFooter>
            </form>
          )}
        </Formik>
      </AppModal>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        createKanbanRequest: createKanbanRequest,
      },
      dispatch
    ),
  };
};

export const KanbanCreatorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanCreatorComponent);
