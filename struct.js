const ffi = require('ffi-napi');
const ref = require('ref-napi');
const StructType = require('ref-struct-napi');

const int = ref.types.int;
const char = ref.types.char;
const charPtr = ref.refType(char);
const double = ref.types.double;
const uint = ref.types.uint;
const byte = ref.types.uchar;
const bytePtr = ref.refType(byte);
const TempInfoType = StructType({
  nChannelID: int,
  nAction: int,
  // szName: charPtr, // 不知道如何处理结构体中的字符串成员和数组成员
  PTS: double,
  nEventID: int,
  nPresetID: uint,
  nSequence: uint,
  nEventRelevanceID: uint
  // byReserved: bytePtr
});
const TempInfoTypePtr = ref.refType(TempInfoType);

const libm = ffi.Library('testdll', {
  getStructData: ['void', [TempInfoTypePtr]]
});

const tv = new TempInfoType();
libm.getStructData(tv.ref());
console.log(
  tv.nChannelID,
  tv.nAction,
  tv.PTS,
  tv.nEventID,
  tv.nPresetID,
  tv.nSequence,
  tv.nEventRelevanceID
);
