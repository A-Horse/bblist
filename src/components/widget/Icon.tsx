import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faClipboardList,
  faColumns,
  faCube,
  faCubes,
  faDharmachakra,
  faPlusCircle,
  faStroopwafel
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStroopwafel);
library.add(faPlusCircle);
library.add(faColumns);
library.add(faCube);
library.add(faDharmachakra);
library.add(faCubes);
library.add(faClipboardList);

export const AppIcon = FontAwesomeIcon;
