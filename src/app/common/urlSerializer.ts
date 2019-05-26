/*
By default, routing is case sensitive in angular
this helper class asking whatever URL that comes in, splits every segment by /
and uppercases the first letter, while keeping the rest of the casing as it was.
*/

import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
export class TitleCaseUrlSerializer extends DefaultUrlSerializer {  
    public parse(url: string): UrlTree {
        function toTitleCase(url) {
            return url.split('/')
                       .map(segment => segment ? 
                                       segment[0].toUpperCase() + segment.substr(1) : 
                                       segment)
                       .join('/');
        }

        return super.parse(toTitleCase(url));
    }
}

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {
        return super.parse(url.toLowerCase());
    }
}
