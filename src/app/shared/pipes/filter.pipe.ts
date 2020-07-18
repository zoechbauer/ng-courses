import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true,
})
export class FilterPipe implements PipeTransform {
  /**
   * filter an array and use the specified column name for filter values
   * lowerCase strings are compared as contains
   * numbers are filtered as defined, e.g. gt=true if value is greater than search string
   * @param value
   * @param searchString
   * @param propertyName: column which should be used for filtering
   * @param numberFilterType: optional, 'gt'=default, 'lt', 'eq', 'le', 'ge'
   */
  transform(
    value: any,
    searchString: string,
    propertyName: string,
    numberFilterType: string = ''
  ): any {
    console.log(
      'Filterpipe param',
      // value,
      searchString,
      propertyName,
      numberFilterType
    );

    if (
      value.length === 0 ||
      searchString === undefined ||
      searchString === ''
    ) {
      return value;
    }
    // check pipe parameter
    let nbrFilterType = '';
    if (numberFilterType !== '') {
      nbrFilterType = numberFilterType.toLowerCase();
    }
    if (!this.checkParameter(propertyName, nbrFilterType)) {
      return [];
    }

    // filter array
    const filteredArr = [];
    searchString =
      typeof searchString === 'string'
        ? searchString.toLowerCase()
        : searchString;
    value.forEach((element) => {
      const prop: string = element[propertyName];
      const property = typeof prop === 'string' ? prop.toLowerCase() : prop;

      if (nbrFilterType === '' && typeof property === 'string') {
        // string column
        if (property.includes(searchString)) {
          console.log('add string', property, searchString);
          filteredArr.push(element);
        }
      } else {
        // number column
        if (this.filterNumbers(nbrFilterType, property, searchString)) {
          filteredArr.push(element);
        }
      }
    });
    console.log('filtered', filteredArr);
    return filteredArr;
  }

  /**
   * check PropertyName and Filtertype
   * @param propertyName
   * @param nbrFilterType
   */
  checkParameter(propertyName: string, nbrFilterType: string): boolean {
    let isOK = true;
    if (propertyName === null || propertyName === undefined) {
      isOK = false;
    }
    if (
      nbrFilterType !== '' &&
      nbrFilterType !== 'gt' &&
      nbrFilterType !== 'lt' &&
      nbrFilterType !== 'eq' &&
      nbrFilterType !== 'ge' &&
      nbrFilterType !== 'le'
    ) {
      isOK = false;
    }
    if (!isOK) {
      console.error('ERROR: FilterPipe called with wrong parameters!');
      console.error(
        'Use: filter:<fieldname>:<"gt|lt|eq|le|ge"> or filter:<fieldname> for using gt for filtering numbers, strings are filterd with contains'
      );
    }
    return isOK;
  }

  /**
   * filter number columns with gt, lt, eq, ge, le
   * @param nbrFilterType
   * @param property
   * @param searchString
   */
  filterNumbers(
    nbrFilterType: string,
    property: string,
    searchString: string
  ): boolean {
    let hasFiltered = false;
    switch (nbrFilterType) {
      case 'gt':
        if (Number.parseFloat(property) > Number.parseFloat(searchString)) {
          console.log('add gt', property, searchString);
          hasFiltered = true;
        }
        break;
      case 'lt':
        if (Number.parseFloat(property) < Number.parseFloat(searchString)) {
          console.log('add lt', property, searchString);
          hasFiltered = true;
        }
        break;
      case 'eq':
        if (Number.parseFloat(property) === Number.parseFloat(searchString)) {
          console.log('add eq', property, searchString);
          hasFiltered = true;
        }
        break;
      case 'ge':
        if (Number.parseFloat(property) >= Number.parseFloat(searchString)) {
          console.log('add ge', property, searchString);
          hasFiltered = true;
        }
        break;
      case 'le':
        if (Number.parseFloat(property) <= Number.parseFloat(searchString)) {
          console.log('add le', property, searchString);
          hasFiltered = true;
        }
        break;
      default:
        console.log('default - not added', property, searchString);
        break;
    }
    return hasFiltered;
  }
}
