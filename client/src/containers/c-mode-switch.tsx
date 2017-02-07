import * as React from 'react';
import { IButtonGroupItem } from '../components/button-group/button-group';
import { ButtonGroup } from '../components/button-group/button-group';

export function CModeSwitch() {
  const modes: IButtonGroupItem[] = [
    {
      label: 'Edit',
      onClick: () => console.log('edit'),
      isActive: true,
    },
    {
      label: 'Suggest',
      onClick: () => console.log('suggest'),
    },
  ];

  return (
    <ButtonGroup buttons={modes} />
  );
}
