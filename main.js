fakeData()

function Model(options){
  this.data = options.data
  this.resource = options.resource
}
Model.prototype.feach = function(id){
  return axios.get(`${this.resource}s/${id}`).then((response)=>{
      this.data = response.data
      return response
    })
}
Model.prototype.update = function(data){
  let id = this.data.id
    return axios.put(`${this.resource}s/${id}`,data).then((response)=>{
      this.data = response.data
      return response
    })
}

function View({el,template}){
  this.el = el
  this.template = template
}
View.prototype.render = function(data){
  let html = this.template
  for(let key in data){
  html = html.replace(`__${key}__`,data[key])
}
   $(this.el).html(html)
}

//------上面是mvc类,下面是对象

let model = new Model({
  data:{
  name:'',
  number:0,
  id:''
  },
  resource:'book'
})

let view= new View({
  el:'#app',
  template:`
  <div>
    书名:《__name__》
    数量: <span id="number">__number__</span>
  </div>
  <button id='addOne'>加1</button>
  <button id='minusOne'>减1</button>
  <button id="reset">清零</button>
`
})

let contorller={
  init(options){
    let {view,model} = options
    this.view = view
    this.model = model
    this.bindEvents()
    this.view.render(this.model.data)
    this.model.feach(1).then(() => {
  this.view.render(model.data)
})
  },
  bindEvents(){
$(this.view.el).on('click','#addOne',this.addOne.bind(this))
$(this.view.el).on('click','#minusOne',this.minusOne.bind(this))
$(this.view.el).on('click','#reset',this.reset.bind(this))
  },
  addOne(){
    var oldNumber = $('#number').text()
  var newNumber = oldNumber-0+1
  this.model.update({number:newNumber}).then(()=>{
    this.view.render(this.model.data)
  })
  },
  minusOne(){
    var oldNumber = $('#number').text()
  var newNumber = oldNumber-0 -1
  this.model.update({number:newNumber}).then(()=>{
    this.view.render(this.model.data)
  })
  },
  reset(){
    this.model.update({number:0}).then(()=>{
    this.view.render(this.model.data)
  })
  }
}
contorller.init({view:view,model:model})



function fakeData(){
  //在真正的response返回之前使用
let book= {
      name:'三体',
      number: 10,
      id:1
    }
axios.interceptors.response.use(function(response){
  var {config:{method,url,data}} = response
  if(url==='books/1' && method==='get'){
    response.data = book
  return response
  }else if(url === 'books/1' && method ==='put'){
    data = JSON.parse(data)
    Object.assign(book,data)
    response.data = book
  }
  return response
})
}