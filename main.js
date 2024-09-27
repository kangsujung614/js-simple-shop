function Product(name, price){
    this.name = name;
    this.price = price;
  }
  
let products = [
   new Product('대뱃살', 3000),
   new Product('목살', 5000),
   new Product('배꼽살', 4000),
   new Product('중뱃살', 1000)
];
  
// select 요소에 option 요소(상품 정보)출력하는 부분 // 초기 화면 구성
let selectNode = document.getElementById('select-products');

products.forEach((e, index)=>{
    let productOptionNode = document.createElement('option');
    productOptionNode.setAttribute('value', index);
    let optionText = document.createTextNode(`${e.name} - ${e.price}`);
    productOptionNode.appendChild(optionText);
    console.log(productOptionNode);

    selectNode.appendChild(productOptionNode);
})
