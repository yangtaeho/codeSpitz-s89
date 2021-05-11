if (1 + '무한 스크롤 뷰 구현 예시') {
  const infinityScroll = async function*(){
    let page = 1;
    while(true) {
      const json = loadPage(page);
      if (json.isEnd) break;
      else {
	yield json;
	page++;
      }
    }
  }
const loadPage = page=>fetch(URL + "?page="+apge).tehn(res=>res.json());
const pageLoader = infinityScroll();
const pageLoad = async ()=>{
  const {done, value} = await pageLoader();
  if(!done) render(value);
};
}

if (2 + '지연된 실행') {
	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	const call0 = test.next();
	const call1 = test.next();
	const call2 = test.next();
	console.log(call0, call1, call2);
}

if (3) {
	`
	[1,2,3,4,5,6,7].filter(it=>it%2).map(it=>it*2) // 7 번 + 4 번
	// 딱 7회만 돌 수 없을까?
	 과제 *****
	1. 과제 위의 예제를 7회로 해결하게 제네레이터를 작성하시오.
	yield* 를 쓰는 버전
	yield 를 쓰는 버전
	둘 다 쓰는 버전
	`
}

if (4) {
	`
---> co-routine 을 지원하는 케이스 next 를 구구절절호출하지 않아도 문법이 커버해준다.
destructuring rest, parameter rest, for of
`

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	const [...a] = test;
	console.log(a);
}
if (4) {

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	for(const a of test) console.log(a);
}
if (4) {

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	for(const [k, v] of test) console.log(k, v);
}
if (4) {

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	const action = (...a)=>console.log(a);
	action(...test);
}
if (4) {

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	const [[k1, v1], [k2, v2], ...a] = test;
	console.log(k1, v1, k2, v2);
}
if (4) {

	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	
	const test = objEntries({a:3, b:5});
	const [[k1, v1]] = test;
	console.log(k1, v1);
	//const [[k2, v2]] = test;
	//console.log(k2, v2); //err ---> 제네레이터가 만든건 한 번 실행하면 클로즈됨
	
}

