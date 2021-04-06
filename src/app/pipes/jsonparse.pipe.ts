import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'JsonParse' })
export class JsonParsePipe implements PipeTransform {
    transform(value: string): number {
        if (value)
            return JSON.parse(value);
    }
}
