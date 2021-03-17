import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const rewardsCtrtsSelection = [
  {
    key: '001',
    text: 'AFI Governance',
    value: '001',
  },
  {
    key: '011',
    text: 'UniLP_AFI_USDC',
    value: '011',
  },
  {
    key: '021',
    text: 'afiUSDC',
    value: '021',
  },
  {
    key: '031',
    text: 'afiUSDT',
    value: '031',
  },
  {
    key: '041',
    text: 'afiDAI',
    value: '041',
  },
]
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },

const DropDownRewardsCtrts = () => (
  <Dropdown
    placeholder='Select Rewards Contract'
    scrolling
    wrapSelection={false}
    selection
    options={rewardsCtrtsSelection}
  />
)// fluid
//  value={value}
//defaultValue='001'
//  onChange={handleChange}
/**
 *           /* label={<Dropdown placeholder='choose Rewards Contract' defaultValue='001' options={options} />}
                <Input
                  //label={<Dropdown defaultValue='.com' options={options} />}
                /> 

 */
export {DropDownRewardsCtrts};
// <DropDownRewardsCtrts />