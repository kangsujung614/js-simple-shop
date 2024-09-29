"use strict";

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

    selectNode.appendChild(productOptionNode);
})

// 선택한 옵션을 화면에 출력하기 위한 요소 준비
let shoppingCartNode = document.getElementById('shopping-cart');
let shoppingSectionNode = document.createElement('div');
shoppingSectionNode.setAttribute('class','shopping-section');
let ulNode = document.createElement('ul'); // 선택한 옵션을 넣을 목록

// "선택한 상품" 제목 부분 요소 생성
let headerElementNode = document.createElement('h2');
let headerTextNode = document.createTextNode('선택한 상품');
headerElementNode.appendChild(headerTextNode);

// 선택한 상품을 화면에 출력하는 함수 정의
const printSelectedProduct = () => {
    shoppingSectionNode.replaceChildren() // 초기화
    selectedProducts = []; // 초기화
    ulNode.replaceChildren(); // 초기화

    let selectedOptionNode = document.querySelectorAll('#select-products option:checked');

    if(selectedOptionNode.length){
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
    shoppingCartNode.appendChild(shoppingSectionNode);
    }
}

// 선택한 상품들의 가격을 합산한 결과(최종 금액)를 출력하기 위한 요소 준비
let printPriceNode = document.createElement('div');
printPriceNode.setAttribute('class','products-price');
let priceTitleNode = document.createElement('h2');
let priceTextNode;

// 선택한 상품들의 가격 합산
let sum = 0;

// 선택한 상품들의 가격을 합산하고, 화면에 출력하는 함수 정의
const sumProducts = (array) => {
    // 선택한 상품들의 가격 합산
    sum = 0;
    array.forEach(e => {
        sum += parseInt(e.price);
    })

    // 선택한 상품들의 총액 출력
    priceTitleNode.replaceChildren();
    priceTextNode = document.createTextNode(`총액: ${sum}`);
    priceTitleNode.appendChild(priceTextNode);
    printPriceNode.appendChild(priceTitleNode);
    shoppingCartNode.appendChild(printPriceNode);

    return sum;
}

// select 요소를 클릭할 때마다 이벤트 발생
// 1. 선택한 상품을 화면에 출력
// 2. 선택한 상품의 가격을 계산하여 출력
selectNode.addEventListener('click', () => {
    printSelectedProduct(); // 1. 선택한 상품을 화면에 출력하는 함수 호출

    // 2. 선택한 상품의 가격을 합산하여 출력하기 위해..
    // 2-1. 선택한 상품을 객체로 생성(Product 생성자 함수)
    if(selectedProducts.length){
        let arr;
        selectedProducts = selectedProducts.map(e => {
            arr = e.split(" - ");
            return new Product(arr[0], arr[1]);
        })
        // 2-2. 가격을 합산하여 화면에 출력하는 함수 호출
        sumProducts(selectedProducts);
    } else {
        printPriceNode.replaceChildren();
    }
})

// 결제하기 버튼 클릭 이벤트
let submitNode = document.getElementById('submit');

submitNode.addEventListener('click',(e) => {
    e.preventDefault();
    if(selectedProducts.length === 0){
        alert('결제할 상품을 선택해야 합니다.');
    } else {
        window.open(
            'payment.html',
            'blank_',
            'left=240,top=200,width=460,height=260'
        )
    }
})

// 총액 전달하는 함수 (payment.html에서 호출)
function sendPrice() {
    return sum;
}

// 결제창 닫고, 쇼핑 카트 정보 초기화, 결제 완료 안내 처리하는 함수
// (payment.html에서 호출)
function paymentCompleted(inputNodeValue, price) {
    payment.close();
    shoppingCartNode.replaceChildren();
    setTimeout(() => {
        alert(`${inputNodeValue}로 ${price}원이 결제 완료 되었습니다.`);
    }, 0);
}