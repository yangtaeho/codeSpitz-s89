// 수업중 코드 210413 
if (1) {

const recursive = (arr, acc, i, stack)=>{
	if(Array.isArray(arr[i])) {
		stack.push([arr, i]);
		return recursive(arr[i], acc + '[', 0, stack); // [ 가 분산되어 있어 수정이 어려움.. [] 은 묶여야 맞는...
	} else {
		if (i < arr.length) {
			return recursive(arr, acc + arr[i]/*stringify*/ + ',', i + 1, stack);
		} else {
			if (stack.length) { // 링크드리스프의 스택을 쓴다면 원래 length 는 의존하지 말아야 한다..
				const [prevArr, prevIndex] = stack.pop();
				return recursive(prevArr, acc.substr(-1) + '],', prevIndex + 1, stack);
			} else {
				return acc.substr(-1) + ']';
			}
		}
	}
}
`
이게 맞나? 우연이다... 
	Array.isArray(arr[i]) 하고 length 체크가 맞나?
	아니다.. 우연히 동작할 뿐....
	
	if (i < arr.length) [
		
	} else {
		마무리..
	}
`
}

const stringify = arr=> !arr.length ? '[]' : recursive(arr, '', 0, [])
// 사전에 차단하는 것은 일반화가 깨졌다고 한다. 리커시브가 빈배열해소를 못하고 있음.
// 일반화 = 모든 경우의 수를 처리하는 알고리즘


if (2) {

const recursive = (arr, acc, i, stack)=>{
	if (i < arr.length) {
		const currEl = arr[i];
		if(Array.isArray(currEl)) {
			stack.push([arr, i + 1]);
			return recursive(currEl, acc + '[', 0, stack);
		} else {
			return recursive(arr, acc + toString(arr[i]) + ',', i + 1, stack);
		}
	} else {
		const prev = stack.pop(); // stack이니까 팝..
		if (prev) {
			const [preArr, prevIndex] = prev;
			return recursive(prevArr, acc.substr(-1) + ']', prevIndex, stack);
		} else {
			return acc.substr(-1) + ']';
		}
	}
};

`
	[] 가 분산되고 ,를 여기저기에서 쓰는게 마음에 들지 않아....
`
}



if (3) {

const recursive = (arr, acc, i, stack)=>{
	if (i < arr.length) {
		const currEl = arr[i];
		if(Array.isArray(currEl)) {
			stack.push([arr, acc, i + 1]);
			return recursive(currEl, [], 0, stack);
		} else {
			acc.push('"' + (arr[i]) + '"');
			return recursive(arr, acc, i + 1, stack);
		}
	} else {
		
		let accStr = "";
		for (const v of acc) accStr += "," + v;
		accStr = "[" + accStr.substr(1) + "]";
		
		
		let prev; // stack이니까 팝..
		if (!!stack) {
			prev = stack.pop();
		} else {
			prev = null;
		}
		if (prev) {
			const [prevArr, prevAcc, prevIndex] = prev;
			prevAcc.push(accStr);
			return recursive(prevArr, prevAcc, prevIndex, stack);
		} else {
			
			return '[' + accStr + ']';
		}
	}
};
const stringify = arr=> recursive(arr, [], [], 0, [])
stringify([1,2,[3,4],5,[6,[7,[8]]]]);
`
	[] 붙이는 겁 다 밀었다..
`
}



if (4) {

/*
	[] 붙이는 겁 다 밀었다..
*/
const arrToString = acc=>{
	let accStr = "";
	for (const v of acc) accStr += "," + v;
	return "{" + accStr.substr(1) + "}";
};
const elementToString = v=>""+v;
`
	1. 변수의 라이프 사이클은 코드의 형태와 일치하는 것은 아니다. 
	2. 설계에 일치한다.
	-> 3. 원하는 의도에 맞게 변수를 설정한다.
	
	
`
const recursive = (arr, acc, i, stack)=>{
	if (i < arr.length) {
		
		// 원소를 문자열로 환원하여 다를 배열에 담아둔다.
		
		const currEl = arr[i];
		
		// 뎁스가 있다면 원소일 때 처리
		if(Array.isArray(currEl)) {
			stack.push([arr, acc, i + 1]);
			return recursive(currEl, [], 0, stack);
		} else {
			
			
			// 보통 원소만 있다면 문자열 처리
			acc.push(elementToString(arr[i]));
			return recursive(arr, acc, i + 1, stack);
		}
	} else {
		
		//원소별 문자열로 환원된 배열을 이용해서 통합 문자열을 만든다.
		
		const accStr = arrToString(acc);
		let prev;
		if (!!stack) {
			prev = stack.pop();
		} else {
			prev = null;
		}
		if (prev) {
			const [prevArr, prevAcc, prevIndex] = prev;
			prevAcc.push(accStr);
			return recursive(prevArr, prevAcc, prevIndex, stack);
		} else {
			
			return accStr;
		}
	}
};
const stringify = arr=> recursive(arr, [], 0, [])
console.log(stringify([1,2,[3,4],5,[6,[7,[8]]]]));
`
	counter, storage(lifecycle*, scope)
	
`
}

