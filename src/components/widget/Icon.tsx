import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faClipboardList,
  faClock,
  faColumns,
  faCube,
  faCubes,
  faDharmachakra,
  faEllipsisH,
  faListAlt,
  faListOl,
  faPen,
  faPlusCircle,
  faStroopwafel,
  faTimes,
  faTrash,
  faUserCog,
  faVectorSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faStroopwafel);
library.add(faPlusCircle);
library.add(faColumns);
library.add(faCube);
library.add(faDharmachakra);
library.add(faCubes);
library.add(faClipboardList);
library.add(faCheckCircle);
library.add(faListAlt);
library.add(faVectorSquare);
library.add(faListOl);
library.add(faUserCog);
library.add(faEllipsisH);
library.add(faTrash);
library.add(faPen);
library.add(faTimes);
library.add(faClock);

export const AppIcon = FontAwesomeIcon;
