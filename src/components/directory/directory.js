import React from 'react';

import MenuItem from '../menu-item/menu-item';
import {items} from '../../ethereum/config';

const Directory = ({rowNum, tokenIDs}) =>  {
  console.log("rowNum:", rowNum,  tokenIDs);
  if(rowNum === 1) {return (
      <div className='directory-menu'>
      {
        items.slice(0, 5).map(({id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps} tokenIDs={tokenIDs}/>
        ))
      }
      </div>
    );
  } else {
    return (
      <div className='directory-menu'>
      {
        items.slice(5, 10).map(({id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps} tokenIDs={tokenIDs} />
        ))
      }
      </div>
    );
  }
}

export default Directory;
/**------------==
        this.state.sections.map(({id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps} />
        ))
***------------==
        this.state.sections.map(({id, title, imageUrl, id, size, linkUrl}) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}
*/