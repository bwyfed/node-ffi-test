const ffi = require('ffi-napi');
const ref = require('ref-napi');

// 测试 vs 的 dll
const bytePtr = ref.refType(ref.types.uchar);
const dwPtr = ref.refType(ref.types.ulong);
const voidPtr = ref.refType(ref.types.void);
const uintPtr = ref.refType(ref.types.uint);
const libFetchPictureAndTemp = ffi.Library('fetchPictureAndTemp.dll', {
  Add: ['int', ['int', 'int']],
  testInvokeCallback: ['void', ['int', 'int', bytePtr, dwPtr]],
  CICDI_CLIENT_FetchPicture_DetectTemp: [
    'int',
    [
      'longlong',
      'int',
      'ulong',
      'bool',
      'uint',
      voidPtr,
      voidPtr,
      bytePtr,
      uintPtr
    ]
  ]
});
const libFetchPictureAndTempResult = libFetchPictureAndTemp.Add(2, 3);
console.log('libFetchPictureAndTempResult:', libFetchPictureAndTempResult);
console.log('js call testInvokeCallback');

const allocSize = 10;
const buffer4 = Buffer.alloc(allocSize);
const outSizePtr = ref.alloc(ref.types.ulong);
libFetchPictureAndTemp.testInvokeCallback(9, 8, buffer4, outSizePtr);
console.log('buffer4', buffer4);
const aa = outSizePtr.deref();
console.log('outSizePtr->', aa);

let voidVar = ref.alloc(voidPtr);
let voidOutVar = ref.alloc(voidPtr);
let byteOutVar = ref.alloc(bytePtr);
const buffer5 = Buffer.alloc(12); // 分配空间
let buffer5Size = ref.alloc(ref.types.uint); // 这里千万不要写成ref.alloc(uintPtr)
libFetchPictureAndTemp.CICDI_CLIENT_FetchPicture_DetectTemp(
  0,
  1,
  1,
  true,
  110,
  voidVar,
  voidOutVar,
  buffer5,
  buffer5Size
);
console.log(buffer5);
const bb = buffer5Size.deref();
console.log('buffer5Size.deref()', bb);
