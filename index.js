export default (styles) => {
  styles = Object.prototype.toString.call(styles) === '[object Object]'
		? styles
		: { 'box-shadow': '0 0 5px 5px red inset' }
	const changes = new WeakMap()
  const keyups = new WeakMap()
  const valids = new WeakMap()
  const originals = new WeakMap()
  const maps = [changes, keyups, styles, originals]
  const stylize = (el, target, revert) => {
    const { original, target:oTarget } = originals.get(el) || {}
    target = target || oTarget
    const present = Object.keys(styles).map(k => ({ [k]: target.style[k] })).reduce((x, y) => ({ ...x, ...y }), {})
    const applicable = revert ? original : styles
    originals.set(el, { target, original: original || present })
    if (original && oTarget !== target) {
      Object.keys(original).forEach(k => oTarget.style[k] = original[k])
    }
    Object.keys(applicable).forEach(k => target.style[k] = applicable[k])
  }
	return {
		bind (el, binding) {
      const pattern = typeof binding.value === 'string' ? new RegExp(binding.value) : binding.value
      const check = (val) => {
        return (val == null) || pattern.test(val.toString())
      }
			const change = ({ target }) => {
        const valid = check(target.value)
        stylize(el, target, valid)
        valids.set(el, valid)
      }
      const keyup = (ev) => {
        if (!valids.get(el)) {
          change(ev)
        }
      }
			changes.set(el, change)
      keyups.set(el, keyup)
      valids.set(el, true)
      el.addEventListener('change', change)
      el.addEventListener('keyup', keyup)
		},
		unbind (el) {
      stylize(el, null, true)
      el.removeEventListener('change', changes.get(el))
      el.removeEventListener('keyup', keyups.get(el))
      maps.forEach(map => map.delete(el))
		}
	}
}
