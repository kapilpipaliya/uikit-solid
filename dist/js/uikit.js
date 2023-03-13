/*! UIkit 3.16.4 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('uikit', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkit = factory());
})(this, (function () { 'use strict';

    const { hasOwnProperty, toString } = Object.prototype;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize(
      (str) => (str.charAt(0).toLowerCase() + str.slice(1)).replace(camelizeRe, (_, c) => c.toUpperCase())
    );
    const ucfirst = memoize((str) => str.charAt(0).toUpperCase() + str.slice(1));
    function startsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
    }
    function endsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.endsWith) == null ? void 0 : _a.call(str, search);
    }
    function includes(obj, search) {
      var _a;
      return (_a = obj == null ? void 0 : obj.includes) == null ? void 0 : _a.call(obj, search);
    }
    function findIndex(array, predicate) {
      var _a;
      return (_a = array == null ? void 0 : array.findIndex) == null ? void 0 : _a.call(array, predicate);
    }
    const { isArray, from: toArray } = Array;
    const { assign } = Object;
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
      return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
      return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
      return nodeType(obj) === 9;
    }
    function isNode(obj) {
      return nodeType(obj) >= 1;
    }
    function isElement(obj) {
      return nodeType(obj) === 1;
    }
    function nodeType(obj) {
      return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
      return typeof value === "boolean";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function isNumber(value) {
      return typeof value === "number";
    }
    function isNumeric(value) {
      return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
      return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
      return value === void 0;
    }
    function toBoolean(value) {
      return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
      const number = Number(value);
      return isNaN(number) ? false : number;
    }
    function toFloat(value) {
      return parseFloat(value) || 0;
    }
    function toNode(element) {
      return toNodes(element)[0];
    }
    function toNodes(element) {
      return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
    }
    function toWindow(element) {
      if (isWindow(element)) {
        return element;
      }
      element = toNode(element);
      const document = isDocument(element) ? element : element == null ? void 0 : element.ownerDocument;
      return (document == null ? void 0 : document.defaultView) || window;
    }
    function isEqual(value, other) {
      return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
    }
    function swap(value, a, b) {
      return value.replace(new RegExp(`${a}|${b}`, "g"), (match) => match === a ? b : a);
    }
    function last(array) {
      return array[array.length - 1];
    }
    function each(obj, cb) {
      for (const key in obj) {
        if (false === cb(obj[key], key)) {
          return false;
        }
      }
      return true;
    }
    function sortBy$1(array, prop) {
      return array.slice().sort(
        ({ [prop]: propA = 0 }, { [prop]: propB = 0 }) => propA > propB ? 1 : propB > propA ? -1 : 0
      );
    }
    function sumBy(array, iteratee) {
      return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
      );
    }
    function uniqueBy(array, prop) {
      const seen = /* @__PURE__ */ new Set();
      return array.filter(({ [prop]: check }) => seen.has(check) ? false : seen.add(check));
    }
    function pick(obj, props) {
      return props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {});
    }
    function clamp(number, min = 0, max = 1) {
      return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {
    }
    function intersectRect(...rects) {
      return [
        ["bottom", "top"],
        ["right", "left"]
      ].every(
        ([minProp, maxProp]) => Math.min(...rects.map(({ [minProp]: min }) => min)) - Math.max(...rects.map(({ [maxProp]: max }) => max)) > 0
      );
    }
    function pointInRect(point, rect) {
      return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    function ratio(dimensions, prop, value) {
      const aProp = prop === "width" ? "height" : "width";
      return {
        [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
        [prop]: value
      };
    }
    function contain(dimensions, maxDimensions) {
      dimensions = { ...dimensions };
      for (const prop in dimensions) {
        dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    function cover$1(dimensions, maxDimensions) {
      dimensions = contain(dimensions, maxDimensions);
      for (const prop in dimensions) {
        dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    const Dimensions = { ratio, contain, cover: cover$1 };
    function getIndex(i, elements, current = 0, finite = false) {
      elements = toNodes(elements);
      const { length } = elements;
      if (!length) {
        return -1;
      }
      i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : i === "last" ? length - 1 : elements.indexOf(toNode(i));
      if (finite) {
        return clamp(i, 0, length - 1);
      }
      i %= length;
      return i < 0 ? i + length : i;
    }
    function memoize(fn) {
      const cache = /* @__PURE__ */ Object.create(null);
      return (key) => cache[key] || (cache[key] = fn(key));
    }
    class Deferred {
      constructor() {
        promise = new Promise((resolve, reject) => {
          reject = reject;
          resolve = resolve;
        });
      }
    }

    function attr(element, name, value) {
      var _a;
      if (isObject(name)) {
        for (const key in name) {
          attr(element, key, name[key]);
        }
        return;
      }
      if (isUndefined(value)) {
        return (_a = toNode(element)) == null ? void 0 : _a.getAttribute(name);
      } else {
        for (const el of toNodes(element)) {
          if (isFunction(value)) {
            value = value.call(el, attr(el, name));
          }
          if (value === null) {
            removeAttr(el, name);
          } else {
            el.setAttribute(name, value);
          }
        }
      }
    }
    function hasAttr(element, name) {
      return toNodes(element).some((element2) => element2.hasAttribute(name));
    }
    function removeAttr(element, name) {
      toNodes(element).forEach((element2) => element2.removeAttribute(name));
    }
    function data(element, attribute) {
      for (const name of [attribute, `data-${attribute}`]) {
        if (hasAttr(element, name)) {
          return attr(element, name);
        }
      }
    }

    const voidElements = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    };
    function isVoidElement(element) {
      return toNodes(element).some((element2) => voidElements[element2.tagName.toLowerCase()]);
    }
    function isVisible(element) {
      return toNodes(element).some(
        (element2) => element2.offsetWidth || element2.offsetHeight || element2.getClientRects().length
      );
    }
    const selInput = "input,select,textarea,button";
    function isInput(element) {
      return toNodes(element).some((element2) => matches(element2, selInput));
    }
    const selFocusable = `${selInput},a[href],[tabindex]`;
    function isFocusable(element) {
      return matches(element, selFocusable);
    }
    function parent(element) {
      var _a;
      return (_a = toNode(element)) == null ? void 0 : _a.parentElement;
    }
    function filter$1(element, selector) {
      return toNodes(element).filter((element2) => matches(element2, selector));
    }
    function matches(element, selector) {
      return toNodes(element).some((element2) => element2.matches(selector));
    }
    function closest(element, selector) {
      return isElement(element) ? element.closest(startsWith(selector, ">") ? selector.slice(1) : selector) : toNodes(element).map((element2) => closest(element2, selector)).filter(Boolean);
    }
    function within(element, selector) {
      return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
    }
    function parents(element, selector) {
      const elements = [];
      while (element = parent(element)) {
        if (!selector || matches(element, selector)) {
          elements.push(element);
        }
      }
      return elements;
    }
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toNodes(element.children) : [];
      return selector ? filter$1(children2, selector) : children2;
    }
    function index(element, ref) {
      return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function isSameSiteAnchor(el) {
      el = toNode(el);
      return el && ["origin", "pathname", "search"].every((part) => el[part] === location[part]);
    }
    function getTargetedElement(el) {
      if (isSameSiteAnchor(el)) {
        el = toNode(el);
        const id = decodeURIComponent(el.hash).substring(1);
        return document.getElementById(id) || document.getElementsByName(id)[0];
      }
    }

    function query(selector, context) {
      return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
      return findAll(selector, getContext(selector, context));
    }
    function find(selector, context) {
      return toNode(_query(selector, toNode(context), "querySelector"));
    }
    function findAll(selector, context) {
      return toNodes(_query(selector, toNode(context), "querySelectorAll"));
    }
    const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    const isContextSelector = memoize((selector) => selector.match(contextSelectorRe));
    function getContext(selector, context = document) {
      return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
    }
    const contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    const sanatize = memoize((selector) => selector.replace(contextSanitizeRe, "$1 *"));
    function _query(selector, context = document, queryFn) {
      if (!selector || !isString(selector)) {
        return selector;
      }
      selector = sanatize(selector);
      if (isContextSelector(selector)) {
        const split = splitSelector(selector);
        selector = "";
        for (let sel of split) {
          let ctx = context;
          if (sel[0] === "!") {
            const selectors = sel.substr(1).trim().split(" ");
            ctx = closest(parent(context), selectors[0]);
            sel = selectors.slice(1).join(" ").trim();
            if (!sel.length && split.length === 1) {
              return ctx;
            }
          }
          if (sel[0] === "-") {
            const selectors = sel.substr(1).trim().split(" ");
            const prev = (ctx || context).previousElementSibling;
            ctx = matches(prev, sel.substr(1)) ? prev : null;
            sel = selectors.slice(1).join(" ");
          }
          if (ctx) {
            selector += `${selector ? "," : ""}${domPath(ctx)} ${sel}`;
          }
        }
        context = document;
      }
      try {
        return context[queryFn](selector);
      } catch (e) {
        return null;
      }
    }
    const selectorRe = /.*?[^\\](?:,|$)/g;
    const splitSelector = memoize(
      (selector) => selector.match(selectorRe).map((selector2) => selector2.replace(/,$/, "").trim())
    );
    function domPath(element) {
      const names = [];
      while (element.parentNode) {
        const id = attr(element, "id");
        if (id) {
          names.unshift(`#${escape(id)}`);
          break;
        } else {
          let { tagName } = element;
          if (tagName !== "HTML") {
            tagName += `:nth-child(${index(element) + 1})`;
          }
          names.unshift(tagName);
          element = element.parentNode;
        }
      }
      return names.join(" > ");
    }
    function escape(css) {
      return isString(css) ? CSS.escape(css) : "";
    }

    function on(...args) {
      let [targets, types, selector, listener, useCapture = false] = getArgs(args);
      if (listener.length > 1) {
        listener = detail(listener);
      }
      if (useCapture == null ? void 0 : useCapture.self) {
        listener = selfFilter(listener);
      }
      if (selector) {
        listener = delegate(selector, listener);
      }
      for (const type of types) {
        for (const target of targets) {
          target.addEventListener(type, listener, useCapture);
        }
      }
      return () => off(targets, types, listener, useCapture);
    }
    function off(...args) {
      let [targets, types, , listener, useCapture = false] = getArgs(args);
      for (const type of types) {
        for (const target of targets) {
          target.removeEventListener(type, listener, useCapture);
        }
      }
    }
    function once(...args) {
      const [element, types, selector, listener, useCapture = false, condition] = getArgs(args);
      const off2 = on(
        element,
        types,
        selector,
        (e) => {
          const result = !condition || condition(e);
          if (result) {
            off2();
            listener(e, result);
          }
        },
        useCapture
      );
      return off2;
    }
    function trigger(targets, event, detail2) {
      return toEventTargets(targets).every(
        (target) => target.dispatchEvent(createEvent(event, true, true, detail2))
      );
    }
    function createEvent(e, bubbles = true, cancelable = false, detail2) {
      if (isString(e)) {
        e = new CustomEvent(e, { bubbles, cancelable, detail: detail2 });
      }
      return e;
    }
    function getArgs(args) {
      args[0] = toEventTargets(args[0]);
      if (isString(args[1])) {
        args[1] = args[1].split(" ");
      }
      if (isFunction(args[2])) {
        args.splice(2, 0, false);
      }
      return args;
    }
    function delegate(selector, listener) {
      return (e) => {
        const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().filter((element) => within(e.target, element))[0] : closest(e.target, selector);
        if (current) {
          e.current = current;
          listener.call(this, e);
          delete e.current;
        }
      };
    }
    function detail(listener) {
      return (e) => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
    }
    function selfFilter(listener) {
      return function(e) {
        if (e.target === e.currentTarget || e.target === e.current) {
          return listener.call(null, e);
        }
      };
    }
    function isEventTarget(target) {
      return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
      return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
      return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
    }
    function isTouch(e) {
      return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
      var _a, _b;
      const { clientX: x, clientY: y } = ((_a = e.touches) == null ? void 0 : _a[0]) || ((_b = e.changedTouches) == null ? void 0 : _b[0]) || e;
      return { x, y };
    }

    const cssNumber = {
      "animation-iteration-count": true,
      "column-count": true,
      "fill-opacity": true,
      "flex-grow": true,
      "flex-shrink": true,
      "font-weight": true,
      "line-height": true,
      opacity: true,
      order: true,
      orphans: true,
      "stroke-dasharray": true,
      "stroke-dashoffset": true,
      widows: true,
      "z-index": true,
      zoom: true
    };
    function css(element, property, value, priority) {
      const elements = toNodes(element);
      for (const element2 of elements) {
        if (isString(property)) {
          property = propName(property);
          if (isUndefined(value)) {
            return getComputedStyle(element2).getPropertyValue(property);
          } else {
            element2.style.setProperty(
              property,
              isNumeric(value) && !cssNumber[property] ? `${value}px` : value || isNumber(value) ? value : "",
              priority
            );
          }
        } else if (isArray(property)) {
          const props = {};
          for (const prop of property) {
            props[prop] = css(element2, prop);
          }
          return props;
        } else if (isObject(property)) {
          priority = value;
          each(property, (value2, property2) => css(element2, property2, value2, priority));
        }
      }
      return elements[0];
    }
    const propName = memoize((name) => vendorPropName(name));
    function vendorPropName(name) {
      if (startsWith(name, "--")) {
        return name;
      }
      name = hyphenate(name);
      const { style } = document.documentElement;
      if (name in style) {
        return name;
      }
      for (const prefix of ["webkit", "moz"]) {
        const prefixedName = `-${prefix}-${name}`;
        if (prefixedName in style) {
          return prefixedName;
        }
      }
    }

    function addClass(element, ...args) {
      apply$1(element, args, "add");
    }
    function removeClass(element, ...args) {
      apply$1(element, args, "remove");
    }
    function removeClasses(element, cls) {
      attr(
        element,
        "class",
        (value) => (value || "").replace(new RegExp(`\\b${cls}\\b\\s?`, "g"), "")
      );
    }
    function replaceClass(element, ...args) {
      args[0] && removeClass(element, args[0]);
      args[1] && addClass(element, args[1]);
    }
    function hasClass(element, cls) {
      [cls] = getClasses(cls);
      return !!cls && toNodes(element).some((node) => node.classList.contains(cls));
    }
    function toggleClass(element, cls, force) {
      const classes = getClasses(cls);
      if (!isUndefined(force)) {
        force = !!force;
      }
      for (const node of toNodes(element)) {
        for (const cls2 of classes) {
          node.classList.toggle(cls2, force);
        }
      }
    }
    function apply$1(element, args, fn) {
      args = args.reduce((args2, arg) => args2.concat(getClasses(arg)), []);
      for (const node of toNodes(element)) {
        node.classList[fn](...args);
      }
    }
    function getClasses(str) {
      return String(str).split(/[ ,]/).filter(Boolean);
    }

    function transition$1(element, props, duration = 400, timing = "linear") {
      duration = Math.round(duration);
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            for (const name in props) {
              const value = css(element2, name);
              if (value === "") {
                css(element2, name, value);
              }
            }
            const timer = setTimeout(() => trigger(element2, "transitionend"), duration);
            once(
              element2,
              "transitionend transitioncanceled",
              ({ type }) => {
                clearTimeout(timer);
                removeClass(element2, "uk-transition");
                css(element2, {
                  transitionProperty: "",
                  transitionDuration: "",
                  transitionTimingFunction: ""
                });
                type === "transitioncanceled" ? reject() : resolve(element2);
              },
              { self: true }
            );
            addClass(element2, "uk-transition");
            css(element2, {
              transitionProperty: Object.keys(props).map(propName).join(","),
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: timing,
              ...props
            });
          })
        )
      );
    }
    const Transition = {
      start: transition$1,
      async stop(element) {
        trigger(element, "transitionend");
        await Promise.resolve();
      },
      async cancel(element) {
        trigger(element, "transitioncanceled");
        await Promise.resolve();
      },
      inProgress(element) {
        return hasClass(element, "uk-transition");
      }
    };
    const animationPrefix = "uk-animation-";
    function animate$2(element, animation, duration = 200, origin, out) {
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            trigger(element2, "animationcanceled");
            const timer = setTimeout(() => trigger(element2, "animationend"), duration);
            once(
              element2,
              "animationend animationcanceled",
              ({ type }) => {
                clearTimeout(timer);
                type === "animationcanceled" ? reject() : resolve(element2);
                css(element2, "animationDuration", "");
                removeClasses(element2, `${animationPrefix}\\S*`);
              },
              { self: true }
            );
            css(element2, "animationDuration", `${duration}ms`);
            addClass(element2, animation, animationPrefix + (out ? "leave" : "enter"));
            if (startsWith(animation, animationPrefix)) {
              origin && addClass(element2, `uk-transform-origin-${origin}`);
              out && addClass(element2, `${animationPrefix}reverse`);
            }
          })
        )
      );
    }
    const inProgressRe = new RegExp(`${animationPrefix}(enter|leave)`);
    const Animation = {
      in: animate$2,
      out(element, animation, duration, origin) {
        return animate$2(element, animation, duration, origin, true);
      },
      inProgress(element) {
        return inProgressRe.test(attr(element, "class"));
      },
      cancel(element) {
        trigger(element, "animationcanceled");
      }
    };

    function ready(fn) {
      if (document.readyState !== "loading") {
        fn();
        return;
      }
      once(document, "DOMContentLoaded", fn);
    }
    function isTag(element, ...tagNames) {
      return tagNames.some((tagName) => {
        var _a;
        return ((_a = element == null ? void 0 : element.tagName) == null ? void 0 : _a.toLowerCase()) === tagName.toLowerCase();
      });
    }
    function empty(element) {
      element = $(element);
      element.innerHTML = "";
      return element;
    }
    function html(parent2, html2) {
      return isUndefined(html2) ? $(parent2).innerHTML : append(empty(parent2), html2);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
      return function(ref, element) {
        var _a;
        const nodes = toNodes(isString(element) ? fragment(element) : element);
        (_a = $(ref)) == null ? void 0 : _a[fn](...nodes);
        return unwrapSingle(nodes);
      };
    }
    function remove$1(element) {
      toNodes(element).forEach((element2) => element2.remove());
    }
    function wrapAll(element, structure) {
      structure = toNode(before(element, structure));
      while (structure.firstChild) {
        structure = structure.firstChild;
      }
      append(structure, element);
      return structure;
    }
    function wrapInner(element, structure) {
      return toNodes(
        toNodes(element).map(
          (element2) => element2.hasChildNodes() ? wrapAll(toNodes(element2.childNodes), structure) : append(element2, structure)
        )
      );
    }
    function unwrap(element) {
      toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach((parent2) => parent2.replaceWith(...parent2.childNodes));
    }
    const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html2) {
      const matches = singleTagRe.exec(html2);
      if (matches) {
        return document.createElement(matches[1]);
      }
      const container = document.createElement("div");
      if (fragmentRe.test(html2)) {
        container.insertAdjacentHTML("beforeend", html2.trim());
      } else {
        container.textContent = html2;
      }
      return unwrapSingle(container.childNodes);
    }
    function unwrapSingle(nodes) {
      return nodes.length > 1 ? nodes : nodes[0];
    }
    function apply(node, fn) {
      if (!isElement(node)) {
        return;
      }
      fn(node);
      node = node.firstElementChild;
      while (node) {
        const next = node.nextElementSibling;
        apply(node, fn);
        node = next;
      }
    }
    function $(selector, context) {
      return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
      return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
      return isString(str) && startsWith(str.trim(), "<");
    }

    const dirs$1 = {
      width: ["left", "right"],
      height: ["top", "bottom"]
    };
    function dimensions$1(element) {
      const rect = isElement(element) ? toNode(element).getBoundingClientRect() : { height: height(element), width: width(element), top: 0, left: 0 };
      return {
        height: rect.height,
        width: rect.width,
        top: rect.top,
        left: rect.left,
        bottom: rect.top + rect.height,
        right: rect.left + rect.width
      };
    }
    function offset(element, coordinates) {
      const currentOffset = dimensions$1(element);
      if (element) {
        const { scrollY, scrollX } = toWindow(element);
        const offsetBy = { height: scrollY, width: scrollX };
        for (const dir in dirs$1) {
          for (const prop of dirs$1[dir]) {
            currentOffset[prop] += offsetBy[dir];
          }
        }
      }
      if (!coordinates) {
        return currentOffset;
      }
      const pos = css(element, "position");
      each(
        css(element, ["left", "top"]),
        (value, prop) => css(
          element,
          prop,
          coordinates[prop] - currentOffset[prop] + toFloat(pos === "absolute" && value === "auto" ? position(element)[prop] : value)
        )
      );
    }
    function position(element) {
      let { top, left } = offset(element);
      const {
        ownerDocument: { body, documentElement },
        offsetParent
      } = toNode(element);
      let parent = offsetParent || documentElement;
      while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
        parent = parent.parentNode;
      }
      if (isElement(parent)) {
        const parentOffset = offset(parent);
        top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
        left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
      }
      return {
        top: top - toFloat(css(element, "marginTop")),
        left: left - toFloat(css(element, "marginLeft"))
      };
    }
    function offsetPosition(element) {
      element = toNode(element);
      const offset2 = [element.offsetTop, element.offsetLeft];
      while (element = element.offsetParent) {
        offset2[0] += element.offsetTop + toFloat(css(element, `borderTopWidth`));
        offset2[1] += element.offsetLeft + toFloat(css(element, `borderLeftWidth`));
        if (css(element, "position") === "fixed") {
          const win = toWindow(element);
          offset2[0] += win.scrollY;
          offset2[1] += win.scrollX;
          return offset2;
        }
      }
      return offset2;
    }
    const height = dimension("height");
    const width = dimension("width");
    function dimension(prop) {
      const propName = ucfirst(prop);
      return (element, value) => {
        if (isUndefined(value)) {
          if (isWindow(element)) {
            return element[`inner${propName}`];
          }
          if (isDocument(element)) {
            const doc = element.documentElement;
            return Math.max(doc[`offset${propName}`], doc[`scroll${propName}`]);
          }
          element = toNode(element);
          value = css(element, prop);
          value = value === "auto" ? element[`offset${propName}`] : toFloat(value) || 0;
          return value - boxModelAdjust(element, prop);
        } else {
          return css(
            element,
            prop,
            !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px"
          );
        }
      };
    }
    function boxModelAdjust(element, prop, sizing = "border-box") {
      return css(element, "boxSizing") === sizing ? sumBy(
        dirs$1[prop].map(ucfirst),
        (prop2) => toFloat(css(element, `padding${prop2}`)) + toFloat(css(element, `border${prop2}Width`))
      ) : 0;
    }
    function flipPosition(pos) {
      for (const dir in dirs$1) {
        for (const i in dirs$1[dir]) {
          if (dirs$1[dir][i] === pos) {
            return dirs$1[dir][1 - i];
          }
        }
      }
      return pos;
    }
    function toPx(value, property = "width", element = window, offsetDim = false) {
      if (!isString(value)) {
        return toFloat(value);
      }
      return sumBy(parseCalc(value), (value2) => {
        const unit = parseUnit(value2);
        return unit ? percent(
          unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions$1(element)[property],
          value2
        ) : value2;
      });
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize((calc) => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe$1 = /(?:v[hw]|%)$/;
    const parseUnit = memoize((str) => (str.match(unitRe$1) || [])[0]);
    function percent(base, value) {
      return base * toFloat(value) / 100;
    }
    let vh;
    let vhEl;
    function getViewportHeight() {
      if (vh) {
        return vh;
      }
      if (!vhEl) {
        vhEl = $("<div>");
        css(vhEl, {
          height: "100vh",
          position: "fixed"
        });
        on(window, "resize", () => vh = null);
      }
      append(document.body, vhEl);
      vh = vhEl.clientHeight;
      remove$1(vhEl);
      return vh;
    }

    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
    const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
    const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
    const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";

    const fastdom = {
      reads: [],
      writes: [],
      read(task) {
        reads.push(task);
        scheduleFlush();
        return task;
      },
      write(task) {
        writes.push(task);
        scheduleFlush();
        return task;
      },
      clear(task) {
        remove(reads, task);
        remove(writes, task);
      },
      flush
    };
    function flush(recursion) {
      runTasks(fastdom.reads);
      runTasks(fastdom.writes.splice(0));
      fastdom.scheduled = false;
      if (fastdom.reads.length || fastdom.writes.length) {
        scheduleFlush(recursion + 1);
      }
    }
    const RECURSION_LIMIT = 4;
    function scheduleFlush(recursion) {
      if (fastdom.scheduled) {
        return;
      }
      fastdom.scheduled = true;
      if (recursion && recursion < RECURSION_LIMIT) {
        Promise.resolve().then(() => flush(recursion));
      } else {
        requestAnimationFrame(() => flush(1));
      }
    }
    function runTasks(tasks) {
      let task;
      while (task = tasks.shift()) {
        try {
          task();
        } catch (e) {
          console.error(e);
        }
      }
    }
    function remove(array, item) {
      const index = array.indexOf(item);
      return ~index && array.splice(index, 1);
    }

    function MouseTracker() {
    }
    MouseTracker.prototype = {
      positions: [],
      init() {
        positions = [];
        let position;
        unbind = on(document, "mousemove", (e) => position = getEventPos(e));
        interval = setInterval(() => {
          if (!position) {
            return;
          }
          positions.push(position);
          if (positions.length > 5) {
            positions.shift();
          }
        }, 50);
      },
      cancel() {
        var _a;
        (_a = unbind) == null ? void 0 : _a.call(this);
        clearInterval(interval);
      },
      movesTo(target) {
        if (positions.length < 2) {
          return false;
        }
        const p = target.getBoundingClientRect();
        const { left, right, top, bottom } = p;
        const [prevPosition] = positions;
        const position = last(positions);
        const path = [prevPosition, position];
        if (pointInRect(position, p)) {
          return false;
        }
        const diagonals = [
          [
            { x: left, y: top },
            { x: right, y: bottom }
          ],
          [
            { x: left, y: bottom },
            { x: right, y: top }
          ]
        ];
        return diagonals.some((diagonal) => {
          const intersection = intersect(path, diagonal);
          return intersection && pointInRect(intersection, p);
        });
      }
    };
    function intersect([{ x: x1, y: y1 }, { x: x2, y: y2 }], [{ x: x3, y: y3 }, { x: x4, y: y4 }]) {
      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      if (denominator === 0) {
        return false;
      }
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      if (ua < 0) {
        return false;
      }
      return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
    }

    function observeIntersection(targets, cb, options = {}, intersecting = true) {
      const observer = new IntersectionObserver(
        intersecting ? (entries, observer2) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            cb(entries, observer2);
          }
        } : cb,
        options
      );
      for (const el of toNodes(targets)) {
        observer.observe(el);
      }
      return observer;
    }
    const hasResizeObserver = inBrowser && window.ResizeObserver;
    function observeResize(targets, cb, options = { box: "border-box" }) {
      if (hasResizeObserver) {
        return observe$1(ResizeObserver, targets, cb, options);
      }
      initResizeListener();
      listeners.add(cb);
      return {
        observe: noop,
        unobserve: noop,
        disconnect() {
          listeners.delete(cb);
        }
      };
    }
    let listeners;
    function initResizeListener() {
      if (listeners) {
        return;
      }
      listeners = /* @__PURE__ */ new Set();
      let pendingResize;
      const handleResize = () => {
        if (pendingResize) {
          return;
        }
        pendingResize = true;
        requestAnimationFrame(() => pendingResize = false);
        for (const listener of listeners) {
          listener();
        }
      };
      on(window, "load resize", handleResize);
      on(document, "loadedmetadata load", handleResize, true);
    }
    function observeMutation(targets, cb, options) {
      return observe$1(MutationObserver, targets, cb, options);
    }
    function observe$1(Observer, targets, cb, options) {
      const observer = new Observer(cb);
      for (const el of toNodes(targets)) {
        observer.observe(el, options);
      }
      return observer;
    }

    function play(el) {
      if (isIFrame(el)) {
        call(el, { func: "playVideo", method: "play" });
      }
      if (isHTML5(el)) {
        try {
          el.play().catch(noop);
        } catch (e) {
        }
      }
    }
    function pause(el) {
      if (isIFrame(el)) {
        call(el, { func: "pauseVideo", method: "pause" });
      }
      if (isHTML5(el)) {
        el.pause();
      }
    }
    function mute(el) {
      if (isIFrame(el)) {
        call(el, { func: "mute", method: "setVolume", value: 0 });
      }
      if (isHTML5(el)) {
        el.muted = true;
      }
    }
    function isVideo(el) {
      return isHTML5(el) || isIFrame(el);
    }
    function isHTML5(el) {
      return isTag(el, "video");
    }
    function isIFrame(el) {
      return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
      return !!el.src.match(
        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/
      );
    }
    function isVimeo(el) {
      return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    async function call(el, cmd) {
      await enableApi(el);
      post(el, cmd);
    }
    function post(el, cmd) {
      try {
        el.contentWindow.postMessage(JSON.stringify({ event: "command", ...cmd }), "*");
      } catch (e) {
      }
    }
    const stateKey = "_ukPlayer";
    let counter = 0;
    function enableApi(el) {
      if (el[stateKey]) {
        return el[stateKey];
      }
      const youtube = isYoutube(el);
      const vimeo = isVimeo(el);
      const id = ++counter;
      let poller;
      return el[stateKey] = new Promise((resolve) => {
        youtube && once(el, "load", () => {
          const listener = () => post(el, { event: "listening", id });
          poller = setInterval(listener, 100);
          listener();
        });
        once(window, "message", resolve, false, ({ data }) => {
          try {
            data = JSON.parse(data);
            return youtube && (data == null ? void 0 : data.id) === id && data.event === "onReady" || vimeo && Number(data == null ? void 0 : data.player_id) === id;
          } catch (e) {
          }
        });
        el.src = `${el.src}${includes(el.src, "?") ? "&" : "?"}${youtube ? "enablejsapi=1" : `api=1&player_id=${id}`}`;
      }).then(() => clearInterval(poller));
    }

    function isInView(element, offsetTop = 0, offsetLeft = 0) {
      if (!isVisible(element)) {
        return false;
      }
      return intersectRect(
        ...overflowParents(element).map((parent) => {
          const { top, left, bottom, right } = offsetViewport(parent);
          return {
            top: top - offsetTop,
            left: left - offsetLeft,
            bottom: bottom + offsetTop,
            right: right + offsetLeft
          };
        }).concat(offset(element))
      );
    }
    function scrollIntoView(element, { offset: offsetBy = 0 } = {}) {
      const parents2 = isVisible(element) ? scrollParents(element, false, ["hidden"]) : [];
      return parents2.reduce(
        (fn, scrollElement, i) => {
          const { scrollTop, scrollHeight, offsetHeight } = scrollElement;
          const viewport = offsetViewport(scrollElement);
          const maxScroll = scrollHeight - viewport.height;
          const { height: elHeight, top: elTop } = parents2[i - 1] ? offsetViewport(parents2[i - 1]) : offset(element);
          let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
          if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
            top += offsetBy;
          } else {
            offsetBy = 0;
          }
          if (top > maxScroll) {
            offsetBy -= top - maxScroll;
            top = maxScroll;
          } else if (top < 0) {
            offsetBy -= top;
            top = 0;
          }
          return () => scrollTo(scrollElement, top - scrollTop).then(fn);
        },
        () => Promise.resolve()
      )();
      function scrollTo(element2, top) {
        return new Promise((resolve) => {
          const scroll = element2.scrollTop;
          const duration = getDuration(Math.abs(top));
          const start = Date.now();
          (function step() {
            const percent = ease(clamp((Date.now() - start) / duration));
            element2.scrollTop = scroll + top * percent;
            if (percent === 1) {
              resolve();
            } else {
              requestAnimationFrame(step);
            }
          })();
        });
      }
      function getDuration(dist) {
        return 40 * Math.pow(dist, 0.375);
      }
      function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }
    }
    function scrolledOver(element, startOffset = 0, endOffset = 0) {
      if (!isVisible(element)) {
        return 0;
      }
      const [scrollElement] = scrollParents(element, true);
      const { scrollHeight, scrollTop } = scrollElement;
      const { height: viewportHeight } = offsetViewport(scrollElement);
      const maxScroll = scrollHeight - viewportHeight;
      const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
      const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
      const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
      return clamp((scrollTop - start) / (end - start));
    }
    function scrollParents(element, scrollable = false, props = []) {
      const scrollEl = scrollingElement(element);
      let ancestors = parents(element).reverse();
      ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
      const fixedIndex = findIndex(ancestors, (el) => css(el, "position") === "fixed");
      if (~fixedIndex) {
        ancestors = ancestors.slice(fixedIndex);
      }
      return [scrollEl].concat(
        ancestors.filter(
          (parent) => css(parent, "overflow").split(" ").some((prop) => includes(["auto", "scroll", ...props], prop)) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height)
        )
      ).reverse();
    }
    function overflowParents(element) {
      return scrollParents(element, false, ["hidden", "clip"]);
    }
    function offsetViewport(scrollElement) {
      const window = toWindow(scrollElement);
      const {
        visualViewport,
        document: { documentElement }
      } = window;
      let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
      if (isWindow(viewportElement) && visualViewport) {
        let { height, width, scale, pageTop: top, pageLeft: left } = visualViewport;
        height = Math.round(height * scale);
        width = Math.round(width * scale);
        return { height, width, top, left, bottom: top + height, right: left + width };
      }
      let rect = offset(viewportElement);
      if (css(viewportElement, "display") === "inline") {
        return rect;
      }
      for (let [prop, dir, start, end] of [
        ["width", "x", "left", "right"],
        ["height", "y", "top", "bottom"]
      ]) {
        if (isWindow(viewportElement)) {
          viewportElement = documentElement;
        } else {
          rect[start] += toFloat(css(viewportElement, `border-${start}-width`));
        }
        rect[prop] = rect[dir] = viewportElement[`client${ucfirst(prop)}`];
        rect[end] = rect[prop] + rect[start];
      }
      return rect;
    }
    function scrollingElement(element) {
      return toWindow(element).document.scrollingElement;
    }

    const dirs = [
      ["width", "x", "left", "right"],
      ["height", "y", "top", "bottom"]
    ];
    function positionAt(element, target, options) {
      options = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        placement: [],
        ...options
      };
      if (!isArray(target)) {
        target = [target, target];
      }
      offset(element, getPosition(element, target, options));
    }
    function getPosition(element, target, options) {
      const position = attachTo(element, target, options);
      const { boundary, viewportOffset = 0, placement } = options;
      let offsetPosition = position;
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const viewport = getViewport$2(element, target[i], viewportOffset, boundary, i);
        if (isWithin(position, viewport, i)) {
          continue;
        }
        let offsetBy = 0;
        if (placement[i] === "flip") {
          const attach = options.attach.target[i];
          if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
            continue;
          }
          offsetBy = flip(element, target, options, i)[start] - position[start];
          const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
          if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
            if (isWithin(position, scrollArea, i)) {
              continue;
            }
            if (options.recursion) {
              return false;
            }
            const newPos = flipAxis(element, target, options);
            if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
              return newPos;
            }
            continue;
          }
        } else if (placement[i] === "shift") {
          const targetDim = offset(target[i]);
          const { offset: elOffset } = options;
          offsetBy = clamp(
            clamp(position[start], viewport[start], viewport[end] - position[prop]),
            targetDim[start] - position[prop] + elOffset[i],
            targetDim[end] - elOffset[i]
          ) - position[start];
        }
        offsetPosition = applyOffset(offsetPosition, offsetBy, i);
      }
      return offsetPosition;
    }
    function attachTo(element, target, options) {
      let { attach, offset: offsetBy } = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        ...options
      };
      let elOffset = offset(element);
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
        elOffset = applyOffset(
          elOffset,
          targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i],
          i
        );
      }
      return elOffset;
    }
    function applyOffset(position, offset2, i) {
      const [, dir, start, end] = dirs[i];
      const newPos = { ...position };
      newPos[start] = position[dir] = position[start] + offset2;
      newPos[end] += offset2;
      return newPos;
    }
    function moveBy(attach, end, dim) {
      return attach === "center" ? dim / 2 : attach === end ? dim : 0;
    }
    function getViewport$2(element, target, viewportOffset, boundary, i) {
      let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
      if (viewportOffset) {
        viewport[dirs[i][2]] += viewportOffset;
        viewport[dirs[i][3]] -= viewportOffset;
      }
      if (boundary) {
        viewport = getIntersectionArea(
          viewport,
          offset(isArray(boundary) ? boundary[i] : boundary)
        );
      }
      return viewport;
    }
    function getScrollArea(element, target, viewportOffset, i) {
      const [prop, axis, start, end] = dirs[i];
      const [scrollElement] = commonScrollParents(element, target);
      const viewport = offsetViewport(scrollElement);
      if (["auto", "scroll"].includes(css(scrollElement, `overflow-${axis}`))) {
        viewport[start] -= scrollElement[`scroll${ucfirst(start)}`];
        viewport[end] = viewport[start] + scrollElement[`scroll${ucfirst(prop)}`];
      }
      viewport[start] += viewportOffset;
      viewport[end] -= viewportOffset;
      return viewport;
    }
    function commonScrollParents(element, target) {
      return overflowParents(target).filter((parent) => within(element, parent));
    }
    function getIntersectionArea(...rects) {
      let area = {};
      for (const rect of rects) {
        for (const [, , start, end] of dirs) {
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min(...[area[end], rect[end]].filter(Boolean));
        }
      }
      return area;
    }
    function isWithin(positionA, positionB, i) {
      const [, , start, end] = dirs[i];
      return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
    }
    function flip(element, target, { offset: offset2, attach }, i) {
      return attachTo(element, target, {
        attach: {
          element: flipAttach(attach.element, i),
          target: flipAttach(attach.target, i)
        },
        offset: flipOffset(offset2, i)
      });
    }
    function flipAxis(element, target, options) {
      return getPosition(element, target, {
        ...options,
        attach: {
          element: options.attach.element.map(flipAttachAxis).reverse(),
          target: options.attach.target.map(flipAttachAxis).reverse()
        },
        offset: options.offset.reverse(),
        placement: options.placement.reverse(),
        recursion: true
      });
    }
    function flipAttach(attach, i) {
      const newAttach = [...attach];
      const index = dirs[i].indexOf(attach[i]);
      if (~index) {
        newAttach[i] = dirs[i][1 - index % 2 + 2];
      }
      return newAttach;
    }
    function flipAttachAxis(prop) {
      for (let i = 0; i < dirs.length; i++) {
        const index = dirs[i].indexOf(prop);
        if (~index) {
          return dirs[1 - i][index % 2 + 2];
        }
      }
    }
    function flipOffset(offset2, i) {
      offset2 = [...offset2];
      offset2[i] *= -1;
      return offset2;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $: $,
        $$: $$,
        Animation: Animation,
        Deferred: Deferred,
        Dimensions: Dimensions,
        MouseTracker: MouseTracker,
        Transition: Transition,
        addClass: addClass,
        after: after,
        append: append,
        apply: apply,
        assign: assign,
        attr: attr,
        before: before,
        boxModelAdjust: boxModelAdjust,
        camelize: camelize,
        children: children,
        clamp: clamp,
        closest: closest,
        createEvent: createEvent,
        css: css,
        data: data,
        dimensions: dimensions$1,
        each: each,
        empty: empty,
        endsWith: endsWith,
        escape: escape,
        fastdom: fastdom,
        filter: filter$1,
        find: find,
        findAll: findAll,
        findIndex: findIndex,
        flipPosition: flipPosition,
        fragment: fragment,
        getEventPos: getEventPos,
        getIndex: getIndex,
        getTargetedElement: getTargetedElement,
        hasAttr: hasAttr,
        hasClass: hasClass,
        hasOwn: hasOwn,
        hasTouch: hasTouch,
        height: height,
        html: html,
        hyphenate: hyphenate,
        inBrowser: inBrowser,
        includes: includes,
        index: index,
        intersectRect: intersectRect,
        isArray: isArray,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isEmpty: isEmpty,
        isEqual: isEqual,
        isFocusable: isFocusable,
        isFunction: isFunction,
        isInView: isInView,
        isInput: isInput,
        isNode: isNode,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isRtl: isRtl,
        isSameSiteAnchor: isSameSiteAnchor,
        isString: isString,
        isTag: isTag,
        isTouch: isTouch,
        isUndefined: isUndefined,
        isVideo: isVideo,
        isVisible: isVisible,
        isVoidElement: isVoidElement,
        isWindow: isWindow,
        last: last,
        matches: matches,
        memoize: memoize,
        mute: mute,
        noop: noop,
        observeIntersection: observeIntersection,
        observeMutation: observeMutation,
        observeResize: observeResize,
        off: off,
        offset: offset,
        offsetPosition: offsetPosition,
        offsetViewport: offsetViewport,
        on: on,
        once: once,
        overflowParents: overflowParents,
        parent: parent,
        parents: parents,
        pause: pause,
        pick: pick,
        play: play,
        pointInRect: pointInRect,
        pointerCancel: pointerCancel,
        pointerDown: pointerDown$1,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove$1,
        pointerUp: pointerUp$1,
        position: position,
        positionAt: positionAt,
        prepend: prepend,
        propName: propName,
        query: query,
        queryAll: queryAll,
        ready: ready,
        remove: remove$1,
        removeAttr: removeAttr,
        removeClass: removeClass,
        removeClasses: removeClasses,
        replaceClass: replaceClass,
        scrollIntoView: scrollIntoView,
        scrollParents: scrollParents,
        scrolledOver: scrolledOver,
        selFocusable: selFocusable,
        selInput: selInput,
        sortBy: sortBy$1,
        startsWith: startsWith,
        sumBy: sumBy,
        swap: swap,
        toArray: toArray,
        toBoolean: toBoolean,
        toEventTargets: toEventTargets,
        toFloat: toFloat,
        toNode: toNode,
        toNodes: toNodes,
        toNumber: toNumber,
        toPx: toPx,
        toWindow: toWindow,
        toggleClass: toggleClass,
        trigger: trigger,
        ucfirst: ucfirst,
        uniqueBy: uniqueBy,
        unwrap: unwrap,
        width: width,
        within: within,
        wrapAll: wrapAll,
        wrapInner: wrapInner
    });

    function initObservers(instance) {
      instance._observers = [];
      instance._observerUpdates = /* @__PURE__ */ new Map();
      for (const observer of instance.$options.observe || []) {
        if (hasOwn(observer, "handler")) {
          registerObservable(instance, observer);
        } else {
          for (const key in observer) {
            registerObservable(instance, observer[key], key);
          }
        }
      }
    }
    function registerObserver(instance, ...observer) {
      instance._observers.push(...observer);
    }
    function disconnectObservers(instance) {
      for (const observer of instance._observers) {
        observer == null ? void 0 : observer.disconnect();
        instance._observerUpdates.delete(observer);
      }
    }
    function callObserverUpdates(instance) {
      for (const [observer, update] of instance._observerUpdates) {
        update(observer);
      }
    }
    function registerObservable(instance, observable, key) {
      let {
        observe,
        target = instance.$el,
        handler,
        options,
        filter,
        args
      } = isPlainObject(observable) ? observable : { type: key, handler: observable };
      if (filter && !filter.call(instance, instance)) {
        return;
      }
      const targets = isFunction(target) ? target.call(instance, instance) : target;
      handler = isString(handler) ? instance[handler] : handler.bind(instance);
      if (isFunction(options)) {
        options = options.call(instance, instance);
      }
      const observer = observe(targets, handler, options, args);
      if (isFunction(target) && isArray(targets) && observer.unobserve) {
        instance._observerUpdates.set(observer, watchChange(instance, target, targets));
      }
      registerObserver(instance, observer);
    }
    function watchChange(instance, targetFn, targets) {
      return (observer) => {
        const newTargets = targetFn.call(instance, instance);
        if (isEqual(targets, newTargets)) {
          return;
        }
        targets.forEach((target) => !includes(newTargets, target) && observer.unobserve(target));
        newTargets.forEach((target) => !includes(targets, target) && observer.observe(target));
        targets.splice(0, targets.length, ...newTargets);
      };
    }

    function callWatches(instance) {
      if (instance._watch) {
        return;
      }
      const initial = !hasOwn(instance, "_watch");
      instance._watch = fastdom.read(() => {
        if (instance._connected) {
          runWatches(instance, initial);
        }
        instance._watch = null;
      });
    }
    function runWatches(instance, initial) {
      const values = { ...instance._computed };
      instance._computed = {};
      for (const [key, { watch, immediate }] of Object.entries(instance.$options.computed || {})) {
        if (watch && (initial && immediate || hasOwn(values, key) && !isEqual(values[key], instance[key]))) {
          watch.call(instance, instance[key], initial ? void 0 : values[key]);
        }
      }
      callObserverUpdates(instance);
    }

    function callUpdate(instance, e = "update") {
      if (!instance._connected) {
        return;
      }
      if (e === "update" || e === "resize") {
        callWatches(instance);
      }
      if (!instance.$options.update) {
        return;
      }
      if (!instance._updates) {
        instance._updates = /* @__PURE__ */ new Set();
        fastdom.read(() => {
          if (instance._connected) {
            runUpdates(instance, instance._updates);
          }
          delete instance._updates;
        });
      }
      instance._updates.add(e.type || e);
    }
    function runUpdates(instance, types) {
      for (const { read, write, events = [] } of instance.$options.update) {
        if (!types.has("update") && !events.some((type) => types.has(type))) {
          continue;
        }
        let result;
        if (read) {
          result = read.call(instance, instance._data, types);
          if (result && isPlainObject(result)) {
            assign(instance._data, result);
          }
        }
        if (write && result !== false) {
          fastdom.write(() => {
            if (instance._connected) {
              write.call(instance, instance._data, types);
            }
          });
        }
      }
    }
    function initUpdateObserver(instance) {
      let { el, computed, observe } = instance.$options;
      if (!computed && !(observe == null ? void 0 : observe.some((options) => isFunction(options.target)))) {
        return;
      }
      for (const key in computed || {}) {
        if (computed[key].document) {
          el = el.ownerDocument;
          break;
        }
      }
      const observer = new MutationObserver(() => callWatches(instance));
      observer.observe(el, {
        childList: true,
        subtree: true
      });
      registerObserver(instance, observer);
    }

    function initEvents(instance) {
      instance._events = [];
      for (const event of instance.$options.events || []) {
        if (hasOwn(event, "handler")) {
          registerEvent(instance, event);
        } else {
          for (const key in event) {
            registerEvent(instance, event[key], key);
          }
        }
      }
    }
    function unbindEvents(instance) {
      instance._events.forEach((unbind) => unbind());
      delete instance._events;
    }
    function registerEvent(instance, event, key) {
      let { name, el, handler, capture, passive, delegate, filter, self } = isPlainObject(event) ? event : { name: key, handler: event };
      el = isFunction(el) ? el.call(instance, instance) : el || instance.$el;
      if (isArray(el)) {
        el.forEach((el2) => registerEvent(instance, { ...event, el: el2 }, key));
        return;
      }
      if (!el || filter && !filter.call(instance)) {
        return;
      }
      instance._events.push(
        on(
          el,
          name,
          delegate ? isString(delegate) ? delegate : delegate.call(instance, instance) : null,
          isString(handler) ? instance[handler] : handler.bind(instance),
          { passive, capture, self }
        )
      );
    }

    const strats = {};
    strats.events = strats.observe = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
      return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
      return sortBy$1(
        concatStrat(parentVal, isFunction(childVal) ? { read: childVal } : childVal),
        "order"
      );
    };
    strats.props = function(parentVal, childVal) {
      if (isArray(childVal)) {
        const value = {};
        for (const key of childVal) {
          value[key] = String;
        }
        childVal = value;
      }
      return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
      return childVal ? parentVal ? { ...parentVal, ...childVal } : childVal : parentVal;
    };
    strats.i18n = strats.data = function(parentVal, childVal, vm) {
      if (!vm) {
        if (!childVal) {
          return parentVal;
        }
        if (!parentVal) {
          return childVal;
        }
        return function(vm2) {
          return mergeFnData(parentVal, childVal, vm2);
        };
      }
      return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
      return strats.computed(
        isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal,
        isFunction(childVal) ? childVal.call(vm, vm) : childVal
      );
    }
    function concatStrat(parentVal, childVal) {
      parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
      return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
      return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
      const options = {};
      if (isFunction(child)) {
        child = child.options;
      }
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (const mixin of child.mixins) {
          parent = mergeOptions(parent, mixin, vm);
        }
      }
      for (const key in parent) {
        mergeKey(key);
      }
      for (const key in child) {
        if (!hasOwn(parent, key)) {
          mergeKey(key);
        }
      }
      function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
      }
      return options;
    }
    function parseOptions(options, args = []) {
      try {
        return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? { [args[0]]: options } : options.split(";").reduce((options2, option) => {
          const [key, value] = option.split(/:(.*)/);
          if (key && !isUndefined(value)) {
            options2[key.trim()] = value.trim();
          }
          return options2;
        }, {}) : {};
      } catch (e) {
        return {};
      }
    }
    function coerce$1(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      } else if (type === Object && isString(value)) {
        return parseOptions(value);
      }
      return type ? type(value) : value;
    }
    function toList(value) {
      return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map((value2) => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
    }

    function initProps(instance) {
      const props = getProps$1(instance.$options);
      for (let key in props) {
        if (!isUndefined(props[key])) {
          instance.$props[key] = props[key];
        }
      }
      const exclude = [instance.$options.computed, instance.$options.methods];
      for (let key in instance.$props) {
        if (key in props && notIn(exclude, key)) {
          instance[key] = instance.$props[key];
        }
      }
    }
    function getProps$1(opts) {
      const data$1 = {};
      const { args = [], props = {}, el, id } = opts;
      if (!props) {
        return data$1;
      }
      for (const key in props) {
        const prop = hyphenate(key);
        let value = data(el, prop);
        if (isUndefined(value)) {
          continue;
        }
        value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
        if (prop === "target" && startsWith(value, "_")) {
          continue;
        }
        data$1[key] = value;
      }
      const options = parseOptions(data(el, id), args);
      for (const key in options) {
        const prop = camelize(key);
        if (!isUndefined(props[prop])) {
          data$1[prop] = coerce$1(props[prop], options[key]);
        }
      }
      return data$1;
    }
    function notIn(options, key) {
      return options.every((arr) => !arr || !hasOwn(arr, key));
    }
    function initPropsObserver(instance) {
      const { $options, $props } = instance;
      const { id, attrs, props, el } = $options;
      if (!props || attrs === false) {
        return;
      }
      const attributes = isArray(attrs) ? attrs : Object.keys(props);
      const filter = attributes.map((key) => hyphenate(key)).concat(id);
      const observer = new MutationObserver((records) => {
        const data = getProps$1($options);
        if (records.some(({ attributeName }) => {
          const prop = attributeName.replace("data-", "");
          return (prop === id ? attributes : [camelize(prop), camelize(attributeName)]).some(
            (prop2) => !isUndefined(data[prop2]) && data[prop2] !== $props[prop2]
          );
        })) {
          instance.$reset();
        }
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: filter.concat(filter.map((key) => `data-${key}`))
      });
      registerObserver(instance, observer);
    }

    function callHook(instance, hook) {
      var _a;
      (_a = instance.$options[hook]) == null ? void 0 : _a.forEach((handler) => handler.call(instance));
    }
    function callConnected(instance) {
      if (instance._connected) {
        return;
      }
      instance._data = {};
      instance._computed = {};
      initProps(instance);
      callHook(instance, "beforeConnect");
      instance._connected = true;
      initEvents(instance);
      initObservers(instance);
      initPropsObserver(instance);
      initUpdateObserver(instance);
      callHook(instance, "connected");
      callUpdate(instance);
    }
    function callDisconnected(instance) {
      if (!instance._connected) {
        return;
      }
      callHook(instance, "beforeDisconnect");
      disconnectObservers(instance);
      unbindEvents(instance);
      callHook(instance, "disconnected");
      instance._connected = false;
      delete instance._watch;
    }

    function initComputed(instance) {
      const { computed } = instance.$options;
      instance._computed = {};
      if (computed) {
        for (const key in computed) {
          registerComputed(instance, key, computed[key]);
        }
      }
    }
    function registerComputed(instance, key, cb) {
      Object.defineProperty(instance, key, {
        enumerable: true,
        get() {
          const { _computed, $props, $el } = instance;
          if (!hasOwn(_computed, key)) {
            _computed[key] = (cb.get || cb).call(instance, $props, $el);
          }
          return _computed[key];
        },
        set(value) {
          const { _computed } = instance;
          _computed[key] = cb.set ? cb.set.call(instance, value) : value;
          if (isUndefined(_computed[key])) {
            delete _computed[key];
          }
        }
      });
    }

    let uid = 0;
    function init$1(instance, options = {}) {
      options.data = normalizeData(options, instance.constructor.options);
      instance.$options = mergeOptions(instance.constructor.options, options, instance);
      instance.$props = {};
      instance._uid = uid++;
      initData(instance);
      initMethods(instance);
      initComputed(instance);
      callHook(instance, "created");
      if (options.el) {
        instance.$mount(options.el);
      }
    }
    function initData(instance) {
      const { data = {} } = instance.$options;
      for (const key in data) {
        instance.$props[key] = instance[key] = data[key];
      }
    }
    function initMethods(instance) {
      const { methods } = instance.$options;
      if (methods) {
        for (const key in methods) {
          instance[key] = methods[key].bind(instance);
        }
      }
    }
    function normalizeData({ data = {} }, { args = [], props = {} }) {
      if (isArray(data)) {
        data = data.slice(0, args.length).reduce((data2, value, index) => {
          if (isPlainObject(value)) {
            assign(data2, value);
          } else {
            data2[args[index]] = value;
          }
          return data2;
        }, {});
      }
      for (const key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else if (props[key]) {
          data[key] = coerce$1(props[key], data[key]);
        }
      }
      return data;
    }

    const App = function(options) {
      init$1(this, options);
    };
    App.util = util;
    App.options = {};
    App.version = "3.16.4";

    const PREFIX = "uk-";
    const DATA = "__uikit__";
    const components$2 = {};
    function component(name, options) {
      var _a;
      const id = PREFIX + hyphenate(name);
      if (!options) {
        if (isPlainObject(components$2[id])) {
          components$2[id] = App.extend(components$2[id]);
        }
        return components$2[id];
      }
      name = camelize(name);
      App[name] = (element, data) => createComponent(name, element, data);
      const opt = isPlainObject(options) ? { ...options } : options.options;
      opt.id = id;
      opt.name = name;
      (_a = opt.install) == null ? void 0 : _a.call(opt, App, opt, name);
      if (App._initialized && !opt.functional) {
        requestAnimationFrame(() => createComponent(name, `[${id}],[data-${id}]`));
      }
      return components$2[id] = opt;
    }
    function createComponent(name, element, data) {
      const Component = component(name);
      return Component.options.functional ? new Component({ data: isPlainObject(element) ? element : [...arguments] }) : element ? $$(element).map(init)[0] : init();
      function init(element2) {
        const instance = getComponent(element2, name);
        if (instance) {
          if (data) {
            instance.$destroy();
          } else {
            return instance;
          }
        }
        return new Component({ el: element2, data });
      }
    }
    function getComponents(element) {
      return element[DATA] || {};
    }
    function getComponent(element, name) {
      return getComponents(element)[name];
    }
    function attachToElement(element, instance) {
      if (!element[DATA]) {
        element[DATA] = {};
      }
      element[DATA][instance.$options.name] = instance;
    }
    function detachFromElement(element, instance) {
      var _a;
      (_a = element[DATA]) == null ? true : delete _a[instance.$options.name];
      if (!isEmpty(element[DATA])) {
        delete element[DATA];
      }
    }

    App.component = component;
    App.getComponents = getComponents;
    App.getComponent = getComponent;
    App.use = function(plugin) {
      if (plugin.installed) {
        return;
      }
      plugin.call(null, this);
      plugin.installed = true;
      return this;
    };
    App.mixin = function(mixin, component2) {
      component2 = (isString(component2) ? component(component2) : component2) || this;
      component2.options = mergeOptions(component2.options, mixin);
    };
    App.extend = function(options) {
      options = options || {};
      const Super = this;
      const Sub = function UIkitComponent(options2) {
        init$1(this, options2);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);
      Sub.super = Super;
      Sub.extend = Super.extend;
      return Sub;
    };
    function update(element, e) {
      element = element ? toNode(element) : document.body;
      for (const parentEl of parents(element).reverse()) {
        updateElement(parentEl, e);
      }
      apply(element, (element2) => updateElement(element2, e));
    }
    App.update = update;
    function updateElement(element, e) {
      const components = getComponents(element);
      for (const name in components) {
        callUpdate(components[name], e);
      }
    }
    let container;
    Object.defineProperty(App, "container", {
      get() {
        return container || document.body;
      },
      set(element) {
        container = $(element);
      }
    });

    App.prototype.$mount = function(el) {
      const instance = this;
      attachToElement(el, instance);
      instance.$options.el = el;
      if (within(el, document)) {
        callConnected(instance);
      }
    };
    App.prototype.$destroy = function(removeEl = false) {
      const instance = this;
      const { el } = instance.$options;
      if (el) {
        callDisconnected(instance);
      }
      callHook(instance, "destroy");
      detachFromElement(el, instance);
      if (removeEl) {
        remove$1(instance.$el);
      }
    };
    App.prototype.$create = createComponent;
    App.prototype.$emit = function(e) {
      callUpdate(this, e);
    };
    App.prototype.$update = function(element = $el, e) {
      update(element, e);
    };
    App.prototype.$reset = function() {
      callDisconnected(this);
      callConnected(this);
    };
    App.prototype.$getComponent = getComponent;
    Object.defineProperties(App.prototype, {
      $el: {
        get() {
          return $options.el;
        }
      },
      $container: Object.getOwnPropertyDescriptor(App, "container")
    });
    function generateId(instance, el = instance.$el, postfix = "") {
      if (el.id) {
        return el.id;
      }
      let id = `${instance.$options.id}-${instance._uid}${postfix}`;
      if ($(`#${id}`)) {
        id = generateId(instance, el, `${postfix}-2`);
      }
      return id;
    }

    function boot(App) {
      if (inBrowser && window.MutationObserver) {
        requestAnimationFrame(() => init(App));
      }
    }
    function init(App) {
      trigger(document, "uikit:init", App);
      if (document.body) {
        apply(document.body, connect);
      }
      new MutationObserver((records) => records.forEach(applyChildListMutation)).observe(document, {
        childList: true,
        subtree: true
      });
      new MutationObserver((records) => records.forEach(applyAttributeMutation)).observe(document, {
        attributes: true,
        subtree: true
      });
      App._initialized = true;
    }
    function applyChildListMutation({ addedNodes, removedNodes }) {
      for (const node of addedNodes) {
        apply(node, connect);
      }
      for (const node of removedNodes) {
        apply(node, disconnect);
      }
    }
    function applyAttributeMutation({ target, attributeName }) {
      var _a;
      const name = getComponentName(attributeName);
      if (name) {
        if (hasAttr(target, attributeName)) {
          createComponent(name, target);
          return;
        }
        (_a = getComponent(target, name)) == null ? void 0 : _a.$destroy();
      }
    }
    function connect(node) {
      const components2 = getComponents(node);
      for (const name in getComponents(node)) {
        callConnected(components2[name]);
      }
      for (const attributeName of node.getAttributeNames()) {
        const name = getComponentName(attributeName);
        name && createComponent(name, node);
      }
    }
    function disconnect(node) {
      const components2 = getComponents(node);
      for (const name in getComponents(node)) {
        callDisconnected(components2[name]);
      }
    }
    function getComponentName(attribute) {
      if (startsWith(attribute, "data-")) {
        attribute = attribute.slice(5);
      }
      const cmp = components$2[attribute];
      return cmp && (isPlainObject(cmp) ? cmp : cmp.options).name;
    }

    var Class = {
      connected() {
        addClass($el, $options.id);
      }
    };

    var Togglable = {
      props: {
        cls: Boolean,
        animation: "list",
        duration: Number,
        velocity: Number,
        origin: String,
        transition: String
      },
      data: {
        cls: false,
        animation: [false],
        duration: 200,
        velocity: 0.2,
        origin: false,
        transition: "ease",
        clsEnter: "uk-togglabe-enter",
        clsLeave: "uk-togglabe-leave"
      },
      computed: {
        hasAnimation({ animation }) {
          return !!animation[0];
        },
        hasTransition({ animation }) {
          return ["slide", "reveal"].some((transition) => startsWith(animation[0], transition));
        }
      },
      methods: {
        toggleElement(targets, toggle, animate) {
          return new Promise(
            (resolve) => Promise.all(
              toNodes(targets).map((el) => {
                const show = isBoolean(toggle) ? toggle : !isToggled(el);
                if (!trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (isFunction(animate) ? animate : animate === false || !hasAnimation ? toggleInstant : hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? clsEnter : clsLeave;
                addClass(el, cls);
                trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  removeClass(el, cls);
                  trigger(el, show ? "shown" : "hidden", [this]);
                };
                return promise ? promise.then(done, () => {
                  removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            ).then(resolve, noop)
          );
        },
        isToggled(el = $el) {
          [el] = toNodes(el);
          return hasClass(el, clsEnter) ? true : hasClass(el, clsLeave) ? false : cls ? hasClass(el, cls.split(" ")[0]) : isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (cls) {
            changed = includes(cls, " ") || toggled !== hasClass(el, cls);
            changed && toggleClass(el, cls, includes(cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          $$("[autofocus]", el).some((el2) => isVisible(el2) ? el2.focus() || true : el2.blur());
          if (changed) {
            trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      Animation.cancel(el);
      Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = dimensions$1(el)[dimProp];
      const inProgress = Transition.inProgress(el);
      await Transition.cancel(el);
      if (show) {
        _toggle(el, true);
      }
      const prevProps = Object.fromEntries(
        [
          "padding",
          "border",
          "width",
          "height",
          "minWidth",
          "minHeight",
          "overflowY",
          "overflowX",
          marginProp,
          marginStartProp
        ].map((key) => [key, el.style[key]])
      );
      const dim = dimensions$1(el);
      const currentMargin = toFloat(css(el, marginProp));
      const marginStart = toFloat(css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = wrapInner(el, "<div>");
      css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...css(el, [
          "overflow",
          "padding",
          "borderTop",
          "borderRight",
          "borderBottom",
          "borderLeft",
          "borderImage",
          marginStartProp
        ])
      });
      css(el, {
        padding: 0,
        border: 0,
        minWidth: 0,
        minHeight: 0,
        [marginStartProp]: 0,
        width: dim.width,
        height: dim.height,
        overflow: "hidden",
        [dimProp]: currentDim
      });
      const percent = currentDim / endDim;
      duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
      const endProps = { [dimProp]: show ? endDim : 0 };
      if (end) {
        css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        css(wrapper, marginProp, -endDim + currentDim);
        Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await Transition.start(el, endProps, duration, transition);
      } finally {
        css(el, prevProps);
        unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      Animation.cancel(el);
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return Animation.in(el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
    }

    const keyMap = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    function resize(options) {
      return observe(observeResize, options, "resize");
    }
    function intersection(options) {
      return observe(observeIntersection, options);
    }
    function mutation(options) {
      return observe(observeMutation, options);
    }
    function lazyload(options = {}) {
      return intersection({
        handler: function(entries, observer) {
          const { targets = $el, preload = 5 } = options;
          for (const el of toNodes(isFunction(targets) ? targets(this) : targets)) {
            $$('[loading="lazy"]', el).slice(0, preload - 1).forEach((el2) => removeAttr(el2, "loading"));
          }
          for (const el of entries.filter(({ isIntersecting }) => isIntersecting).map(({ target }) => target)) {
            observer.unobserve(el);
          }
        },
        ...options
      });
    }
    function scroll$1(options) {
      return observe(
        function(target, handler) {
          const off = on(target, "scroll", handler, {
            passive: true,
            capture: true
          });
          return {
            disconnect: off
          };
        },
        {
          target: window,
          ...options
        },
        "scroll"
      );
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          $emit(emit);
        },
        ...options
      };
    }

    var Accordion = {
      mixins: [Class, Togglable],
      props: {
        animation: Boolean,
        targets: String,
        active: null,
        collapsible: Boolean,
        multiple: Boolean,
        toggle: String,
        content: String,
        offset: Number
      },
      data: {
        targets: "> *",
        active: false,
        animation: true,
        collapsible: true,
        multiple: false,
        clsOpen: "uk-open",
        toggle: "> .uk-accordion-title",
        content: "> .uk-accordion-content",
        offset: 0
      },
      computed: {
        items: {
          get({ targets }, $el) {
            return $$(targets, $el);
          },
          watch(items, prev) {
            if (prev || hasClass(items, clsOpen)) {
              return;
            }
            const active = active !== false && items[Number(active)] || !collapsible && items[0];
            if (active) {
              toggle(active, false);
            }
          },
          immediate: true
        },
        toggles: {
          get({ toggle }) {
            return items.map((item) => $(toggle, item));
          },
          watch() {
            $emit();
          },
          immediate: true
        },
        contents: {
          get({ content }) {
            return items.map(
              (item) => {
                var _a;
                return ((_a = item._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, item);
              }
            );
          },
          watch(items) {
            for (const el of items) {
              hide(
                el,
                !hasClass(
                  items.find((item) => within(el, item)),
                  clsOpen
                )
              );
            }
            $emit();
          },
          immediate: true
        }
      },
      observe: lazyload(),
      events: [
        {
          name: "click keydown",
          delegate() {
            return `${targets} ${$props.toggle}`;
          },
          async handler(e) {
            var _a;
            if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
              return;
            }
            e.preventDefault();
            (_a = _off) == null ? void 0 : _a.call(this);
            _off = keepScrollPosition(e.target);
            await toggle(index(toggles, e.current));
            _off();
          }
        },
        {
          name: "shown hidden",
          self: true,
          delegate() {
            return targets;
          },
          handler() {
            $emit();
          }
        }
      ],
      update() {
        const activeItems = filter$1(items, `.${clsOpen}`);
        for (const index2 in items) {
          const toggle = toggles[index2];
          const content = contents[index2];
          if (!toggle || !content) {
            continue;
          }
          toggle.id = generateId(this, toggle, `-title-${index2}`);
          content.id = generateId(this, content, `-content-${index2}`);
          const active = includes(activeItems, items[index2]);
          attr(toggle, {
            role: isTag(toggle, "a") ? "button" : null,
            "aria-controls": content.id,
            "aria-expanded": active,
            "aria-disabled": !collapsible && activeItems.length < 2 && active
          });
          attr(content, { role: "region", "aria-labelledby": toggle.id });
        }
      },
      methods: {
        async toggle(item, animate) {
          item = items[getIndex(item, items)];
          let items = [item];
          const activeItems = filter$1(items, `.${clsOpen}`);
          if (!multiple && !includes(activeItems, items[0])) {
            items = items.concat(activeItems);
          }
          if (!collapsible && activeItems.length < 2 && includes(activeItems, item)) {
            return;
          }
          await Promise.all(
            items.map(
              (el) => toggleElement(el, !includes(activeItems, el), (el2, show) => {
                toggleClass(el2, clsOpen, show);
                if (animate === false || !animation) {
                  hide($(content, el2), !show);
                  return;
                }
                return transition(el2, show, this);
              })
            )
          );
        }
      }
    };
    function hide(el, hide2) {
      el && (el.hidden = hide2);
    }
    async function transition(el, show, { content, duration, velocity, transition: transition2 }) {
      var _a;
      content = ((_a = el._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, el);
      if (!el._wrapper) {
        el._wrapper = wrapAll(content, "<div>");
      }
      const wrapper = el._wrapper;
      css(wrapper, "overflow", "hidden");
      const currentHeight = toFloat(css(wrapper, "height"));
      await Transition.cancel(wrapper);
      hide(content, false);
      const endHeight = sumBy(["marginTop", "marginBottom"], (prop) => css(content, prop)) + dimensions$1(content).height;
      const percent = currentHeight / endHeight;
      duration = (velocity * endHeight + duration) * (show ? 1 - percent : percent);
      css(wrapper, "height", currentHeight);
      await Transition.start(wrapper, { height: show ? endHeight : 0 }, duration, transition2);
      unwrap(content);
      delete el._wrapper;
      if (!show) {
        hide(content, true);
      }
    }
    function keepScrollPosition(el) {
      const [scrollParent] = scrollParents(el, true);
      let frame;
      (function scroll() {
        frame = requestAnimationFrame(() => {
          const { top } = el.getBoundingClientRect();
          if (top < 0) {
            scrollParent.scrollTop += top;
          }
          scroll();
        });
      })();
      return () => requestAnimationFrame(() => cancelAnimationFrame(frame));
    }

    var alert = {
      mixins: [Class, Togglable],
      args: "animation",
      props: {
        animation: Boolean,
        close: String
      },
      data: {
        animation: true,
        selClose: ".uk-alert-close",
        duration: 150
      },
      events: {
        name: "click",
        delegate() {
          return selClose;
        },
        handler(e) {
          e.preventDefault();
          close();
        }
      },
      methods: {
        async close() {
          await toggleElement($el, false, animate$1);
          $destroy(true);
        }
      }
    };
    function animate$1(el, show, { duration, transition, velocity }) {
      const height = toFloat(css(el, "height"));
      css(el, "height", height);
      return Transition.start(
        el,
        {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTop: 0,
          borderBottom: 0,
          opacity: 0
        },
        velocity * height + duration,
        transition
      );
    }

    var Video = {
      args: "autoplay",
      props: {
        automute: Boolean,
        autoplay: Boolean
      },
      data: {
        automute: false,
        autoplay: true
      },
      connected() {
        inView = autoplay === "inview";
        if (inView && !hasAttr($el, "preload")) {
          $el.preload = "none";
        }
        if (isTag($el, "iframe") && !hasAttr($el, "allow")) {
          $el.allow = "autoplay";
        }
        if (automute) {
          mute($el);
        }
      },
      observe: intersection({
        args: { intersecting: false }
      }),
      update: {
        read({ visible }) {
          if (!isVideo($el)) {
            return false;
          }
          return {
            prev: visible,
            visible: isVisible($el) && css($el, "visibility") !== "hidden",
            inView: inView && isInView($el)
          };
        },
        write({ prev, visible, inView }) {
          if (!visible || inView && !inView) {
            pause($el);
          } else if (autoplay === true && !prev || inView && inView) {
            play($el);
          }
        }
      }
    };

    var cover = {
      mixins: [Video],
      props: {
        width: Number,
        height: Number
      },
      data: {
        automute: true
      },
      events: {
        "load loadedmetadata"() {
          $emit("resize");
        }
      },
      observe: resize({
        target: ({ $el }) => [$el, getPositionedParent($el) || parent($el)]
      }),
      update: {
        read() {
          const { ratio, cover } = Dimensions;
          const { $el, width, height } = this;
          let dim = { width, height };
          if (!width || !height) {
            const intrinsic = {
              width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
              height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
            };
            if (width) {
              dim = ratio(intrinsic, "width", width);
            } else if (height) {
              dim = ratio(intrinsic, "height", height);
            } else {
              dim = intrinsic;
            }
          }
          const { offsetHeight: coverHeight, offsetWidth: coverWidth } = getPositionedParent($el) || parent($el);
          const coverDim = cover(dim, {
            width: coverWidth + (coverWidth % 2 ? 1 : 0),
            height: coverHeight + (coverHeight % 2 ? 1 : 0)
          });
          if (!coverDim.width || !coverDim.height) {
            return false;
          }
          return coverDim;
        },
        write({ height, width }) {
          css($el, { height, width });
        },
        events: ["resize"]
      }
    };
    function getPositionedParent(el) {
      while (el = parent(el)) {
        if (css(el, "position") !== "static") {
          return el;
        }
      }
    }

    var Position = {
      props: {
        pos: String,
        offset: null,
        flip: Boolean,
        shift: Boolean,
        inset: Boolean
      },
      data: {
        pos: `bottom-${isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        pos = $props.pos.split("-").concat("center").slice(0, 2);
        [dir, align] = pos;
        axis = includes(["top", "bottom"], dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [getPositionOffset(element), getShiftOffset(element)];
          const placement = [flip && "flip", shift && "shift"];
          const attach = {
            element: [inset ? dir : flipPosition(dir), align],
            target: [dir, align]
          };
          if (axis === "y") {
            for (const prop in attach) {
              attach[prop].reverse();
            }
            offset.reverse();
            placement.reverse();
          }
          const restoreScrollPosition = storeScrollPosition(element);
          const elDim = dimensions$1(element);
          css(element, { top: -elDim.height, left: -elDim.width });
          positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: getViewportOffset(element)
          });
          restoreScrollPosition();
        },
        getPositionOffset(element) {
          return toPx(
            offset === false ? css(element, "--uk-position-offset") : offset,
            axis === "x" ? "width" : "height",
            element
          ) * (includes(["left", "top"], dir) ? -1 : 1) * (inset ? -1 : 1);
        },
        getShiftOffset(element) {
          return align === "center" ? 0 : toPx(
            css(element, "--uk-position-shift-offset"),
            axis === "y" ? "width" : "height",
            element
          ) * (includes(["left", "top"], align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return toPx(css(element, "--uk-position-viewport-offset"));
        }
      }
    };
    function storeScrollPosition(element) {
      const [scrollElement] = scrollParents(element);
      const { scrollTop } = scrollElement;
      return () => {
        if (scrollTop !== scrollElement.scrollTop) {
          scrollElement.scrollTop = scrollTop;
        }
      };
    }

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && $container || container && $(container);
        }
      }
    };

    let prevented;
    function preventBackgroundScroll(el) {
      const off = on(
        el,
        "touchmove",
        (e) => {
          if (e.targetTouches.length !== 1) {
            return;
          }
          let [{ scrollHeight, clientHeight }] = scrollParents(e.target);
          if (clientHeight >= scrollHeight && e.cancelable) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
      if (prevented) {
        return off;
      }
      prevented = true;
      const { scrollingElement } = document;
      css(scrollingElement, {
        overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
        touchAction: "none",
        paddingRight: width(window) - scrollingElement.clientWidth || ""
      });
      return () => {
        prevented = false;
        off();
        css(scrollingElement, { overflowY: "", touchAction: "", paddingRight: "" });
      };
    }

    let active$1;
    var drop = {
      mixins: [Container, Position, Togglable],
      args: "pos",
      props: {
        mode: "list",
        toggle: Boolean,
        boundary: Boolean,
        boundaryX: Boolean,
        boundaryY: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        stretch: Boolean,
        delayShow: Number,
        delayHide: Number,
        autoUpdate: Boolean,
        clsDrop: String,
        animateOut: Boolean,
        bgScroll: Boolean
      },
      data: {
        mode: ["click", "hover"],
        toggle: "- *",
        boundary: false,
        boundaryX: false,
        boundaryY: false,
        target: false,
        targetX: false,
        targetY: false,
        stretch: false,
        delayShow: 0,
        delayHide: 800,
        autoUpdate: true,
        clsDrop: false,
        animateOut: false,
        bgScroll: true,
        animation: ["uk-animation-fade"],
        cls: "uk-open",
        container: false
      },
      computed: {
        boundary({ boundary, boundaryX, boundaryY }, $el) {
          return [
            query(boundaryX || boundary, $el) || window,
            query(boundaryY || boundary, $el) || window
          ];
        },
        target({ target, targetX, targetY }, $el) {
          targetX = targetX || target || targetEl;
          targetY = targetY || target || targetEl;
          return [
            targetX === true ? window : query(targetX, $el),
            targetY === true ? window : query(targetY, $el)
          ];
        }
      },
      created() {
        tracker = new MouseTracker();
      },
      beforeConnect() {
        clsDrop = $props.clsDrop || `uk-${$options.name}`;
      },
      connected() {
        addClass($el, "uk-drop", clsDrop);
        if (toggle && !targetEl) {
          targetEl = createToggleComponent(this);
        }
        _style = pick($el.style, ["width", "height"]);
      },
      disconnected() {
        if (isActive()) {
          hide(false);
          active$1 = null;
        }
        css($el, _style);
      },
      observe: lazyload({
        target: ({ toggle, $el }) => query(toggle, $el),
        targets: ({ $el }) => $el
      }),
      events: [
        {
          name: "click",
          delegate() {
            return ".uk-drop-close";
          },
          handler(e) {
            e.preventDefault();
            hide(false);
          }
        },
        {
          name: "click",
          delegate() {
            return 'a[href*="#"]';
          },
          handler({ defaultPrevented, current }) {
            const { hash } = current;
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, $el)) {
              hide(false);
            }
          }
        },
        {
          name: "beforescroll",
          handler() {
            hide(false);
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e, toggle) {
            e.preventDefault();
            if (isToggled()) {
              hide(false);
            } else {
              show(toggle == null ? void 0 : toggle.$el, false);
            }
          }
        },
        {
          name: "toggleshow",
          self: true,
          handler(e, toggle) {
            e.preventDefault();
            show(toggle == null ? void 0 : toggle.$el);
          }
        },
        {
          name: "togglehide",
          self: true,
          handler(e) {
            e.preventDefault();
            if (!matches($el, ":focus,:hover")) {
              hide();
            }
          }
        },
        {
          name: `${pointerEnter} focusin`,
          filter() {
            return includes(mode, "hover");
          },
          handler(e) {
            if (!isTouch(e)) {
              clearTimers();
            }
          }
        },
        {
          name: `${pointerLeave} focusout`,
          filter() {
            return includes(mode, "hover");
          },
          handler(e) {
            if (!isTouch(e) && e.relatedTarget) {
              hide();
            }
          }
        },
        {
          name: "toggled",
          self: true,
          handler(e, toggled) {
            attr(targetEl, "aria-expanded", toggled ? true : null);
            if (!toggled) {
              return;
            }
            clearTimers();
            position();
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            active$1 = this;
            tracker.init();
            const handlers = [
              listenForResize(this),
              listenForEscClose$1(this),
              listenForBackgroundClose$1(this),
              autoUpdate && listenForScroll(this),
              !bgScroll && preventBackgroundScroll($el)
            ];
            once($el, "hide", () => handlers.forEach((handler) => handler && handler()), {
              self: true
            });
          }
        },
        {
          name: "beforehide",
          self: true,
          handler() {
            clearTimers();
          }
        },
        {
          name: "hide",
          handler({ target }) {
            if ($el !== target) {
              active$1 = active$1 === null && within(target, $el) && isToggled() ? this : active$1;
              return;
            }
            active$1 = isActive() ? null : active$1;
            tracker.cancel();
          }
        }
      ],
      update: {
        write() {
          if (isToggled() && !hasClass($el, clsEnter)) {
            position();
          }
        }
      },
      methods: {
        show(target = targetEl, delay = true) {
          if (isToggled() && target && targetEl && target !== targetEl) {
            hide(false, false);
          }
          targetEl = target;
          clearTimers();
          if (isActive()) {
            return;
          }
          if (active$1) {
            if (delay && active$1.isDelaying) {
              showTimer = setTimeout(() => matches(target, ":hover") && show(), 10);
              return;
            }
            let prev;
            while (active$1 && prev !== active$1 && !within($el, active$1.$el)) {
              prev = active$1;
              active$1.hide(false, false);
            }
          }
          if (container && parent($el) !== container) {
            append(container, $el);
          }
          showTimer = setTimeout(
            () => toggleElement($el, true),
            delay && delayShow || 0
          );
        },
        hide(delay = true, animate = true) {
          const hide = () => toggleElement($el, false, animateOut && animate);
          clearTimers();
          isDelaying = getPositionedElements($el).some(
            (el) => tracker.movesTo(el)
          );
          if (delay && isDelaying) {
            hideTimer = setTimeout(hide, 50);
          } else if (delay && delayHide) {
            hideTimer = setTimeout(hide, delayHide);
          } else {
            hide();
          }
        },
        clearTimers() {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
          showTimer = null;
          hideTimer = null;
          isDelaying = false;
        },
        isActive() {
          return active$1 === this;
        },
        position() {
          removeClass($el, "uk-drop-stack");
          css($el, _style);
          $el.hidden = true;
          const viewports = target.map((target) => getViewport$1($el, target));
          const viewportOffset = getViewportOffset($el);
          const dirs = [
            [0, ["x", "width", "left", "right"]],
            [1, ["y", "height", "top", "bottom"]]
          ];
          for (const [i, [axis, prop]] of dirs) {
            if (axis !== axis && includes([axis, true], stretch)) {
              css($el, {
                [prop]: Math.min(
                  offset(boundary[i])[prop],
                  viewports[i][prop] - 2 * viewportOffset
                ),
                [`overflow-${axis}`]: "auto"
              });
            }
          }
          const maxWidth = viewports[0].width - 2 * viewportOffset;
          $el.hidden = false;
          css($el, "maxWidth", "");
          if ($el.offsetWidth > maxWidth) {
            addClass($el, "uk-drop-stack");
          }
          css($el, "maxWidth", maxWidth);
          positionAt($el, target, boundary);
          for (const [i, [axis, prop, start, end]] of dirs) {
            if (axis === axis && includes([axis, true], stretch)) {
              const positionOffset = Math.abs(getPositionOffset($el));
              const targetOffset = offset(target[i]);
              const elOffset = offset($el);
              css($el, {
                [prop]: (targetOffset[start] > elOffset[start] ? targetOffset[start] - Math.max(
                  offset(boundary[i])[start],
                  viewports[i][start] + viewportOffset
                ) : Math.min(
                  offset(boundary[i])[end],
                  viewports[i][end] - viewportOffset
                ) - targetOffset[end]) - positionOffset,
                [`overflow-${axis}`]: "auto"
              });
              positionAt($el, target, boundary);
            }
          }
        }
      }
    };
    function getPositionedElements(el) {
      const result = [];
      apply(el, (el2) => css(el2, "position") !== "static" && result.push(el2));
      return result;
    }
    function getViewport$1(el, target) {
      return offsetViewport(overflowParents(target).find((parent2) => within(el, parent2)));
    }
    function createToggleComponent(drop) {
      const { $el } = drop.$create("toggle", query(drop.toggle, drop.$el), {
        target: drop.$el,
        mode: drop.mode
      });
      attr($el, "aria-haspopup", true);
      return $el;
    }
    function listenForResize(drop) {
      const update = () => drop.$emit();
      const off = on(window, "resize", update);
      const observer = observeResize(overflowParents(drop.$el).concat(drop.target), update);
      return () => {
        observer.disconnect();
        off();
      };
    }
    function listenForScroll(drop) {
      return on([document, ...overflowParents(drop.$el)], "scroll", () => drop.$emit(), {
        passive: true
      });
    }
    function listenForEscClose$1(drop) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === keyMap.ESC) {
          drop.hide(false);
        }
      });
    }
    function listenForBackgroundClose$1(drop) {
      return on(document, pointerDown$1, ({ target }) => {
        if (!within(target, drop.$el)) {
          once(
            document,
            `${pointerUp$1} ${pointerCancel} scroll`,
            ({ defaultPrevented, type, target: newTarget }) => {
              if (!defaultPrevented && type === pointerUp$1 && target === newTarget && !(drop.targetEl && within(target, drop.targetEl))) {
                drop.hide(false);
              }
            },
            true
          );
        }
      });
    }

    var Dropnav = {
      mixins: [Class, Container],
      props: {
        dropdown: String,
        align: String,
        clsDrop: String,
        boundary: Boolean,
        dropbar: Boolean,
        dropbarAnchor: Boolean,
        duration: Number,
        mode: Boolean,
        offset: Boolean,
        stretch: Boolean,
        delayShow: Boolean,
        delayHide: Boolean,
        target: Boolean,
        targetX: Boolean,
        targetY: Boolean,
        animation: Boolean,
        animateOut: Boolean
      },
      data: {
        dropdown: "> li > a, > ul > li > a",
        align: isRtl ? "right" : "left",
        clsDrop: "uk-dropdown",
        clsDropbar: "uk-dropnav-dropbar",
        boundary: true,
        dropbar: false,
        dropbarAnchor: false,
        duration: 200,
        container: false
      },
      computed: {
        dropbarAnchor({ dropbarAnchor }, $el) {
          return query(dropbarAnchor, $el) || $el;
        },
        dropbar: {
          get({ dropbar }) {
            if (!dropbar) {
              return null;
            }
            dropbar = _dropbar || query(dropbar, $el) || $(`+ .${clsDropbar}`, $el);
            return dropbar ? dropbar : _dropbar = $("<div></div>");
          },
          watch(dropbar) {
            addClass(
              dropbar,
              "uk-dropbar",
              "uk-dropbar-top",
              clsDropbar,
              `uk-${$options.name}-dropbar`
            );
          },
          immediate: true
        },
        dropContainer(_, $el) {
          return container || $el;
        },
        dropdowns: {
          get({ clsDrop }, $el) {
            var _a;
            const dropdowns = $$(`.${clsDrop}`, $el);
            if (dropContainer !== $el) {
              for (const el of $$(`.${clsDrop}`, dropContainer)) {
                const target = (_a = getDropdown(el)) == null ? void 0 : _a.targetEl;
                if (!includes(dropdowns, el) && target && within(target, $el)) {
                  dropdowns.push(el);
                }
              }
            }
            return dropdowns;
          },
          watch(dropdowns) {
            $create(
              "drop",
              dropdowns.filter((el) => !getDropdown(el)),
              {
                ...$props,
                flip: false,
                shift: true,
                pos: `bottom-${align}`,
                boundary: boundary === true ? $el : boundary
              }
            );
          },
          immediate: true
        },
        items: {
          get({ dropdown }, $el) {
            return $$(dropdown, $el);
          },
          watch(items) {
            attr(children($el), "role", "presentation");
            attr(items, { tabindex: -1, role: "menuitem" });
            attr(items[0], "tabindex", 0);
          },
          immediate: true
        }
      },
      connected() {
        attr($el, "role", "menubar");
      },
      disconnected() {
        remove$1(_dropbar);
        delete _dropbar;
      },
      events: [
        {
          name: "mouseover focusin",
          delegate() {
            return dropdown;
          },
          handler({ current, type }) {
            const active2 = getActive();
            if (active2 && includes(active2.mode, "hover") && active2.targetEl && !within(active2.targetEl, current) && !active2.isDelaying) {
              active2.hide(false);
            }
            if (type === "focusin") {
              for (const toggle of items) {
                attr(toggle, "tabindex", current === toggle ? 0 : -1);
              }
            }
          }
        },
        {
          name: "keydown",
          delegate() {
            return dropdown;
          },
          handler(e) {
            const { current, keyCode } = e;
            const active2 = getActive();
            if (keyCode === keyMap.DOWN && hasAttr(current, "aria-expanded")) {
              e.preventDefault();
              if (!active2 || active2.targetEl !== current) {
                current.click();
                once(
                  dropContainer,
                  "show",
                  ({ target }) => focusFirstFocusableElement(target)
                );
              } else {
                focusFirstFocusableElement(active2.$el);
              }
            }
            handleNavItemNavigation(e, items, active2);
          }
        },
        {
          name: "keydown",
          el() {
            return dropContainer;
          },
          delegate() {
            return `.${clsDrop}`;
          },
          handler(e) {
            var _a;
            const { current, keyCode } = e;
            if (!includes(dropdowns, current)) {
              return;
            }
            const active2 = getActive();
            let next = -1;
            if (keyCode === keyMap.HOME) {
              next = 0;
            } else if (keyCode === keyMap.END) {
              next = "last";
            } else if (keyCode === keyMap.UP) {
              next = "previous";
            } else if (keyCode === keyMap.DOWN) {
              next = "next";
            } else if (keyCode === keyMap.ESC) {
              (_a = active2.targetEl) == null ? void 0 : _a.focus();
            }
            if (~next) {
              e.preventDefault();
              const elements = $$(selFocusable, current);
              elements[getIndex(
                next,
                elements,
                findIndex(elements, (el) => matches(el, ":focus"))
              )].focus();
            }
            handleNavItemNavigation(e, items, active2);
          }
        },
        {
          name: "mouseleave",
          el() {
            return dropbar;
          },
          filter() {
            return dropbar;
          },
          handler() {
            const active2 = getActive();
            if (active2 && includes(active2.mode, "hover") && !dropdowns.some((el) => matches(el, ":hover"))) {
              active2.hide();
            }
          }
        },
        {
          name: "beforeshow",
          el() {
            return dropContainer;
          },
          filter() {
            return dropbar;
          },
          handler({ target }) {
            if (!isDropbarDrop(target)) {
              return;
            }
            if (dropbar.previousElementSibling !== dropbarAnchor) {
              after(dropbarAnchor, dropbar);
            }
            addClass(target, `${clsDrop}-dropbar`);
          }
        },
        {
          name: "show",
          el() {
            return dropContainer;
          },
          filter() {
            return dropbar;
          },
          handler({ target }) {
            if (!isDropbarDrop(target)) {
              return;
            }
            const drop = getDropdown(target);
            const adjustHeight = () => {
              const targetOffsets = parents(target, `.${clsDrop}`).concat(target).map((el) => offset(el));
              const minTop = Math.min(...targetOffsets.map(({ top }) => top));
              const maxBottom = Math.max(...targetOffsets.map(({ bottom }) => bottom));
              const dropbarOffset = offset(dropbar);
              css(dropbar, "top", dropbar.offsetTop - (dropbarOffset.top - minTop));
              transitionTo(
                maxBottom - minTop + toFloat(css(target, "marginBottom")),
                target
              );
            };
            _observer = observeResize([drop.$el, ...drop.target], adjustHeight);
            adjustHeight();
          }
        },
        {
          name: "beforehide",
          el() {
            return dropContainer;
          },
          filter() {
            return dropbar;
          },
          handler(e) {
            const active2 = getActive();
            if (matches(dropbar, ":hover") && active2.$el === e.target && !items.some((el) => active2.targetEl !== el && matches(el, ":focus"))) {
              e.preventDefault();
            }
          }
        },
        {
          name: "hide",
          el() {
            return dropContainer;
          },
          filter() {
            return dropbar;
          },
          handler({ target }) {
            var _a;
            if (!isDropbarDrop(target)) {
              return;
            }
            (_a = _observer) == null ? void 0 : _a.disconnect();
            const active2 = getActive();
            if (!active2 || active2.$el === target) {
              transitionTo(0);
            }
          }
        }
      ],
      methods: {
        getActive() {
          var _a;
          return includes(dropdowns, (_a = active$1) == null ? void 0 : _a.$el) && active$1;
        },
        async transitionTo(newHeight, el) {
          const { dropbar } = this;
          const oldHeight = height(dropbar);
          el = oldHeight < newHeight && el;
          await Transition.cancel([el, dropbar]);
          css(el, "clipPath", `polygon(0 0,100% 0,100% ${oldHeight}px,0 ${oldHeight}px)`);
          height(dropbar, oldHeight);
          await Promise.all([
            Transition.start(dropbar, { height: newHeight }, duration),
            Transition.start(
              el,
              {
                clipPath: `polygon(0 0,100% 0,100% ${newHeight}px,0 ${newHeight}px)`
              },
              duration
            ).finally(() => css(el, { clipPath: "" }))
          ]).catch(noop);
        },
        getDropdown(el) {
          return $getComponent(el, "drop") || $getComponent(el, "dropdown");
        },
        isDropbarDrop(el) {
          return getDropdown(el) && hasClass(el, clsDrop);
        }
      }
    };
    function handleNavItemNavigation(e, toggles, active2) {
      var _a, _b, _c;
      const { current, keyCode } = e;
      let next = -1;
      if (keyCode === keyMap.HOME) {
        next = 0;
      } else if (keyCode === keyMap.END) {
        next = "last";
      } else if (keyCode === keyMap.LEFT) {
        next = "previous";
      } else if (keyCode === keyMap.RIGHT) {
        next = "next";
      } else if (keyCode === keyMap.TAB) {
        (_a = active2.targetEl) == null ? void 0 : _a.focus();
        (_b = active2.hide) == null ? void 0 : _b.call(active2, false);
      }
      if (~next) {
        e.preventDefault();
        (_c = active2.hide) == null ? void 0 : _c.call(active2, false);
        toggles[getIndex(next, toggles, toggles.indexOf(active2.targetEl || current))].focus();
      }
    }
    function focusFirstFocusableElement(el) {
      var _a;
      if (!$(":focus", el)) {
        (_a = $(selFocusable, el)) == null ? void 0 : _a.focus();
      }
    }

    var formCustom = {
      mixins: [Class],
      args: "target",
      props: {
        target: Boolean
      },
      data: {
        target: false
      },
      computed: {
        input(_, $el) {
          return $(selInput, $el);
        },
        state() {
          return input.nextElementSibling;
        },
        target({ target }, $el) {
          return target && (target === true && parent(input) === $el && input.nextElementSibling || $(target, $el));
        }
      },
      update() {
        var _a;
        const { target, input } = this;
        if (!target) {
          return;
        }
        let option;
        const prop = isInput(target) ? "value" : "textContent";
        const prev = target[prop];
        const value = ((_a = input.files) == null ? void 0 : _a[0]) ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter((el) => el.selected)[0]) ? option.textContent : input.value;
        if (prev !== value) {
          target[prop] = value;
        }
      },
      events: [
        {
          name: "change",
          handler() {
            $emit();
          }
        },
        {
          name: "reset",
          el() {
            return closest($el, "form");
          },
          handler() {
            $emit();
          }
        }
      ]
    };

    var Margin = {
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      observe: [
        mutation({
          options: {
            childList: true,
            attributes: true,
            attributeFilter: ["style"]
          }
        }),
        resize({
          target: ({ $el }) => [$el, ...toArray($el.children)]
        })
      ],
      update: {
        read() {
          const rows = getRows($el.children);
          return {
            rows,
            columns: getColumns(rows)
          };
        },
        write({ columns, rows }) {
          for (const row of rows) {
            for (const column of row) {
              toggleClass(column, margin, rows[0] !== row);
              toggleClass(column, firstColumn, columns[0].includes(column));
            }
          }
        },
        events: ["resize"]
      }
    };
    function getRows(items) {
      return sortBy(items, "top", "bottom");
    }
    function getColumns(rows) {
      const columns = [];
      for (const row of rows) {
        const sorted = sortBy(row, "left", "right");
        for (let j = 0; j < sorted.length; j++) {
          columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
        }
      }
      return isRtl ? columns.reverse() : columns;
    }
    function sortBy(items, startProp, endProp) {
      const sorted = [[]];
      for (const el of items) {
        if (!isVisible(el)) {
          continue;
        }
        let dim = getOffset(el);
        for (let i = sorted.length - 1; i >= 0; i--) {
          const current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          let startDim;
          if (current[0].offsetParent === el.offsetParent) {
            startDim = getOffset(current[0]);
          } else {
            dim = getOffset(el, true);
            startDim = getOffset(current[0], true);
          }
          if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
            sorted.push([el]);
            break;
          }
          if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
            current.push(el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
      return sorted;
    }
    function getOffset(element, offset = false) {
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;
      if (offset) {
        [offsetTop, offsetLeft] = offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    var grid = {
      extends: Margin,
      mixins: [Class],
      name: "grid",
      props: {
        masonry: Boolean,
        parallax: Number
      },
      data: {
        margin: "uk-grid-margin",
        clsStack: "uk-grid-stack",
        masonry: false,
        parallax: 0
      },
      connected() {
        masonry && addClass($el, "uk-flex-top uk-flex-wrap-top");
      },
      observe: scroll$1({ filter: ({ parallax }) => parallax }),
      update: [
        {
          write({ columns }) {
            toggleClass($el, clsStack, columns.length < 2);
          },
          events: ["resize"]
        },
        {
          read(data) {
            let { columns, rows } = data;
            if (!columns.length || !masonry && !parallax || positionedAbsolute($el)) {
              data.translates = false;
              return false;
            }
            let translates = false;
            const nodes = children($el);
            const columnHeights = columns.map((column) => sumBy(column, "offsetHeight"));
            const margin = getMarginTop(nodes, margin) * (rows.length - 1);
            const elHeight = Math.max(...columnHeights) + margin;
            if (masonry) {
              columns = columns.map((column) => sortBy$1(column, "offsetTop"));
              translates = getTranslates(rows, columns);
            }
            let padding = Math.abs(parallax);
            if (padding) {
              padding = columnHeights.reduce(
                (newPadding, hgt, i) => Math.max(
                  newPadding,
                  hgt + margin + (i % 2 ? padding : padding / 8) - elHeight
                ),
                0
              );
            }
            return { padding, columns, translates, height: translates ? elHeight : "" };
          },
          write({ height, padding }) {
            css($el, "paddingBottom", padding || "");
            height !== false && css($el, "height", height);
          },
          events: ["resize"]
        },
        {
          read() {
            if (parallax && positionedAbsolute($el)) {
              return false;
            }
            return {
              scrolled: parallax ? scrolledOver($el) * Math.abs(parallax) : false
            };
          },
          write({ columns, scrolled, translates }) {
            if (scrolled === false && !translates) {
              return;
            }
            columns.forEach(
              (column, i) => column.forEach(
                (el, j) => css(
                  el,
                  "transform",
                  !scrolled && !translates ? "" : `translateY(${(translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0)}px)`
                )
              )
            );
          },
          events: ["scroll", "resize"]
        }
      ]
    };
    function positionedAbsolute(el) {
      return children(el).some((el2) => css(el2, "position") === "absolute");
    }
    function getTranslates(rows, columns) {
      const rowHeights = rows.map((row) => Math.max(...row.map((el) => el.offsetHeight)));
      return columns.map((elements) => {
        let prev = 0;
        return elements.map(
          (element, row) => prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0
        );
      });
    }
    function getMarginTop(nodes, cls) {
      const [node] = nodes.filter((el) => hasClass(el, cls));
      return toFloat(node ? css(node, "marginTop") : css(nodes[0], "paddingLeft"));
    }

    var heightMatch = {
      args: "target",
      props: {
        target: String,
        row: Boolean
      },
      data: {
        target: "> *",
        row: true
      },
      computed: {
        elements: {
          get({ target }, $el) {
            return $$(target, $el);
          },
          watch() {
            $reset();
          }
        }
      },
      observe: resize({
        target: ({ $el, elements }) => [$el, ...elements]
      }),
      update: {
        read() {
          return {
            rows: (row ? getRows(elements) : [elements]).map(match$1)
          };
        },
        write({ rows }) {
          for (const { heights, elements } of rows) {
            elements.forEach((el, i) => css(el, "minHeight", heights[i]));
          }
        },
        events: ["resize"]
      }
    };
    function match$1(elements) {
      if (elements.length < 2) {
        return { heights: [""], elements };
      }
      let heights = elements.map(getHeight);
      const max = Math.max(...heights);
      return {
        heights: elements.map((el, i) => heights[i].toFixed(2) === max.toFixed(2) ? "" : max),
        elements
      };
    }
    function getHeight(element) {
      const style = pick(element.style, ["display", "minHeight"]);
      if (!isVisible(element)) {
        css(element, "display", "block", "important");
      }
      css(element, "minHeight", "");
      const height = dimensions$1(element).height - boxModelAdjust(element, "height", "content-box");
      css(element, style);
      return height;
    }

    var heightViewport = {
      props: {
        expand: Boolean,
        offsetTop: Boolean,
        offsetBottom: Boolean,
        minHeight: Number
      },
      data: {
        expand: false,
        offsetTop: false,
        offsetBottom: false,
        minHeight: 0
      },
      // check for offsetTop change
      observe: resize({
        target: ({ $el }) => [$el, ...scrollParents($el)]
      }),
      update: {
        read({ minHeight: prev }) {
          if (!isVisible($el)) {
            return false;
          }
          let minHeight = "";
          const box = boxModelAdjust($el, "height", "content-box");
          const { body, scrollingElement } = document;
          const [scrollElement] = scrollParents($el);
          const { height: viewportHeight } = offsetViewport(
            scrollElement === body ? scrollingElement : scrollElement
          );
          if (expand) {
            minHeight = Math.max(
              viewportHeight - (dimensions$1(scrollElement).height - dimensions$1($el).height) - box,
              0
            );
          } else {
            const isScrollingElement = scrollingElement === scrollElement || body === scrollElement;
            minHeight = `calc(${isScrollingElement ? "100vh" : `${viewportHeight}px`}`;
            if (offsetTop) {
              if (isScrollingElement) {
                const top = offsetPosition($el)[0] - offsetPosition(scrollElement)[0];
                minHeight += top > 0 && top < viewportHeight / 2 ? ` - ${top}px` : "";
              } else {
                minHeight += ` - ${css(scrollElement, "paddingTop")}`;
              }
            }
            if (offsetBottom === true) {
              minHeight += ` - ${dimensions$1($el.nextElementSibling).height}px`;
            } else if (isNumeric(offsetBottom)) {
              minHeight += ` - ${offsetBottom}vh`;
            } else if (offsetBottom && endsWith(offsetBottom, "px")) {
              minHeight += ` - ${toFloat(offsetBottom)}px`;
            } else if (isString(offsetBottom)) {
              minHeight += ` - ${dimensions$1(query(offsetBottom, $el)).height}px`;
            }
            minHeight += `${box ? ` - ${box}px` : ""})`;
          }
          return { minHeight, prev };
        },
        write({ minHeight }) {
          css($el, { minHeight });
          if (minHeight && toFloat(css($el, "minHeight")) < minHeight) {
            css($el, "minHeight", minHeight);
          }
        },
        events: ["resize"]
      }
    };

    function getMaxPathLength(el) {
      return Math.ceil(
        Math.max(
          0,
          ...$$("[stroke]", el).map((stroke) => {
            try {
              return stroke.getTotalLength();
            } catch (e) {
              return 0;
            }
          })
        )
      );
    }

    var SVG = {
      args: "src",
      props: {
        id: Boolean,
        icon: String,
        src: String,
        style: String,
        width: Number,
        height: Number,
        ratio: Number,
        class: String,
        strokeAnimation: Boolean,
        attributes: "list"
      },
      data: {
        ratio: 1,
        include: ["style", "class"],
        class: "",
        strokeAnimation: false
      },
      beforeConnect() {
        class += " uk-svg";
      },
      connected() {
        if (!icon && includes(src, "#")) {
          [src, icon] = src.split("#");
        }
        svg = getSvg().then((el) => {
          if (_connected) {
            const svg = insertSVG(el, $el);
            if (svgEl && svg !== svgEl) {
              remove$1(svgEl);
            }
            applyAttributes(svg, el);
            return svgEl = svg;
          }
        }, noop);
        if (strokeAnimation) {
          svg.then((el) => {
            if (_connected && el) {
              applyAnimation(el);
              registerObserver(
                this,
                observeIntersection(el, (records, observer) => {
                  applyAnimation(el);
                  observer.disconnect();
                })
              );
            }
          });
        }
      },
      disconnected() {
        svg.then((svg) => {
          if (_connected) {
            return;
          }
          if (isVoidElement($el)) {
            $el.hidden = false;
          }
          remove$1(svg);
          svgEl = null;
        });
        svg = null;
      },
      methods: {
        async getSvg() {
          if (isTag($el, "img") && !$el.complete && $el.loading === "lazy") {
            return new Promise(
              (resolve) => once($el, "load", () => resolve(getSvg()))
            );
          }
          return parseSVG(await loadSVG(src), icon) || Promise.reject("SVG not found.");
        },
        applyAttributes(el, ref) {
          for (const prop in $options.props) {
            if (includes(include, prop) && prop in this) {
              attr(el, prop, this[prop]);
            }
          }
          for (const attribute in attributes) {
            const [prop, value] = attributes[attribute].split(":", 2);
            attr(el, prop, value);
          }
          if (!id) {
            removeAttr(el, "id");
          }
          const props = ["width", "height"];
          let dimensions = props.map((prop) => this[prop]);
          if (!dimensions.some((val) => val)) {
            dimensions = props.map((prop) => attr(ref, prop));
          }
          const viewBox = attr(ref, "viewBox");
          if (viewBox && !dimensions.some((val) => val)) {
            dimensions = viewBox.split(" ").slice(2);
          }
          dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * ratio || null));
        }
      }
    };
    const loadSVG = memoize(async (src) => {
      if (src) {
        if (startsWith(src, "data:")) {
          return decodeURIComponent(src.split(",")[1]);
        } else {
          return (await fetch(src)).text();
        }
      } else {
        return Promise.reject();
      }
    });
    function parseSVG(svg, icon) {
      if (icon && includes(svg, "<symbol")) {
        svg = parseSymbols(svg, icon) || svg;
      }
      svg = $(svg.substr(svg.indexOf("<svg")));
      return (svg == null ? void 0 : svg.hasChildNodes()) && svg;
    }
    const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    const symbols = {};
    function parseSymbols(svg, icon) {
      if (!symbols[svg]) {
        symbols[svg] = {};
        symbolRe.lastIndex = 0;
        let match;
        while (match = symbolRe.exec(svg)) {
          symbols[svg][match[3]] = `<svg xmlns="http://www.w3.org/2000/svg"${match[1]}svg>`;
        }
      }
      return symbols[svg][icon];
    }
    function applyAnimation(el) {
      const length = getMaxPathLength(el);
      if (length) {
        el.style.setProperty("--uk-animation-stroke", length);
      }
    }
    function insertSVG(el, root) {
      if (isVoidElement(root) || isTag(root, "canvas")) {
        root.hidden = true;
        const next = root.nextElementSibling;
        return equals(el, next) ? next : after(root, el);
      }
      const last = root.lastElementChild;
      return equals(el, last) ? last : append(root, el);
    }
    function equals(el, other) {
      return isTag(el, "svg") && isTag(other, "svg") && el.innerHTML === other.innerHTML;
    }

    var I18n = {
      props: {
        i18n: Object
      },
      data: {
        i18n: null
      },
      methods: {
        t(key, ...params) {
          var _a, _b, _c;
          let i = 0;
          return ((_c = ((_a = i18n) == null ? void 0 : _a[key]) || ((_b = $options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(
            /%s/g,
            () => params[i++] || ""
          )) || "";
        }
      }
    };

    var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

    var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

    var dropParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

    var navParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navParentIconLarge = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 4 7 10 13 4\"/></svg>";

    var navbarParentIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><style>.uk-navbar-toggle-animate svg>[class*=line-]{transition:.2s ease-in-out;transition-property:transform,opacity;transform-origin:center;opacity:1}.uk-navbar-toggle svg>.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1,.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=true] svg>.line-4{transform:translateY(-6px) scaleX(0)}</style><rect class=\"line-1\" y=\"3\" width=\"20\" height=\"2\"/><rect class=\"line-2\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-3\" y=\"9\" width=\"20\" height=\"2\"/><rect class=\"line-4\" y=\"15\" width=\"20\" height=\"2\"/></svg>";

    var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

    var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

    var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

    var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

    var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

    var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

    var slidenavNext = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

    var slidenavNextLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

    var slidenavPrevious = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

    var slidenavPreviousLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

    var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

    var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

    const icons = {
      spinner,
      totop,
      marker,
      "close-icon": closeIcon,
      "close-large": closeLarge,
      "drop-parent-icon": dropParentIcon,
      "nav-parent-icon": navParentIcon,
      "nav-parent-icon-large": navParentIconLarge,
      "navbar-parent-icon": navbarParentIcon,
      "navbar-toggle-icon": navbarToggleIcon,
      "overlay-icon": overlayIcon,
      "pagination-next": paginationNext,
      "pagination-previous": paginationPrevious,
      "search-icon": searchIcon,
      "search-large": searchLarge,
      "search-navbar": searchNavbar,
      "slidenav-next": slidenavNext,
      "slidenav-next-large": slidenavNextLarge,
      "slidenav-previous": slidenavPrevious,
      "slidenav-previous-large": slidenavPreviousLarge
    };
    const Icon = {
      install: install$3,
      extends: SVG,
      args: "icon",
      props: ["icon"],
      data: { include: [] },
      isIcon: true,
      beforeConnect() {
        addClass($el, "uk-icon");
      },
      methods: {
        async getSvg() {
          const icon = getIcon(icon);
          if (!icon) {
            throw "Icon not found.";
          }
          return icon;
        }
      }
    };
    const IconComponent = {
      args: false,
      extends: Icon,
      data: (vm) => ({
        icon: hyphenate(vm.constructor.options.name)
      }),
      beforeConnect() {
        addClass($el, $options.id);
      }
    };
    const NavParentIcon = {
      extends: IconComponent,
      beforeConnect() {
        const icon = $props.icon;
        icon = closest($el, ".uk-nav-primary") ? `${icon}-large` : icon;
      }
    };
    const Search = {
      extends: IconComponent,
      beforeConnect() {
        icon = hasClass($el, "uk-search-icon") && parents($el, ".uk-search-large").length ? "search-large" : parents($el, ".uk-search-navbar").length ? "search-navbar" : $props.icon;
      }
    };
    const Spinner = {
      extends: IconComponent,
      beforeConnect() {
        attr($el, "role", "status");
      },
      methods: {
        async getSvg() {
          const icon = await Icon.methods.getSvg.call(this);
          if (ratio !== 1) {
            css($("circle", icon), "strokeWidth", 1 / ratio);
          }
          return icon;
        }
      }
    };
    const ButtonComponent = {
      extends: IconComponent,
      mixins: [I18n],
      beforeConnect() {
        const button = closest($el, "a,button");
        attr(button, "role", role !== null && isTag(button, "a") ? "button" : role);
        const label = t("label");
        if (label && !hasAttr(button, "aria-label")) {
          attr(button, "aria-label", label);
        }
      }
    };
    const Slidenav = {
      extends: ButtonComponent,
      beforeConnect() {
        addClass($el, "uk-slidenav");
        const icon = $props.icon;
        icon = hasClass($el, "uk-slidenav-large") ? `${icon}-large` : icon;
      }
    };
    const NavbarToggleIcon = {
      extends: ButtonComponent,
      i18n: { label: "Open menu" }
    };
    const Close = {
      extends: ButtonComponent,
      i18n: { label: "Close" },
      beforeConnect() {
        icon = `close-${hasClass($el, "uk-close-large") ? "large" : "icon"}`;
      }
    };
    const Marker = {
      extends: ButtonComponent,
      i18n: { label: "Open" }
    };
    const Totop = {
      extends: ButtonComponent,
      i18n: { label: "Back to top" }
    };
    const PaginationNext = {
      extends: ButtonComponent,
      i18n: { label: "Next page" },
      data: { role: null }
    };
    const PaginationPrevious = {
      extends: ButtonComponent,
      i18n: { label: "Previous page" },
      data: { role: null }
    };
    const parsed = {};
    function install$3(UIkit) {
      UIkit.icon.add = (name, svg) => {
        const added = isString(name) ? { [name]: svg } : name;
        each(added, (svg2, name2) => {
          icons[name2] = svg2;
          delete parsed[name2];
        });
        if (UIkit._initialized) {
          apply(
            document.body,
            (el) => each(UIkit.getComponents(el), (cmp) => {
              cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
            })
          );
        }
      };
    }
    function getIcon(icon) {
      if (!icons[icon]) {
        return null;
      }
      if (!parsed[icon]) {
        parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
      }
      return parsed[icon].cloneNode(true);
    }
    function applyRtl(icon) {
      return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
    }

    const nativeLazyLoad = inBrowser && "loading" in HTMLImageElement.prototype;
    var img = {
      args: "dataSrc",
      props: {
        dataSrc: String,
        sources: String,
        margin: String,
        target: String,
        loading: String
      },
      data: {
        dataSrc: "",
        sources: false,
        margin: "50%",
        target: false,
        loading: "lazy"
      },
      connected() {
        if (loading !== "lazy") {
          load();
          return;
        }
        if (nativeLazyLoad && isImg($el)) {
          $el.loading = "lazy";
          setSrcAttrs($el);
        }
        ensureSrcAttribute($el);
      },
      disconnected() {
        if (_data.image) {
          _data.image.onload = "";
        }
      },
      observe: intersection({
        target: ({ $el, $props }) => [$el, ...queryAll($props.target, $el)],
        handler(entries, observer) {
          load();
          observer.disconnect();
        },
        options: ({ margin }) => ({ rootMargin: margin }),
        filter: ({ loading }) => loading === "lazy"
      }),
      methods: {
        load() {
          if (_data.image) {
            return _data.image;
          }
          const image = isImg($el) ? $el : getImageFromElement($el, dataSrc, sources);
          removeAttr(image, "loading");
          setSrcAttrs($el, image.currentSrc);
          return _data.image = image;
        }
      }
    };
    function setSrcAttrs(el, src) {
      if (isImg(el)) {
        const parentNode = parent(el);
        const elements = isTag(parentNode, "picture") ? children(parentNode) : [el];
        elements.forEach((el2) => setSourceProps(el2, el2));
      } else if (src) {
        const change = !includes(el.style.backgroundImage, src);
        if (change) {
          css(el, "backgroundImage", `url(${escape(src)})`);
          trigger(el, createEvent("load", false));
        }
      }
    }
    const srcProps = ["data-src", "data-srcset", "sizes"];
    function setSourceProps(sourceEl, targetEl) {
      srcProps.forEach((prop) => {
        const value = data(sourceEl, prop);
        if (value) {
          attr(targetEl, prop.replace(/^(data-)+/, ""), value);
        }
      });
    }
    function getImageFromElement(el, src, sources) {
      const img = new Image();
      wrapInPicture(img, sources);
      setSourceProps(el, img);
      img.onload = () => {
        setSrcAttrs(el, img.currentSrc);
      };
      attr(img, "src", src);
      return img;
    }
    function wrapInPicture(img, sources) {
      sources = parseSources(sources);
      if (sources.length) {
        const picture = fragment("<picture>");
        for (const attrs of sources) {
          const source = fragment("<source>");
          attr(source, attrs);
          append(picture, source);
        }
        append(picture, img);
      }
    }
    function parseSources(sources) {
      if (!sources) {
        return [];
      }
      if (startsWith(sources, "[")) {
        try {
          sources = JSON.parse(sources);
        } catch (e) {
          sources = [];
        }
      } else {
        sources = parseOptions(sources);
      }
      if (!isArray(sources)) {
        sources = [sources];
      }
      return sources.filter((source) => !isEmpty(source));
    }
    function ensureSrcAttribute(el) {
      if (isImg(el) && !hasAttr(el, "src")) {
        attr(el, "src", 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
      }
    }
    function isImg(el) {
      return isTag(el, "img");
    }

    var Media = {
      props: {
        media: Boolean
      },
      data: {
        media: false
      },
      connected() {
        const media = toMedia(media, $el);
        matchMedia = true;
        if (media) {
          mediaObj = window.matchMedia(media);
          const handler = () => {
            matchMedia = mediaObj.matches;
            trigger($el, createEvent("mediachange", false, true, [mediaObj]));
          };
          offMediaObj = on(mediaObj, "change", () => {
            handler();
            $emit("resize");
          });
          handler();
        }
      },
      disconnected() {
        var _a;
        (_a = offMediaObj) == null ? void 0 : _a.call(this);
      }
    };
    function toMedia(value, element) {
      if (isString(value)) {
        if (startsWith(value, "@")) {
          value = toFloat(css(element, `--uk-breakpoint-${value.substr(1)}`));
        } else if (isNaN(value)) {
          return value;
        }
      }
      return value && isNumeric(value) ? `(min-width: ${value}px)` : "";
    }

    var leader = {
      mixins: [Class, Media],
      props: {
        fill: String
      },
      data: {
        fill: "",
        clsWrapper: "uk-leader-fill",
        clsHide: "uk-leader-hide",
        attrFill: "data-fill"
      },
      computed: {
        fill({ fill }) {
          return fill || css($el, "--uk-leader-fill-content");
        }
      },
      connected() {
        [wrapper] = wrapInner($el, `<span class="${clsWrapper}">`);
      },
      disconnected() {
        unwrap(wrapper.childNodes);
      },
      observe: resize(),
      update: {
        read() {
          const width = Math.trunc($el.offsetWidth / 2);
          return {
            width,
            fill: fill,
            hide: !matchMedia
          };
        },
        write({ width, fill, hide }) {
          toggleClass(wrapper, clsHide, hide);
          attr(wrapper, attrFill, new Array(width).join(fill));
        },
        events: ["resize"]
      }
    };

    const active = [];
    var Modal = {
      mixins: [Class, Container, Togglable],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String
      },
      data: {
        cls: "uk-open",
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false,
        role: "dialog"
      },
      computed: {
        panel({ selPanel }, $el) {
          return $(selPanel, $el);
        },
        transitionElement() {
          return panel;
        },
        bgClose({ bgClose }) {
          return bgClose && panel;
        }
      },
      connected() {
        attr(panel || $el, "role", role);
        if (overlay) {
          attr(panel || $el, "aria-modal", true);
        }
      },
      beforeDisconnect() {
        if (includes(active, this)) {
          toggleElement($el, false, false);
        }
      },
      events: [
        {
          name: "click",
          delegate() {
            return `${selClose},a[href*="#"]`;
          },
          handler(e) {
            const { current, defaultPrevented } = e;
            const { hash } = current;
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, $el) && $(hash, document.body)) {
              hide();
            } else if (matches(current, selClose)) {
              e.preventDefault();
              hide();
            }
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e) {
            if (e.defaultPrevented) {
              return;
            }
            e.preventDefault();
            if (isToggled() === includes(active, this)) {
              toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (includes(active, this)) {
              return false;
            }
            if (!stack && active.length) {
              Promise.all(active.map((modal) => modal.hide())).then(show);
              e.preventDefault();
            } else {
              active.push(this);
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (stack) {
              css($el, "zIndex", toFloat(css($el, "zIndex")) + active.length);
            }
            const handlers = [
              overlay && preventBackgroundFocus(this),
              overlay && preventBackgroundScroll($el),
              bgClose && listenForBackgroundClose(this),
              escClose && listenForEscClose(this)
            ];
            once(
              $el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            addClass(document.documentElement, clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!isFocusable($el)) {
              attr($el, "tabindex", "-1");
            }
            if (!matches($el, ":focus-within")) {
              $el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (includes(active, this)) {
              active.splice(active.indexOf(this), 1);
            }
            css($el, "zIndex", "");
            if (!active.some((modal) => modal.clsPage === clsPage)) {
              removeClass(document.documentElement, clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return isToggled() ? hide() : show();
        },
        show() {
          if (container && parent($el) !== container) {
            append(container, $el);
            return new Promise(
              (resolve) => requestAnimationFrame(() => show().then(resolve))
            );
          }
          return toggleElement($el, true, animate);
        },
        hide() {
          return toggleElement($el, false, animate);
        }
      }
    };
    function animate(el, show, { transitionElement, _toggle }) {
      return new Promise(
        (resolve, reject) => once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = once(
            transitionElement,
            "transitionstart",
            () => {
              once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(() => {
            off();
            resolve();
          }, toMs(css(transitionElement, "transitionDuration")));
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return on(document, "focusin", (e) => {
        if (last(active) === modal && !within(e.target, modal.$el)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose(modal) {
      return on(document, pointerDown$1, ({ target }) => {
        if (last(active) !== modal || modal.overlay && !within(target, modal.$el) || within(target, modal.panel)) {
          return;
        }
        once(
          document,
          `${pointerUp$1} ${pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose(modal) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === 27 && last(active) === modal) {
          modal.hide();
        }
      });
    }

    var modal = {
      install: install$2,
      mixins: [Modal],
      data: {
        clsPage: "uk-modal-page",
        selPanel: ".uk-modal-dialog",
        selClose: ".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
      },
      events: [
        {
          name: "show",
          self: true,
          handler() {
            if (hasClass(panel, "uk-margin-auto-vertical")) {
              addClass($el, "uk-flex");
            } else {
              css($el, "display", "block");
            }
            height($el);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            css($el, "display", "");
            removeClass($el, "uk-flex");
          }
        }
      ]
    };
    function install$2({ modal }) {
      modal.dialog = function(content, options) {
        const dialog = modal(
          `<div class="uk-modal"> <div class="uk-modal-dialog">${content}</div> </div>`,
          options
        );
        dialog.show();
        on(
          dialog.$el,
          "hidden",
          async () => {
            await Promise.resolve();
            dialog.$destroy(true);
          },
          { self: true }
        );
        return dialog;
      };
      modal.alert = function(message, options) {
        return openDialog(
          ({ i18n }) => `<div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>${i18n.ok}</button> </div>`,
          options,
          (deferred) => deferred.resolve()
        );
      };
      modal.confirm = function(message, options) {
        return openDialog(
          ({ i18n }) => `<form> <div class="uk-modal-body">${isString(message) ? message : html(message)}</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${i18n.cancel}</button> <button class="uk-button uk-button-primary" autofocus>${i18n.ok}</button> </div> </form>`,
          options,
          (deferred) => deferred.reject()
        );
      };
      modal.prompt = function(message, value, options) {
        return openDialog(
          ({ i18n }) => `<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>${isString(message) ? message : html(message)}</label> <input class="uk-input" value="${value || ""}" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${i18n.cancel}</button> <button class="uk-button uk-button-primary">${i18n.ok}</button> </div> </form>`,
          options,
          (deferred) => deferred.resolve(null),
          (dialog) => $("input", dialog.$el).value
        );
      };
      modal.i18n = {
        ok: "Ok",
        cancel: "Cancel"
      };
      function openDialog(tmpl, options, hideFn, submitFn) {
        options = {
          bgClose: false,
          escClose: true,
          role: "alertdialog",
          ...options,
          i18n: { ...modal.i18n, ...options == null ? void 0 : options.i18n }
        };
        const dialog = modal.dialog(tmpl(options), options);
        const deferred = new Deferred();
        let resolved = false;
        on(dialog.$el, "submit", "form", (e) => {
          e.preventDefault();
          deferred.resolve(submitFn == null ? void 0 : submitFn(dialog));
          resolved = true;
          dialog.hide();
        });
        on(dialog.$el, "hide", () => !resolved && hideFn(deferred));
        deferred.promise.dialog = dialog;
        return deferred.promise;
      }
    }

    var nav = {
      extends: Accordion,
      data: {
        targets: "> .uk-parent",
        toggle: "> a",
        content: "> ul"
      }
    };

    var navbar = {
      extends: Dropnav,
      data: {
        dropdown: ".uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle",
        clsDrop: "uk-navbar-dropdown"
      },
      computed: {
        items: {
          get({ dropdown }, $el) {
            return $$(dropdown, $el);
          },
          watch(items) {
            const justify = hasClass($el, "uk-navbar-justify");
            for (const container of $$(
              ".uk-navbar-nav, .uk-navbar-left, .uk-navbar-right",
              $el
            )) {
              css(container, "flexGrow", justify ? $$(dropdown, container).length : "");
            }
            attr($$(".uk-navbar-nav", $el), "role", "group");
            attr($$(".uk-navbar-nav > *", $el), "role", "presentation");
            attr(items, { tabindex: -1, role: "menuitem" });
            attr(items[0], "tabindex", 0);
          },
          immediate: true
        }
      }
    };

    var Swipe = {
      props: {
        swiping: Boolean
      },
      data: {
        swiping: true
      },
      computed: {
        swipeTarget(props, $el) {
          return $el;
        }
      },
      connected() {
        if (!swiping) {
          return;
        }
        registerEvent(this, {
          el: swipeTarget,
          name: pointerDown$1,
          passive: true,
          handler(e) {
            if (!isTouch(e)) {
              return;
            }
            const pos = getEventPos(e);
            const target = "tagName" in e.target ? e.target : parent(e.target);
            once(document, `${pointerUp$1} ${pointerCancel} scroll`, (e2) => {
              const { x, y } = getEventPos(e2);
              if (e2.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
                setTimeout(() => {
                  trigger(target, "swipe");
                  trigger(target, `swipe${swipeDirection(pos.x, pos.y, x, y)}`);
                });
              }
            });
          }
        });
      }
    };
    function swipeDirection(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }

    var offcanvas = {
      mixins: [Modal, Swipe],
      args: "mode",
      props: {
        mode: String,
        flip: Boolean,
        overlay: Boolean
      },
      data: {
        mode: "slide",
        flip: false,
        overlay: false,
        clsPage: "uk-offcanvas-page",
        clsContainer: "uk-offcanvas-container",
        selPanel: ".uk-offcanvas-bar",
        clsFlip: "uk-offcanvas-flip",
        clsContainerAnimation: "uk-offcanvas-container-animation",
        clsSidebarAnimation: "uk-offcanvas-bar-animation",
        clsMode: "uk-offcanvas",
        clsOverlay: "uk-offcanvas-overlay",
        selClose: ".uk-offcanvas-close",
        container: false
      },
      computed: {
        clsFlip({ flip, clsFlip }) {
          return flip ? clsFlip : "";
        },
        clsOverlay({ overlay, clsOverlay }) {
          return overlay ? clsOverlay : "";
        },
        clsMode({ mode, clsMode }) {
          return `${clsMode}-${mode}`;
        },
        clsSidebarAnimation({ mode, clsSidebarAnimation }) {
          return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
        },
        clsContainerAnimation({ mode, clsContainerAnimation }) {
          return mode !== "push" && mode !== "reveal" ? "" : clsContainerAnimation;
        },
        transitionElement({ mode }) {
          return mode === "reveal" ? parent(panel) : panel;
        }
      },
      update: {
        read() {
          if (isToggled() && !isVisible($el)) {
            hide();
          }
        },
        events: ["resize"]
      },
      events: [
        {
          name: "touchmove",
          self: true,
          passive: false,
          filter() {
            return overlay;
          },
          handler(e) {
            e.cancelable && e.preventDefault();
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (mode === "reveal" && !hasClass(parent(panel), clsMode)) {
              wrapAll(panel, "<div>");
              addClass(parent(panel), clsMode);
            }
            const { body, scrollingElement } = document;
            addClass(body, clsContainer, clsFlip);
            css(body, "touch-action", "pan-y pinch-zoom");
            css($el, "display", "block");
            css(panel, "maxWidth", scrollingElement.clientWidth);
            addClass($el, clsOverlay);
            addClass(
              panel,
              clsSidebarAnimation,
              mode === "reveal" ? "" : clsMode
            );
            height(body);
            addClass(body, clsContainerAnimation);
            clsContainerAnimation && suppressUserScale();
          }
        },
        {
          name: "hide",
          self: true,
          handler() {
            removeClass(document.body, clsContainerAnimation);
            css(document.body, "touch-action", "");
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            clsContainerAnimation && resumeUserScale();
            if (mode === "reveal") {
              unwrap(panel);
            }
            removeClass(panel, clsSidebarAnimation, clsMode);
            removeClass($el, clsOverlay);
            css($el, "display", "");
            css(panel, "maxWidth", "");
            removeClass(document.body, clsContainer, clsFlip);
          }
        },
        {
          name: "swipeLeft swipeRight",
          handler(e) {
            if (isToggled() && endsWith(e.type, "Left") ^ flip) {
              hide();
            }
          }
        }
      ]
    };
    function suppressUserScale() {
      getViewport().content += ",user-scalable=0";
    }
    function resumeUserScale() {
      const viewport = getViewport();
      viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
    }
    function getViewport() {
      return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }

    var overflowAuto = {
      mixins: [Class],
      props: {
        selContainer: String,
        selContent: String,
        minHeight: Number
      },
      data: {
        selContainer: ".uk-modal",
        selContent: ".uk-modal-dialog",
        minHeight: 150
      },
      computed: {
        container({ selContainer }, $el) {
          return closest($el, selContainer);
        },
        content({ selContent }, $el) {
          return closest($el, selContent);
        }
      },
      observe: resize({
        target: ({ container, content }) => [container, content]
      }),
      update: {
        read() {
          if (!content || !container || !isVisible($el)) {
            return false;
          }
          return {
            max: Math.max(
              minHeight,
              height(container) - (dimensions$1(content).height - height($el))
            )
          };
        },
        write({ max }) {
          css($el, { minHeight: minHeight, maxHeight: max });
        },
        events: ["resize"]
      }
    };

    var responsive = {
      props: ["width", "height"],
      connected() {
        addClass($el, "uk-responsive-width");
      },
      observe: resize({
        target: ({ $el }) => [$el, parent($el)]
      }),
      update: {
        read() {
          return isVisible($el) && width && height ? { width: width(parent($el)), height: height } : false;
        },
        write(dim) {
          height(
            $el,
            Dimensions.contain(
              {
                height: height,
                width: width
              },
              dim
            ).height
          );
        },
        events: ["resize"]
      }
    };

    var scroll = {
      props: {
        offset: Number
      },
      data: {
        offset: 0
      },
      connected() {
        registerClick(this);
      },
      disconnected() {
        unregisterClick(this);
      },
      methods: {
        async scrollTo(el) {
          el = el && $(el) || document.body;
          if (trigger($el, "beforescroll", [this, el])) {
            await scrollIntoView(el, { offset: offset });
            trigger($el, "scrolled", [this, el]);
          }
        }
      }
    };
    const instances = /* @__PURE__ */ new Set();
    function registerClick(cmp) {
      if (!instances.size) {
        on(document, "click", clickHandler);
      }
      instances.add(cmp);
    }
    function unregisterClick(cmp) {
      instances.delete(cmp);
      if (!instances.size) {
        off(document, "click", clickHandler);
      }
    }
    function clickHandler(e) {
      if (e.defaultPrevented) {
        return;
      }
      for (const instance of instances) {
        if (within(e.target, instance.$el) && isSameSiteAnchor(instance.$el)) {
          e.preventDefault();
          window.history.pushState({}, "", instance.$el.href);
          instance.scrollTo(getTargetedElement(instance.$el));
        }
      }
    }

    var scrollspy = {
      args: "cls",
      props: {
        cls: String,
        target: String,
        hidden: Boolean,
        margin: String,
        repeat: Boolean,
        delay: Number
      },
      data: () => ({
        cls: "",
        target: false,
        hidden: true,
        margin: "-1px",
        repeat: false,
        delay: 0,
        inViewClass: "uk-scrollspy-inview"
      }),
      computed: {
        elements: {
          get({ target }, $el) {
            return target ? $$(target, $el) : [$el];
          },
          watch(elements) {
            if (hidden) {
              css(filter$1(elements, `:not(.${inViewClass})`), "opacity", 0);
            }
          },
          immediate: true
        }
      },
      connected() {
        _data.elements = /* @__PURE__ */ new Map();
      },
      disconnected() {
        for (const [el, state] of _data.elements.entries()) {
          removeClass(el, inViewClass, (state == null ? void 0 : state.cls) || "");
        }
      },
      observe: intersection({
        target: ({ elements }) => elements,
        handler(records) {
          const elements = _data.elements;
          for (const { target: el, isIntersecting } of records) {
            if (!elements.has(el)) {
              elements.set(el, {
                cls: data(el, "uk-scrollspy-class") || cls
              });
            }
            const state = elements.get(el);
            if (!repeat && state.show) {
              continue;
            }
            state.show = isIntersecting;
          }
          $emit();
        },
        options: (instance) => ({ rootMargin: instance.margin }),
        args: { intersecting: false }
      }),
      update: [
        {
          write(data) {
            for (const [el, state] of data.elements.entries()) {
              if (state.show && !state.inview && !state.queued) {
                state.queued = true;
                data.promise = (data.promise || Promise.resolve()).then(() => new Promise((resolve) => setTimeout(resolve, delay))).then(() => {
                  toggle(el, true);
                  setTimeout(() => {
                    state.queued = false;
                    $emit();
                  }, 300);
                });
              } else if (!state.show && state.inview && !state.queued && repeat) {
                toggle(el, false);
              }
            }
          }
        }
      ],
      methods: {
        toggle(el, inview) {
          var _a;
          const state = _data.elements.get(el);
          if (!state) {
            return;
          }
          (_a = state.off) == null ? void 0 : _a.call(state);
          css(el, "opacity", !inview && hidden ? 0 : "");
          toggleClass(el, inViewClass, inview);
          toggleClass(el, state.cls);
          if (/\buk-animation-/.test(state.cls)) {
            const removeAnimationClasses = () => removeClasses(el, "uk-animation-[\\w-]+");
            if (inview) {
              state.off = once(el, "animationcancel animationend", removeAnimationClasses);
            } else {
              removeAnimationClasses();
            }
          }
          trigger(el, inview ? "inview" : "outview");
          state.inview = inview;
          $update(el);
        }
      }
    };

    var scrollspyNav = {
      props: {
        cls: String,
        closest: String,
        scroll: Boolean,
        overflow: Boolean,
        offset: Number
      },
      data: {
        cls: "uk-active",
        closest: false,
        scroll: false,
        overflow: true,
        offset: 0
      },
      computed: {
        links: {
          get(_, $el) {
            return $$('a[href*="#"]', $el).filter((el) => el.hash && isSameSiteAnchor(el));
          },
          watch(links) {
            if (scroll) {
              $create("scroll", links, { offset: offset || 0 });
            }
          },
          immediate: true
        },
        elements({ closest: selector }) {
          return closest(links, selector || "*");
        }
      },
      observe: scroll$1(),
      update: [
        {
          read() {
            const targets = links.map(getTargetedElement).filter(Boolean);
            const { length } = targets;
            if (!length || !isVisible($el)) {
              return false;
            }
            const [scrollElement] = scrollParents(targets, true);
            const { scrollTop, scrollHeight } = scrollElement;
            const viewport = offsetViewport(scrollElement);
            const max = scrollHeight - viewport.height;
            let active = false;
            if (scrollTop === max) {
              active = length - 1;
            } else {
              for (let i = 0; i < targets.length; i++) {
                if (offset(targets[i]).top - viewport.top - offset > 0) {
                  break;
                }
                active = +i;
              }
              if (active === false && overflow) {
                active = 0;
              }
            }
            return { active };
          },
          write({ active }) {
            const changed = active !== false && !hasClass(elements[active], cls);
            links.forEach((el) => el.blur());
            for (let i = 0; i < elements.length; i++) {
              toggleClass(elements[i], cls, +i === active);
            }
            if (changed) {
              trigger($el, "active", [active, elements[active]]);
            }
          },
          events: ["scroll", "resize"]
        }
      ]
    };

    var sticky = {
      mixins: [Class, Media],
      props: {
        position: String,
        top: null,
        bottom: null,
        start: null,
        end: null,
        offset: String,
        overflowFlip: Boolean,
        animation: String,
        clsActive: String,
        clsInactive: String,
        clsFixed: String,
        clsBelow: String,
        selTarget: String,
        showOnUp: Boolean,
        targetOffset: Number
      },
      data: {
        position: "top",
        top: false,
        bottom: false,
        start: false,
        end: false,
        offset: 0,
        overflowFlip: false,
        animation: "",
        clsActive: "uk-active",
        clsInactive: "",
        clsFixed: "uk-sticky-fixed",
        clsBelow: "uk-sticky-below",
        selTarget: "",
        showOnUp: false,
        targetOffset: false
      },
      computed: {
        selTarget({ selTarget }, $el) {
          return selTarget && $(selTarget, $el) || $el;
        }
      },
      connected() {
        start = coerce(start || top);
        end = coerce(end || bottom);
        placeholder = $("+ .uk-sticky-placeholder", $el) || $('<div class="uk-sticky-placeholder"></div>');
        isFixed = false;
        setActive(false);
      },
      disconnected() {
        if (isFixed) {
          hide();
          removeClass(selTarget, clsInactive);
        }
        reset($el);
        remove$1(placeholder);
        placeholder = null;
      },
      observe: [
        resize({
          handler() {
            !isFixed && $emit("resize");
          }
        }),
        resize({ target: () => [document.documentElement] }),
        scroll$1()
      ],
      events: [
        {
          name: "resize",
          el() {
            return [window, window.visualViewport];
          },
          handler() {
            $emit("resizeViewport");
          }
        },
        {
          name: "load hashchange popstate",
          el() {
            return window;
          },
          filter() {
            return targetOffset !== false;
          },
          handler() {
            const { scrollingElement } = document;
            if (!location.hash || scrollingElement.scrollTop === 0) {
              return;
            }
            setTimeout(() => {
              const targetOffset = offset($(location.hash));
              const elOffset = offset($el);
              if (isFixed && intersectRect(targetOffset, elOffset)) {
                scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(targetOffset, "height", placeholder) - toPx(offset, "height", placeholder);
              }
            });
          }
        }
      ],
      update: [
        {
          read({ height: height$1, width, margin, sticky }, types) {
            inactive = !matchMedia || !isVisible($el);
            if (inactive) {
              return;
            }
            const hide = isFixed && types.has("resize") && !sticky;
            if (hide) {
              css(selTarget, "transition", "0s");
              hide();
            }
            if (!active) {
              ({ height: height$1, width } = offset($el));
              margin = css($el, "margin");
            }
            if (hide) {
              show();
              requestAnimationFrame(() => css(selTarget, "transition", ""));
            }
            const viewport = toPx("100vh", "height");
            const dynamicViewport = height(window);
            const maxScrollHeight = document.scrollingElement.scrollHeight - viewport;
            let position = position;
            if (overflowFlip && height$1 > viewport) {
              position = position === "top" ? "bottom" : "top";
            }
            const referenceElement = isFixed ? placeholder : $el;
            let offset$1 = toPx(offset, "height", sticky ? $el : referenceElement);
            if (position === "bottom" && (height$1 < dynamicViewport || overflowFlip)) {
              offset$1 += dynamicViewport - height$1;
            }
            const overflow = overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - viewport);
            const topOffset = offset(referenceElement).top;
            const elHeight = offset($el).height;
            const start = (start === false ? topOffset : parseProp(start, $el, topOffset)) - offset$1;
            const end = end === false ? maxScrollHeight : Math.min(
              maxScrollHeight,
              parseProp(end, $el, topOffset + height$1, true) - elHeight - offset$1 + overflow
            );
            sticky = maxScrollHeight && !showOnUp && start + offset$1 === topOffset && end === Math.min(
              maxScrollHeight,
              parseProp("!*", $el, 0, true) - elHeight - offset$1 + overflow
            ) && css(parent($el), "overflowY") === "visible";
            return {
              start,
              end,
              offset: offset$1,
              overflow,
              topOffset,
              height: height$1,
              elHeight,
              width,
              margin,
              top: offsetPosition(referenceElement)[0],
              sticky
            };
          },
          write({ height, width, margin, offset, sticky }) {
            if (inactive || sticky || !isFixed) {
              reset($el);
            }
            if (inactive) {
              return;
            }
            if (sticky) {
              height = width = margin = 0;
              css($el, { position: "sticky", top: offset });
            }
            const { placeholder } = this;
            css(placeholder, { height, width, margin });
            if (!within(placeholder, document)) {
              placeholder.hidden = true;
            }
            (sticky ? before : after)($el, placeholder);
          },
          events: ["resize", "resizeViewport"]
        },
        {
          read({
            scroll: prevScroll = 0,
            dir: prevDir = "down",
            overflow,
            overflowScroll = 0,
            start,
            end
          }) {
            const scroll2 = document.scrollingElement.scrollTop;
            const dir = prevScroll <= scroll2 ? "down" : "up";
            return {
              dir,
              prevDir,
              scroll: scroll2,
              prevScroll,
              offsetParentTop: offset(
                (isFixed ? placeholder : $el).offsetParent
              ).top,
              overflowScroll: clamp(
                overflowScroll + clamp(scroll2, start, end) - clamp(prevScroll, start, end),
                0,
                overflow
              )
            };
          },
          write(data, types) {
            const isScrollUpdate = types.has("scroll");
            const {
              initTimestamp = 0,
              dir,
              prevDir,
              scroll: scroll2,
              prevScroll = 0,
              top,
              start,
              topOffset,
              height
            } = data;
            if (scroll2 < 0 || scroll2 === prevScroll && isScrollUpdate || showOnUp && !isScrollUpdate && !isFixed) {
              return;
            }
            const now = Date.now();
            if (now - initTimestamp > 300 || dir !== prevDir) {
              data.initScroll = scroll2;
              data.initTimestamp = now;
            }
            if (showOnUp && !isFixed && Math.abs(data.initScroll - scroll2) <= 30 && Math.abs(prevScroll - scroll2) <= 10) {
              return;
            }
            if (inactive || scroll2 < start || showOnUp && (scroll2 <= start || dir === "down" && isScrollUpdate || dir === "up" && !isFixed && scroll2 <= topOffset + height)) {
              if (!isFixed) {
                if (Animation.inProgress($el) && top > scroll2) {
                  Animation.cancel($el);
                  hide();
                }
                return;
              }
              if (animation && scroll2 > topOffset) {
                Animation.cancel($el);
                Animation.out($el, animation).then(() => hide(), noop);
              } else {
                hide();
              }
            } else if (isFixed) {
              update();
            } else if (animation && scroll2 > topOffset) {
              Animation.cancel($el);
              show();
              Animation.in($el, animation).catch(noop);
            } else {
              show();
            }
          },
          events: ["resize", "resizeViewport", "scroll"]
        }
      ],
      methods: {
        show() {
          isFixed = true;
          update();
          placeholder.hidden = false;
        },
        hide() {
          const { offset, sticky } = _data;
          setActive(false);
          removeClass($el, clsFixed, clsBelow);
          if (sticky) {
            css($el, "top", offset);
          } else {
            css($el, {
              position: "",
              top: "",
              width: "",
              marginTop: ""
            });
          }
          placeholder.hidden = true;
          isFixed = false;
        },
        update() {
          let {
            width,
            scroll: scroll2 = 0,
            overflow,
            overflowScroll = 0,
            start,
            end,
            offset,
            topOffset,
            height,
            elHeight,
            offsetParentTop,
            sticky
          } = _data;
          const active = start !== 0 || scroll2 > start;
          if (!sticky) {
            let position = "fixed";
            if (scroll2 > end) {
              offset += end - offsetParentTop;
              position = "absolute";
            }
            css($el, { position, width });
            css($el, "marginTop", 0, "important");
          }
          if (overflow) {
            offset -= overflowScroll;
          }
          css($el, "top", offset);
          setActive(active);
          toggleClass(
            $el,
            clsBelow,
            scroll2 > topOffset + (sticky ? Math.min(height, elHeight) : height)
          );
          addClass($el, clsFixed);
        },
        setActive(active) {
          const prev = active;
          active = active;
          if (active) {
            replaceClass(selTarget, clsInactive, clsActive);
            prev !== active && trigger($el, "active");
          } else {
            replaceClass(selTarget, clsActive, clsInactive);
            prev !== active && trigger($el, "inactive");
          }
        }
      }
    };
    function parseProp(value, el, propOffset, padding) {
      if (!value) {
        return 0;
      }
      if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
        return propOffset + toPx(value, "height", el, true);
      } else {
        const refElement = value === true ? parent(el) : query(value, el);
        return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, "paddingBottom")) : 0);
      }
    }
    function coerce(value) {
      if (value === "true") {
        return true;
      } else if (value === "false") {
        return false;
      }
      return value;
    }
    function reset(el) {
      css(el, { position: "", top: "", marginTop: "", width: "" });
    }

    const selDisabled = ".uk-disabled *, .uk-disabled, [disabled]";
    var Switcher = {
      mixins: [Swipe, Togglable],
      args: "connect",
      props: {
        connect: String,
        toggle: String,
        itemNav: String,
        active: Number,
        followFocus: Boolean
      },
      data: {
        connect: "~.uk-switcher",
        toggle: "> * > :first-child",
        itemNav: false,
        active: 0,
        cls: "uk-active",
        attrItem: "uk-switcher-item",
        selVertical: ".uk-nav",
        followFocus: false
      },
      computed: {
        connects: {
          get({ connect }, $el) {
            return queryAll(connect, $el);
          },
          watch(connects) {
            if (swiping) {
              css(connects, "touchAction", "pan-y pinch-zoom");
            }
            $emit();
          },
          document: true,
          immediate: true
        },
        connectChildren: {
          get() {
            return connects.map((el) => children(el)).flat();
          },
          watch() {
            const index = index();
            for (const el of connects) {
              children(el).forEach((child, i) => toggleClass(child, cls, i === index));
            }
            $emit();
          },
          immediate: true
        },
        toggles: {
          get({ toggle }, $el) {
            return $$(toggle, $el);
          },
          watch(toggles) {
            $emit();
            const active = index();
            show(~active ? active : toggles[active] || toggles[0]);
          },
          immediate: true
        },
        children() {
          return children($el).filter(
            (child) => toggles.some((toggle) => within(toggle, child))
          );
        },
        swipeTarget() {
          return connects;
        }
      },
      connected() {
        attr($el, "role", "tablist");
      },
      observe: lazyload({ targets: ({ connectChildren }) => connectChildren }),
      events: [
        {
          name: "click keydown",
          delegate() {
            return toggle;
          },
          handler(e) {
            if (!matches(e.current, selDisabled) && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              show(e.current);
            }
          }
        },
        {
          name: "keydown",
          delegate() {
            return toggle;
          },
          handler(e) {
            const { current, keyCode } = e;
            const isVertical = matches($el, selVertical);
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT && !isVertical || keyCode === keyMap.UP && isVertical ? "previous" : keyCode === keyMap.RIGHT && !isVertical || keyCode === keyMap.DOWN && isVertical ? "next" : -1;
            if (~i) {
              e.preventDefault();
              const toggles = toggles.filter((el) => !matches(el, selDisabled));
              const next = toggles[getIndex(i, toggles, toggles.indexOf(current))];
              next.focus();
              if (followFocus) {
                show(next);
              }
            }
          }
        },
        {
          name: "click",
          el() {
            return connects.concat(itemNav ? queryAll(itemNav, $el) : []);
          },
          delegate() {
            return `[${attrItem}],[data-${attrItem}]`;
          },
          handler(e) {
            if (closest(e.target, "a,button")) {
              e.preventDefault();
              show(data(e.current, attrItem));
            }
          }
        },
        {
          name: "swipeRight swipeLeft",
          filter() {
            return swiping;
          },
          el() {
            return connects;
          },
          handler({ type }) {
            show(endsWith(type, "Left") ? "next" : "previous");
          }
        }
      ],
      update() {
        var _a;
        attr(connects, "role", "presentation");
        attr(children($el), "role", "presentation");
        for (const index in toggles) {
          const toggle = toggles[index];
          const item = (_a = connects[0]) == null ? void 0 : _a.children[index];
          attr(toggle, "role", "tab");
          if (!item) {
            continue;
          }
          toggle.id = generateId(this, toggle, `-tab-${index}`);
          item.id = generateId(this, item, `-tabpanel-${index}`);
          attr(toggle, "aria-controls", item.id);
          attr(item, { role: "tabpanel", "aria-labelledby": toggle.id });
        }
        attr($el, "aria-orientation", matches($el, selVertical) ? "vertical" : null);
      },
      methods: {
        index() {
          return findIndex(children, (el) => hasClass(el, cls));
        },
        show(item) {
          const toggles = toggles.filter((el) => !matches(el, selDisabled));
          const prev = index();
          const next = getIndex(
            !isNode(item) || includes(toggles, item) ? item : 0,
            toggles,
            getIndex(toggles[prev], toggles)
          );
          const active = getIndex(toggles[next], toggles);
          children.forEach((child, i) => {
            toggleClass(child, cls, active === i);
            attr(toggles[i], {
              "aria-selected": active === i,
              tabindex: active === i ? null : -1
            });
          });
          const animate = prev >= 0 && prev !== next;
          connects.forEach(async ({ children: children2 }) => {
            await toggleElement(
              toNodes(children2).filter((child) => hasClass(child, cls)),
              false,
              animate
            );
            await toggleElement(children2[active], true, animate);
          });
        }
      }
    };

    var tab = {
      mixins: [Class],
      extends: Switcher,
      props: {
        media: Boolean
      },
      data: {
        media: 960,
        attrItem: "uk-tab-item",
        selVertical: ".uk-tab-left,.uk-tab-right"
      },
      connected() {
        const cls = hasClass($el, "uk-tab-left") ? "uk-tab-left" : hasClass($el, "uk-tab-right") ? "uk-tab-right" : false;
        if (cls) {
          $create("toggle", $el, { cls, mode: "media", media: media });
        }
      }
    };

    const KEY_SPACE = 32;
    var toggle = {
      mixins: [Media, Togglable],
      args: "target",
      props: {
        href: String,
        target: null,
        mode: "list",
        queued: Boolean
      },
      data: {
        href: false,
        target: false,
        mode: "click",
        queued: true
      },
      computed: {
        target({ href, target }, $el) {
          target = queryAll(target || href, $el);
          return target.length && target || [$el];
        }
      },
      connected() {
        if (!includes(mode, "media")) {
          if (!isFocusable($el)) {
            attr($el, "tabindex", "0");
          }
          if (!cls && isTag($el, "a")) {
            attr($el, "role", "button");
          }
        }
      },
      observe: lazyload({ target: ({ target }) => target }),
      events: [
        {
          name: pointerDown$1,
          filter() {
            return includes(mode, "hover");
          },
          handler(e) {
            _preventClick = null;
            if (!isTouch(e) || _showState || $el.disabled) {
              return;
            }
            trigger($el, "focus");
            once(
              document,
              pointerDown$1,
              () => trigger($el, "blur"),
              true,
              (e2) => !within(e2.target, $el)
            );
            if (includes(mode, "click")) {
              _preventClick = true;
            }
          }
        },
        {
          name: `${pointerEnter} ${pointerLeave} focus blur`,
          filter() {
            return includes(mode, "hover");
          },
          handler(e) {
            if (isTouch(e) || $el.disabled) {
              return;
            }
            const show = includes([pointerEnter, "focus"], e.type);
            const expanded = isToggled(target);
            if (!show && (e.type === pointerLeave && matches($el, ":focus") || e.type === "blur" && matches($el, ":hover"))) {
              return;
            }
            if (_showState && show && expanded !== _showState) {
              if (!show) {
                _showState = null;
              }
              return;
            }
            _showState = show ? expanded : null;
            toggle(`toggle${show ? "show" : "hide"}`);
          }
        },
        {
          name: "keydown",
          filter() {
            return includes(mode, "click") && !isTag($el, "input");
          },
          handler(e) {
            if (e.keyCode === KEY_SPACE) {
              e.preventDefault();
              $el.click();
            }
          }
        },
        {
          name: "click",
          filter() {
            return ["click", "hover"].some((mode) => includes(mode, mode));
          },
          handler(e) {
            let link;
            if (_preventClick || closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, "a[href]")) && (!isToggled(target) || link.hash && matches(target, link.hash))) {
              e.preventDefault();
            }
            if (!_preventClick && includes(mode, "click")) {
              toggle();
            }
          }
        },
        {
          name: "mediachange",
          filter() {
            return includes(mode, "media");
          },
          el() {
            return target;
          },
          handler(e, mediaObj) {
            if (mediaObj.matches ^ isToggled(target)) {
              toggle();
            }
          }
        }
      ],
      methods: {
        async toggle(type) {
          if (!trigger(target, type || "toggle", [this])) {
            return;
          }
          if (hasAttr($el, "aria-expanded")) {
            attr($el, "aria-expanded", !isToggled(target));
          }
          if (!queued) {
            return toggleElement(target);
          }
          const leaving = target.filter((el) => hasClass(el, clsLeave));
          if (leaving.length) {
            for (const el of target) {
              const isLeaving = includes(leaving, el);
              toggleElement(el, isLeaving, isLeaving);
            }
            return;
          }
          const toggled = target.filter(isToggled);
          await toggleElement(toggled, false);
          await toggleElement(
            target.filter((el) => !includes(toggled, el)),
            true
          );
        }
      }
    };

    var components$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Accordion: Accordion,
        Alert: alert,
        Close: Close,
        Cover: cover,
        Drop: drop,
        DropParentIcon: IconComponent,
        Dropdown: drop,
        Dropnav: Dropnav,
        FormCustom: formCustom,
        Grid: grid,
        HeightMatch: heightMatch,
        HeightViewport: heightViewport,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Margin: Margin,
        Marker: Marker,
        Modal: modal,
        Nav: nav,
        NavParentIcon: NavParentIcon,
        Navbar: navbar,
        NavbarParentIcon: IconComponent,
        NavbarToggleIcon: NavbarToggleIcon,
        Offcanvas: offcanvas,
        OverflowAuto: overflowAuto,
        OverlayIcon: IconComponent,
        PaginationNext: PaginationNext,
        PaginationPrevious: PaginationPrevious,
        Responsive: responsive,
        Scroll: scroll,
        Scrollspy: scrollspy,
        ScrollspyNav: scrollspyNav,
        SearchIcon: Search,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        Spinner: Spinner,
        Sticky: sticky,
        Svg: SVG,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Totop: Totop,
        Video: Video
    });

    each(components$1, (component, name) => App.component(name, component));
    boot(App);

    const units = ["days", "hours", "minutes", "seconds"];
    var countdown = {
      mixins: [Class],
      props: {
        date: String,
        clsWrapper: String,
        role: String
      },
      data: {
        date: "",
        clsWrapper: ".uk-countdown-%unit%",
        role: "timer"
      },
      connected() {
        attr($el, "role", role);
        date = toFloat(Date.parse($props.date));
        end = false;
        start();
      },
      disconnected() {
        stop();
      },
      events: {
        name: "visibilitychange",
        el() {
          return document;
        },
        handler() {
          if (document.hidden) {
            stop();
          } else {
            start();
          }
        }
      },
      methods: {
        start() {
          stop();
          update();
          if (!timer) {
            trigger($el, "countdownstart");
            timer = setInterval(update, 1e3);
          }
        },
        stop() {
          if (timer) {
            clearInterval(timer);
            trigger($el, "countdownstop");
            timer = null;
          }
        },
        update() {
          const timespan = getTimeSpan(date);
          if (!timespan.total) {
            stop();
            if (!end) {
              trigger($el, "countdownend");
              end = true;
            }
          }
          for (const unit of units) {
            const el = $(clsWrapper.replace("%unit%", unit), $el);
            if (!el) {
              continue;
            }
            let digits = String(Math.trunc(timespan[unit]));
            digits = digits.length < 2 ? `0${digits}` : digits;
            if (el.textContent !== digits) {
              digits = digits.split("");
              if (digits.length !== el.children.length) {
                html(el, digits.map(() => "<span></span>").join(""));
              }
              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        }
      }
    };
    function getTimeSpan(date) {
      const total = Math.max(0, date - Date.now()) / 1e3;
      return {
        total,
        seconds: total % 60,
        minutes: total / 60 % 60,
        hours: total / 60 / 60 % 24,
        days: total / 60 / 60 / 24
      };
    }

    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger = 0) {
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };
      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();
      const leaveFn = wrapIndexFn(async () => {
        addClass(target, clsLeave);
        await Promise.all(
          getTransitionNodes(target).map(
            (child, i) => new Promise(
              (resolve) => setTimeout(
                () => Transition.start(child, propsOut, duration / 2, "ease").then(
                  resolve
                ),
                i * stagger
              )
            )
          )
        );
        removeClass(target, clsLeave);
      });
      const enterFn = wrapIndexFn(async () => {
        const oldHeight = height(target);
        addClass(target, clsEnter);
        action();
        css(children(target), { opacity: 0 });
        await awaitFrame$1();
        const nodes = children(target);
        const newHeight = height(target);
        css(target, "alignContent", "flex-start");
        height(target, oldHeight);
        const transitionNodes = getTransitionNodes(target);
        css(nodes, propsOut);
        const transitions = transitionNodes.map(async (child, i) => {
          await awaitTimeout(i * stagger);
          await Transition.start(child, propsIn, duration / 2, "ease");
        });
        if (oldHeight !== newHeight) {
          transitions.push(
            Transition.start(
              target,
              { height: newHeight },
              duration / 2 + transitionNodes.length * stagger,
              "ease"
            )
          );
        }
        await Promise.all(transitions).then(() => {
          removeClass(target, clsEnter);
          if (index === transitionIndex(target)) {
            css(target, { height: "", alignContent: "" });
            css(nodes, { opacity: "" });
            delete target.dataset.transition;
          }
        });
      });
      return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }
      return toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
      return Promise.all(
        children(target).filter(Transition.inProgress).map(
          (el) => new Promise((resolve) => once(el, "transitionend transitioncanceled", resolve))
        )
      );
    }
    function getTransitionNodes(target) {
      return getRows(children(target)).reduce(
        (nodes, row) => nodes.concat(
          sortBy$1(
            row.filter((el) => isInView(el)),
            "offsetLeft"
          )
        ),
        []
      );
    }
    function awaitFrame$1() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    function awaitTimeout(timeout) {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    async function slide(action, target, duration) {
      await awaitFrame();
      let nodes = children(target);
      const currentProps = nodes.map((el) => getProps(el, true));
      const targetProps = { ...css(target, ["height", "padding"]), display: "block" };
      await Promise.all(nodes.concat(target).map(Transition.cancel));
      action();
      nodes = nodes.concat(children(target).filter((el) => !includes(nodes, el)));
      await Promise.resolve();
      fastdom.flush();
      const targetStyle = attr(target, "style");
      const targetPropsTo = css(target, ["height", "padding"]);
      const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
      const attrsTo = nodes.map((el) => ({ style: attr(el, "style") }));
      nodes.forEach((el, i) => propsFrom[i] && css(el, propsFrom[i]));
      css(target, targetProps);
      trigger(target, "scroll");
      fastdom.flush();
      await awaitFrame();
      const transitions = nodes.map((el, i) => parent(el) === target && Transition.start(el, propsTo[i], duration, "ease")).concat(Transition.start(target, targetPropsTo, duration, "ease"));
      try {
        await Promise.all(transitions);
        nodes.forEach((el, i) => {
          attr(el, attrsTo[i]);
          if (parent(el) === target) {
            css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
          }
        });
        attr(target, "style", targetStyle);
      } catch (e) {
        attr(nodes, "style", "");
        resetProps(target, targetProps);
      }
    }
    function getProps(el, opacity) {
      const zIndex = css(el, "zIndex");
      return isVisible(el) ? {
        display: "",
        opacity: opacity ? css(el, "opacity") : "0",
        pointerEvents: "none",
        position: "absolute",
        zIndex: zIndex === "auto" ? index(el) : zIndex,
        ...getPositionWithMargin(el)
      } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map(
        (el, i) => parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : { opacity: 0 } : { opacity: isVisible(el) ? 1 : 0 } : false
      );
      const propsFrom = propsTo.map((props, i) => {
        const from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
        if (!from) {
          return false;
        }
        if (!props) {
          delete from.opacity;
        } else if (!("opacity" in props)) {
          const { opacity } = from;
          if (opacity % 1) {
            props.opacity = 1;
          } else {
            delete from.opacity;
          }
        }
        return from;
      });
      return [propsTo, propsFrom];
    }
    function resetProps(el, props) {
      for (const prop in props) {
        css(el, prop, "");
      }
    }
    function getPositionWithMargin(el) {
      const { height, width } = offset(el);
      return {
        height,
        width,
        transform: "",
        ...position(el),
        ...css(el, ["marginTop", "marginLeft"])
      };
    }
    function awaitFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean
      },
      data: {
        duration: 150,
        animation: "slide"
      },
      methods: {
        animate(action, target = $el) {
          const name = animation;
          const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
            action();
            return Promise.resolve();
          };
          return animationFn(action, target, duration).catch(noop);
        }
      }
    };

    var filter = {
      mixins: [Animate],
      args: "target",
      props: {
        target: Boolean,
        selActive: Boolean
      },
      data: {
        target: null,
        selActive: false,
        attrItem: "uk-filter-control",
        cls: "uk-active",
        duration: 250
      },
      computed: {
        toggles: {
          get({ attrItem }, $el) {
            return $$(`[${attrItem}],[data-${attrItem}]`, $el);
          },
          watch(toggles) {
            updateState();
            const actives = $$(selActive, $el);
            for (const toggle of toggles) {
              if (selActive !== false) {
                toggleClass(toggle, cls, includes(actives, toggle));
              }
              const button = findButton(toggle);
              if (isTag(button, "a")) {
                attr(button, "role", "button");
              }
            }
          },
          immediate: true
        },
        children: {
          get({ target }, $el) {
            return $$(`${target} > *`, $el);
          },
          watch(list, prev) {
            if (prev) {
              updateState();
            }
          },
          immediate: true
        }
      },
      events: {
        name: "click keydown",
        delegate() {
          return `[${attrItem}],[data-${attrItem}]`;
        },
        handler(e) {
          if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
            return;
          }
          if (closest(e.target, "a,button")) {
            e.preventDefault();
            apply(e.current);
          }
        }
      },
      methods: {
        apply(el) {
          const prevState = getState();
          const newState = mergeState(el, attrItem, getState());
          if (!isEqualState(prevState, newState)) {
            setState(newState);
          }
        },
        getState() {
          return toggles.filter((item) => hasClass(item, cls)).reduce((state, el) => mergeState(el, attrItem, state), {
            filter: { "": "" },
            sort: []
          });
        },
        async setState(state, animate = true) {
          state = { filter: { "": "" }, sort: [], ...state };
          trigger($el, "beforeFilter", [this, state]);
          for (const toggle of toggles) {
            toggleClass(toggle, cls, matchFilter(toggle, attrItem, state));
          }
          await Promise.all(
            $$(target, $el).map((target) => {
              const filterFn = () => {
                applyState(state, target, children(target));
                $update($el);
              };
              return animate ? animate(filterFn, target) : filterFn();
            })
          );
          trigger($el, "afterFilter", [this]);
        },
        updateState() {
          fastdom.write(() => setState(getState(), false));
        }
      }
    };
    function getFilter(el, attr2) {
      return parseOptions(data(el, attr2), ["filter"]);
    }
    function isEqualState(stateA, stateB) {
      return ["filter", "sort"].every((prop) => isEqual(stateA[prop], stateB[prop]));
    }
    function applyState(state, target, children) {
      const selector = getSelector(state);
      children.forEach((el) => css(el, "display", selector && !matches(el, selector) ? "none" : ""));
      const [sort, order] = state.sort;
      if (sort) {
        const sorted = sortItems(children, sort, order);
        if (!isEqual(sorted, children)) {
          append(target, sorted);
        }
      }
    }
    function mergeState(el, attr2, state) {
      const { filter, group, sort, order = "asc" } = getFilter(el, attr2);
      if (filter || isUndefined(sort)) {
        if (group) {
          if (filter) {
            delete state.filter[""];
            state.filter[group] = filter;
          } else {
            delete state.filter[group];
            if (isEmpty(state.filter) || "" in state.filter) {
              state.filter = { "": filter || "" };
            }
          }
        } else {
          state.filter = { "": filter || "" };
        }
      }
      if (!isUndefined(sort)) {
        state.sort = [sort, order];
      }
      return state;
    }
    function matchFilter(el, attr2, { filter: stateFilter = { "": "" }, sort: [stateSort, stateOrder] }) {
      const { filter = "", group = "", sort, order = "asc" } = getFilter(el, attr2);
      return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function getSelector({ filter }) {
      let selector = "";
      each(filter, (value) => selector += value || "");
      return selector;
    }
    function sortItems(nodes, sort, order) {
      return [...nodes].sort(
        (a, b) => data(a, sort).localeCompare(data(b, sort), void 0, { numeric: true }) * (order === "asc" || -1)
      );
    }
    function findButton(el) {
      return $("a,button", el) || el;
    }

    var Animations$2 = {
      slide: {
        show(dir) {
          return [{ transform: translate(dir * -100) }, { transform: translate() }];
        },
        percent(current) {
          return translated(current);
        },
        translate(percent, dir) {
          return [
            { transform: translate(dir * -100 * percent) },
            { transform: translate(dir * 100 * (1 - percent)) }
          ];
        }
      }
    };
    function translated(el) {
      return Math.abs(css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
    }
    function translate(value = 0, unit = "%") {
      value += value ? unit : "";
      return `translate3d(${value}, 0, 0)`;
    }
    function scale3d(value) {
      return `scale3d(${value}, ${value}, 1)`;
    }

    var Animations$1 = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0 }, { opacity: 1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent }, { opacity: percent }];
        }
      },
      scale: {
        show() {
          return [
            { opacity: 0, transform: scale3d(1 - 0.2) },
            { opacity: 1, transform: scale3d(1) }
          ];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
            { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) }
          ];
        }
      }
    };

    function Transitioner$1(prev, next, dir, { animation, easing }) {
      const { percent, translate, show = noop } = animation;
      const props = show(dir);
      const deferred = new Deferred();
      return {
        dir,
        show(duration, percent2 = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * clamp(percent2, -1, 1));
          translate(percent2);
          triggerUpdate$1(next, "itemin", { percent: percent2, duration, timing, dir });
          triggerUpdate$1(prev, "itemout", { percent: 1 - percent2, duration, timing, dir });
          Promise.all([
            Transition.start(next, props[1], duration, timing),
            Transition.start(prev, props[0], duration, timing)
          ]).then(() => {
            reset();
            deferred.resolve();
          }, noop);
          return deferred.promise;
        },
        cancel() {
          Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            css([next, prev], prop, "");
          }
        },
        forward(duration, percent2 = percent()) {
          Transition.cancel([next, prev]);
          return show(duration, percent2, true);
        },
        translate(percent2) {
          reset();
          const props2 = translate(percent2, dir);
          css(next, props2[1]);
          css(prev, props2[0]);
          triggerUpdate$1(next, "itemtranslatein", { percent: percent2, dir });
          triggerUpdate$1(prev, "itemtranslateout", { percent: 1 - percent2, dir });
        },
        percent() {
          return percent(prev || next, next, dir);
        },
        getDistance() {
          return prev == null ? void 0 : prev.offsetWidth;
        }
      };
    }
    function triggerUpdate$1(el, type, data) {
      trigger(el, createEvent(type, false, false, data));
    }

    var SliderNav = {
      i18n: {
        next: "Next slide",
        previous: "Previous slide",
        slideX: "Slide %s",
        slideLabel: "%s of %s"
      },
      data: {
        selNav: false
      },
      computed: {
        nav: {
          get({ selNav }, $el) {
            return $(selNav, $el);
          },
          watch(nav, prev) {
            attr(nav, "role", "tablist");
            if (prev) {
              $emit();
            }
          },
          immediate: true
        },
        selNavItem({ attrItem }) {
          return `[${attrItem}],[data-${attrItem}]`;
        },
        navItems: {
          get(_, $el) {
            return $$(selNavItem, $el);
          },
          watch() {
            $emit();
          }
        }
      },
      connected() {
        attr($el, "aria-roledescription", "carousel");
      },
      update: [
        {
          write() {
            slides.forEach(
              (slide, i) => attr(slide, {
                role: nav ? "tabpanel" : "group",
                "aria-label": t("slideLabel", i + 1, length),
                "aria-roledescription": nav ? null : "slide"
              })
            );
            if (nav && length !== nav.children.length) {
              html(
                nav,
                slides.map((_, i) => `<li ${attrItem}="${i}"><a href></a></li>`).join("")
              );
            }
            attr(children(nav).concat(list), "role", "presentation");
            for (const el of navItems) {
              const cmd = data(el, attrItem);
              const button = $("a,button", el) || el;
              let ariaLabel;
              let ariaControls = null;
              if (isNumeric(cmd)) {
                const item = toNumber(cmd);
                const slide = slides[item];
                if (slide) {
                  if (!slide.id) {
                    slide.id = generateId(this, slide, `-item-${cmd}`);
                  }
                  ariaControls = slide.id;
                }
                ariaLabel = t("slideX", toFloat(cmd) + 1);
                attr(button, "role", "tab");
              } else {
                if (list) {
                  if (!list.id) {
                    list.id = generateId(this, list, "-items");
                  }
                  ariaControls = list.id;
                }
                ariaLabel = t(cmd);
              }
              attr(button, {
                "aria-controls": ariaControls,
                "aria-label": attr(button, "aria-label") || ariaLabel
              });
            }
          }
        },
        {
          write() {
            navItems.concat(nav).forEach((el) => el && (el.hidden = !maxIndex));
            updateNav();
          },
          events: ["resize"]
        }
      ],
      events: [
        {
          name: "click keydown",
          delegate() {
            return selNavItem;
          },
          handler(e) {
            if (closest(e.target, "a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              show(data(e.current, attrItem));
            }
          }
        },
        {
          name: "itemshow",
          handler: "updateNav"
        },
        {
          name: "keydown",
          delegate() {
            return selNavItem;
          },
          handler(e) {
            const { current, keyCode } = e;
            const cmd = data(current, attrItem);
            if (!isNumeric(cmd)) {
              return;
            }
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT ? "previous" : keyCode === keyMap.RIGHT ? "next" : -1;
            if (~i) {
              e.preventDefault();
              show(i);
            }
          }
        }
      ],
      methods: {
        updateNav() {
          const index = getValidIndex();
          let focus;
          let focusEl;
          for (const el of navItems) {
            const cmd = data(el, attrItem);
            const button = $("a,button", el) || el;
            if (isNumeric(cmd)) {
              const item = toNumber(cmd);
              const active = item === index;
              toggleClass(el, clsActive, active);
              attr(button, {
                "aria-selected": active,
                tabindex: active ? null : -1
              });
              if (active) {
                focusEl = button;
              }
              focus = focus || matches(button, ":focus");
            } else {
              toggleClass(
                el,
                "uk-invisible",
                finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= maxIndex)
              );
            }
            if (focus && focusEl) {
              focusEl.focus();
            }
          }
        }
      }
    };

    const pointerOptions = { passive: false, capture: true };
    const pointerUpOptions = { passive: true, capture: true };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    var SliderDrag = {
      props: {
        draggable: Boolean
      },
      data: {
        draggable: true,
        threshold: 10
      },
      created() {
        for (const key of ["start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            const pos = getEventPos(e).x * (isRtl ? -1 : 1);
            prevPos = pos === pos ? prevPos : pos;
            pos = pos;
            fn(e);
          };
        }
      },
      events: [
        {
          name: pointerDown,
          passive: true,
          delegate() {
            return `${selList} > *`;
          },
          handler(e) {
            if (!draggable || !isTouch(e) && hasSelectableText(e.target) || closest(e.target, selInput) || e.button > 0 || length < 2) {
              return;
            }
            start(e);
          }
        },
        {
          name: "dragstart",
          handler(e) {
            e.preventDefault();
          }
        },
        {
          // iOS workaround for slider stopping if swiping fast
          name: pointerMove,
          el() {
            return list;
          },
          handler: noop,
          ...pointerOptions
        }
      ],
      methods: {
        start() {
          drag = pos;
          if (_transitioner) {
            percent = _transitioner.percent();
            drag += _transitioner.getDistance() * percent * dir;
            _transitioner.cancel();
            _transitioner.translate(percent);
            dragging = true;
            stack = [];
          } else {
            prevIndex = index;
          }
          on(document, pointerMove, move, pointerOptions);
          on(document, pointerUp, end, pointerUpOptions);
          css(list, "userSelect", "none");
        },
        move(e) {
          const distance = pos - drag;
          if (distance === 0 || prevPos === pos || !dragging && Math.abs(distance) < threshold) {
            return;
          }
          css(list, "pointerEvents", "none");
          e.cancelable && e.preventDefault();
          dragging = true;
          dir = distance < 0 ? 1 : -1;
          const { slides } = this;
          let { prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = getIndex(prevIndex + dir, prevIndex);
          let width = _getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
          while (nextIndex !== prevIndex && dis > width) {
            drag -= width * dir;
            prevIndex = nextIndex;
            dis -= width;
            nextIndex = getIndex(prevIndex + dir, prevIndex);
            width = _getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
          }
          percent = dis / width;
          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = index !== nextIndex;
          const edge = prevIndex === nextIndex;
          let itemShown;
          [index, prevIndex].filter((i) => !includes([nextIndex, prevIndex], i)).forEach((i) => {
            trigger(slides[i], "itemhidden", [this]);
            if (edge) {
              itemShown = true;
              prevIndex = prevIndex;
            }
          });
          if (index === prevIndex && prevIndex !== prevIndex || itemShown) {
            trigger(slides[index], "itemshown", [this]);
          }
          if (changed) {
            prevIndex = prevIndex;
            index = nextIndex;
            !edge && trigger(prev, "beforeitemhide", [this]);
            trigger(next, "beforeitemshow", [this]);
          }
          _transitioner = _translate(Math.abs(percent), prev, !edge && next);
          if (changed) {
            !edge && trigger(prev, "itemhide", [this]);
            trigger(next, "itemshow", [this]);
          }
        },
        end() {
          off(document, pointerMove, move, pointerOptions);
          off(document, pointerUp, end, pointerUpOptions);
          if (dragging) {
            dragging = null;
            if (index === prevIndex) {
              percent = 1 - percent;
              dir *= -1;
              _show(false, index, true);
              _transitioner = null;
            } else {
              const dirChange = (isRtl ? dir * (isRtl ? 1 : -1) : dir) < 0 === prevPos > pos;
              index = dirChange ? index : prevIndex;
              if (dirChange) {
                percent = 1 - percent;
              }
              show(
                dir > 0 && !dirChange || dir < 0 && dirChange ? "next" : "previous",
                true
              );
            }
          }
          css(list, { userSelect: "", pointerEvents: "" });
          drag = percent = null;
        }
      }
    };
    function hasSelectableText(el) {
      return css(el, "userSelect") !== "none" && toNodes(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
    }

    var SliderAutoplay = {
      props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean
      },
      data: {
        autoplay: false,
        autoplayInterval: 7e3,
        pauseOnHover: true
      },
      connected() {
        attr(list, "aria-live", "polite");
        autoplay && startAutoplay();
      },
      disconnected() {
        stopAutoplay();
      },
      update() {
        attr(slides, "tabindex", "-1");
      },
      events: [
        {
          name: "visibilitychange",
          el() {
            return document;
          },
          filter() {
            return autoplay;
          },
          handler() {
            if (document.hidden) {
              stopAutoplay();
            } else {
              startAutoplay();
            }
          }
        },
        {
          name: `${pointerEnter} focusin`,
          filter() {
            return autoplay;
          },
          handler: "stopAutoplay"
        },
        {
          name: `${pointerLeave} focusout`,
          filter() {
            return autoplay;
          },
          handler: "startAutoplay"
        }
      ],
      methods: {
        startAutoplay() {
          if (draggable && matches($el, ":focus-within") || pauseOnHover && matches($el, ":hover")) {
            return;
          }
          stopAutoplay();
          interval = setInterval(
            () => !stack.length && show("next"),
            autoplayInterval
          );
          attr(list, "aria-live", "off");
        },
        stopAutoplay() {
          clearInterval(interval);
          attr(list, "aria-live", "polite");
        }
      }
    };

    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
      props: {
        clsActivated: Boolean,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number
      },
      data: () => ({
        easing: "ease",
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: "uk-active",
        clsActivated: false,
        Transitioner: false,
        transitionOptions: {}
      }),
      connected() {
        prevIndex = -1;
        index = getValidIndex($props.index);
        stack = [];
      },
      disconnected() {
        removeClass(slides, clsActive);
      },
      computed: {
        duration({ velocity }, $el) {
          return speedUp($el.offsetWidth / velocity);
        },
        list({ selList }, $el) {
          return $(selList, $el);
        },
        maxIndex() {
          return length - 1;
        },
        slides: {
          get() {
            return children(list);
          },
          watch() {
            $emit();
          }
        },
        length() {
          return slides.length;
        }
      },
      observe: resize(),
      methods: {
        show(index, force = false) {
          var _a;
          if (dragging || !length) {
            return;
          }
          const { stack } = this;
          const queueIndex = force ? 0 : stack.length;
          const reset = () => {
            stack.splice(queueIndex, 1);
            if (stack.length) {
              show(stack.shift(), true);
            }
          };
          stack[force ? "unshift" : "push"](index);
          if (!force && stack.length > 1) {
            if (stack.length === 2) {
              (_a = _transitioner) == null ? void 0 : _a.forward(Math.min(duration, 200));
            }
            return;
          }
          const prevIndex = getIndex(index);
          const prev = hasClass(slides, clsActive) && slides[prevIndex];
          const nextIndex = getIndex(index, index);
          const next = slides[nextIndex];
          if (prev === next) {
            reset();
            return;
          }
          dir = getDirection(index, prevIndex);
          prevIndex = prevIndex;
          index = nextIndex;
          if (prev && !trigger(prev, "beforeitemhide", [this]) || !trigger(next, "beforeitemshow", [this, prev])) {
            index = prevIndex;
            reset();
            return;
          }
          const promise = _show(prev, next, force).then(() => {
            prev && trigger(prev, "itemhidden", [this]);
            trigger(next, "itemshown", [this]);
            stack.shift();
            _transitioner = null;
            requestAnimationFrame(() => stack.length && show(stack.shift(), true));
          });
          prev && trigger(prev, "itemhide", [this]);
          trigger(next, "itemshow", [this]);
          return promise;
        },
        getIndex(index = index, prev = index) {
          return clamp(
            getIndex(index, slides, prev, finite),
            0,
            Math.max(0, maxIndex)
          );
        },
        getValidIndex(index = index, prevIndex = prevIndex) {
          return getIndex(index, prevIndex);
        },
        _show(prev, next, force) {
          _transitioner = _getTransitioner(prev, next, dir, {
            easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : easing,
            ...transitionOptions
          });
          if (!force && !prev) {
            _translate(1);
            return Promise.resolve();
          }
          const { length } = stack;
          return _transitioner[length > 1 ? "forward" : "show"](
            length > 1 ? Math.min(duration, 75 + 75 / (length - 1)) : duration,
            percent
          );
        },
        _getDistance(prev, next) {
          return _getTransitioner(prev, prev !== next && next).getDistance();
        },
        _translate(percent, prev = prevIndex, next = index) {
          const transitioner = _getTransitioner(prev === next ? false : prev, next);
          transitioner.translate(percent);
          return transitioner;
        },
        _getTransitioner(prev = prevIndex, next = index, dir = dir || 1, options = transitionOptions) {
          return new Transitioner(
            isNumber(prev) ? slides[prev] : prev,
            isNumber(next) ? slides[next] : next,
            dir * (isRtl ? -1 : 1),
            options
          );
        }
      }
    };
    function getDirection(index, prevIndex) {
      return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
      return 0.5 * x + 300;
    }

    var Slideshow = {
      mixins: [Slider],
      props: {
        animation: String
      },
      data: {
        animation: "slide",
        clsActivated: "uk-transition-active",
        Animations: Animations$2,
        Transitioner: Transitioner$1
      },
      computed: {
        animation({ animation, Animations: Animations2 }) {
          return { ...Animations2[animation] || Animations2.slide, name: animation };
        },
        transitionOptions() {
          return { animation: animation };
        }
      },
      events: {
        beforeitemshow({ target }) {
          addClass(target, clsActive);
        },
        itemshown({ target }) {
          addClass(target, clsActivated);
        },
        itemhidden({ target }) {
          removeClass(target, clsActive, clsActivated);
        }
      }
    };

    var LightboxPanel = {
      mixins: [Modal, Slideshow],
      functional: true,
      props: {
        delayControls: Number,
        preload: Number,
        videoAutoplay: Boolean,
        template: String
      },
      data: () => ({
        preload: 1,
        videoAutoplay: false,
        delayControls: 3e3,
        items: [],
        cls: "uk-open",
        clsPage: "uk-lightbox-page",
        selList: ".uk-lightbox-items",
        attrItem: "uk-lightbox-item",
        selClose: ".uk-close-large",
        selCaption: ".uk-lightbox-caption",
        pauseOnHover: false,
        velocity: 2,
        Animations: Animations$1,
        template: `<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
      }),
      created() {
        const $el = $(template);
        const list = $(selList, $el);
        items.forEach(() => append(list, "<li>"));
        const close = $("[uk-close]", $el);
        const closeLabel = t("close");
        if (close && closeLabel) {
          close.dataset.i18n = JSON.stringify({ label: closeLabel });
        }
        $mount(append(container, $el));
      },
      computed: {
        caption({ selCaption }, $el) {
          return $(selCaption, $el);
        }
      },
      events: [
        {
          name: `${pointerMove$1} ${pointerDown$1} keydown`,
          handler: "showControls"
        },
        {
          name: "click",
          self: true,
          delegate() {
            return `${selList} > *`;
          },
          handler(e) {
            if (!e.defaultPrevented) {
              hide();
            }
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            showControls();
          }
        },
        {
          name: "hide",
          self: true,
          handler() {
            hideControls();
            removeClass(slides, clsActive);
            Transition.stop(slides);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            $destroy(true);
          }
        },
        {
          name: "keyup",
          el() {
            return document;
          },
          handler({ keyCode }) {
            if (!isToggled($el) || !draggable) {
              return;
            }
            let i = -1;
            if (keyCode === keyMap.LEFT) {
              i = "previous";
            } else if (keyCode === keyMap.RIGHT) {
              i = "next";
            } else if (keyCode === keyMap.HOME) {
              i = 0;
            } else if (keyCode === keyMap.END) {
              i = "last";
            }
            if (~i) {
              show(i);
            }
          }
        },
        {
          name: "beforeitemshow",
          handler(e) {
            if (isToggled()) {
              return;
            }
            draggable = false;
            e.preventDefault();
            toggleElement($el, true, false);
            animation = Animations$1["scale"];
            removeClass(e.target, clsActive);
            stack.splice(1, 0, index);
          }
        },
        {
          name: "itemshow",
          handler() {
            html(caption, getItem().caption || "");
            for (let j = -preload; j <= preload; j++) {
              loadItem(index + j);
            }
          }
        },
        {
          name: "itemshown",
          handler() {
            draggable = $props.draggable;
          }
        },
        {
          name: "itemload",
          async handler(_, item) {
            const { source: src, type, alt = "", poster, attrs = {} } = item;
            setItem(item, "<span uk-spinner></span>");
            if (!src) {
              return;
            }
            let matches;
            const iframeAttrs = {
              allowfullscreen: "",
              style: "max-width: 100%; box-sizing: border-box;",
              "uk-responsive": "",
              "uk-video": `${videoAutoplay}`
            };
            if (type === "image" || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
              const img = createEl("img", { src, alt, ...attrs });
              on(img, "load", () => setItem(item, img));
              on(img, "error", () => setError(item));
            } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
              const video = createEl("video", {
                src,
                poster,
                controls: "",
                playsinline: "",
                "uk-video": `${videoAutoplay}`,
                ...attrs
              });
              on(video, "loadedmetadata", () => setItem(item, video));
              on(video, "error", () => setError(item));
            } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
              setItem(
                item,
                createEl("iframe", {
                  src,
                  allowfullscreen: "",
                  class: "uk-lightbox-iframe",
                  ...attrs
                })
              );
            } else if (matches = src.match(
              /\/\/(?:.*?youtube(-nocookie)?\..*?(?:[?&]v=|\/shorts\/)|youtu\.be\/)([\w-]{11})[&?]?(.*)?/
            )) {
              setItem(
                item,
                createEl("iframe", {
                  src: `https://www.youtube${matches[1] || ""}.com/embed/${matches[2]}${matches[3] ? `?${matches[3]}` : ""}`,
                  width: 1920,
                  height: 1080,
                  ...iframeAttrs,
                  ...attrs
                })
              );
            } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
              try {
                const { height, width } = await (await fetch(
                  `https://vimeo.com/api/oembed.json?maxwidth=1920&url=${encodeURI(
                src
              )}`,
                  { credentials: "omit" }
                )).json();
                setItem(
                  item,
                  createEl("iframe", {
                    src: `https://player.vimeo.com/video/${matches[1]}${matches[2] ? `?${matches[2]}` : ""}`,
                    width,
                    height,
                    ...iframeAttrs,
                    ...attrs
                  })
                );
              } catch (e) {
                setError(item);
              }
            }
          }
        }
      ],
      methods: {
        loadItem(index = index) {
          const item = getItem(index);
          if (!getSlide(item).childElementCount) {
            trigger($el, "itemload", [item]);
          }
        },
        getItem(index = index) {
          return items[getIndex(index, slides)];
        },
        setItem(item, content) {
          trigger($el, "itemloaded", [this, html(getSlide(item), content)]);
        },
        getSlide(item) {
          return slides[items.indexOf(item)];
        },
        setError(item) {
          setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
        },
        showControls() {
          clearTimeout(controlsTimer);
          controlsTimer = setTimeout(hideControls, delayControls);
          addClass($el, "uk-active", "uk-transition-active");
        },
        hideControls() {
          removeClass($el, "uk-active", "uk-transition-active");
        }
      }
    };
    function createEl(tag, attrs) {
      const el = fragment(`<${tag}>`);
      attr(el, attrs);
      return el;
    }

    var lightbox = {
      install: install$1,
      props: { toggle: String },
      data: { toggle: "a" },
      computed: {
        toggles: {
          get({ toggle }, $el) {
            return $$(toggle, $el);
          },
          watch(toggles) {
            hide();
            for (const toggle of toggles) {
              if (isTag(toggle, "a")) {
                attr(toggle, "role", "button");
              }
            }
          },
          immediate: true
        }
      },
      disconnected() {
        hide();
      },
      events: {
        name: "click",
        delegate() {
          return `${toggle}:not(.uk-disabled)`;
        },
        handler(e) {
          e.preventDefault();
          show(e.current);
        }
      },
      methods: {
        show(index) {
          const items = uniqueBy(toggles.map(toItem), "source");
          if (isElement(index)) {
            const { source } = toItem(index);
            index = findIndex(items, ({ source: src }) => source === src);
          }
          panel = panel || $create("lightboxPanel", { ...$props, items });
          on(panel.$el, "hidden", () => panel = null);
          return panel.show(index);
        },
        hide() {
          var _a;
          return (_a = panel) == null ? void 0 : _a.hide();
        }
      }
    };
    function install$1(UIkit, Lightbox) {
      if (!UIkit.lightboxPanel) {
        UIkit.component("lightboxPanel", LightboxPanel);
      }
      assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
    }
    function toItem(el) {
      const item = {};
      for (const attr2 of ["href", "caption", "type", "poster", "alt", "attrs"]) {
        item[attr2 === "href" ? "source" : attr2] = data(el, attr2);
      }
      item.attrs = parseOptions(item.attrs);
      return item;
    }

    var notification = {
      mixins: [Container],
      functional: true,
      args: ["message", "status"],
      data: {
        message: "",
        status: "",
        timeout: 5e3,
        group: null,
        pos: "top-center",
        clsContainer: "uk-notification",
        clsClose: "uk-notification-close",
        clsMsg: "uk-notification-message"
      },
      install,
      computed: {
        marginProp({ pos }) {
          return `margin${startsWith(pos, "top") ? "Top" : "Bottom"}`;
        },
        startProps() {
          return { opacity: 0, [marginProp]: -$el.offsetHeight };
        }
      },
      created() {
        const container = $(`.${clsContainer}-${pos}`, container) || append(
          container,
          `<div class="${clsContainer} ${clsContainer}-${pos}" style="display: block"></div>`
        );
        $mount(
          append(
            container,
            `<div class="${clsMsg}${status ? ` ${clsMsg}-${status}` : ""}" role="alert"> <a href class="${clsClose}" data-uk-close></a> <div>${message}</div> </div>`
          )
        );
      },
      async connected() {
        const margin = toFloat(css($el, marginProp));
        await Transition.start(css($el, startProps), {
          opacity: 1,
          [marginProp]: margin
        });
        if (timeout) {
          timer = setTimeout(close, timeout);
        }
      },
      events: {
        click(e) {
          if (closest(e.target, 'a[href="#"],a[href=""]')) {
            e.preventDefault();
          }
          close();
        },
        [pointerEnter]() {
          if (timer) {
            clearTimeout(timer);
          }
        },
        [pointerLeave]() {
          if (timeout) {
            timer = setTimeout(close, timeout);
          }
        }
      },
      methods: {
        async close(immediate) {
          const removeFn = (el) => {
            const container = parent(el);
            trigger(el, "close", [this]);
            remove$1(el);
            if (!(container == null ? void 0 : container.hasChildNodes())) {
              remove$1(container);
            }
          };
          if (timer) {
            clearTimeout(timer);
          }
          if (!immediate) {
            await Transition.start($el, startProps);
          }
          removeFn($el);
        }
      }
    };
    function install(UIkit) {
      UIkit.notification.closeAll = function(group, immediate) {
        apply(document.body, (el) => {
          const notification = UIkit.getComponent(el, "notification");
          if (notification && (!group || group === notification.group)) {
            notification.close(immediate);
          }
        });
      };
    }

    const props = {
      x: transformFn,
      y: transformFn,
      rotate: transformFn,
      scale: transformFn,
      color: colorFn,
      backgroundColor: colorFn,
      borderColor: colorFn,
      blur: filterFn,
      hue: filterFn,
      fopacity: filterFn,
      grayscale: filterFn,
      invert: filterFn,
      saturate: filterFn,
      sepia: filterFn,
      opacity: cssPropFn,
      stroke: strokeFn,
      bgx: backgroundFn,
      bgy: backgroundFn
    };
    const { keys } = Object;
    var Parallax = {
      mixins: [Media],
      props: fillObject(keys(props), "list"),
      data: fillObject(keys(props), void 0),
      computed: {
        props(properties, $el) {
          const stops = {};
          for (const prop in properties) {
            if (prop in props && !isUndefined(properties[prop])) {
              stops[prop] = properties[prop].slice();
            }
          }
          const result = {};
          for (const prop in stops) {
            result[prop] = props[prop](prop, $el, stops[prop], stops);
          }
          return result;
        }
      },
      events: {
        load() {
          $emit();
        }
      },
      methods: {
        reset() {
          for (const prop in getCss(0)) {
            css($el, prop, "");
          }
        },
        getCss(percent) {
          const css2 = { transform: "", filter: "" };
          for (const prop in props) {
            props[prop](css2, percent);
          }
          css2.willChange = Object.keys(css2).filter((key) => css2[key] !== "").join(",");
          return css2;
        }
      }
    };
    function transformFn(prop, el, stops) {
      let unit = getUnit(stops) || { x: "px", y: "px", rotate: "deg" }[prop] || "";
      let transformFn2;
      if (prop === "x" || prop === "y") {
        prop = `translate${ucfirst(prop)}`;
        transformFn2 = (stop) => toFloat(toFloat(stop).toFixed(unit === "px" ? 0 : 6));
      } else if (prop === "scale") {
        unit = "";
        transformFn2 = (stop) => getUnit([stop]) ? toPx(stop, "width", el, true) / el.offsetWidth : stop;
      }
      if (stops.length === 1) {
        stops.unshift(prop === "scale" ? 1 : 0);
      }
      stops = parseStops(stops, transformFn2);
      return (css2, percent) => {
        css2.transform += ` ${prop}(${getValue(stops, percent)}${unit})`;
      };
    }
    function colorFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops, (stop) => parseColor(el, stop));
      return (css2, percent) => {
        const [start, end, p] = getStop(stops, percent);
        const value = start.map((value2, i) => {
          value2 += p * (end[i] - value2);
          return i === 3 ? toFloat(value2) : parseInt(value2, 10);
        }).join(",");
        css2[prop] = `rgba(${value})`;
      };
    }
    function parseColor(el, color) {
      return getCssValue(el, "color", color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
    }
    function filterFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops) || { blur: "px", hue: "deg" }[prop] || "%";
      prop = { fopacity: "opacity", hue: "hue-rotate" }[prop] || prop;
      stops = parseStops(stops);
      return (css2, percent) => {
        const value = getValue(stops, percent);
        css2.filter += ` ${prop}(${value + unit})`;
      };
    }
    function cssPropFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops);
      return (css2, percent) => {
        css2[prop] = getValue(stops, percent);
      };
    }
    function strokeFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops);
      const length = getMaxPathLength(el);
      stops = parseStops(stops.reverse(), (stop) => {
        stop = toFloat(stop);
        return unit === "%" ? stop * length / 100 : stop;
      });
      if (!stops.some(([value]) => value)) {
        return noop;
      }
      css(el, "strokeDasharray", length);
      return (css2, percent) => {
        css2.strokeDashoffset = getValue(stops, percent);
      };
    }
    function backgroundFn(prop, el, stops, props2) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const attr = prop === "bgy" ? "height" : "width";
      props2[prop] = parseStops(stops, (stop) => toPx(stop, attr, el));
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      if (bgProps.length === 2 && prop === "bgx") {
        return noop;
      }
      if (getCssValue(el, "backgroundSize", "") === "cover") {
        return backgroundCoverFn(prop, el, stops, props2);
      }
      const positions = {};
      for (const prop2 of bgProps) {
        positions[prop2] = getBackgroundPos(el, prop2);
      }
      return setBackgroundPosFn(bgProps, positions, props2);
    }
    function backgroundCoverFn(prop, el, stops, props2) {
      const dimImage = getBackgroundImageDimensions(el);
      if (!dimImage.width) {
        return noop;
      }
      const dimEl = {
        width: el.offsetWidth,
        height: el.offsetHeight
      };
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      const positions = {};
      for (const prop2 of bgProps) {
        const values = props2[prop2].map(([value]) => value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const down = values.indexOf(min) < values.indexOf(max);
        const diff = max - min;
        positions[prop2] = `${(down ? -diff : 0) - (down ? min : max)}px`;
        dimEl[prop2 === "bgy" ? "height" : "width"] += diff;
      }
      const dim = Dimensions.cover(dimImage, dimEl);
      for (const prop2 of bgProps) {
        const attr = prop2 === "bgy" ? "height" : "width";
        const overflow = dim[attr] - dimEl[attr];
        positions[prop2] = `max(${getBackgroundPos(el, prop2)},-${overflow}px) + ${positions[prop2]}`;
      }
      const fn = setBackgroundPosFn(bgProps, positions, props2);
      return (css2, percent) => {
        fn(css2, percent);
        css2.backgroundSize = `${dim.width}px ${dim.height}px`;
        css2.backgroundRepeat = "no-repeat";
      };
    }
    function getBackgroundPos(el, prop) {
      return getCssValue(el, `background-position-${prop.substr(-1)}`, "");
    }
    function setBackgroundPosFn(bgProps, positions, props2) {
      return function(css2, percent) {
        for (const prop of bgProps) {
          const value = getValue(props2[prop], percent);
          css2[`background-position-${prop.substr(-1)}`] = `calc(${positions[prop]} + ${value}px)`;
        }
      };
    }
    const dimensions = {};
    function getBackgroundImageDimensions(el) {
      const src = css(el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
      if (dimensions[src]) {
        return dimensions[src];
      }
      const image = new Image();
      if (src) {
        image.src = src;
        if (!image.naturalWidth) {
          image.onload = () => {
            dimensions[src] = toDimensions(image);
            trigger(el, createEvent("load", false));
          };
          return toDimensions(image);
        }
      }
      return dimensions[src] = toDimensions(image);
    }
    function toDimensions(image) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight
      };
    }
    function parseStops(stops, fn = toFloat) {
      const result = [];
      const { length } = stops;
      let nullIndex = 0;
      for (let i = 0; i < length; i++) {
        let [value, percent] = isString(stops[i]) ? stops[i].trim().split(" ") : [stops[i]];
        value = fn(value);
        percent = percent ? toFloat(percent) / 100 : null;
        if (i === 0) {
          if (percent === null) {
            percent = 0;
          } else if (percent) {
            result.push([value, 0]);
          }
        } else if (i === length - 1) {
          if (percent === null) {
            percent = 1;
          } else if (percent !== 1) {
            result.push([value, percent]);
            percent = 1;
          }
        }
        result.push([value, percent]);
        if (percent === null) {
          nullIndex++;
        } else if (nullIndex) {
          const leftPercent = result[i - nullIndex - 1][1];
          const p = (percent - leftPercent) / (nullIndex + 1);
          for (let j = nullIndex; j > 0; j--) {
            result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
          }
          nullIndex = 0;
        }
      }
      return result;
    }
    function getStop(stops, percent) {
      const index = findIndex(stops.slice(1), ([, targetPercent]) => percent <= targetPercent) + 1;
      return [
        stops[index - 1][0],
        stops[index][0],
        (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])
      ];
    }
    function getValue(stops, percent) {
      const [start, end, p] = getStop(stops, percent);
      return isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
    }
    const unitRe = /^-?\d+(\S+)?/;
    function getUnit(stops, defaultUnit) {
      var _a;
      for (const stop of stops) {
        const match = (_a = stop.match) == null ? void 0 : _a.call(stop, unitRe);
        if (match) {
          return match[1];
        }
      }
      return defaultUnit;
    }
    function getCssValue(el, prop, value) {
      const prev = el.style[prop];
      const val = css(css(el, prop, value), prop);
      el.style[prop] = prev;
      return val;
    }
    function fillObject(keys2, value) {
      return keys2.reduce((data, prop) => {
        data[prop] = value;
        return data;
      }, {});
    }

    var parallax = {
      mixins: [Parallax],
      props: {
        target: String,
        viewport: Number,
        // Deprecated
        easing: Number,
        start: String,
        end: String
      },
      data: {
        target: false,
        viewport: 1,
        easing: 1,
        start: 0,
        end: 0
      },
      computed: {
        target({ target }, $el) {
          return getOffsetElement(target && query(target, $el) || $el);
        },
        start({ start }) {
          return toPx(start, "height", target, true);
        },
        end({ end, viewport }) {
          return toPx(
            end || (viewport = (1 - viewport) * 100) && `${viewport}vh+${viewport}%`,
            "height",
            target,
            true
          );
        }
      },
      observe: [
        resize({
          target: ({ $el, target }) => [$el, target]
        }),
        scroll$1()
      ],
      update: {
        read({ percent }, types) {
          if (!types.has("scroll")) {
            percent = false;
          }
          if (!isVisible($el)) {
            return false;
          }
          if (!matchMedia) {
            return;
          }
          const prev = percent;
          percent = ease(scrolledOver(target, start, end), easing);
          return {
            percent,
            style: prev === percent ? false : getCss(percent)
          };
        },
        write({ style }) {
          if (!matchMedia) {
            reset();
            return;
          }
          style && css($el, style);
        },
        events: ["scroll", "resize"]
      }
    };
    function ease(percent, easing) {
      return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, 1 - easing);
    }
    function getOffsetElement(el) {
      return el ? "offsetTop" in el ? el : getOffsetElement(parent(el)) : document.documentElement;
    }

    var SliderReactive = {
      update: {
        write() {
          if (stack.length || dragging) {
            return;
          }
          const index = getValidIndex(index);
          if (!~prevIndex || index !== index) {
            show(index);
          } else {
            _translate(1, prevIndex, index);
          }
        },
        events: ["resize"]
      }
    };

    var SliderPreload = {
      observe: lazyload({
        target: ({ slides }) => slides,
        targets: (instance) => instance.getAdjacentSlides()
      })
    };

    function Transitioner(prev, next, dir, { center, easing, list }) {
      const deferred = new Deferred();
      const from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions$1(next).width * dir;
      const to = next ? getLeft(next, list, center) : from + dimensions$1(prev).width * dir * (isRtl ? -1 : 1);
      return {
        dir,
        show(duration, percent = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * clamp(percent, -1, 1));
          translate(percent);
          percent = prev ? percent : clamp(percent, 0, 1);
          triggerUpdate(getItemIn(), "itemin", { percent, duration, timing, dir });
          prev && triggerUpdate(getItemIn(true), "itemout", {
            percent: 1 - percent,
            duration,
            timing,
            dir
          });
          Transition.start(
            list,
            { transform: translate(-to * (isRtl ? -1 : 1), "px") },
            duration,
            timing
          ).then(deferred.resolve, noop);
          return deferred.promise;
        },
        cancel() {
          Transition.cancel(list);
        },
        reset() {
          css(list, "transform", "");
        },
        forward(duration, percent = percent()) {
          Transition.cancel(list);
          return show(duration, percent, true);
        },
        translate(percent) {
          const distance = getDistance() * dir * (isRtl ? -1 : 1);
          css(
            list,
            "transform",
            translate(
              clamp(
                -to + (distance - distance * percent),
                -getWidth(list),
                dimensions$1(list).width
              ) * (isRtl ? -1 : 1),
              "px"
            )
          );
          const actives = getActives();
          const itemIn = getItemIn();
          const itemOut = getItemIn(true);
          percent = prev ? clamp(percent, -1, 1) : 0;
          for (const slide of children(list)) {
            const isActive = includes(actives, slide);
            const isIn = slide === itemIn;
            const isOut = slide === itemOut;
            const translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
            triggerUpdate(slide, `itemtranslate${translateIn ? "in" : "out"}`, {
              dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
            });
          }
        },
        percent() {
          return Math.abs(
            (css(list, "transform").split(",")[4] * (isRtl ? -1 : 1) + from) / (to - from)
          );
        },
        getDistance() {
          return Math.abs(to - from);
        },
        getItemIn(out = false) {
          let actives = getActives();
          let nextActives = inView(list, getLeft(next || prev, list, center));
          if (out) {
            const temp = actives;
            actives = nextActives;
            nextActives = temp;
          }
          return nextActives[findIndex(nextActives, (el) => !includes(actives, el))];
        },
        getActives() {
          return inView(list, getLeft(prev || next, list, center));
        }
      };
    }
    function getLeft(el, list, center) {
      const left = getElLeft(el, list);
      return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }
    function getMax(list) {
      return Math.max(0, getWidth(list) - dimensions$1(list).width);
    }
    function getWidth(list) {
      return sumBy(children(list), (el) => dimensions$1(el).width);
    }
    function centerEl(el, list) {
      return dimensions$1(list).width / 2 - dimensions$1(el).width / 2;
    }
    function getElLeft(el, list) {
      return el && (position(el).left + (isRtl ? dimensions$1(el).width - dimensions$1(list).width : 0)) * (isRtl ? -1 : 1) || 0;
    }
    function inView(list, listLeft) {
      listLeft -= 1;
      const listWidth = dimensions$1(list).width;
      const listRight = listLeft + listWidth + 2;
      return children(list).filter((slide) => {
        const slideLeft = getElLeft(slide, list);
        const slideRight = slideLeft + Math.min(dimensions$1(slide).width, listWidth);
        return slideLeft >= listLeft && slideRight <= listRight;
      });
    }
    function triggerUpdate(el, type, data) {
      trigger(el, createEvent(type, false, false, data));
    }

    var slider = {
      mixins: [Class, Slider, SliderReactive, SliderPreload],
      props: {
        center: Boolean,
        sets: Boolean
      },
      data: {
        center: false,
        sets: false,
        attrItem: "uk-slider-item",
        selList: ".uk-slider-items",
        selNav: ".uk-slider-nav",
        clsContainer: "uk-slider-container",
        Transitioner
      },
      computed: {
        avgWidth() {
          return getWidth(list) / length;
        },
        finite({ finite }) {
          return finite || isFinite(list, center);
        },
        maxIndex() {
          if (!finite || center && !sets) {
            return length - 1;
          }
          if (center) {
            return last(sets);
          }
          let lft = 0;
          const max = getMax(list);
          const index = findIndex(slides, (el) => {
            if (lft >= max) {
              return true;
            }
            lft += dimensions$1(el).width;
          });
          return ~index ? index : length - 1;
        },
        sets({ sets: enabled }) {
          if (!enabled) {
            return;
          }
          let left = 0;
          const sets = [];
          const width = dimensions$1(list).width;
          for (let i = 0; i < length; i++) {
            const slideWidth = dimensions$1(slides[i]).width;
            if (left + slideWidth > width) {
              left = 0;
            }
            if (center) {
              if (left < width / 2 && left + slideWidth + dimensions$1(slides[+i + 1]).width / 2 > width / 2) {
                sets.push(+i);
                left = width / 2 - slideWidth / 2;
              }
            } else if (left === 0) {
              sets.push(Math.min(+i, maxIndex));
            }
            left += slideWidth;
          }
          if (sets.length) {
            return sets;
          }
        },
        transitionOptions() {
          return {
            center: center,
            list: list
          };
        },
        slides() {
          return children(list).filter(isVisible);
        }
      },
      connected() {
        toggleClass($el, clsContainer, !$(`.${clsContainer}`, $el));
      },
      observe: resize({
        target: ({ slides }) => slides
      }),
      update: {
        write() {
          for (const el of navItems) {
            const index = toNumber(data(el, attrItem));
            if (index !== false) {
              el.hidden = !maxIndex || index > maxIndex || sets && !includes(sets, index);
            }
          }
          if (length && !dragging && !stack.length) {
            reorder();
            _translate(1);
          }
          updateActiveClasses();
        },
        events: ["resize"]
      },
      events: {
        beforeitemshow(e) {
          if (!dragging && sets && stack.length < 2 && !includes(sets, index)) {
            index = getValidIndex();
          }
          const diff = Math.abs(
            index - prevIndex + (dir > 0 && index < prevIndex || dir < 0 && index > prevIndex ? (maxIndex + 1) * dir : 0)
          );
          if (!dragging && diff > 1) {
            for (let i = 0; i < diff; i++) {
              stack.splice(1, 0, dir > 0 ? "next" : "previous");
            }
            e.preventDefault();
            return;
          }
          const index = dir < 0 || !slides[prevIndex] ? index : prevIndex;
          duration = speedUp(avgWidth / velocity) * (dimensions$1(slides[index]).width / avgWidth);
          reorder();
        },
        itemshow() {
          if (~prevIndex) {
            addClass(_getTransitioner().getItemIn(), clsActive);
          }
        },
        itemshown() {
          updateActiveClasses();
        }
      },
      methods: {
        reorder() {
          if (finite) {
            css(slides, "order", "");
            return;
          }
          const index = dir > 0 && slides[prevIndex] ? prevIndex : index;
          slides.forEach(
            (slide, i) => css(
              slide,
              "order",
              dir > 0 && i < index ? 1 : dir < 0 && i >= index ? -1 : ""
            )
          );
          if (!center) {
            return;
          }
          const next = slides[index];
          let width = dimensions$1(list).width / 2 - dimensions$1(next).width / 2;
          let j = 0;
          while (width > 0) {
            const slideIndex = getIndex(--j + index, index);
            const slide = slides[slideIndex];
            css(slide, "order", slideIndex > index ? -2 : -1);
            width -= dimensions$1(slide).width;
          }
        },
        updateActiveClasses() {
          const actives = _getTransitioner(index).getActives();
          const activeClasses = [
            clsActive,
            (!sets || includes(sets, toFloat(index))) && clsActivated || ""
          ];
          for (const slide of slides) {
            const active = includes(actives, slide);
            toggleClass(slide, activeClasses, active);
            attr(slide, "aria-hidden", !active);
            attr($$(selFocusable, slide), "tabindex", active ? null : -1);
          }
        },
        getValidIndex(index = index, prevIndex = prevIndex) {
          index = getIndex(index, prevIndex);
          if (!sets) {
            return index;
          }
          let prev;
          do {
            if (includes(sets, index)) {
              return index;
            }
            prev = index;
            index = getIndex(index + dir, prevIndex);
          } while (index !== prev);
          return index;
        },
        getAdjacentSlides() {
          const { width } = dimensions$1(list);
          const left = -width;
          const right = width * 2;
          const slideWidth = dimensions$1(slides[index]).width;
          const slideLeft = center ? width / 2 - slideWidth / 2 : 0;
          const slides = /* @__PURE__ */ new Set();
          for (const i of [-1, 1]) {
            let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
            let j = 0;
            do {
              const slide = slides[getIndex(index + i + j++ * i)];
              currentLeft += dimensions$1(slide).width * i;
              slides.add(slide);
            } while (length > j && currentLeft > left && currentLeft < right);
          }
          return Array.from(slides);
        }
      }
    };
    function isFinite(list, center) {
      if (!list || list.length < 2) {
        return true;
      }
      const { width: listWidth } = dimensions$1(list);
      if (!center) {
        return Math.ceil(getWidth(list)) < Math.trunc(listWidth + getMaxElWidth(list));
      }
      const slides = children(list);
      const listHalf = Math.trunc(listWidth / 2);
      for (const index in slides) {
        const slide = slides[index];
        const slideWidth = dimensions$1(slide).width;
        const slidesInView = /* @__PURE__ */ new Set([slide]);
        let diff = 0;
        for (const i of [-1, 1]) {
          let left = slideWidth / 2;
          let j = 0;
          while (left < listHalf) {
            const nextSlide = slides[getIndex(+index + i + j++ * i, slides)];
            if (slidesInView.has(nextSlide)) {
              return true;
            }
            left += dimensions$1(nextSlide).width;
            slidesInView.add(nextSlide);
          }
          diff = Math.max(
            diff,
            slideWidth / 2 + dimensions$1(slides[getIndex(+index + i, slides)]).width / 2 - (left - listHalf)
          );
        }
        if (diff > sumBy(
          slides.filter((slide2) => !slidesInView.has(slide2)),
          (slide2) => dimensions$1(slide2).width
        )) {
          return true;
        }
      }
      return false;
    }
    function getMaxElWidth(list) {
      return Math.max(0, ...children(list).map((el) => dimensions$1(el).width));
    }

    var sliderParallax = {
      mixins: [Parallax],
      data: {
        selItem: "!li"
      },
      beforeConnect() {
        item = query(selItem, $el);
      },
      disconnected() {
        item = null;
      },
      events: [
        {
          name: "itemin itemout",
          self: true,
          el() {
            return item;
          },
          handler({ type, detail: { percent, duration, timing, dir } }) {
            fastdom.read(() => {
              if (!matchMedia) {
                return;
              }
              const propsFrom = getCss(getCurrentPercent(type, dir, percent));
              const propsTo = getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
              fastdom.write(() => {
                css($el, propsFrom);
                Transition.start($el, propsTo, duration, timing).catch(noop);
              });
            });
          }
        },
        {
          name: "transitioncanceled transitionend",
          self: true,
          el() {
            return item;
          },
          handler() {
            Transition.cancel($el);
          }
        },
        {
          name: "itemtranslatein itemtranslateout",
          self: true,
          el() {
            return item;
          },
          handler({ type, detail: { percent, dir } }) {
            fastdom.read(() => {
              if (!matchMedia) {
                reset();
                return;
              }
              const props = getCss(getCurrentPercent(type, dir, percent));
              fastdom.write(() => css($el, props));
            });
          }
        }
      ]
    };
    function isIn(type) {
      return endsWith(type, "in");
    }
    function getCurrentPercent(type, dir, percent) {
      percent /= 2;
      return isIn(type) ^ dir < 0 ? percent : 1 - percent;
    }

    var Animations = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
        }
      },
      scale: {
        show() {
          return [{ opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 + 0.5 * percent), zIndex: 0 },
            { zIndex: -1 }
          ];
        }
      },
      pull: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ] : [
            { transform: translate(-100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ];
        },
        percent(current, next, dir) {
          return dir < 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(30 * percent), zIndex: -1 },
            { transform: translate(-100 * (1 - percent)), zIndex: 0 }
          ] : [
            { transform: translate(-percent * 100), zIndex: 0 },
            { transform: translate(30 * (1 - percent)), zIndex: -1 }
          ];
        }
      },
      push: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ] : [
            { transform: translate(-30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ];
        },
        percent(current, next, dir) {
          return dir > 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(percent * 100), zIndex: 0 },
            { transform: translate(-30 * (1 - percent)), zIndex: -1 }
          ] : [
            { transform: translate(-30 * percent), zIndex: -1 },
            { transform: translate(100 * (1 - percent)), zIndex: 0 }
          ];
        }
      }
    };

    var slideshow = {
      mixins: [Class, Slideshow, SliderReactive, SliderPreload],
      props: {
        ratio: String,
        minHeight: Number,
        maxHeight: Number
      },
      data: {
        ratio: "16:9",
        minHeight: false,
        maxHeight: false,
        selList: ".uk-slideshow-items",
        attrItem: "uk-slideshow-item",
        selNav: ".uk-slideshow-nav",
        Animations
      },
      update: {
        read() {
          if (!list) {
            return false;
          }
          let [width, height] = ratio.split(":").map(Number);
          height = height * list.offsetWidth / width || 0;
          if (minHeight) {
            height = Math.max(minHeight, height);
          }
          if (maxHeight) {
            height = Math.min(maxHeight, height);
          }
          return { height: height - boxModelAdjust(list, "height", "content-box") };
        },
        write({ height }) {
          height > 0 && css(list, "minHeight", height);
        },
        events: ["resize"]
      },
      methods: {
        getAdjacentSlides() {
          return [1, -1].map((i) => slides[getIndex(index + i)]);
        }
      }
    };

    var sortable = {
      mixins: [Class, Animate],
      props: {
        group: String,
        threshold: Number,
        clsItem: String,
        clsPlaceholder: String,
        clsDrag: String,
        clsDragState: String,
        clsBase: String,
        clsNoDrag: String,
        clsEmpty: String,
        clsCustom: String,
        handle: String
      },
      data: {
        group: false,
        threshold: 5,
        clsItem: "uk-sortable-item",
        clsPlaceholder: "uk-sortable-placeholder",
        clsDrag: "uk-sortable-drag",
        clsDragState: "uk-drag",
        clsBase: "uk-sortable",
        clsNoDrag: "uk-sortable-nodrag",
        clsEmpty: "uk-sortable-empty",
        clsCustom: "",
        handle: false,
        pos: {}
      },
      created() {
        for (const key of ["init", "start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            assign(pos, getEventPos(e));
            fn(e);
          };
        }
      },
      events: {
        name: pointerDown$1,
        passive: false,
        handler: "init"
      },
      computed: {
        target() {
          return ($el.tBodies || [$el])[0];
        },
        items() {
          return children(target);
        },
        isEmpty: {
          get() {
            return isEmpty(items);
          },
          watch(empty) {
            toggleClass(target, clsEmpty, empty);
          },
          immediate: true
        },
        handles: {
          get({ handle }, el) {
            return handle ? $$(handle, el) : items;
          },
          watch(handles, prev) {
            css(prev, { touchAction: "", userSelect: "" });
            css(handles, { touchAction: hasTouch ? "none" : "", userSelect: "none" });
          },
          immediate: true
        }
      },
      update: {
        write(data) {
          if (!drag || !parent(placeholder)) {
            return;
          }
          const {
            pos: { x, y },
            origin: { offsetTop, offsetLeft },
            placeholder
          } = this;
          css(drag, {
            top: y - offsetTop,
            left: x - offsetLeft
          });
          const sortable = getSortable(document.elementFromPoint(x, y));
          if (!sortable) {
            return;
          }
          const { items } = sortable;
          if (items.some(Transition.inProgress)) {
            return;
          }
          const target = findTarget(items, { x, y });
          if (items.length && (!target || target === placeholder)) {
            return;
          }
          const previous = getSortable(placeholder);
          const insertTarget = findInsertTarget(
            sortable.target,
            target,
            placeholder,
            x,
            y,
            sortable === previous && data.moved !== target
          );
          if (insertTarget === false) {
            return;
          }
          if (insertTarget && placeholder === insertTarget) {
            return;
          }
          if (sortable !== previous) {
            previous.remove(placeholder);
            data.moved = target;
          } else {
            delete data.moved;
          }
          sortable.insert(placeholder, insertTarget);
          touched.add(sortable);
        },
        events: ["move"]
      },
      methods: {
        init(e) {
          const { target, button, defaultPrevented } = e;
          const [placeholder] = items.filter((el) => within(target, el));
          if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, `.${clsNoDrag}`) || handle && !within(target, handle)) {
            return;
          }
          e.preventDefault();
          touched = /* @__PURE__ */ new Set([this]);
          placeholder = placeholder;
          origin = { target, index: index(placeholder), ...pos };
          on(document, pointerMove$1, move);
          on(document, pointerUp$1, end);
          if (!threshold) {
            start(e);
          }
        },
        start(e) {
          drag = appendDrag($container, placeholder);
          const { left, top } = placeholder.getBoundingClientRect();
          assign(origin, { offsetLeft: pos.x - left, offsetTop: pos.y - top });
          addClass(drag, clsDrag, clsCustom);
          addClass(placeholder, clsPlaceholder);
          addClass(items, clsItem);
          addClass(document.documentElement, clsDragState);
          trigger($el, "start", [this, placeholder]);
          trackScroll(pos);
          move(e);
        },
        move(e) {
          if (drag) {
            $emit("move");
          } else if (Math.abs(pos.x - origin.x) > threshold || Math.abs(pos.y - origin.y) > threshold) {
            start(e);
          }
        },
        end() {
          off(document, pointerMove$1, move);
          off(document, pointerUp$1, end);
          if (!drag) {
            return;
          }
          untrackScroll();
          const sortable = getSortable(placeholder);
          if (this === sortable) {
            if (origin.index !== index(placeholder)) {
              trigger($el, "moved", [this, placeholder]);
            }
          } else {
            trigger(sortable.$el, "added", [sortable, placeholder]);
            trigger($el, "removed", [this, placeholder]);
          }
          trigger($el, "stop", [this, placeholder]);
          remove$1(drag);
          drag = null;
          for (const { clsPlaceholder, clsItem } of touched) {
            for (const sortable2 of touched) {
              removeClass(sortable2.items, clsPlaceholder, clsItem);
            }
          }
          touched = null;
          removeClass(document.documentElement, clsDragState);
        },
        insert(element, target) {
          addClass(items, clsItem);
          const insert = () => target ? before(target, element) : append(target, element);
          animate(insert);
        },
        remove(element) {
          if (!within(element, target)) {
            return;
          }
          animate(() => remove$1(element));
        },
        getSortable(element) {
          do {
            const sortable = $getComponent(element, "sortable");
            if (sortable && (sortable === this || group !== false && sortable.group === group)) {
              return sortable;
            }
          } while (element = parent(element));
        }
      }
    };
    let trackTimer;
    function trackScroll(pos) {
      let last = Date.now();
      trackTimer = setInterval(() => {
        let { x, y } = pos;
        y += document.scrollingElement.scrollTop;
        const dist = (Date.now() - last) * 0.3;
        last = Date.now();
        scrollParents(document.elementFromPoint(x, pos.y)).reverse().some((scrollEl) => {
          let { scrollTop: scroll, scrollHeight } = scrollEl;
          const { top, bottom, height: height2 } = offsetViewport(scrollEl);
          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }
          if (scroll > 0 && scroll < scrollHeight - height2) {
            scrollEl.scrollTop = scroll;
            return true;
          }
        });
      }, 15);
    }
    function untrackScroll() {
      clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
      let clone;
      if (isTag(element, "li", "tr")) {
        clone = $("<div>");
        append(clone, element.cloneNode(true).children);
        for (const attribute of element.getAttributeNames()) {
          attr(clone, attribute, element.getAttribute(attribute));
        }
      } else {
        clone = element.cloneNode(true);
      }
      append(container, clone);
      css(clone, "margin", "0", "important");
      css(clone, {
        boxSizing: "border-box",
        width: element.offsetWidth,
        height: element.offsetHeight,
        padding: css(element, "padding")
      });
      height(clone.firstElementChild, height(element.firstElementChild));
      return clone;
    }
    function findTarget(items, point) {
      return items[findIndex(items, (item) => pointInRect(point, item.getBoundingClientRect()))];
    }
    function findInsertTarget(list, target, placeholder, x, y, sameList) {
      if (!children(list).length) {
        return;
      }
      const rect = target.getBoundingClientRect();
      if (!sameList) {
        if (!isHorizontal(list, placeholder)) {
          return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
        }
        return target;
      }
      const placeholderRect = placeholder.getBoundingClientRect();
      const sameRow = linesIntersect(
        [rect.top, rect.bottom],
        [placeholderRect.top, placeholderRect.bottom]
      );
      const [pointerPos, lengthProp, startProp, endProp] = sameRow ? [x, "width", "left", "right"] : [y, "height", "top", "bottom"];
      const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
      if (placeholderRect[startProp] < rect[startProp]) {
        if (diff && pointerPos < rect[startProp] + diff) {
          return false;
        }
        return target.nextElementSibling;
      }
      if (diff && pointerPos > rect[endProp] - diff) {
        return false;
      }
      return target;
    }
    function isHorizontal(list, placeholder) {
      const single = children(list).length === 1;
      if (single) {
        append(list, placeholder);
      }
      const items = children(list);
      const isHorizontal2 = items.some((el, i) => {
        const rectA = el.getBoundingClientRect();
        return items.slice(i + 1).some((el2) => {
          const rectB = el2.getBoundingClientRect();
          return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
        });
      });
      if (single) {
        remove$1(placeholder);
      }
      return isHorizontal2;
    }
    function linesIntersect(lineA, lineB) {
      return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }

    var tooltip = {
      mixins: [Container, Togglable, Position],
      args: "title",
      props: {
        delay: Number,
        title: String
      },
      data: {
        pos: "top",
        title: "",
        delay: 0,
        animation: ["uk-animation-scale-up"],
        duration: 100,
        cls: "uk-active"
      },
      beforeConnect() {
        id = generateId(this);
        _hasTitle = hasAttr($el, "title");
        attr($el, {
          title: "",
          "aria-describedby": id
        });
        makeFocusable($el);
      },
      disconnected() {
        hide();
        if (!attr($el, "title")) {
          attr($el, "title", _hasTitle ? title : null);
        }
      },
      methods: {
        show() {
          if (isToggled(tooltip || null) || !title) {
            return;
          }
          clearTimeout(showTimer);
          showTimer = setTimeout(_show, delay);
        },
        async hide() {
          if (matches($el, "input:focus")) {
            return;
          }
          clearTimeout(showTimer);
          if (!isToggled(tooltip || null)) {
            return;
          }
          await toggleElement(tooltip, false, false);
          remove$1(tooltip);
          tooltip = null;
        },
        _show() {
          tooltip = append(
            container,
            `<div id="${id}" class="uk-${$options.name}" role="tooltip"> <div class="uk-${$options.name}-inner">${title}</div> </div>`
          );
          on(tooltip, "toggled", (e, toggled) => {
            if (!toggled) {
              return;
            }
            const update = () => positionAt(tooltip, $el);
            update();
            const [dir, align] = getAlignment(tooltip, $el, pos);
            origin = axis === "y" ? `${flipPosition(dir)}-${align}` : `${align}-${flipPosition(dir)}`;
            const handlers = [
              once(
                document,
                `keydown ${pointerDown$1}`,
                hide,
                false,
                (e2) => e2.type === pointerDown$1 && !within(e2.target, $el) || e2.type === "keydown" && e2.keyCode === keyMap.ESC
              ),
              on([document, ...overflowParents($el)], "scroll", update, {
                passive: true
              })
            ];
            once(tooltip, "hide", () => handlers.forEach((handler) => handler()), {
              self: true
            });
          });
          toggleElement(tooltip, true);
        }
      },
      events: {
        focus: "show",
        blur: "hide",
        [`${pointerEnter} ${pointerLeave}`](e) {
          if (!isTouch(e)) {
            this[e.type === pointerEnter ? "show" : "hide"]();
          }
        },
        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        [pointerDown$1](e) {
          if (isTouch(e)) {
            show();
          }
        }
      }
    };
    function makeFocusable(el) {
      if (!isFocusable(el)) {
        attr(el, "tabindex", "0");
      }
    }
    function getAlignment(el, target, [dir, align]) {
      const elOffset = offset(el);
      const targetOffset = offset(target);
      const properties = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      for (const props2 of properties) {
        if (elOffset[props2[0]] >= targetOffset[props2[1]]) {
          dir = props2[1];
          break;
        }
        if (elOffset[props2[1]] <= targetOffset[props2[0]]) {
          dir = props2[0];
          break;
        }
      }
      const props = includes(properties[0], dir) ? properties[1] : properties[0];
      if (elOffset[props[0]] === targetOffset[props[0]]) {
        align = props[0];
      } else if (elOffset[props[1]] === targetOffset[props[1]]) {
        align = props[1];
      } else {
        align = "center";
      }
      return [dir, align];
    }

    var upload = {
      mixins: [I18n],
      i18n: {
        invalidMime: "Invalid File Type: %s",
        invalidName: "Invalid File Name: %s",
        invalidSize: "Invalid File Size: %s Kilobytes Max"
      },
      props: {
        allow: String,
        clsDragover: String,
        concurrent: Number,
        maxSize: Number,
        method: String,
        mime: String,
        multiple: Boolean,
        name: String,
        params: Object,
        type: String,
        url: String
      },
      data: {
        allow: false,
        clsDragover: "uk-dragover",
        concurrent: 1,
        maxSize: 0,
        method: "POST",
        mime: false,
        multiple: false,
        name: "files[]",
        params: {},
        type: "",
        url: "",
        abort: noop,
        beforeAll: noop,
        beforeSend: noop,
        complete: noop,
        completeAll: noop,
        error: noop,
        fail: noop,
        load: noop,
        loadEnd: noop,
        loadStart: noop,
        progress: noop
      },
      events: {
        change(e) {
          if (!matches(e.target, 'input[type="file"]')) {
            return;
          }
          e.preventDefault();
          if (e.target.files) {
            upload(e.target.files);
          }
          e.target.value = "";
        },
        drop(e) {
          stop(e);
          const transfer = e.dataTransfer;
          if (!(transfer == null ? void 0 : transfer.files)) {
            return;
          }
          removeClass($el, clsDragover);
          upload(transfer.files);
        },
        dragenter(e) {
          stop(e);
        },
        dragover(e) {
          stop(e);
          addClass($el, clsDragover);
        },
        dragleave(e) {
          stop(e);
          removeClass($el, clsDragover);
        }
      },
      methods: {
        async upload(files) {
          files = toArray(files);
          if (!files.length) {
            return;
          }
          trigger($el, "upload", [files]);
          for (const file of files) {
            if (maxSize && maxSize * 1e3 < file.size) {
              fail(t("invalidSize", maxSize));
              return;
            }
            if (allow && !match(allow, file.name)) {
              fail(t("invalidName", allow));
              return;
            }
            if (mime && !match(mime, file.type)) {
              fail(t("invalidMime", mime));
              return;
            }
          }
          if (!multiple) {
            files = files.slice(0, 1);
          }
          beforeAll(this, files);
          const chunks = chunk(files, concurrent);
          const upload = async (files2) => {
            const data = new FormData();
            files2.forEach((file) => data.append(name, file));
            for (const key in params) {
              data.append(key, params[key]);
            }
            try {
              const xhr = await ajax(url, {
                data,
                method: method,
                responseType: type,
                beforeSend: (env) => {
                  const { xhr: xhr2 } = env;
                  on(xhr2.upload, "progress", progress);
                  for (const type of ["loadStart", "load", "loadEnd", "abort"]) {
                    on(xhr2, type.toLowerCase(), this[type]);
                  }
                  return beforeSend(env);
                }
              });
              complete(xhr);
              if (chunks.length) {
                await upload(chunks.shift());
              } else {
                completeAll(xhr);
              }
            } catch (e) {
              error(e);
            }
          };
          await upload(chunks.shift());
        }
      }
    };
    function match(pattern, path) {
      return path.match(
        new RegExp(
          `^${pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.")}$`,
          "i"
        )
      );
    }
    function chunk(files, size) {
      const chunks = [];
      for (let i = 0; i < files.length; i += size) {
        chunks.push(files.slice(i, i + size));
      }
      return chunks;
    }
    function stop(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    function ajax(url, options) {
      const env = {
        data: null,
        method: "GET",
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: noop,
        responseType: "",
        ...options
      };
      return Promise.resolve().then(() => env.beforeSend(env)).then(() => send(url, env));
    }
    function send(url, env) {
      return new Promise((resolve, reject) => {
        const { xhr } = env;
        for (const prop in env) {
          if (prop in xhr) {
            try {
              xhr[prop] = env[prop];
            } catch (e) {
            }
          }
        }
        xhr.open(env.method.toUpperCase(), url);
        for (const header in env.headers) {
          xhr.setRequestHeader(header, env.headers[header]);
        }
        on(xhr, "load", () => {
          if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            resolve(xhr);
          } else {
            reject(
              assign(Error(xhr.statusText), {
                xhr,
                status: xhr.status
              })
            );
          }
        });
        on(xhr, "error", () => reject(assign(Error("Network Error"), { xhr })));
        on(xhr, "timeout", () => reject(assign(Error("Network Timeout"), { xhr })));
        xhr.send(env.data);
      });
    }

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Countdown: countdown,
        Filter: filter,
        Lightbox: lightbox,
        LightboxPanel: LightboxPanel,
        Notification: notification,
        Parallax: parallax,
        Slider: slider,
        SliderParallax: sliderParallax,
        Slideshow: slideshow,
        SlideshowParallax: sliderParallax,
        Sortable: sortable,
        Tooltip: tooltip,
        Upload: upload
    });

    each(components, (component, name) => App.component(name, component));

    return App;

}));
