import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { selectAllProject } from '../../../redux/reducer/selector/project.selector';
import { AppSelect } from '../../../widget/AppSelect';


interface Props {
    noOptionTip?: string;
    selectedValue?: any;
    onChange?: Function;
}

export function ProjectSelector({
    noOptionTip,
    selectedValue,
    onChange
}: Props) {
  const options = useSelector((rootState: RootState) => selectAllProject(rootState)).map(project => {
      return {
          value: project.id,
          label: project.name
      }
  });
 return <AppSelect
        className="ProjectSelector"
        noOptionsMessage={noOptionTip || '无项目'}
        placeholder="请选择项目"
        options={options}
        value={selectedValue}
        onChange={onChange}
/>   
}