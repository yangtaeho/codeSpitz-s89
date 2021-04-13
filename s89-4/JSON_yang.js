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
`





