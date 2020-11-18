class ExpandList extends HTMLUListElement {
  showChildren:boolean
  helpShow:HTMLLIElement
  constructor() {
    super()
    this.showChildren = this.hasAttribute('showChildren')
    this.showChildren ? this.setChildrenDisplay() : this.setChildrenNotDisplay()
    this.helpShow = document.createElement('li')
    this.helpShow.innerText = `${this.showChildren ? 'hidden' : 'show'} ${this.getAttribute('title') ? this.getAttribute('title') : ''}`
    this.insertBefore(this.helpShow, this.childNodes[0])
    this.helpShow.addEventListener('click', this.toggleShow.bind(this))
  }
  toggleShow() {
    this.showChildren ? this.setChildrenNotDisplay() : this.setChildrenDisplay()
    this.showChildren = !this.showChildren
    this.helpShow.innerText = `${this.showChildren ? 'hidden' : 'show'} ${this.getAttribute('title') ? this.getAttribute('title') : ''}`
  }
  setChildrenNotDisplay() {
    const childnodes = this.childNodes
    for(let i=0;i<childnodes.length;i++) {
      if(childnodes[i].nodeType !==1 || i===0) {
        continue
      }
      (childnodes[i] as HTMLLIElement).setAttribute('style', 'display:none')
    }
  }
  setChildrenDisplay() {
    const childnodes = this.childNodes
    for(let i=0;i<childnodes.length;i++) {
      if(childnodes[i].nodeType !==1 || i===0) {
        continue
      }
      (childnodes[i] as HTMLLIElement).setAttribute('style', '')
    }
  }
}
customElements.define('expand-list', ExpandList, { extends: 'ul'})