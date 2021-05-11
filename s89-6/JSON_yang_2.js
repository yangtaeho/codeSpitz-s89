`수업중 코드 210427`;
if ('iterable iterator') {
	const iterable = {
		[Symbol.iterator](){ 
			const arr = [1,2,3,4];
			let cursor = 0;
			return {
				next(){
					return {done:arr.length <= cursor, value: cursor < arr.length ? arr[cursor++] : undefined};
				}
			};
		}
	};
	const iter1 = iterable[Symbol.iterator]();
	const iter2 = iterable[Symbol.iterator]();
	
	console.log(iter1.next());
	console.log(iter1.next());
	console.log(iter1.next());
	console.log(iter1.next());
	console.log(iter1.next());
	console.log(iter2.next());
	console.log(iter2.next());
	console.log(iter2.next());
	console.log(iter2.next());
	console.log(iter2.next());
	console.log(iter2.next());
	
	const [a, b, ...arr] = iterable;
	console.log('iterable   ', a, b, arr);
	
	
	`
	과제의 필터 - iteralbe을 반환하는 넘
	`
	const filter = (iter, block)=>({
		next(){
			let {done, value} = iter.next();
			while(!done) {
				if(block(value)) return {done: false, value};
				({done, value} = iter.next());
			}
			return {done};
		}
	});
	const map = (iter, block)=>({
		next(){
			let {done, value} = iter.next();
			if(!done) return {done, value: block(value)};
			else return {done};
		}
	});
	
	const iter = iter=>({[Symbol.iterator](){return iter;}});
	
	const f = [...iter(map(filter([1,2,3,4,5][Symbol.iterator](), v=>v%2), v=>v*2))];
	
	console.log(f);
}
if ('오늘 할 거') {
	
	//패턴찾기
	`
		지은
		시작과 끝에 대괄호
		원소사이에 대괄호가 나올 수 있다.
		각 원소 사이에 컴마가 추가되어있다.
		
		인태
		---
		
		이성규
		맨처음에는 공백이나 대괄호 여는게 올 수 있다.
		대괄호 이후에는 공백이나 숫자나 또 대괄호 열리는거나 아니면 닫히는 게 올 수 있다.
		공백다음에는 또다른 공백이나 숫자나 대괄호 열고 닫는 것과 쉼표가 올 수 있다.
		숫자 다음에는 공백과 대괄호 여닫기와 쉼표가 올 수 있다.
		
		태현
		대괄호 사이에는 또다른 대괄호를 포함하여 요소들이 존재할 수 있다.
		요소는 숫자, 요소 사이에는 컴마, 컴마와 요소 ...
		
		
		===> 전부 탈락
		
		요소는 숫자 정도밖에 못씀
		
		LR파서로 동작을 해야 한다....
		
		
		
		열린 대괄호를 만나면 배열이 시작되며 요소를 만들기 시작한다.
    -> 지금 배열은 스택으로 넣어버린다.
대괄호 닫기가 온다.
    -> 지감 배열을 종료하고, 스택을 이전으로 돌아간다.
적합한 원소가 온다. 원소는 쉼표를 포함하거나 하지 않는다. (마지막 원소인 경우) => 현재 배열에 값을 추가한다.
*** 쉼표가 나오면 요소를 종료한다.

	`
	
	const ex = "[1,2,3,[4,5,[6]]]";
	const rNum = /^\s*([0-9]+)\s*,?/;
	const parse = (str, acc, stack)=> {
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
				const value = rNum.exec(v);
				if (!value) throw 'invalid value:' + v;
				acc.push(parseFloat(value[1]));
				return parse(v.substr(value[0].length), acc, stack);
		}
	};
	console.log(parse(ex, [], []));
	console.log('debug 11111\n', ex, '\n', parse(ex, [], []));
	const parseFor = (str, acc, stack)=> {
		let v = str.trim();
		while(v != '') {
			v = v.trim();
			if (!v) return acc;
			switch(v[0]){
				case '[':
					acc = [];
					stack.push(acc);
					v = v.substr(1);
					break;
				case ']':
					const prev = stack.pop();
					prev.push(acc);
					acc = prev;
					v = v.substr(1);
					break;
				default:
					const value = rNum.exec(v);
					if (!value) {
						console.log('debug', acc, str, v, stack);
						throw 'invalid 2 value:' + v;
					}
					acc.push(parseFloat(value[1]));
					v = v.substr(value[0].length);
					break;
			}
		}
		return acc;
	};
	console.log('debug 22222\n', ex, '\n', parseFor(ex, [], []));
	
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
	`
	class Test{
		a;
		b;
		constructor(a, b){this.a = a, this.b = b}
		toJSON(){return "Test@"+this.a+":"+this.b;}
	}
	class Test2{
		a;
		constructor(a){this.a = a, this.b = b}
	}
	"[Test@3:7,3, 5]"
	[new Test(3,7), 3, 5]
}