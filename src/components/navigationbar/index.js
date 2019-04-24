import React, { lazy } from 'react';
import PlatformSelector from '../../hoc/platformSelector';

const DeskTopNavigationBar = lazy(() => import('./desktopnavigationbar'));
const MobileNavigationBar = lazy(() => import('./mobilenavigationbar'));

const NavigationBar = props => (
  <PlatformSelector
    mobile={<MobileNavigationBar {...props} />}
    desktop={<DeskTopNavigationBar {...props} />}
  />
);

export default NavigationBar;
