const stringify89_3_210413 = (arr => {
	// utils ====================================================
	const isDebug =_=>!1;
	
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
			,'array': v=>'[' + _arrayStringifyTail(v) + ']'
			,'object': v=>NULL_STR
			,boolean: v=>v.toString()
		},
		stringifyRouter(item) {
			/* */
			if (!this.table[typeof item]) {
				if (!item) {
					return this.table[NULL_STR](item);
				} else {
					if (Array.isArray(item)) {
						return this.table["array"](item);
					} else {
						return this.table["object"](item);
					}
				}
			} else {
				return this.table[typeof item](item);
			}
			/* */
			
			//return (this.table[typeof item] ?? this.table[!item ? NULL_STR : Array.isArray(item) ? "array" : "object"])?.(item) ?? NULL_STR;
		}
	};
	const arrValidator = arr=>{if(!Array.isArray(arr)) throw "invalid arr";};
	const err = v=>{throw v;};
	
	// logic 꼬리 재귀 ====================================================
	const _arrayStringifyTail = (arr, i, acc, stack)=>{
		if (i < arr.length) {
			const item = arr[i];
			if (Array.isArray(item)) {
				stack.push([arr, i, acc]);
				return _arrayStringifyTail(item, 0, '', stack);
			} else {
				return _arrayStringifyTail(arr, i + 1, acc + `,${el.stringifyRouter(item)}`, stack);
			}
		} else {
			if (0 < stack.length) {
				if (stack[stack.length -1].length != 3) {
					err(`invalid stack. i: ${i}, stack: ${stack}`);
				}
				var [arr, i, _acc] = stack.pop();
				return _arrayStringifyTail(arr, i + 1, _acc  + `,[${acc.substr(1)}]`, stack);
			} else {
				return `${acc.substr(1)}`;
			}
		}
	};
    const arrayStringifyTail = arr => {
		arrValidator(arr);
        return arr.length <= 0 ? '[]' : `[${_arrayStringifyTail(arr, 0, '', [])}]`;
    };
	
	
	
	// logic 반복문.... 재귀 제거 실패 ==> 수정  ====================================================
	const _arrayStringifyFor = (arr, i, acc, stack)=> {
		let cnt = 0;
		const limit = 40000;
		while(true && cnt < limit) {
			if (i < arr.length) {
				const item = arr[i];
				if (Array.isArray(item)) {
					stack.push([arr, i, acc]);
					arr = item;
					i = 0;
					acc = '';
				} else {
					arr = arr;
					i = i + 1
					acc = acc + `,${el.stringifyRouter(item)}`;
					stack = stack;
				}
			} else {
				if (0 < stack.length) {
					if (stack[stack.length -1].length != 3) {
						err(`invalid stack. i: ${i}, stack: ${stack}`);
					}
					var [arr, i, _acc] = stack.pop();
					arr = arr;
					i = i + 1;
					acc = _acc  + `,[${acc.substr(1)}]`;
					stack = stack;
				} else {
					return `[${acc.substr(1)}]`;
				}
			}
			cnt++;
		}
	};
	const EMPTY = '-9999';
    const arrayStringifyFor = arr => {
		arrValidator(arr);
		let result = EMPTY;
		result = _arrayStringifyFor(arr, 0, '', []);
		if (result === EMPTY) throw "no processed";
		return result;
	};
    return {
		  arrayStringifyTail
		, arrayStringifyFor
	}
})();
/**
 * 수업 이후 개선 버전
 */
const stringify89_3_210420 = (arr => {
	// utils ====================================================
	const isDebug =_=>!1;
	const arrToString = finalNode=>{
		let accStr = "";
		const arr = [];
		let curr = finalNode;
		if (!(curr && curr.value && curr.prev)) {
			return "[" + accStr + "]";
		}
		do {
			arr.unshift(curr.value);
		}while(curr = curr.prev);
		for (const v of arr) accStr += "," + v;
		return "[" + accStr.substr(1) + "]";
	}
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
			,'array': v=>v + ''
			,'object': v=>NULL_STR
			,boolean: v=>v.toString()
		},
		stringifyRouter(item) {
			/* */
			if (!this.table[typeof item]) {
				if (!item) {
					return this.table[NULL_STR](item);
				} else {
					if (Array.isArray(item)) {
						return this.table["array"](item);
					} else {
						return this.table["object"](item);
					}
				}
			} else {
				return this.table[typeof item](item);
			}
			/* */
			
			//return (this.table[typeof item] ?? this.table[!item ? NULL_STR : Array.isArray(item) ? "array" : "object"])?.(item) ?? NULL_STR;
		}
	};
	const err = v=>{throw v;};
	
	// logic 꼬리 재귀 ====================================================
	const _arrayStringifyTail = (arr, i, acc, prev)=>{
		if (i < arr.length) {
			const item = arr[i];
			if (Array.isArray(item)) {
				return _arrayStringifyTail(item, 0, null, [arr, i + 1, acc, prev]);
			} else {
				return _arrayStringifyTail(arr, i + 1, {prev:acc, value: el.stringifyRouter(item)}, prev);
			}
		} else {
			const accStr = arrToString(acc);
			if (prev) {
				const [prevArr, prevIndex, prevAcc, prevPrev] = prev;
				return _arrayStringifyTail(prevArr, prevIndex, {prev:prevAcc, value: accStr}, prevPrev);
			} else {
				return accStr;
			}
		}
	};
    const arrayStringifyTail = arr => _arrayStringifyTail(arr, 0, null, null);
	
	
	
	// logic 반복문.... 재귀 제거 실패 ==> 수정  ====================================================
	const _arrayStringifyFor = (arr, i, acc, prev)=> {
		let cnt = 0;
		const limit = 40000;
		while(true && cnt < limit) {
			if (i < arr.length) {
				const item = arr[i];
				if (Array.isArray(item)) {
					prev = [arr, i + 1, acc, prev];
					acc = null;
					i = 0;
					arr = item;
					continue;
				} else {
					prev = prev;
					acc = {prev:acc, value: el.stringifyRouter(item)};
					i = i + 1;
					arr = arr;
					continue;
				}
			} else {
				const accStr = arrToString(acc);
				if (prev) {
					const [prevArr, prevIndex, prevAcc, prevPrev] = prev;
					prev = prevPrev;
					acc = {prev:prevAcc, value: accStr};
					i = prevIndex;
					arr = prevArr;
				} else {
					acc = accStr;
					break;
				}
			}
		}
		return acc;
	};
	const EMPTY = '-9999';
    const arrayStringifyFor = arr => {
		result = _arrayStringifyFor(arr, 0, null, null);
		return result;
	};
    return {
		  arrayStringifyTail
		, arrayStringifyFor
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

test_stringify(stringify89_3_210420.arrayStringifyTail, []);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1,2,[3,4],5,[6,[7,[8]]]], true);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_3_210420.arrayStringifyTail, [,'test', 1]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"c", true, null, _=>3], true);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_3_210420.arrayStringifyTail, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
console.log('\n\n====\n\n');
test_stringify(stringify89_3_210420.arrayStringifyFor, []);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1,2,[3,4],5,[6,[7,[8]]]], true);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
test_stringify(stringify89_3_210420.arrayStringifyFor, [,'test', 1]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify89_3_210420.arrayStringifyFor, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
console.log('\n\n====\n\n');