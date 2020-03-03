const ref = require('ref-napi');

const size = 4;
const buf = Buffer.alloc(4 * size);

buf.writeInt32LE(4, 0);
buf.writeInt32LE(3, 4);
buf.writeInt32LE(2, 8);
buf.writeInt32LE(1, 12);

console.log(buf.hexAddress());

buf.type = ref.types.int32;

console.log(buf.deref());
console.log(buf);
// 测试 node-ffi-napi
const ffi = require('ffi-napi');

const intPtr = ref.refType(ref.types.int);
const intPtrPtr = ref.refType(intPtr);
const int32Ptr = ref.refType(ref.types.int32);
const int32PtrPtr = ref.refType(int32Ptr);
// buf.type = int32Ptr;

const libm = ffi.Library('mydll.dll', {
  myAdd: ['string', ['int', 'int', 'string', 'int']],
  mySub: ['int', ['int', 'int']]
});

let buffer = Buffer.alloc(20);
console.log(buffer);
// var actualString = ref.readCString(buffer, 0);
// console.log(actualString);
console.log('js start to call libm.myAdd');
const addResult = libm.myAdd(6, 5, buffer, 10);
console.log('addResult is:');
console.log(addResult, typeof addResult);
console.log('buffer is', buffer); // 这个buffer存储的还是控制，并未改变
// console.log(ref.readCString(addResult, 0));
const subResult = libm.mySub(10, 7);

// 测试使用结构体和结构体指针，结构体里有其他结构体，复合结构体
const StructType = require('ref-struct-napi');

const time_t = ref.types.int;
const suseconds_t = ref.types.long;

const TTVal = StructType({
  aa: time_t,
  bb: time_t
});
const TimeVal = StructType({
  tv_sec: time_t,
  tv_usec: time_t,
  tt: TTVal
});

const TimeValPtr = ref.refType(TimeVal);
const lib = new ffi.Library('mydll', {
  gettimeofday: ['void', [TimeValPtr]]
});
let tv = new TimeVal();
lib.gettimeofday(tv.ref());
console.log(
  'tv.tv_sec:',
  tv.tv_sec,
  'tv.tv_usec:',
  tv.tv_usec,
  ',tv.tt.aa:',
  tv.tt.aa,
  ',tv.tt.bb:',
  tv.tt.bb
);
console.log(tv);

// console.log(`addResult:${addResult}, subResult:${subResult}`);

// const libm = ffi.Library('mydll.dll', {
//   Add: ['int', ['int', 'int']],
//   Sub: ['int', ['int', 'int']]
// });

// const addResult = libm.Add(6, 5);
// const subResult = libm.Sub(10, 7);
// console.log(`addResult:${addResult}, subResult:${subResult}`);

// const libm = ffi.Library('mydll', {
//   Add: ['int', ['int', 'int']],
//   Sub: ['int', ['int', 'int']],
//   printArray: ['int', [intPtr, 'int']],
//   create_array: [int32Ptr, ['int']],
//   getMemory: ['int', [intPtrPtr, 'int']],
//   getMemory2: ['int', [int32Ptr, 'int']],
//   get_md5_string: ['void', ['string', 'int']]
// });
// const buf2 = Buffer.alloc(ref.sizeof.pointer);
// ref.writePointer(buf2, 0, buf);

// let buffer = Buffer.alloc(20);
// //buffer.type = ref.types.CString;
// libm.get_md5_string(buffer, 20);
// console.log(buffer);
// var actualString = ref.readCString(buffer, 0);
// console.log(actualString);
// buffer.type = ref.types.int8;
// console.log(buffer);
// buffer.type = ref.types.int16;
// console.log(buffer);
// console.log(buffer.readInt8());
// console.log(buffer.readInt16BE(0));
// console.log(buffer.readInt32BE(0));

// libm.getMemory2(buf, size);
// console.log(buf);
// console.log(buf.length);
// const addresult = libm.Add(6, 5);
// const subresult = libm.Sub(10, 7);
// console.log(
//   'typeof addresult:',
//   typeof addresult,
//   ',addresult=',
//   addresult,
//   ',typeof subresult:',
//   typeof subresult,
//   ',subresult=',
//   subresult
// );
// libm.printArray(buf, size);
// console.log('bbbbbbbbbbbbbbbbbbb');
// buf.type = intPtr;
// console.log(buf);
// libm.getMemory(buf, size);
// console.log(buf);
// const int32Ptr = ref.refType(ref.types.int32);
// const int32PtrPtr = ref.refType(int32Ptr);
// let arrPtr = ref.alloc(int32Ptr);
// let arr = libm.create_array(5);
// console.log(arr);
// console.log(arr.length);
// console.log('aaaaaaaaaaaaaaa');

// let dbPtr = ref.alloc(intPtr);
// console.log(dbPtr);
// let dbPtrPtr = ref.alloc(intPtrPtr);
// let dbHandle = dbPtrPtr.deref(); // dbHandle 是 Buffer 实例
// console.log(dbHandle);
// // let dbHandle2 = dbHandle.from([11, 22, 33, 44]);
// console.log(dbHandle.type);
// libm.getMemory(dbPtrPtr, 4);
// let dbHandle = dbPtrPtr.deref();
// console.log('dbHandle', dbHandle);
// for (let i = 0; i < 4; i++) {
//   console.log(dbHandle.readInt32LE(i * 4));
// }
// console.log(dbHandle.readInt32LE(0));