`
	코드의 응집성에 집착해라...
	
	1. 오늘만 산다
	2. 데이터를 응집시켜라..
`


if (42) {

const arrToString = acc=>{
	let accStr = "";
	for (const v of acc) accStr += "," + v;
	return "{" + accStr.substr(1) + "}";
};
const elementToString = v=>""+v;
const recursive = (arr, acc, i, stack)=>{
	if (i < arr.length) {
		
		const currEl = arr[i];
		
		
		
		let resultArr, resultAcc, resultIndex;
		if(Array.isArray(currEl)) {
			stack.push([arr, acc, i + 1]);
			resultArr = currEl;
			resultAcc = [];
			resultIndex = 0;
		} else {
			acc.push(elementToString(arr[i]));
			resultArr = arr;
			resultAcc = acc;
			resultIndex = i+1;
		}
		return recursive(resultArr, resultAcc, resultIndex, stack);
		
		
		
	} else {
		const accStr = arrToString(acc);
		let prev;
		if (!!stack) {
			prev = stack.pop();
		} else {
			prev = null;
		}
		if (prev) {
			const [prevArr, prevAcc, prevIndex] = prev;
			prevAcc.push(accStr);
			return recursive(prevArr, prevAcc, prevIndex, stack);
		} else {
			return accStr;
		}
	}
};
const stringify = arr=> recursive(arr, [], 0, [])
console.log(stringify([1,2,[3,4],5,[6,[7,[8]]]]));

}


if (5) {
`
	Array 타입 보는게 recursive 안에 있는게 맞아?
	---> 아니다... 
	사실 다음시간 과제
	
`
const arrToString = arr=>{
	let accStr = "";
	for (const v of arr) accStr += "," + v;
	return "{" + accStr.substr(1) + "}";
};
const table = { // 전략패턴
	array:(v, arr, acc, i, stack)=>{ //전략객체 1
		stack.push([arr, acc, i + 1]);
		return [arr[i], [], 0];
	},
	number: (v, arr, acc, i, stack)=>{ //전략객체 2
		acc.push("" + v);
		return [arr, acc, i+1];
	},
	string:(v, arr, acc, i, stack)=>{
		acc.push("" + v);
		return [arr, acc, i+1];
	},
	object:(v, arr, acc, i, stack)=>{ // 과제...
		acc.push("" + v);
		return [arr, acc, i+1];
	}
};
`
if 제거
선항 전략객체를 같은 인터페이스를 갖도록 조정
-----
원래분기해야 하는 경우의 수만큼 전략객체를 만들고
기준 상태를 판정하여 적합한 전략객체를 매칭하는 매퍼 == 라우터

## if제거 이유
1. OCP
2. IOC (제어 역전)
3. 복잡도 - 격리를 통해 한번에 다룰 복잡성을 줄이기 => 응집도, 결합도가 낮은 독립적인 모듈로 만들어서 정복

**** 문을 식(함수값, 전략객체, 커맨드 객체)으로 변경
***** 원래 제어문이었던 것을, 함수라는 그릇에 담아 값으로 변경한 뒤
원하는 함수값을 필요시마다 선택하서 사용
장점은 ...문은 코드 작성시 확정되므로 변경하려면 코드를 변경하고 확인해야하나, 함수화된 값은 코드 실행시 원하는 함수를 선택할 수 있으므로 필요한 코드를 대입할 때 사용하는 측의 코드는 변경할 필요가 없다.(OCP원리(


함수 본질 - 문을 담아 식으로 사용할 수 있는 그릇
일단 문 -> 식의 장점
1. 반복적으로 그 제어문을 사용할 수 있고
2. 일반화만 시키면 인자에 따라 여러 문제를 하나의 로직으로 해결할 수 있고
3. 필요할 때까지 실행을 안 시킬 수 있고
4. 여러개를 만들어 필요시마다 다를 제어문을 사용할 수 있다



변수의 스코프 = 권한 x, 범위 x, 이 변수를 인식할 수 있는 공간, 그 변수를 인식할 수 있는 범위



# 과제 ?? stack이 필요하??



`
const elementProcess = (currEl, arr, acc, i, stack)=>table[typeof currEl](currEl, arr, acc, i, stack);
/**
	stack 변수 스코프 xx 인자 스코프 oo
	acc 변수 스코프 -> 함수 스코프 oo

*/
const recursive = (arr, acc, i, stack)=>{
	if (i < arr.length) {
		const currEl = arr[i];
		
		
		
		const [resultArr, resultAcc, resultIndex] = elementProcess(currEl, arr, acc, i, stack);
		return recursive(resultArr, resultAcc, resultIndex, stack);
		
		
		
	} else {
		const accStr = arrToString(acc);
		let prev;
		if (!!stack) {
			prev = stack.pop();
		} else {
			prev = null;
		}
		if (prev) {
			const [prevArr, prevAcc, prevIndex] = prev;
			prevAcc.push(accStr);
			return recursive(prevArr, prevAcc, prevIndex, stack);
		} else {
			
			return accStr;
		}
	}
};
const stringify = arr=> recursive(arr, [], 0, [])
console.log(stringify([1,2,[3,4],5,[6,[7,[8]]]]));
}


