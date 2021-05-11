const title = `수업중 코드 210511`;
console.log(`========\n========\n========\n== ${title} ==\n========\n========`);
if ('1') {
	`수업중 부연`;
	class HtmlParser {
		regex;
		matched;
		captured;
		leftHTML;
		isElement;
		type;
		constructor(regex) {
			this.regex = regex;
		}
		match(html) {
			return Boolean(this.regex.exec(html));
		}
		/*
		_run(html, isElement, beforeElementType) {
			[this.matched, this.captured] = this.regex.exec(html);
			this.leftHTML = html.substring(this.matched.length, html.length);
			this.run(html, isElement, beforeElementType);
		}
		run(html, isElement, beforeElementType){throw "override";}
		*/
		_run(html, isElement, beforeElementType) {
			const [matched, ...captured] = this.#regex.exec(html);
			this.leftHTML = html.substring(matched.length, html.length);
			this.run(captured, html, isElement, beforeElementType);
		}
		run(captured, html, isElement, beforeElementType) { throw "override"}
		
		
		
		getResultSet(html, isElement, beforeElementType) {
			this._run(html, isElement, beforeElementType);
			return {
				type: this.type,
				name: this.captured,
				leftHTML: this.leftHTML,
				isElement: this.isElement
			}
		}
	}
	
	const ElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *([A-Za-z0-9]+)/);
		}
		run(html, isElement, beforeElementType) {
			if (isElement) throw 'Wrong HTML.';
			this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
			this.isElement = true;
		}
	}
	const ElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *([A-Za-z0-9]+)/);
		}
		_run(html, isElement, beforeElementType) {
			super._run(html, isElement, beforeElementType);
			if (isElement) throw 'Wrong HTML.';
			this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
			this.isElement = true;
		}
	}
	const TypeRouter = {
    type: {
        element: (name, isElement, nowElement) => {
            const element = document.createElement(name);
            if (nowElement) {
                nowElement.appendChild(element);
            }
            return element;
        },
	}
	const ElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *([A-Za-z0-9]+)/);
		}
		run(html, isElement, beforeElementType) {
			if (isElement) throw 'Wrong HTML.';
			this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
			this.isElement = true;
		}
		factory(name, isElement, nowElement){
			const element = document.createElement(name);
			if (nowElement) {
				nowElement.appendChild(element);
			}
			return element;
		}
	}
	const ElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *([A-Za-z0-9]+)/);
		}
		run(captured, html, isElement, beforeElementType) {
			if (isElement) throw 'Wrong HTML.';
		   this.#tagName = captured[0];
			this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
			this.isElement = true;
		}
	}
	_run(html, isElement, beforeElementType) {
        const [matched] = this.regex.exec(html);
        this.leftHTML = html.substring(matched.length, html.length);
        this.run(html, isElement, beforeElementType);
    }
	_run(html, isElement, beforeElementType) {
        const [matched] = this.#regex.exec(html);
        this.leftHTML = html.substring(matched.length, html.length);
        this.run(html, isElement, beforeElementType);
    }
	_run(html, isElement, beforeElementType) {
		const [matched, ...capture] = this.regex.exec(html);
		this.leftHTML = html.substring(matched.length, html.length);
		this.run(capture, html, isElement, beforeElementType);
	}
	export const SpecificInfo = {
		parsers: [new ElementParser(), new EndElementParser(), new AttributeParser(), new TextParser(), new UnpairedElementParser(), new CloseElementParser()],
		getFrom(html, isElement, beforeElementType) {
			for (const parser of this.parsers) {
				if (parser.match(html)) {
					return parser.getResultSet(html, isElement, beforeElementType)
				}
			}
			throw....
		}
	}
	
	export const parseHTML = (html) => {
		const _parseHTML = (html, dom, isElement, nowElement, elementType) => {
			if (!html) {
				return dom;
			}
			const parsed = SpecificInfo.getFrom(html.trim(), isElement, elementType);
			return _parseHTML(parsed.leftHTML, parsed.factory() ?? dom, ...)
		};
		return _parseHTML(html, null, false, null, null);
	}
	
	
	`gist.github.com/sirupe/d827bb322ac7d00fc6ddc52e912f66f9
	
codespitz_7.js: https://gist.github.com/sirupe/d827bb322ac7d00fc6ddc52e912f66f9
	`;
	
	`super.xxx() <== 무조건 오류`;
	
	
	`paired unpaired ----> 정규식!!`;
	
	`
	.. 굳이 .className 같은 거 안써도 됨
	element.setAttribute("class", "member")
	element.setAttribute("id", "aaa")
	element.setAttribute("style", "width:"80px")
	
	value
	Hika님이 오늘 오후 11:34에 보냄
	<img/>
	Hika님이 오늘 오후 11:34에 보냄
	<a <b <c
	Hika님이 오늘 오후 11:34에 보냄
	<a xxxxxxxxxxxxxxxx>
	Hika님이 오늘 오후 11:34에 보냄
	<a href=">">
	Hika님이 오늘 오후 11:34에 보냄
	<A
	Hika님이 오늘 오후 11:34에 보냄
	href=">"
	Hika님이 오늘 오후 11:34에 보냄
	>
	
	css parser 는 무리수 였다..
	

	
	`
}
if('지연정님 수정') {
	export const Types = {
		ELEMENT: 'element',
		UNPAIRED_ELEMENT: 'unpaired_element',
		END_ELEMENT: 'end_element',
		TEXT: 'text',
		ATTRIBUTE: 'attribute',
		CLOSE_ELEMENT: 'close_element',
		COMMENT_ELEMENT: 'comment_element'
	}

	const UnpairedTags = {
		tagName: {
			area: true,
			base: true,
			br: true,
			col: true,
			embed: true,
			hr: true,
			img: true,
			input: true,
			link: true,
			meta: true,
			param: true,
			source: true,
			track: true,
			wbr: true,
			none: false
		},
		isUnpairedTags(tagName) {
			return this.tagName[tagName] ?? this.tagName['none'];
		}
	}

	class HtmlParser {
		regex;
		matched;
		captured;
		leftHTML;
		isElement;
		type;
		constructor(regex) {
			this.regex = regex;
		}
		match(html) {
			return Boolean(this.regex.exec(html));
		}
		_run(html, isElement, beforeElementType) {
			[this.matched, this.captured] = this.regex.exec(html);
			this.leftHTML = html.substring(this.matched.length, html.length);
		}
		_run(html, isElement, beforeElementType) {
			[this.matched, this.captured] = this.regex.exec(html);
			this.leftHTML = html.substring(this.matched.length, html.length);
			this.run(html, isElement, beforeElementType);
		}
		run(html, isElement, beforeElementType){throw "override";}
		getResultSet(html, isElement, beforeElementType) {
			this._run(html, isElement, beforeElementType);
			return {
				type: this.type,
				name: this.captured,
				leftHTML: this.leftHTML,
				isElement: this.isElement
			}
		}
	}

	const ElementParser = class extends HtmlParser {
		constructor() {
			super(/^(?:\s{0,})< *([A-Za-z0-9]+)/);
		}
		run(html, isElement, beforeElementType) {
			if (isElement) throw 'Wrong HTML.';
			this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
			this.isElement = true;
		}
	}
	const EndElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *(>)/);
		}
		run(html, isElement, beforeElementType) {
			if (!isElement) throw 'Wrong HTML.';
			this.type = beforeElementType === Types.UNPAIRED_ELEMENT ? Types.CLOSE_ELEMENT : Types.END_ELEMENT;
			this.isElement = false;
		}
	}
	const AttributeParser = class extends HtmlParser {
		constructor() {
			super(/^ *((?:[A-Za-z0-9]-?)*) *= *(?:\"|\')((?: *[^"|^']* *))(?:\"|\')/);
		}
		run(html, isElement, beforeElementType) {
			if (!isElement) throw 'Wrong HTML.';
			super._run(html, isElement, beforeElementType);
			let attribute, value;
			[this.matched, attribute, value] = this.regex.exec(html);
			this.captured = {attribute: attribute, value: value};
			this.type = Types.ATTRIBUTE;
			this.isElement = true;
		}
	}
	const TextParser = class extends HtmlParser {
		constructor() {
			super(/^([^<^\/^>]+)(?= *<)/);
		}
		run(html, isElement, beforeElementType) {
			this.type = Types.TEXT;
			this.captured = this.captured.trim();
			this.isElement = false;
		}
	}
	const UnpairedElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *\/ *([A-Za-z0-9]*) *> *()/);
		}
		run(html, isElement, beforeElementType) {
			this.isElement = UnpairedTags.isUnpairedTags(this.captured);
			this.type = this.isElement ? Types.UNPAIRED_ELEMENT : Types.CLOSE_ELEMENT;
		}
	}
	const CloseElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *\/ *>/);
		}
		run(html, isElement, beforeElementType) {
			this.type = Types.CLOSE_ELEMENT;
			this.isElement = false;
		}
	}

	const CommentElementParser = class extends HtmlParser {
		constructor() {
			super(/^ *< *! *-- *(.*) *-- *>/);
		}
		run(html, isElement, beforeElementType) {
			this.type = Types.COMMENT_ELEMENT;
			this.isElement = false;
		}
	}

	export const SpecificInfo = {
		parsers: [new ElementParser(), new EndElementParser(), new AttributeParser(), new TextParser(), new UnpairedElementParser(), new CloseElementParser()],
		getFrom(html, isElement, beforeElementType) {
			for (const parser of this.parsers) {
				if (parser.match(html)) {
					return parser.getResultSet(html, isElement, beforeElementType)
				}
			}
		}
	}

	const AttributeRouter = {
		attrType: {
			'style': (element, attribute, value) => {
				let inValue = value;
				while(inValue) {
					const [matched, k, v] = inValue.match(/^ *([A-Za-z0-9]*) *: *(\S*) *;/);
					element.style[k] = v;
					inValue = inValue.substring(matched.length, inValue.length);
				}
				return element;
			},
			'data': (element, attribute, value) => {
				const dataNameBar = attribute.split('data-')[1];
				const dataName = dataNameBar.replace(/-(\D)/g, (matched, captured, i) => {
					console.log(matched, captured, i);
					return captured.toUpperCase();
				});
				element.dataset[dataName] = value;
				return element;
			},
			'class': (element, attribute, value) => {
				element.className = value;
				return element;
			},
			'id': (element, attribute, value) => {
				element.id = value;
				return element;
			}
		},
		route(element, attribute, value) {
			element.setAttribute(attribute, value);
			return this.attrType[attribute.startsWith('data') ?
				'data' : attribute]?.(element, attribute, value) ?? element;
		}
	}

	const TypeRouter = {
		type: {
			element: (name, isElement, nowElement) => {
				const element = document.createElement(name);
				if (nowElement) {
					nowElement.appendChild(element);
				}
				return element;
			},
			end_element: (name, isElement, nowElement) => nowElement,
			text: (name, isElement, nowElement) => {
				if (name) {
					nowElement.appendChild(document.createTextNode(name));
				}
				return nowElement;
			},
			attribute: (name, isElement, nowElement) => {
				if (!isElement) {
					throw 'Wrong html.'
				}
				const {attribute, value} = name;
				const element = AttributeRouter.route(nowElement, attribute, value);
				return element;
			},
			close_element: (name, isElement, nowElement) => nowElement ? nowElement.parentElement : null,
			comment_element: (name, isElement, nowElement) => {
				nowElement.appendChild(document.createComment(name));
				return nowElement;
			}
		},
		route(type, name, isElement, nowElement) {
			const finalType = type === Types.UNPAIRED_ELEMENT ? Types.ELEMENT : type;
			return this.type[finalType]?.(name, isElement, nowElement) ;
		}
	}

	export const parseHTML = (html) => {
		const _parseHTML = (html, dom, isElement, nowElement, elementType) => {
			if (!html) {
				return dom;
			}
			const {type, name, leftHTML, isElement:inisElement} = SpecificInfo.getFrom(html.trim(), isElement, elementType);
			const thisTimeElement = TypeRouter.route(type, name, isElement, nowElement)
			return _parseHTML(leftHTML, !dom ? thisTimeElement : dom, inisElement, thisTimeElement, type)
		};
		return _parseHTML(html, null, false, null, null);
	}

	export const whileParseHTML = html => {
		let [leftHTML, dom, isElement, nowElement, elementType] = [html, null, false, null, null];
		while(leftHTML) {
			const {type, name, leftHTML:inLeftHTML, isElement:inisElement} = SpecificInfo.getFrom(leftHTML.trim(), isElement, elementType);
			const thisTimeElement = TypeRouter.route(type, name, isElement, nowElement)
			leftHTML = inLeftHTML;
			dom = !dom ? thisTimeElement : dom;
			isElement = inisElement;
			nowElement = thisTimeElement;
			elementType = type;
		}
		return dom;
	}
}

