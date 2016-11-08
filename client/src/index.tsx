import 'core-js/fn/object/assign';
import * as React from 'react';
import { render } from 'react-dom';

import './index.scss';
import { App } from './app/app';

render(<App />, document.getElementById('app'));
