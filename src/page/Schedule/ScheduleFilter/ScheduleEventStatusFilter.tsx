import React from 'react';
import { AppSelect } from '../../../widget/AppSelect';

interface Props {
  onChange?: Function
}

export enum ScheduleEventStatus {
    Overdue, // 超期,
    Normal
}

export function ScheduleEventStatusSelector({ onChange }: Props) {
    const options = [{
        value: ScheduleEventStatus.Normal,
        label: '正常'
    }, {
        value: ScheduleEventStatus.Overdue,
        label: '超期'
    }];
    
    return <AppSelect
    className="ScheduleEventStatusSelector"
    placeholder="请选择状态"
    options={options}
    value={null}
    onChange={onChange}
/>   
}