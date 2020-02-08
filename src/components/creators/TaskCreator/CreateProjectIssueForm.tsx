import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
  FormikValues,
  ErrorMessage
} from 'formik';
import React, { Component, RefObject } from 'react';
import { SelectOption } from '../../../typings/select.typing';
import { ColumnSelect } from '../../Project/ColumnSelect/ColumnSelect';
import { KanbanSelect } from '../../Project/KanbanSelect/KanbanSelect';
import { FormField } from '../../../widget/FormField/FormField';
import Input from '../../../widget/Input/Input';
import * as Yup from 'yup';
import { Divider } from '../../../widget/Divider';
import './CreateProjectIssueForm.scss';
import { AppTextArea } from '../../../widget/TextArea/TextArea';

const FormSchema = Yup.object().shape({
  title: Yup.string().required('标题为必填项')
});

interface FormValues {
  title: string;
  content?: string;
  kanbanID?: string;
  columnID?: string;
}

export class CreateProjectIssueForm extends Component<
  {
    projectID: string;
    style?: any;
    onCancel?: () => void;
    kanbanID?: string;
    createProjectCard: Function;
  },
  {
    name: any;
    errorMessages: any;
  }
> {
  state = {
    errorMessages: [],
    name: ''
  };

  private formRef: RefObject<any>;

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  public submitForm() {
    // if (!this.formRef.current!.touched) {
    //   return;
    // }
    this.formRef.current!.submitForm();
  }

  render() {
    return (
      <Formik
        ref={this.formRef}
        validationSchema={FormSchema}
        initialValues={{
          title: '',
          content: undefined,
          kanbanID: undefined,
          columnID: undefined
        }}
        onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
          this.props.createProjectCard(values);
          actions.setSubmitting(false);
        }}
        render={(formikBag: FormikProps<FormValues>) => {
          return (
            <Form className="CreateProjectIssueForm">
              <div className="CreateProjectIssueForm--section">
                <Field
                  name="kanbanID"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在看板">
                      <KanbanSelect
                        projectId={this.props.projectID}
                        selectedKanbanId={this.props.kanbanID}
                        onChange={(selected: SelectOption) => {
                          formikBag.setFieldValue('kanbanID', selected.value);
                        }}
                      />
                      {form.touched.kanbanID &&
                        form.errors.kanbanID &&
                        form.errors.kanbanID}
                    </FormField>
                  )}
                />
                <Field
                  name="columnID"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在价值列">
                      <ColumnSelect
                        kanbanID={form.values.kanbanID}
                        onChange={(selected: SelectOption) =>
                          formikBag.setFieldValue('columnID', selected.value)
                        }
                      />
                      {form.touched.name &&
                        form.errors.name &&
                        form.errors.name}
                    </FormField>
                  )}
                />
              </div>

              <Divider />

              <div className="CreateProjectIssueForm--section">
                <Field
                  name="title"
                  required
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField
                      require={true}
                      name="问题标题"
                      errorMessage={<ErrorMessage name="title" />}
                    >
                      <Input
                        type="text"
                        size="middle"
                        value={form.values.title}
                        placeholder=""
                        onChange={value => {
                          formikBag.setFieldValue('title', value);
                        }}
                      />
                    </FormField>
                  )}
                />

                <Field
                  name="content"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="描述">
                      <AppTextArea
                        border={true}
                        value={form.values.content}
                        placeholder=""
                        onChange={value => {
                          formikBag.setFieldValue('content', value);
                        }}
                      />
                    </FormField>
                  )}
                />
              </div>
            </Form>
          );
        }}
      />
    );
  }
}
