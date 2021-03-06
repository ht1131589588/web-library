import initVnode from './kvdom'

function render(vnode, container) {
  // console.log(container, initVnode(vnode))
  // container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`
  if (vnode && container) {
    container.appendChild(initVnode(vnode))
  }
}

export default {
  render
}
