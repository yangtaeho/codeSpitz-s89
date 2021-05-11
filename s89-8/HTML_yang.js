
const sel = (k, p) => {
	const _sel = (k, p) => {
		return p.querySelector(k);
	};
	if (p && p.querySelector) {
		return _sel(k, p);
	}
	return _sel(k, document);
};
const selAll = (k, p) => {
	if (p && p.querySelectorAll) {
		return p.querySelectorAll(k);
	}
	return document.querySelectorAll(k);
};
const cloneEleP = el => {
	if (el == null) {
		// console.log('cloneEleP :: invalid el');
		throw 'cloneEleP :: invalid el';
	}
	const _el = el.cloneNode();
	_el.innerHTML = el.innerHTML;
	return _el;
};
const cloneEle = (el, idx) => {
	if (el == null || el.children == null) {
		// console.log('cloneEle :: invalid el');
		throw 'cloneEle :: invalid el';
	}
	let res;
	if (isEmpty(idx) || typeof idx != 'number' || idx < 0) {
		const _el = el.firstElementChild.cloneNode();
		_el.innerHTML = el.firstElementChild.innerHTML;
		res = _el;
	} else {
		const _el = el.children[idx].cloneNode();
		_el.innerHTML = el.children[idx].innerHTML;
		res = _el;
	}
	return res;
};
const isEmpty = v => v == undefined || v == '';
const isNotEmpty = v => !isEmpty(v);

if ('210511 과제') {
	const checkSpace = v=>{
		if(v[0] == ' ') {
			v = v.trim();
			if ('<'.indexOf(v[0]) != -1) throw 'invalid html string. <<<' + v + '>>>';
		}
		return v;
	}
	const parse = (str, acc, attr, stack, pEle) => {
		if (!pEle) {
			pEle = document.body;
		}
		const v = checkSpace(str);
		if (!v.length) pEle.innerHTML = acc || '';
		const res = '';
		switch(v[0]){
			case'<':
				const res = /(?:\s{0,})<(.{1,})(?:\s{0,})(.{0,})>(.{0,})$/.exec(v);
				const el = document.createElement(res[1]);
				el.attributes = res[2].split(' ');
				el.innerHTML && (el.innerHTML = res[3] || '');
				pEle.appendChild(el);
				stack.push({acc, pEle});
				return parse(v.substr(res[0].length), acc, attr, stack, pEle);
		}
		pEle.innerHTML = res;
	};
	window.onload = function() {
		parse('<div id="test" style="color:red">test', null, null, []);
	};
}