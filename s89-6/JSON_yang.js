if ('과제 210427 5강 끝나고 과제') {
	
`
	[1,2,3,4,5,6,7].filter(it=>it%2).map(it=>it*2) // 7 번 + 4 번
	// 딱 7회만 돌 수 없을까?
	 과제 *****
	1. 과제 위의 예제를 7회로 해결하게 제네레이터를 작성하시오.
	yield* 를 쓰는 버전
	yield 를 쓰는 버전
	둘 다 쓰는 버전

`
	if('정답 1'){
		let i = 0;
		const filter = function*(arr, block){
		   for(const v of arr){
			 i++;
			 if(block(v)){
				 yield v;
			 }
		   }
		};
		const map = function*(arr, block){
		   for(const v of arr){
			 i++;
			 yield block(v);
		   }
		}
		const f = [...map(filter([1,2,3,4,5], v=>v%2), v=>v*2)];
		console.log(f)
		console.log(i)
	}
	if ('정답 2') {
		let i = 0;
		const copy = iter=>{
		  iter.filter = (block)=>copy((function*(){
			 for(const v of iter){
			   i++;
			   if(block(v)) yield v;
			 }
		  })());
		  iter.map = (block)=>copy((function*(){
			 for(const v of iter){
			   i++;
			   yield block(v);
			 }
		  })());
		  return iter;
		};
		const lazyArray = iter=>copy(iter);
		const f = [...lazyArray([1,2,3,4,5]).filter(v=>v%2).map(v=>v*2)];
		console.log(f, i);
		i = 0;
		const f2 = [...lazyArray([1,2,3,4,5]).filter(v=>{console.log('filter v: ', v);return v%2;}).map(v=>{console.log('map v: ', v);return v*2;})];
		console.log(f2, i);
	}
	if ('과제 1 - generator 는 습득이 0인 것 같아요....') {
		let i = 0;
		const copy = iter=>{
		  iter.filter = (block)=>copy((function*(){
			 for(const v of iter){
			   i++;
			   if(block(v)) yield v;
			   console.log('filter skip', v);
			 }
		  })());
		  iter.map = (block)=>copy((function*(){
			 for(const v of iter){
			   i++;
			   console.log('map ', i, v);
			   yield block(v);
			 }
		  })());
		  return iter;
		};
		const lazyArray = iter=>copy(iter);
		const f = [...lazyArray([1,2,3,4,5]).filter(v=>v%2).map(v=>v*2)];
		console.log(f, i);
		i = 0;
		const f2 = [...lazyArray([1,2,3,4,5]).filter(v=>{console.log('filter v: ', v);return v%2;}).map(v=>{console.log('map v: ', v);return v*2;})];
		console.log(f2, i);
	}
}
const stringify89_5_210427 = (obj => {
	// utils ====================================================
	const isDebug =_=>!1;
	const objToString = finalNode=>{
		let accStr = "";
		const obj = [];
		let curr = finalNode;
		if (isEmptyObject(curr)) {
			return "{}";
		}
		for (const v of curr) {
			if (!(v && Array.isArray(v) && v.length == 2)) {
				err('invalid request. ' + v);
			}
		}
		for (const v of curr) {
			accStr += "," + v[0] + ':' + v[1];
		}
		return "{" + accStr.substr(1) + "}";
	};
	const quote = str=>`\"${str}\"`;
	const _escape = {
		 table: [[/\"/g,'\\\"']
			,[/\t/g, '\\t']
			,[/[\r]/g, '\\r']
			,[/[\n]/g, '\\n']
			,[/[\l]/g, 'l']]
		,exe(str){
			let acc = str;
			for (const item of this.table) {
				acc = acc.replace(item[0], item[1]);
			}
			return acc;
		}
	};
	const NULL_STR = 'null';
	const DELIM = ',';
	const el = {
		table: {
			 "null":v=>NULL_STR
			,'undefined': v=>NULL_STR
			,'function': v=>NULL_STR
			,'symbol': v=>NULL_STR
			,'number': v=>v.toString()
			,'string': v=>quote(_escape.exe(v))
			,'array': v=>NULL_STR
			,'object': v=>NULL_STR
			,boolean: v=>v.toString()
		},
		stringifyRouter(item) {
			if (!this.table[typeof item]) {
				if (!item) {
					return this.table[NULL_STR](item);
				}
			} else {
				return this.table[typeof item](item);
			}
			
			//return (this.table[typeof item] ?? this.table[!item ? NULL_STR : Array.isArray(item) ? "array" : "object"])?.(item) ?? NULL_STR;
		}
	};
	const err = v=>{throw v;};
	
	//5강 끝난 후 보강
	const objEntries = function*(obj){
		for (const k in obj) if (obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	
	// 정답? =====
	/*const objEntries = function*(obj){
	  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};*/
	const accuToString = (acc, isObject) => { // 쌓여있는..	
	  let [START, END] = (isObject) ? "{}" : "[]";
	  let result = "";
	  if(acc && acc.prev){
		let curr = acc;
		do{
		   result = "," + (isObject ? `"${curr.value[0]}":${el.stringifyRouter(curr.value[1])}` : el.stringifyRouter(curr.value)) + result;
		}while(curr = curr.prev);
		result = result.substr(1);
	  }
	  return START + result + END;
	};
	const recursive = (iter, isObject, accu, prev) => {
	   const {done, value} = iter.next();
	   if(!done) {
		  const v = isObject ? value[1] : value;
		  switch(true){
		  case Array.isArray(v):
			  return recursive(v[Symbol.iterator](), false, null, {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev});
		  case v && typeof v == "object":
			  return recursive(objEntries(v), true, null, {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev});
		  default:
			  return recursive(iter, isObject, {
				 prev: accu
				 , value
			  }, prev);
		  }
		} else {
		   let accuStr = accuToString(accu, isObject);
		   console.log('debug ', accuStr);
		   if(prev) {
			 return recursive(prev.target, prev.isObject, {prev:prev.accu, value:prev.isObject ? [prev.k, accuStr] : accuStr}, prev.prev);
		   } else {
			 return accuStr;
		   }
		}
	};
	const stringify =v=>recursive(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), !Array.isArray(v), null, null);
	
	const loop = (iter, isObject)=> {
		
		const _err = true; // 무한루프 상태라서 막음....
		if (_err) {
			return "";
		}
		
		
		let accuStr;
		let accu;
		let prev;
		while(true) {
		  const {done, value} = iter.next();
		   if(!done) {
			  const v = isObject ? value[1] : value;
			  switch(true){
			  case Array.isArray(v):
				  prev = {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev};
				  iter = v[Symbol.iterator]();
				  isObject = false;
				  accu = null;
				  break;
			  case v && typeof v == "object":
				  prev = {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev};
				  iter = objEntries(v);
				  isObject = true;
				  accu = null;
				  break;
			  default:
				  accu = {
					 prev: accu
					 , value
				  };
			  }
			} else {
			   accuStr = accuToString(accu, isObject);
			   console.log('debug ', accuStr);
			   if(prev) {
				 accu = {prev:prev.accu, value:prev.isObject ? [prev.k, accuStr] : accuStr};
				 iter = prev.target;
				 isObject = prev.isObject;
			   } else {
				 break;
			   }
			}
		}
		
		return accuStr;
	};
	const stringify2For =v=>loop(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), !Array.isArray(v), null, null);
	
	
    return {
		  stringify
		, stringify2For
	}
})();
const test_stringify = (f, v, isDebug = true)=>{
	if (!v) return console.log(`Invalid arg. v: '${v}'`);
	let logs = [`\n[s]${f['name']} ====`
		, `\n\tJSON.stringify와 일치: ${f(v) == JSON.stringify(v)}`, (f(v) == JSON.stringify(v) ? '' : '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		, '\n\tQ문제            ', v];
	if (isDebug) logs = logs.concat([
		  '\n\t답안             ', f(v)
		, '\n\tJSON.stingify    ', JSON.stringify(v)]);
	logs.push('\n[e]========');
	console.log(...logs);
};

console.log('\n\n====\n\n');
test_stringify(stringify89_5_210427.stringify, []);
test_stringify(stringify89_5_210427.stringify, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_5_210427.stringify, [,'test', 1]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_5_210427.stringify, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(stringify89_5_210427.stringify, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_5_210427.stringify, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_5_210427.stringify, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
if (false) {
test_stringify(stringify89_5_210427.stringify2For, []);
test_stringify(stringify89_5_210427.stringify2For, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_5_210427.stringify2For, [,'test', 1]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_5_210427.stringify2For, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(stringify89_5_210427.stringify2For, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_5_210427.stringify2For, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_5_210427.stringify2For, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
}