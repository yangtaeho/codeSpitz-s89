`
htmlParser.js: https://gist.github.com/shinyeonjong/66412bb845d8041274e7792b76ef4c62
`;
const attributeRouter = {
    table: {
        'id': (element, k, v) => {
            element.id = v
            return element
        },
        'class': (element, k, v) => {
            element.className = v
            return element
        },
        'style': (element, k, v) => {
            v.split(';').map(style => {
                const [k, v] = style.split(':')
                element.style[k.trim()] = v.trim()
            })
            return element
        },
        'another': (element, k, v) => {
            element.setAttribute(k, v)
            return element
        }
    },
    router (element, k, v) {
        return (this.table[k] ?? this.table['another'])(element, k, v)
    }
}

const getElement = (str) => {
    const closeTag = str.indexOf('>')
    const tag = str.substr(1, closeTag - 1).trim()
    const createdElement = document.createElement(tag.match(/[\w]+/))
    const attributes =  tag.match(/([\w]+\s*?=\s*?"\s*?[\w|\s|:|;]+\s*?")/g)
    if (attributes) {
        const element = attributes.map(attr => {
            const [k, v] = attr.split('=')
            return attributeRouter.router(createdElement, k.trim(), v.trim().replace(/\"/g, ""))
        })
        return element[element.length - 1]
    } else {
        return createdElement
    }
}

const findTagRouter = {
    table: {
        'open': (str, acc, stack) => {
            const element = getElement(str)
            if (stack.length === 0) {
                acc = element
            }
            stack.push(element)
            return [acc, stack]
        },
        'close': (str, acc, stack) => {
            const element = stack.pop()
            if (stack.length === 0) {
                acc = element
            } else {
                acc.append(element)
            }
            return [acc, stack]
        },
    },
    router (str, acc, stack) {
        return this.table[str[1].startsWith('/') ? 'close' : 'open'](str, acc, stack)
    }
}

const htmlParser = (_ => {
    const _htmlParser = (str, acc, stack) => {
        const v = str.trim()
        if (!v) {
            return acc
        }

        switch (v[0]) {
            case '<':
                const closeTag = str.indexOf('>') 
                const [newAcc, newStack] = findTagRouter.router(v, acc, stack)
                return _htmlParser(str.substr(closeTag + 1), newAcc, newStack)
            default:
                const openTag = str.indexOf('<')
                const text = str.substr(0, openTag)
                if (stack.length === 1) {
                    acc.append(text)
                } else {
                    stack[stack.length - 1].append(text)
                }
                return _htmlParser(str.substr(openTag), acc, stack)
        }
    }

    return str => {
        return _htmlParser(str, '', [])
    }
})()


const whileLoop = str => {
    let accumulator = ''
    let v = str.trim()
    let stack = []

    while (true) {
        if (!v) {
            return accumulator
        }
        switch (v[0]) {
            case '<':
                const closeTag = v.indexOf('>') // 태그가 닫히는 곳 위치 까지 잘라 버리기 위함
                const [newAcc, newStack] = findTagRouter.router(v, accumulator, stack)
                v = v.substr(closeTag + 1)
                accumulator = newAcc
                stack = newStack
                break
            default:
                const openTag = v.indexOf('<')
                const text = v.substr(0, openTag)
                if (stack.length === 1) {
                    accumulator.append(text)
                } else {
                    stack[stack.length - 1].append(text)
                }
                v = v.substr(openTag)
                break
        }
    }
}