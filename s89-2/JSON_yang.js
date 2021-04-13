// _v0_3_210411 수업 듣고 개선 버전
const stringify210413 = (arr => {
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
			,'array': v=>{}//v=>'[' + _arrayStringify(v) + ']'
			,'object': v=>NULL_STR
			,boolean: v=>v.toString()
		},
		stringifyRouter(item) {
			return (this.table[typeof item] ?? this.table[!item ? NULL_STR : Array.isArray(item) ? "array" : "object"])?.(item) ?? NULL_STR;
		}
	};
	const _arrayStringify = (arr, acc, i)=>{
		isDebug() && console.log('debug', i, item, acc);
		if (i == arr.length) {
			console.log('acc ===> ', acc);
		}
		return i < arr.length ? acc + _arrayStringify(arr, `,${el.stringifyRouter(arr[i])}`, i + 1) : acc;
	};
    const arrayStringify = arr => {
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
        return 0 < arr.length ? '[' + _arrayStringify(arr, '', 0) + ']' : '[]';
    };
	
	const _arrayStringifyTail = (arr, acc, i)=>{
		const item = arr[i];
		return i < arr.length ? _arrayStringifyTail(arr, acc + `,${el.stringifyRouter(item)}`, i + 1) : `${acc.substr(1)}`;
	};
    const arrayStringifyTail = arr => {
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
        return 0 < arr.length ? '[' + _arrayStringifyTail(arr, '', 0) + ']' : '[]';
    };
	
	const EMPTY = {};
    const arrayStringifyFor = arr => {
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
		let result = EMPTY;
		if(arr.length == 0) result = "[]";
		else {
			let acc = "", i = 0;
			while(i < arr.length) {
				acc += `,${el.stringifyRouter(arr[i])}`;
				i = i + 1; // 바디에서 결정됐지 문에서 계획하지 않았다..
			}
			result = `[${acc.substr(1)}]`;
		}
		if (result === EMPTY) throw "no processed";
		return result;
	};
    return {
		arrayStringify
		, arrayStringifyTail
		, arrayStringifyFor
	}
})();
const test_stringify = (f, v)=>{
	if (!v) return console.log(`Invalid arg. v: '${v}'`);
	console.log(`\n[s]${f['name']} ====`
		, `\n\tJSON.stringify와 일치: ${f(v) == JSON.stringify(v)}`, (f(v) == JSON.stringify(v) ? '' : '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		, '\n\tQ문제            ', v
		, '\n\t답안             ', f(v)
		, '\n\tJSON.stingify    ', JSON.stringify(v)
		, '\n[e]========');
};
test_stringify(stringify210413.arrayStringify, []);
test_stringify(stringify210413.arrayStringify, [,'test', 1]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify210413.arrayStringify, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(stringify210413.arrayStringifyTail, []);
test_stringify(stringify210413.arrayStringifyTail, [,'test', 1]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify210413.arrayStringifyTail, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(stringify210413.arrayStringifyFor, []);
test_stringify(stringify210413.arrayStringifyFor, [,'test', 1]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"c", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"\rc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"\lc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"\r\nc", true, null, _=>3]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(stringify210413.arrayStringifyFor, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);