import React, { createRef, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onUpload: (result) => void
}

export function ImageUploader({ children, onUpload }: Props) {
    const inputRef = createRef<HTMLInputElement>();

    const onClick = () => {
        inputRef.current!.click();
    };

    const onChanged = () => {
        if (!inputRef.current!.files) {
            return;
        }
        onUpload(inputRef.current!.files[0])
        inputRef.current!.value = '';
    };

    return (
        <div onClick={onClick}>
            <input
                style={{
                    width: 0,
                    height: 0
                }}
                accept="image/*"
                multiple={false}
                type="file"
                ref={inputRef}
                onChange={onChanged}
            />
            {children}
        </div>
    );
}
