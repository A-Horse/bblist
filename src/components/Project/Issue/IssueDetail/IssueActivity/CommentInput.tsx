import React, { createRef, KeyboardEvent, useState } from 'react';
import { AppButton } from '../../../../../widget/Button';
import { Flex } from '../../../../Layout/Flex';

export function CommentInput({ createComment }) {
  const [value, setValue] = useState('');
  const textAreaRef = createRef<HTMLTextAreaElement>();

  const onKeyDown = (event: KeyboardEvent<Element>) => {
    if (event.key !== 'Enter') {
      return;
    }
    event.preventDefault();
    createComment(value).then();
    setValue('');
    textAreaRef.current!.blur();
  };
  return (
    <div
      style={{
        borderRadius: 3,
        backgroundColor: 'white',
        overflow: 'hidden',
        boxShadow:
          '0 1px 2px -1px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08)',
      }}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        ref={textAreaRef}
        placeholder="添加评论"
        style={{
          paddingBottom: 30,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          outline: 'none',
          fontSize: 14,
          width: '100%',
          border: 0,
          resize: 'none',
          padding: '8px 12px',
        }}
      />
      <Flex
        contentEnd
        style={{
          position: 'relative',
          padding: '0 8px 8px',
          display: !!value ? 'flex' : 'none',
        }}
      >
        <AppButton type="primary" onClick={() => createComment(value)}>
          提交
        </AppButton>
      </Flex>
    </div>
  );
}
