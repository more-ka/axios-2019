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
  .then((response) => {
  console.log(response)
})

$('#addOne').on('click',function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber-0+1
  $('#number').text(newNumber)
})
$('#minusOne').on('click',function(){
  var oldNumber = $('#number').text()
  var newNumber = oldNumber-0 -1
  $('#number').text(newNumber)
})
$('#reset').on('click',function(){
  $('#number').text(0)
})