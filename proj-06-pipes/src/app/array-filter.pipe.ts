import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.length === 0 || args === undefined) {
      return value
    }

    let filter = args.toLocaleLowerCase()
    return value.filter(
      (v:any) => v.toLocaleLowerCase().indexOf(filter) != -1
    )
  }

}
