import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikProps,
  FormikValues,
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
  kanbanId?: string;
  projectId: string;
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
                projectId={props.projectId}
                selectedKanbanId={props.kanbanId}
                onChange={(selected: SelectOption) => {
                  props.formikBag.setFieldValue('kanbanId', selected.value);
                }}
              />
              {form.touched.kanbanId &&
                form.errors.kanbanId &&
                form.errors.kanbanId}
            </FormField>
          )}
        />
        <Field
          name="columnId"
          render={({ field, form }: FieldProps<FormikValues>) => (
            <FormField name="所在价值列">
              <ColumnSelect
                kanbanId={form.values.kanbanId}
                onChange={(selected: SelectOption) =>
                  props.formikBag.setFieldValue('columnId', selected.value)
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
                onChange={(value) => {
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
                onChange={(value) => {
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
