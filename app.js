const ffi = require('ffi-napi');
const ref = require('ref-napi');

// 测试 vs 的 dll
const bytePtr = ref.refType(ref.types.uchar);
const dwPtr = ref.refType(ref.types.ulong);
const libFetchPictureAndTemp = ffi.Library('fetchPictureAndTemp.dll', {
  Add: ['int', ['int', 'int']],
  testInvokeCallback: ['void', ['int', 'int', bytePtr, dwPtr]]
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
