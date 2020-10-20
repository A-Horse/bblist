import React from 'react';
function checkChildren(children) {
  if (!children) {
    throw new Error('must provide Column Children in table');
  }
}

function makeColumns(children) {
  const columnComponents = children.length ? children : [children];
  return columnComponents.map((com) => ({
    prop: com.props.prop,
    label: com.props.label,
  }));
}

const commonStyle = {
  border: '1px solid black',
};

export function Column({ prop, label }) {
  return null;
}

export function Table({ dataSource, children }) {
  checkChildren(children);
  const columns = makeColumns(children);
  return (
    <table style={commonStyle}>
      <thead>
      <tr>
        {columns.map((col) => (
          <th style={commonStyle} key={col.prop}>
            {col.label}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {dataSource.map((rowData, index) => (
        <tr key={index}>
          {columns.map((col) => (
            <td style={commonStyle} key={col.prop}>
              {rowData[col.prop]}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}
