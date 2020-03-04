const ffi = require('ffi-napi');
const ref = require('ref-napi');

// 测试 vs 的 dll
const bytePtr = ref.refType(ref.types.uchar);
const dwPtr = ref.refType(ref.types.ulong);
const voidPtr = ref.refType(ref.types.void);
const uintPtr = ref.refType(ref.types.uint);
// 结构体
const StructType = require('ref-struct-napi');

const int = ref.types.int;
const char = ref.types.char;
const double = ref.types.double;
const uint = ref.types.uint;
const byte = ref.types.uchar;
const stringType = ref.types.CString;

const TempInfo = StructType({
  nChannelID: int,
  nAction: int,
  szName: stringType,
  PTS: double,
  nEventID: int,
  nPresetID: uint,
  nSequence: uint,
  nEventRelevanceID: uint,
  byReserved: stringType
});

const TempInfoPtr = ref.refType(TempInfo);

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
      TempInfoPtr,
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

// 测试使用结构体和结构体指针
// const lib = new ffi.Library('mydll', {
//   gettimeofday: ['void', [TimeValPtr]]
// });
// let tv = new TimeVal();
// lib.gettimeofday(tv.ref());

let tv = new TempInfoPtr();
libFetchPictureAndTemp.CICDI_CLIENT_FetchPicture_DetectTemp(
  0,
  1,
  1,
  true,
  110,
  voidVar,
  tv.ref(),
  buffer5,
  buffer5Size
);
console.log(buffer5);
const bb = buffer5Size.deref();
console.log('buffer5Size.deref()', bb);
console.log('tv', tv);