if('지연정님') {
	export const Types = {
    ELEMENT: 'element',
    UNPAIRED_ELEMENT: 'unpaired_element',
    END_ELEMENT: 'end_element',
    TEXT: 'text',
    ATTRIBUTE: 'attribute',
    CLOSE_ELEMENT: 'close_element',
    COMMENT_ELEMENT: 'comment_element'
}

const UnpairedTags = {
    tagName: {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true,
        none: false
    },
    isUnpairedTags(tagName) {
        return this.tagName[tagName] ?? this.tagName['none'];
    }
}

class HtmlParser {
    regex;
    matched;
    captured;
    leftHTML;
    isElement;
    type;
    constructor(regex) {
        this.regex = regex;
    }
    match(html) {
        return Boolean(this.regex.exec(html));
    }
    _run(html, isElement, beforeElementType) {
        [this.matched, this.captured] = this.regex.exec(html);
        this.leftHTML = html.substring(this.matched.length, html.length);
    }
    getResultSet(html, isElement, beforeElementType) {
        this._run(html, isElement, beforeElementType);
        return {
            type: this.type,
            name: this.captured,
            leftHTML: this.leftHTML,
            isElement: this.isElement
        }
    }
}

const ElementParser = class extends HtmlParser {
    constructor() {
        super(/^ *< *([A-Za-z0-9]+)/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        if (isElement) throw 'Wrong HTML.';
        this.type = UnpairedTags.isUnpairedTags(this.captured) ? Types.UNPAIRED_ELEMENT : Types.ELEMENT
        this.isElement = true;
    }
}
const EndElementParser = class extends HtmlParser {
    constructor() {
        super(/^ *(>)/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        if (!isElement) throw 'Wrong HTML.';
        this.type = beforeElementType === Types.UNPAIRED_ELEMENT ? Types.CLOSE_ELEMENT : Types.END_ELEMENT;
        this.isElement = false;
    }
}
const AttributeParser = class extends HtmlParser {
    constructor() {
        super(/^ *((?:[A-Za-z0-9]-?)*) *= *(?:\"|\')((?: *[^"|^']* *))(?:\"|\')/);
    }
    _run(html, isElement, beforeElementType) {
        if (!isElement) throw 'Wrong HTML.';
        super._run(html, isElement, beforeElementType);
        let attribute, value;
        [this.matched, attribute, value] = this.regex.exec(html);
        this.captured = {attribute: attribute, value: value};
        this.type = Types.ATTRIBUTE;
        this.isElement = true;
    }
}
const TextParser = class extends HtmlParser {
    constructor() {
        super(/^([^<^\/^>]+)(?= *<)/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        this.type = Types.TEXT;
        this.captured = this.captured.trim();
        this.isElement = false;
    }
}
const UnpairedElementParser = class extends HtmlParser {
    constructor() {
        super(/^ *< *\/ *([A-Za-z0-9]*) *> *()/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        this.isElement = UnpairedTags.isUnpairedTags(this.captured);
        this.type = this.isElement ? Types.UNPAIRED_ELEMENT : Types.CLOSE_ELEMENT;
    }
}
const CloseElementParser = class extends HtmlParser {
    constructor() {
        super(/^ *\/ *>/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        this.type = Types.CLOSE_ELEMENT;
        this.isElement = false;
    }
}

const CommentElementParser = class extends HtmlParser {
    constructor() {
        super(/^ *< *! *-- *(.*) *-- *>/);
    }
    _run(html, isElement, beforeElementType) {
        super._run(html, isElement, beforeElementType);
        this.type = Types.COMMENT_ELEMENT;
        this.isElement = false;
    }
}

export const SpecificInfo = {
    parsers: [new ElementParser(), new EndElementParser(), new AttributeParser(), new TextParser(), new UnpairedElementParser(), new CloseElementParser()],
    getFrom(html, isElement, beforeElementType) {
        for (const parser of this.parsers) {
            if (parser.match(html)) {
                return parser.getResultSet(html, isElement, beforeElementType)
            }
        }
    }
}

const AttributeRouter = {
    attrType: {
        'style': (element, attribute, value) => {
            let inValue = value;
            while(inValue) {
                const [matched, k, v] = inValue.match(/^ *([A-Za-z0-9]*) *: *(\S*) *;/);
                element.style[k] = v;
                inValue = inValue.substring(matched.length, inValue.length);
            }
            return element;
        },
        'data': (element, attribute, value) => {
            const dataNameBar = attribute.split('data-')[1];
            const dataName = dataNameBar.replace(/-(\D)/g, (matched, captured, i) => {
                console.log(matched, captured, i);
                return captured.toUpperCase();
            });
            element.dataset[dataName] = value;
            return element;
        },
        'class': (element, attribute, value) => {
            element.className = value;
            return element;
        },
        'id': (element, attribute, value) => {
            element.id = value;
            return element;
        }
    },
    route(element, attribute, value) {
        element.setAttribute(attribute, value);
        return this.attrType[attribute.startsWith('data') ?
            'data' : attribute]?.(element, attribute, value) ?? element;
    }
}

const TypeRouter = {
    type: {
        element: (name, isElement, nowElement) => {
            const element = document.createElement(name);
            if (nowElement) {
                nowElement.appendChild(element);
            }
            return element;
        },
        end_element: (name, isElement, nowElement) => nowElement,
        text: (name, isElement, nowElement) => {
            if (name) {
                nowElement.appendChild(document.createTextNode(name));
            }
            return nowElement;
        },
        attribute: (name, isElement, nowElement) => {
            if (!isElement) {
                throw 'Wrong html.'
            }
            const {attribute, value} = name;
            const element = AttributeRouter.route(nowElement, attribute, value);
            return element;
        },
        close_element: (name, isElement, nowElement) => nowElement ? nowElement.parentElement : null,
        comment_element: (name, isElement, nowElement) => {
            nowElement.appendChild(document.createComment(name));
            return nowElement;
        }
    },
    route(type, name, isElement, nowElement) {
        const finalType = type === Types.UNPAIRED_ELEMENT ? Types.ELEMENT : type;
        return this.type[finalType]?.(name, isElement, nowElement) ;
    }
}

export const parseHTML = (html) => {
    const _parseHTML = (html, dom, isElement, nowElement, elementType) => {
        if (!html) {
            return dom;
        }
        const {type, name, leftHTML, isElement:inisElement} = SpecificInfo.getFrom(html.trim(), isElement, elementType);
        const thisTimeElement = TypeRouter.route(type, name, isElement, nowElement)
        return _parseHTML(leftHTML, !dom ? thisTimeElement : dom, inisElement, thisTimeElement, type)
    };
    return _parseHTML(html, null, false, null, null);
}

export const whileParseHTML = html => {
    let [leftHTML, dom, isElement, nowElement, elementType] = [html, null, false, null, null];
    while(leftHTML) {
        const {type, name, leftHTML:inLeftHTML, isElement:inisElement} = SpecificInfo.getFrom(leftHTML.trim(), isElement, elementType);
        const thisTimeElement = TypeRouter.route(type, name, isElement, nowElement)
        leftHTML = inLeftHTML;
        dom = !dom ? thisTimeElement : dom;
        isElement = inisElement;
        nowElement = thisTimeElement;
        elementType = type;
    }
    return dom;
}
}