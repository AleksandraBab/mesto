import Popup from '../scripts/Popup.js'
import {popupPic, popupName} from '../scripts/constants.js'

export default class PopupWithImage extends Popup {
  open ({ link, name }) {

    popupPic.src = link;
    popupPic.alt = name;
    popupName.textContent = name;

    super.open();
  }
}
