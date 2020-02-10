import {
  Field,
  FieldProps,
  FormikValues,
  ErrorMessage,
  FormikProps
} from 'formik';
import React from 'react';
import { SelectOption } from '../../../typings/select.typing';
import { ColumnSelect } from '../../Project/ColumnSelect/ColumnSelect';
import { KanbanSelect } from '../../Project/KanbanSelect/KanbanSelect';
import { FormField } from '../../../widget/FormField/FormField';
import { Input } from '../../../widget/Input/Input';
import { Divider } from '../../../widget/Divider';
import { AppTextArea } from '../../../widget/TextArea/TextArea';
import { FormValues } from './IssueCreatorModal';
import './CreateProjectIssueForm.scss';

interface InputProps {
  kanbanID?: string;
  projectID: string;
  formikBag: FormikProps<FormValues>;
  onCancel?: () => void;
}

export function CreateProjectIssueForm(props: InputProps) {
  return (
    <>
      <div className="CreateProjectIssueForm--section">
        <Field
          name="kanbanID"
          render={({ field, form }: FieldProps<FormikValues>) => (
            <FormField name="所在看板">
              <KanbanSelect
                projectId={props.projectID}
                selectedKanbanId={props.kanbanID}
                onChange={(selected: SelectOption) => {
                  props.formikBag.setFieldValue('kanbanID', selected.value);
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
                  props.formikBag.setFieldValue('columnID', selected.value)
                }
              />
              {form.touched.name && form.errors.name && form.errors.name}
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
                  props.formikBag.setFieldValue('title', value);
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
                  props.formikBag.setFieldValue('content', value);
                }}
              />
            </FormField>
          )}
        />
      </div>
    </>
  );
}
