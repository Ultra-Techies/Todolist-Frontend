import { Injectable } from '@angular/core';

@Injectable()
export default class Utils {
  formatDate(date: string) {
    let date_ = new Date(date);
    let dd = String(date_.getDate()).padStart(2, '0');
    let mm = String(date_.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date_.getFullYear();
    let hh = String(date_.getHours()).padStart(2, '0');
    let min = String(date_.getMinutes()).padStart(2, '0');
    let sec = String(date_.getSeconds()).padStart(2, '0');
    let newDate = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
    return newDate;
  }
}
