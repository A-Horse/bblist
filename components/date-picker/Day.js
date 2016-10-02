import React, {Component} from 'react';


class Day extends Component {

  constructor() {
    super();
    
  }

  onClick() {
    
  }
  
  render() {
    const {day} = this.props;
    return (
      <td>
        {day.number}
      </td>
    );
  }
}

export default Day;
