"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createStyleElement = () => {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
};

const dom = {
    // 设置样式
    css({ el, styles }) {
        if (!el)
            return;
        for (let k in styles) {
            if (styles.hasOwnProperty(k))
                el.style[k] = styles[k];
        }
    },
    //获取指定样式
    getStyleValue({ el, attr }) {
        let value = '';
        const defaultView = el.ownerDocument.defaultView;
        if (defaultView && defaultView.getComputedStyle) {
            attr = attr.replace(/([A-Z])/g, '-$1').toLowerCase();
            return defaultView.getComputedStyle(el, null).getPropertyValue(attr);
        }
        else if (el.currentStyle) { // IE
            attr = attr.replace(/\-(\w)/g, (str, letter) => letter.toUpperCase());
            value = el.currentStyle[attr];
            return value;
        }
        return '';
    },
    insertCSS(css, options) {
        if (css === undefined || css === null)
            throw new Error('insertCSS 需要提供css字符串参数');
        options = options || {};
        const position = options.prepend ? 'prepend' : 'append';
        const container = options.target || document.querySelector('head');
        const styleElement = createStyleElement();
        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        }
        else {
            container.appendChild(styleElement);
        }
        // 某些低版本浏览器并不能使用 https://caniuse.com/#search=styleSheet
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText += css;
        }
        else {
            styleElement.textContent += css;
        }
        return styleElement;
    }
};
exports.default = dom;