if (49999) {
	`
	

# 과제 ?? stack이 필요하??
배열을 없애고 자기 상태만 넘기게 함....


컬렉션의 책임은 단일값보다 크다.
반드시 필요한 겨


	`
const arrToString = finalNode=>{
	let accStr = "";
	const arr = [];
	let curr = finalNode;
	do{
		arr.unshift(curr.value);
	}while(curr = curr.prev);
	for (const v of arr) accStr += "," + v;
	return "{" + accStr.substr(1) + "}";
};
const elementToString = v=>""+v;
const recursive = (arr, acc, i, prev)=>{
	if (i < arr.length) {
		
		
		const currEl = arr[i];
		
		if(Array.isArray(currEl)) {
			return recursive(currEl, null, 0, [arr, acc, i + 1, prev]);
		} else {
			
			
			return recursive(arr, {prev:acc, value:elementToString(arr[i])}, i + 1, prev);
		}
	} else {
		
		const accStr = arrToString(acc);
		if (prev) {
			const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
		return recursive(prevArr, {prev:prevAcc, value:accStr}, prevIndex, prevPrev);
		} else {
			
			return accStr;
		}
	}
};
const stringify = arr=> recursive(arr, null, 0, null)
console.log(stringify([1,2,[3,4],5,[6,[7,[8]]]]));
`
	counter, storage(lifecycle*, scope)
	
	
	함수 호출은 할당으로
	
	끌나도 끌난게 아닌 경우는 
	
	while true 안으로 조건문을 다 넣어..
	
	
`
}


if (5999) {
	
	const arrToString = finalNode=>{
		let accStr = "";
		const arr = [];
		let curr = finalNode;
		do{
			arr.unshift(curr.value);
		}while(curr = curr.prev);
		for (const v of arr) accStr += "," + v;
		return "{" + accStr.substr(1) + "}";
	};
	const elementToString = v=>""+v;
	const whileLoop = array=>{
		let arr = array, acc = null, i = 0, prev =null;
		while(true) {
			if (i < arr.length) {
				const currEl = arr[i];
				
				if(Array.isArray(currEl)) {
					prev =  [arr, acc, i + 1, prev];
					arr = currEl;
					acc = null;
					i = 0;
				} else {
					
					arr = arr;
					prev = prev;
					acc = {prev:acc, value:elementToString(arr[i])};
					i = i + 1
				}
			} else {
				
				const accStr = arrToString(acc);
				if (prev) {
					const [prevArr, prevAcc, prevIndex, prevPrev] = prev;
					arr = prevArr;
					prev = prevPrev;
					acc = {prev:prevAcc, value:accStr};
					i = prevIndex;
				} else {
					
					return accStr;
				}
			}
		}
	};
	whileLoop([1,2,[3,4],5,[6,[7,[8]]]]);
	
	
}

if ('과제') {
	
Object.entries() //허용, 안쓰는 거 추천
stringify({...})==JSON.stringify({....})

}