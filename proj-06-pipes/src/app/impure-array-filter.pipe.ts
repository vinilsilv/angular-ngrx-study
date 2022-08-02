import { Pipe, PipeTransform } from '@angular/core';
import { ArrayFilterPipe } from './array-filter.pipe';

@Pipe({
  name: 'impureArrayFilter',
  pure: false
})
export class ImpureArrayFilterPipe extends ArrayFilterPipe {

  

}
