//在真正的response返回之前使用
axios.interceptors.response.use(function(response){
  var {config:{method,url,data}} = response
  if(url==='books/1' && method==='get'){
    response.data = {
      name:'三体',
      number: 10,
      id:1
    }
  return response
  }
})

axios.get('books/1')
  .then(({data}) => {
  let originalHtml = $('#app').html()
  let newHtml = originalHtml.replace('__name__',data.name)
  .replace('__number__',data.number)
  $('#app').html(newHtml)
})

$('#app').on('click','#addOne',function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber-0+1
  $('#number').text(newNumber)
})
$('#app').on('click','#minusOne',function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber-0 -1
  $('#number').text(newNumber)
})
$('#app').on('click','#reset',function(){
  $('#number').text(0)
})