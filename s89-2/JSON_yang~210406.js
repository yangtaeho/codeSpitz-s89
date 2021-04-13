const arrayStringify = (arr => {
	const quote = str=>`\"${str}\"`;
	const _escape = str=>str.replace(/\"/g,'\\\"');
	const NULL_STR = 'null';
    const _arrayStringify = (arr) => {
		let acc = [];
        for (const item of arr) {
            //const item = obj[k];
            //console.log('k', k, 'item', item);
            //console.log('item', item);
			switch(typeof item) {
				case 'undefined':
				case 'function':
				case 'symbol':
					acc.push(NULL_STR);
					break;
				case 'number':
					acc.push(item);
					break;
				case 'string':
					acc.push(quote(_escape(item)));
					break;
				case 'object':
					if (item instanceof Array) {
						acc.push('[' + _arrayStringify(item) + ']');
					} else if (item == null) {
						acc.push(NULL_STR);
					}
					break;
				default:
					acc.push(item);
					break;
			}
        }
		return acc.join(',');
    }
	let acc = [];
    const arrayStringify = arr => {
		acc = [];
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
        return '[' + _arrayStringify(arr) + ']';
    }
    return arrayStringify;
})();
const arrayStringifyTail = (arr => {
	const quote = str=>`\"${str}\"`;
	const _escape = str=>str.replace(/\"/g,'\\\"');
	const NULL_STR = 'null';
	const _arrayStringify = (arr, acc, i)=>{
		if (i < arr.length) {
			const item = arr[i];
            //const item = obj[k];
            //console.log('k', k, 'item', item);
            //console.log('item', item);
			switch(typeof item) {
				case 'undefined':
				case 'function':
				case 'symbol':
					acc.push(NULL_STR);
					break;
				case 'number':
					acc.push(item);
					break;
				case 'string':
					acc.push(quote(_escape(item)));
					break;
				case 'object':
					if (item instanceof Array) {
						acc.push('[' + _arrayStringify(item, [], 0) + ']');
					} else if (item == null) {
						acc.push(NULL_STR);
					}
					break;
				default:
					acc.push(item);
					break;
			}
			return _arrayStringify(arr, acc, i + 1);
		} else {
			return '[' + acc.join(',') + ']';
		}
	}
	let acc = [];
    const arrayStringify = arr => {
		acc = [];
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
        return '[' + _arrayStringify(arr, acc, 0) + ']';
    }
    return arrayStringify;
})();
const arrayStringifyFor = (arr => {
	const quote = str=>`\"${str}\"`;
	const _escape = str=>str.replace(/\"/g,'\\\"');
	const NULL_STR = 'null';
    const _arrayStringify = (arr, acc) => {
        for (let i = 0; i < arr.length; i = i + 1) {
			const item = arr[i];
            //const item = obj[k];
            //console.log('k', k, 'item', item);
            //console.log('item', item);
			switch(typeof item) {
				case 'undefined':
				case 'function':
				case 'symbol':
					acc.push(NULL_STR);
					break;
				case 'number':
					acc.push(item);
					break;
				case 'string':
					acc.push(quote(_escape(item)));
					break;
				case 'object':
					if (item instanceof Array) {
						acc.push('[' + _arrayStringify(item) + ']');
					} else if (item == null) {
						acc.push(NULL_STR);
					}
					break;
				default:
					acc.push(item);
					break;
			}
        }
		return '[' + acc.join(',') + ']';
    }
	let acc = [];
    const arrayStringify = arr => {
		acc = [];
		if (!arr instanceof Array) {
			throw `Invalid argument. ${arr}`;
		}
        return _arrayStringify(arr, acc);
    }
    return arrayStringify;
})();
const test_stringify = (f, v)=>{
	if (!v) return console.log(`Invalid arg. v: '${v}'`);
	console.log(`\n[s]${f['name']} :: res: ${f(v) == JSON.stringify(v)}\n`, '\nQUES    ', v, '\nJSON    ', JSON.stringify(v), '\nSTDY    ', f(v), '\n===[e]');
};
test_stringify(arrayStringify, []);
test_stringify(arrayStringify, [,'test', 1]);
test_stringify(arrayStringify, [1, "ab\"c", true, null, _=>3]);
test_stringify(arrayStringify, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(arrayStringify, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(arrayStringifyTail, []);
test_stringify(arrayStringifyTail, [,'test', 1]);
test_stringify(arrayStringifyTail, [1, "ab\"c", true, null, _=>3]);
test_stringify(arrayStringifyTail, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(arrayStringifyTail, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
test_stringify(arrayStringifyFor, []);
test_stringify(arrayStringifyFor, [,'test', 1]);
test_stringify(arrayStringifyFor, [1, "ab\"c", true, null, _=>3]);
test_stringify(arrayStringifyFor, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
test_stringify(arrayStringifyFor, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);