if ('과제') {
	
Object.entries({}); //허용, 안쓰는 거 추천
`
const abc = {_1:3, b:"abc"}; //[] x, {} x
stringify(abc)==JSON.stringify(abc)
`
}
const stringify89_4_210420 = (obj => {
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
	const arrToString = finalNode=>{
		let accStr = "";
		const arr = [];
		let curr = finalNode;
		if (!(curr && curr.value && curr.prev)) {
			return "[" + accStr + "]";
		}
		do{
			arr.unshift(curr.value);
		}while(curr = curr.prev);
		for (const v of arr) accStr += "," + v;
		return "[" + accStr.substr(1) + "]";
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
	const arrValidator = arr=>{if(!Array.isArray(arr)) throw "invalid arr";};
	const objValidator = v=>{if(Array.isArray(v) || typeof v != 'object') throw "invalid obj";};
	const isEmptyObject = v=>Object.keys(v).length == 0 && v.constructor == Object;
	
	// logic 꼬리 재귀 ====================================================
	const _stringifyTail =  (arr, i, acc) => {
		if (i < arr.length) {
			const item = arr[i];
			acc.push([el.stringifyRouter(item[0]), el.stringifyRouter(item[1])]);
			return _stringifyTail(arr, i + 1, acc);
		} else {
			return objToString(acc);
		}
	};
    const stringifyTail = ( obj )=> {
		objValidator(obj);
		const arr = [];
		for (const k in obj) {
			arr.push([k, obj[k]]);
		}
		return _stringifyTail(arr, 0, []);
	};
	
	
	
	// logic 반복문.... 재귀 제거 실패 ==> 수정  ====================================================
	const _stringifyFor = (arr, i, acc, prev)=> {
		const limit = 40000;
		while(i < arr.length && i < limit) {
			const item = arr[i];
			acc.push([el.stringifyRouter(item[0]), el.stringifyRouter(item[1])]);
			i = i + 1;
		}
		return objToString(acc);
	};
	const EMPTY = '-9999';
    const stringifyFor = obj => {
		objValidator(obj);
		const arr = [];
		for (const k in obj) {
			arr.push([k, obj[k]]);
		}
		return _stringifyFor(arr, 0, []);
	};
	
	
	//5강 끝난 후 보강
	const objEntries = function*(obj){
		for (const k in obj) if (obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	
	// logic 꼬리 재귀 #2 ====================================================
	const _stringifyTailIter =  (iter, acc) => {
		const {done, value:[k, v] = []} = iter.next();
		if (done) {
			return objToString(acc);
		} else {
			if (acc == null) acc = [];
			acc.push([el.stringifyRouter(k), el.stringifyRouter(v)]);
			return _stringifyTailIter(iter, acc);
		}
	};
    const stringifyTailIter = ( obj )=> {
		objValidator(obj);
		return _stringifyTailIter(objEntries(obj), null);
	};
	
	// logic 반복문.... 재귀 제거 실패 ==> 수정 #2  ====================================================
	
	const _stringifyForIter = (iter, prev)=> {
		const acc = [];
		while(true) {
			const {done, value:[k, v] = []} = iter.next();
			if (done) {
				break;
			}
			acc.push([el.stringifyRouter(k), el.stringifyRouter(v)]);
		}
		return objToString(acc);
	};
    const stringifyForIter = obj => {
		objValidator(obj);
		return _stringifyForIter(objEntries(obj), null);
	};
    return {
		  stringifyTail
		, stringifyFor
		, stringifyTailIter
		, stringifyForIter
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

const _block = 1;
const _block2 = 0;
if(!_block){
test_stringify(stringify89_4_210420.stringifyTail, []);
test_stringify(stringify89_4_210420.stringifyTail, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_4_210420.stringifyTail, [,'test', 1]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"c", true, null, _=>3], true);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_4_210420.stringifyTail, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
}
test_stringify(stringify89_4_210420.stringifyTail, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_4_210420.stringifyTail, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_4_210420.stringifyTail, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
if(!_block){
test_stringify(stringify89_4_210420.stringifyFor, []);
test_stringify(stringify89_4_210420.stringifyFor, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_4_210420.stringifyFor, [,'test', 1]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_4_210420.stringifyFor, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
}
if(!_block2){
test_stringify(stringify89_4_210420.stringifyFor, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_4_210420.stringifyFor, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_4_210420.stringifyFor, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
}
if(!_block){
test_stringify(stringify89_4_210420.stringifyTailIter, []);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_4_210420.stringifyTailIter, [,'test', 1]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"c", true, null, _=>3], true);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_4_210420.stringifyTailIter, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
}
test_stringify(stringify89_4_210420.stringifyTailIter, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_4_210420.stringifyTailIter, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_4_210420.stringifyTailIter, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
if(!_block){
test_stringify(stringify89_4_210420.stringifyForIter, []);
test_stringify(stringify89_4_210420.stringifyForIter, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_4_210420.stringifyForIter, [,'test', 1]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_4_210420.stringifyForIter, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
}
if(!_block2){
test_stringify(stringify89_4_210420.stringifyForIter, {_1:3, b:"abc", 3:true, true: '5'});
test_stringify(stringify89_4_210420.stringifyForIter, {_1:[1], _3: 3, 4: '5', 6: true});
test_stringify(stringify89_4_210420.stringifyForIter, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
}