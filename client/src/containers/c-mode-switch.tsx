import { connect } from 'react-redux';
import { IButtonGroupItem } from '../components/button-group/button-group';
import { ButtonGroup } from '../components/button-group/button-group';
import { setMapMode } from '../actions/meta';
import { MapMode } from '../interfaces/map-mode.enum';

export const CModeSwitch = connect(
  undefined,
  mapDispatchToProps,
  mergeProps
)(ButtonGroup);

function mapDispatchToProps(dispatch) {
  return {
    _dispatch: dispatch,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const dispatch = dispatchProps._dispatch;
  const buttons: IButtonGroupItem[] = [
    {
      label: 'Edit',
      onClick: () => dispatch(setMapMode(MapMode.Edit)),
      isActive: true,
    },
    {
      label: 'Suggest',
      onClick: () => dispatch(setMapMode(MapMode.Suggest)),
    },
  ];

  return Object.assign(
    {},
    ownProps,
    { buttons }
  );
}
