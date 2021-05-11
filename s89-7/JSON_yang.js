if ('과제 210504 6강 끝나고 과제') {
	
`
	과제 1 - 모든 값 타입을 인식하여 파싱하는 중첩된 배열 문자열 파서
	"[2, \"ㄹㅏㄹ\", [2, \"ㅕㅕ\"], [3, "4"]]"
	과제 2 -  나만의 클래스타입을 인식하여 해당 클래스의 인스턴스를 만들어 넣어주는 기능 추가
	과제 3 - 기존 작성한 stringify 가 오브젝트인 경우 toJSON을 구현하고 있으면 그걸 이용해 stringify가 되도록 보수
	과제 4 - date의 json인 경우 date로 복원한다
		----> new Date().toJSON()
				"2021-04-27T14:26:57.816Z"
				[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/
				---> 입문용 간단한 정규식이다...

	과제1 모든 타입을 인식하는 배열파서
	과제2 나만의 클래스타입을 인식하여 해당 클래스의 인스턴스를 만들어 넣어주는 기능추가
	과제3 기존 작성한 stringify가 오브젝트인 경우 toJSON을 구현하고 있으면 그걸 이용해 stringify가 되도록 보수
	과제4 date의 json인 경우 date로 복원한다
`
	if('과제 1'){
		//stringify89_6_210504.parse
	}
	if ('과제 2') {
		
		/*
		const cls = "Test";
		const instance = (new Function("", `return new ${cls}();`))();
		
		
		class Test2 {
			constructor (v, v2, v3) {
				console.log(v, v2, v3);
			}
		}
		{
			const defineClass = (constructor, params) => (new Function('...params', `return new ${constructor}(...params);`))
			const instance = defineClass('Test2')(1, 2, 3);
			console.log("instance: ", instance);
		}
		*/
	}
	if ('과제 3') {
		//stringify89_6_210504.stringify
	}
	if ('과제 4') {
	}
}
const parse89_6_210504 = (obj => {
	
	const getObj = {
		table: {
			 'number': /^\s*([0-9]+)\s*,?/
			,'string': /^\s*([^0-9][\S\s]+)*,?/
		},
		exec(v){
			let destType;
			let _v = null;
			let res;
			for (const type in this.table) {
				const _res = this.table[type].exec(v);
				if (_res == null) {
					continue;
				}
				destType = type;
				res = _res;
				switch(type){
					case 'number': _v = parseFloat(_res[1]);
						break;
					case 'string': _v = `"${_res[1]}"`;
						break;
					default: _v = _res[1];
						break;
				}
				return [_res[0], _v];
			}
			return v;
		}
	};
	
	const _parse = (str, acc, stack)=> {
		const v = str.trim();
		if (!v) return acc;
		switch(v[0]){
			case '[':
				stack.push(acc);
				return _parse(v.substr(1), [], stack);
			case ']':
				const prev = stack.pop();
				prev.push(acc);
				return _parse(v.substr(1), prev, stack);
			default:
				const value = getObj.exec(v);
				if (!value) throw 'invalid value:' + v;
				acc.push(value[1]);
				return _parse(v.substr(value[0].length), acc, stack);
		}
	};
	const parse = v=>_parse(v, [], []);
	
	const parseForFor = (str, acc, stack)=> {
		let v = str.trim();
		if (!v) return acc;
		while(v != '') {
		switch(v[0]){
			case '[':
				stack.push(acc);
				v = v.substr(1);
				acc = [];
				break;
			case ']':
				const prev = stack.pop();
				prev.push(acc);
				v = v.substr(1);
				acc = prev;
				break;
			default:
				const value = getObj.exec(v);
				if (!value) {
					//console.log('debug', acc, str, v, stack);
					throw 'invalid value:' + v;
				}
				acc.push(value[1]);
				v = v.substr(value[0].length);
				break;
		}
		}
		return acc;
	};
	const parseFor = v=>_parseFor(v, [], []);
    return {
		  parse
		, parseFor
	}
})();
const stringify89_6_210504 = (obj => {
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
			,'object': v=>v && v.toJSON && typeof v.toJSON == 'function' ? v.toJSON() : NULL_STR
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
		if (obj.hasOwnProperty('toJSON') && typeof obj.toJSON == 'function') {
			yield obj.toJSON();
		}
		for (const k in obj) {
			if (obj.hasOwnProperty(k)) yield [k, obj[k]];
		}
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
			if (v && v.toJSON && typeof v.toJSON == 'function') {
				return recursive((function*(v){ console.log('yield v', v, v.toJSON()); yield {done: true, value:v.toJSON()};})(v), false, null, {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev});
			} else {
				return recursive(objEntries(v), true, null, {target:iter, isObject, accu, k: isObject ? value[0] : '', prev: prev});
			}
		  default:
			  return recursive(iter, isObject, {
				 prev: accu
				 , value
			  }, prev);
		  }
		} else {
		   let accuStr = accuToString(accu, isObject);
		   //console.log('debug ', accuStr);
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
			   //console.log('debug ', accuStr);
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
const test_log = (f, v, isDebug = true)=>{
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
const test_log_ex = (f, v, isDebug = true)=>{
	if (!v) return console.log(`Invalid arg. v: '${v}'`);
	let logs = [`\n[s]${f['name']} ====`
		, `\n\tJSON.stringify와 일치: ${f(v) == JSON.stringify(v)}`, (f(v) == JSON.stringify(v) ? '' : '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		, '\n\tQ문제            ', v];
	if (isDebug) logs = logs.concat([
		  '\n\t답안             ', f(v)
		, '\n\tJSON.parse    ', JSON.parse(v)]);
	logs.push('\n[e]========');
	console.log(...logs);
};

console.log('\n\n==과제 1==\n\n');
test_log_ex(parse89_6_210504.parse, JSON.stringify([1, "ab\"c", {toJSON: ()=>'{"abc":"def"}'}, null, _=>3]));
console.log('\n\n==과제 1==\n\n');
test_log_ex(parse89_6_210504.parse, JSON.stringify([1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true));

console.log('\n\n= 과제 3 ===\n\n');
test_log(stringify89_6_210504.stringify, [1, "ab\"c", {toJSON: ()=>'{"abc":"def"}'}, null, _=>3]);
console.log('\n\n====\n\n');