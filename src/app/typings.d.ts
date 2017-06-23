declare const __API__: string;
declare const __TOKEN_KEY__: string;

interface NumberConstructor {
  isNumber: (_: any) => boolean;
}

interface Object {
  eachOwnProp: (handler: (el: any) => void) => void;
}