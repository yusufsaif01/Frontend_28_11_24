import { HttpParameterCodec } from '@angular/common/http';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  constructor() {}

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return encodeURIComponent(value);
  }
}
