import CartUtils from '../CartUtils';

const cartItem = {
    id: 2,
    title: "Прикроватная тумбочка с ящиком",
    img: [
        "https://storage.yandexcloud.net/ecommerce-filippova/base/bedside-table.jpeg",
        "https://storage.yandexcloud.net/ecommerce-filippova/base/bedside-table-2.jpeg"
    ],
    desc: "Прикроватная тумбочка с выдвижным ящиком. Изготовлена из дуба.",
    category: "tables",
    price: "149.99",
    totalCount: 26,
    count: 26
}

const cartProducts = [
    {
        id: 3,
        title: "Офисное кресло на колесах",
        img: [
            "https://storage.yandexcloud.net/ecommerce-filippova/base/office-chair-with-wheels.jpeg",
            "https://storage.yandexcloud.net/ecommerce-filippova/base/office-chair-with-wheels-2.jpeg"
        ],
        desc: "Офисное кресло с сиденьем и спинкой, обитыми темно-коричневой кожей, и металлическим основанием.\nПоворотная конструкция на колесиках и регулируемая высота для большего комфорта.",
        category: "chairs",
        price: "199.99",
        totalCount: 3,
        count: 2,
    },
    {
        id: 4,
        title: "Деревянный стеллаж",
        img: [
            "https://storage.yandexcloud.net/ecommerce-filippova/base/storage-unit.jpeg",
            "https://storage.yandexcloud.net/ecommerce-filippova/base/storage-unit-2.jpeg"
        ],
        desc: "Деревянный стеллаж с двумя полками и выдвижным ящиком.\nВ связи с особенностями материалов цвет и внешний вид могут незначительно отличаться.",
        category: "storage",
        price: "399.99",
        totalCount: 6,
        count: 6,

    },
]

test('totalCostPerProduct', () => {
    expect(CartUtils.totalCostPerProduct(cartItem)).toBe('3899.74');
})

test('cartProductsQuantity', () => {
    expect(CartUtils.cartProductsQuantity(cartProducts)).toBe(8);
})

test('cartProductsTotalCost', () => {
    expect(CartUtils.cartProductsTotalCost(cartProducts)).toBe('2799.92');
})