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

// 선택한 상품들의 정보를 담을 배열(products 배열과 동일한 형태로 구성)
let selectedProducts = [];
  
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

// 선택한 옵션을 화면에 출력하기 위한 요소 준비
let mainNode = document.querySelector('.main');
let shoppingSectionNode = document.createElement('div');
shoppingSectionNode.setAttribute('class','shopping-section');
let ulNode = document.createElement('ul'); // 선택한 옵션을 넣을 목록

// "선택한 상품" 제목 부분 요소 생성
let headerElementNode = document.createElement('h2');
let headerTextNode = document.createTextNode('선택한 상품');
headerElementNode.appendChild(headerTextNode);

// 선택한 상품을 화면에 출력하는 함수 정의
const printSelectedProduct = () => {
    selectedProducts = []; // 초기화
    ulNode.replaceChildren(); // 초기화

    let selectedOptionNode = document.querySelectorAll('#select-products option:checked');

    selectedOptionNode.forEach(e => {
        selectedProducts.push(e.innerText);

        let liNode = document.createElement('li');
        liNode.setAttribute('class','shopping-product');
        let liTextNode = document.createTextNode(e.innerText);
        liNode.appendChild(liTextNode);
        ulNode.appendChild(liNode);
    })

    shoppingSectionNode.appendChild(headerElementNode);
    shoppingSectionNode.appendChild(ulNode);
    mainNode.appendChild(shoppingSectionNode);
}

// select 요소를 클릭할 때마다 이벤트 발생
// 1. 선택한 상품을 화면에 출력
// 2. 선택한 상품의 가격을 계산하여 출력
selectNode.addEventListener('click', () => {
  printSelectedProduct(); // 1. 선택한 상품 화면에 출력하는 함수 호출
})