if (5) {
	const objEntries = function*(obj){
		for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	`
	// 기본값이 undeinfined가 아니면 f는절다 호출되지 않음.
	const f = _=>{
		console.log('fffff');
		return [];
	}
	const recursive = (iter, acc)=>{
		const {done, value:[k, v] = f()} = iter.next();
	};
	`
	const toString=v=>""+v;
	const join = acc=>{
		// 2pass 시점에는 조인은 오직 루프 종료시만 처리함 - 한가지 로직으로 일괄처리함.
		if(!acc) return "{}";
		else {
			let target = acc, result = "";
			do{
				result = `,"${target.k}":"${toString(target.v)}"`;
			}while(target = result.prev);
			return "{" + result.substr(1) + "}";
		}
	};
	const recursive = (iter, acc)=>{
		const {done, value:[k, v] = []} = iter.next();
		// 최초 루프를 돌 때 두가지 경우가 있음 루프 본체에 루프 끝
		// 1pass 시점에 정리만 하고
		return done ? join(acc) : recursive(iter, {prev: acc, k, v}); //생략
	};
	`
		굳이 for 를 두 번?? --> 투패스 전략 (2pass strategy)
	`
	const stringify = obj=>recursive(objEntries(obj), null);
	const stringifyFor = obj=>{
		let acc = null, iter = objEntries(obj);
		while(iter.next()){
			const {done, value:[k, v] = []} = iter.next();
			if (done) {
				break;
			}
			acc = {prev: acc, k, v};
		}
		return join(acc);
	};
	// 2pass - 1pass 정리, 2pass 경우 수 없는 한가지 케이스를 처리하는 루프로 해결 (3, 4  pass 는 없어...)
	// [별, 오각형...] => 1pass [ 작은 원, 큰 원, 암튼 원] => 2 pass 원을 해결하는 로직
	// [1,2,3,4,5,6,7].filter(it=>it%2).map(it=>it*2); //함수형에서는 ...pipe
}

if(6) {
	({a:3, b:[1,2,3.4]}) //해결
	
	
	const _tail = (arr, accu, i, prev) => {
		if  (i < arr.length) { //아직 루프중이다.
			const el = arr[i]; // 현재 원소다.
			if (Array.isArray(el)) {  // 배열인데?
				prev = {array:arr, accumulation:accu, index:i+1, prev:prev}; //되돌아갈 포인트 갱신
				return _tail(el, null, 0, prev); //이번 원소를 새로운 배열로 해서 새 시대 open
			} else {
				accu = {prev: accu, element: convertor.convert(el)}; // 배열 아니면 acc 갱신 1pass
				return _tail(arr, accu, i + 1, prev);
			}
		} else {
			let accuStr = accToString(accu); //2pass 일단 쌓여있던 acc를 2pass돌려서 문자열로 해소해
			if(prev) { //아직 스택 남았뉴? 거기로 복귀
				return _tail(prev.array, {prev: prev.accumulation, element: accuStr}, prev.index, prev.prev);
			} else { // 끝났다.
				return accStr;
			}
		}
	};
	
	
	[1,2,3,4,5][Symbol.iterator]() // array를 iterator 로 바꿔줌
}

if (6 + '를 베이스로 obj, arr 모두 해소하는 놈을 만들자') {
	const objEntries = function*(obj) {
		for (const k in obj) if (obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	const convert = v => "" + v;
	const accuToString = acc=>{
		let START, END;
		if (acc.isObject) {
			START = "{";
			END = "}";
		} else {
			START = "[";
			END = "]";
		}
		let result = "";
		if (acc.prev) {
			let curr = acc; 
			do {
				result = "," + (curr.isObject ? `"${curr.element[0]}:${convert(curr.element[1])}` : convert(curr.element)) + result;
			} while((curr = curr.prev) && curr.prev);
			result = result.substr(1);
		}
		return START + result + END;
	};
	const _tail = (iter, accu, prev)=>{
		const {done, value} = iter.next();
		if (!done) {
			if (Array.isArray(value)){// 오브젝트의 엔트리
				// value = aaaa;
			}else {// 일반 배열의 원소
				// value = [k, v];
			}
			const v = Array.isArray(value) ? value[1] : value;
			
			switch(true) {
				case Array.isArray(v):
					return _tail(v[Symbol.iterator], null, {target:iter, accumulation:accu, prev:prev});
				case v && typeof v == "object":
					return _tail(objEntries(v), null, {target:iter, accumulation:accu, prev:prev});
				default:
					// 애매한 거 convertor.convert한테 다 뒤집어 씌워
					return _tail(iter, {
						prev: accu
						, isObject: Array.isArray(value)
						, element: value // conver해서 넘기면 타입정보를 여기저기서 알아야 해...accuToString이 다 먹자
						//, element: convertor.convert(value)
					}, prev);
			}
		} else {
			let accuStr = accuToString(accu); //2pass 일단 쌓여있던 acc를 2pass돌려서 문자열로 해소해
			if(prev) { //아직 스택 남았뉴? 거기로 복귀
				return _tail(prev.array, {prev: prev.accumulation, element: accuStr}, prev.prev);
			} else { // 끝났다.
				return accuStr;
			}
		}
	};
	const stringify =v=>_tail(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), {prev: null, isObject: !Array.isArray(v)}, null);
	console.log(stringify({1:2, 3:4}));
	console.log(stringify([1,2, 3,4]));
}

if(6 + '의 찐'){
	const objEntries = function*(obj){
	  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	const convert =v=>"" + v;
	const accuToString = acc => {
	  let START, END;
	  if(acc.isObject){
		START = "{";
		END = "}";
	  }else{
		START = "[";
		END = "]";
	  }
	  let result = "";
	  if(acc.prev){
		let curr = acc;
		do{
		   console.log(curr);
		   result = "," + (curr.isObject ? `"${curr.element[0]}":${convert(curr.element[1])}` : convert(curr.element)) + result;
		}while((curr = curr.prev) && curr.prev);
		result = result.substr(1);
	  }
	  return START + result + END;
	};
	const recursive = (iter, accu, prev) => {
	   const {done, value} = iter.next();
	   if(!done) {
		  const v = Array.isArray(value) ? value[1] : value;
		  switch(true){
		  case Array.isArray(v):
			  return recursive(v[Symbol.iterator], null, {target:iter, accumulation: accu, prev: prev});
		  case v && typeof v == "object":
			  return recursive(objEntries(v), null, {target:iter, accumulation: accu, prev: prev});
		  default:
			  return recursive(iter, {
				 prev: accu, 
				 isObject:Array.isArray(value), 
				 element:value,
			  }, prev);
		  }
		} else {
		   let accuStr = accuToString(accu);
		   if(prev) {
			 return recursive(prev.target, {prev:prev.accumulation, element:accuStr}, prev.prev);
		   } else {
			 return accuStr;
		   }
		}
	};
	const stringify =v=>recursive(Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v), {prev:null, isObject:!Array.isArray(v)}, null);
	console.log('\n' + stringify( {a:3, b:5}) + '\n' + JSON.stringify( {a:3, b:5}));
}


if(6 + '의 찐의 개선'){
	console.log('!!!!!!', 6 + '의 찐의 개선');
	const objEntries = function*(obj){
	  for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]];
	};
	const convert =v=> typeof v == 'symbol' ? 'null' : "" + v;
	const accuToString = (acc, isObject) => { // 쌓여있는..	
	  let [START, END] = (isObject) ? "{}" : "[]";
	  let result = "";
	  if(acc && acc.prev){
		let curr = acc;
		do{
		   result = "," + (isObject ? `"${curr.value[0]}":${convert(curr.value[1])}` : convert(curr.value)) + result;
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
	console.log(stringify( {a:3, b:5}) + '\n' + JSON.stringify( {a:3, b:5}));
	console.log(stringify( {a:3, b:5, c:[1,2]}) + '\n' + JSON.stringify( {a:3, b:5, c:[1,2]}));
	console.log(stringify( {a:3, b:5, c:[1,2, [3,4, {a:3, b:4}]]}) + '\n' + JSON.stringify( {a:3, b:5, c:[1,2, [3,4, {a:3, b:4}]]}));
	
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

	test_stringify(stringify, []);
	test_stringify(stringify, [1, 2, ["a", [1, 2], false], 3, ["b", "c", [1, 2]]], true);
	test_stringify(stringify, [,'test', 1]);
	test_stringify(stringify, [1, "ab\"c", true, null, _=>3]);
	test_stringify(stringify, [1, "ab\"\nc", true, null, _=>3]);
	test_stringify(stringify, [1, "ab\"\rc", true, null, _=>3]);
	test_stringify(stringify, [1, "ab\"\lc", true, null, _=>3]);
	test_stringify(stringify, [1, "ab\"\r\nc", true, null, _=>3]);
	test_stringify(stringify, [1, "ab\"c", true, undefined, null, _=>3, Symbol()]);
	test_stringify(stringify, [1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()]);
	test_stringify(stringify, {_1:3, b:"abc", 3:true, true: '5'});
	test_stringify(stringify, {_1:[1], _3: 3, 4: '5', 6: true});
	test_stringify(stringify, {_1:[1, "ab\"c", true, undefined, null, ["ab\"c", true, undefined, null], _=>3, Symbol()], 2: '3', '3': {_4: '5', _6: '7'}, '8': ['9', 10, {'11': '12'}]});
console.log('\n\n====\n\n');
}



