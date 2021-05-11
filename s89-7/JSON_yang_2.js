const title = `수업중 코드 210506`;
console.log(`========\n========\n========\n== ${title} ==\n========\n========`);
if ('1') {
	/*interface ValueParse{
		test(v){}
		convert(v){}
	}*/
	const valueTest = Symbol();
	const valueConvert = Symbol();
	
	class StringParser{
		#reg = /"([^"]|\\")+"/;
		[valueTest](v){
			return this.#reg.test(v);
		}
		[valueConvert](v){
			return this.#reg.exec(v)[1];
		}
	}
	class NumberParser{
		#reg = /[0-9.]+/;
		[valueTest](v){
			return this.#reg.test(v);
		}
		[valueConvert](v){
			return this.#reg.exec(v)[1];
		}
	}
	class DateParser{
		#reg = /./;
		[valueTest](v){
			return this.#reg.test(v);
		}
		[valueConvert](v){
			return this.#reg.exec(v)[1];
		}
	}
	class Test{
		#a; #b; #c;
		constructor(a, b, c) {
			this.#a = a;
			this.#b = b;
			this.#c = c;
		}
		toJSON(){
			return new TestParser(this.#a, this.#b, this.#c);
		}
	}
	class TestParser{
		#reg = /"@Test\{([0-9]+),([0-9]+),([0-9]+)\}/;
		[valueTest](v){
			return this.#reg.test(v);
		}
		[valueConvert](v){
			const [,...arg] = this.#reg.exec(v);
			return this.#reg.exec(v)[1];
		}
	}
	const router = {
		type:[new StringParser, new NumberParser/*, new DateParser*/],
		router(v){
			let result;
			if(this.type.some(converter=>{
					if(converter[valueTest](v)){
						result = converter[valueConvert](v);
						return true;
					}else{
						return false;
					}
			})) return result;
			else throw "invalid ValueType:" + v;
		}
	};
	const _parse = (str, acc, stack)=> {
		const v = str.trim();
		if (!v) return acc;
		switch(v[0]){
			case '[':
				stack.push(acc);
				return parse(v.substr(1), [], stack);
			case ']':
				const prev = stack.pop();
				prev.push(acc);
				return parse(v.substr(1), prev, stack);
			default:
				const value = router.router(v);
				if (!value) throw 'invalid value:' + v;
				acc.push(value);
				return parse(v.substr(value.length), acc, stack);
		}
	};
	const parse = (str) => {
		return _parse(str, [], []);
	};
	//console.log(parse('[1,2,"3"]'));
}
if  ('regexp') {
//  (?: 어쩌구) decapture group
}
if  ('마지막 파서') {
	const rValue = /^\s*([0-9]+)|(true|false)|("((?:\\"|[^"])*)")\s*?/;
	// /^\s*([0-9]+)|(true|false)|"(((?:\\"|[^"])*))"\s*?/.exec("\"abcdcdl\"");
	//const [,num,bool,str] = /^\s*([0-9]+)|(true|false)|("((?:\\"|[^"])*)")\s*?/;
	//숫자 /[+-]?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-][1-9][0-9]*)?/
	//   /[+-]?(?:0|[1-9][0-9]{0,16})?/; //long
	//   /[+-]?(?:0|[1-9][0-9]{0,8})?/; //int
	//   /[+-]?(?:0|[1-9][0-9]{0,4})?/; //short
	const rNum = /^\s*([0-9]+)\s*?/;
	const rBool = /^\s*(true|false)\s*?/;
	const strString = `\s*"((?:\\"|[^"])*)"\s*`; 
	const rKey = new RegExp(`^${strString}:\s*`); 
	const rString = new RegExp(`^${strString}`); 
	const checkTrailingComma = v=>{
		if(v[0] ==",") {
			v = v.substr(1).trim();
			if ("]}".indexOf(v[0]) != -1) throw "invalid json" + v;
		}
		return v;
	};
	const parse = (str, acc, k, stack)=>{
		let v = checkTrailingComma(str.trim());
		if (!v.length) return acc;
		switch(v[0]){
			case '[':case '{':
				stack.push({acc, k});
				return parse(v.substr(1), v[0] == "[" ? [] : {}, null, stack);
				break;
			case ']':case '}':
				if(!(stack && stack.length)) throw "invalid json  " + v;
				const {acc:prev, k:key} = stack.pop();
				if (!prev) return acc;
				else{
					if(prev instanceof Array) prev.push(acc);
					else prev[key] = acc;
					return parse(v, prev, null, stack);
				}
				break;
			default:
				if (acc instanceof Array) {
					const value = rNum.exec(v);
					if (!value) throw "invalid arr value: " + v;
					acc.push(parseFloat(value[1]));
					return parse(v.substr(value[0].length), acc, null, stack);
				} else {
					if (k == null) {
						const key = rKey.exec(v);
						if (!key) throw "invalid key: " + v;
						acc[k] = parseFloat(key[1]);
						return parse(v.substr(key[0].length), acc, key[1], stack);
					} else {
						const value = rNum.exec(v);
						if (!value) throw "invalid obj value: " + v;
						acc[k] = parseFloat(value[1]);
						return parse(v.substr(value[0].length), acc, null, stack);
					}
				}
				break;
		}
	};
	const val = `{"a":[1,2,[3,4],5], "b":{"a\\\"e":123, "b":456}}`;
	const res = parse(val, null, null, []);
	const res2 = JSON.parse(val);
	console.log('res1', res);
	console.log('res2', res2);
}

if('1'){
	`
	덩어리 진 문제를 귀납적으로 인식한다.
	
	`
	
	`
		과제 html 파서  
		createElement
		setAttribute
		appendChild
	`
}