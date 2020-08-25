import React, { useState } from 'react';
import { AppButton } from '../../../../../widget/Button';
import { Flex } from '../../../../Layout/Flex';

export function CommentInput() {
  const [value, setValue] = useState('');
  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: 6,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={1}
        placeholder="添加评论"
        style={{
          paddingBottom: 30,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          outline: 'none',
          width: '100%',
          border: 0,
          resize: 'none',
          padding: 8,
        }}
      />
      <Flex
        contentEnd
        style={{
          position: 'relative',
          padding: '0 8px 8px',
            display: !!value ? 'flex': 'none'
        }}
      >
        <AppButton type="primary">提交</AppButton>
      </Flex>
    </div>
  );
}
