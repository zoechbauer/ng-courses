import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true,
})
export class SortPipe implements PipeTransform {
  /**
   * values of the specified column are sorted
   * sort:<fieldname>:<asc|desc> or
   * sort:<fieldname> for ascending order
   * @param value
   * @param propertyName column of this property is sorted
   * @param sortOrder optional, values: asc/desc
   */
  transform(value: any, propertyName: string, sortOrder: string = 'asc'): any {
    // check pipe parameter
    if (value.length === 0 || propertyName === undefined) {
      return value;
    }
    if (!this.checkParameter(propertyName, sortOrder)) {
      return null;
    }

    // sorting in lowercase
    return value.sort((a, b) => {
      const propA = this.convertToLowerCase(a[propertyName]);
      const propB = this.convertToLowerCase(b[propertyName]);

      const orderAsc = propA < propB ? -1 : 1;

      const orderResult =
        sortOrder.toLowerCase() === 'asc' ? orderAsc : orderAsc * -1;

      return orderResult;
    });
  }

  convertToLowerCase(prop: any): any {
    if (prop === null) {
      prop = '';
    } else {
      if (typeof prop === 'string') {
        prop = prop.toLowerCase();
      }
    }
    return prop;
  }

  /**
   * check PropertyName and Sort order
   * @param propertyName
   * @param nbrFilterType
   */
  checkParameter(propertyName: string, sortOrder: string): boolean {
    let isOK = true;

    if (propertyName === '' || propertyName === null) {
      isOK = false;
      console.log('SortPipe: wrong property name');
    }
    if (
      sortOrder.toLowerCase() !== 'desc' &&
      sortOrder.toLowerCase() !== 'asc'
    ) {
      isOK = false;
      console.log('SortPipe wrong sort order');
      console.log('type', typeof sortOrder);
    }
    if (!isOK) {
      console.error(
        'ERROR: SortPipe called with wrong parameters!\nUse: sort:<fieldname>:<asc|desc> or sort:<fieldname> for ascending order'
      );
      console.error('SortPipe Parameter:', propertyName, sortOrder);
    }
    return isOK;
  }
}
