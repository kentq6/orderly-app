export const cart = [
  {
    "id": 9,
    "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "quantity": 2,
    "deliveryOptionId": "1",
    "createdAt": "2025-08-28T02:34:04.409Z",
    "updatedAt": "2025-09-05T02:55:55.433Z",
    "product": {
      "keywords": [
        "socks",
        "sports",
        "apparel"
      ],
      "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
      "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
      "rating": {
        "stars": 4.5,
        "count": 87
      },
      "priceCents": 1090,
      "createdAt": "2025-08-26T17:36:02.611Z",
      "updatedAt": "2025-08-26T17:36:02.611Z"
    }
  },
  {
    "id": 10,
    "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    "quantity": 1,
    "deliveryOptionId": "1",
    "createdAt": "2025-09-05T02:56:28.446Z",
    "updatedAt": "2025-09-05T02:56:28.446Z",
    "product": {
      "keywords": [
        "sports",
        "basketballs"
      ],
      "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      "image": "images/products/intermediate-composite-basketball.jpg",
      "name": "Intermediate Size Basketball",
      "rating": {
        "stars": 4,
        "count": 127
      },
      "priceCents": 2095,
      "createdAt": "2025-08-26T17:36:02.612Z",
      "updatedAt": "2025-08-26T17:36:02.612Z"
    }
  }
];

export const paymentSummary =
{
  "totalItems": 3,
  "productCostCents": 4275,
  "shippingCostCents": 0,
  "totalCostBeforeTaxCents": 4275,
  "taxCents": 428,
  "totalCostCents": 4703
}

export const deliveryOptions = [
  {
    "id": "1",
    "deliveryDays": 7,
    "priceCents": 0,
    "createdAt": "2025-08-26T17:36:02.611Z",
    "updatedAt": "2025-08-26T17:36:02.611Z",
    "estimatedDeliveryTimeMs": 1757725822623
  },
  {
    "id": "2",
    "deliveryDays": 3,
    "priceCents": 499,
    "createdAt": "2025-08-26T17:36:02.612Z",
    "updatedAt": "2025-08-26T17:36:02.612Z",
    "estimatedDeliveryTimeMs": 1757380222623
  },
  {
    "id": "3",
    "deliveryDays": 1,
    "priceCents": 999,
    "createdAt": "2025-08-26T17:36:02.613Z",
    "updatedAt": "2025-08-26T17:36:02.613Z",
    "estimatedDeliveryTimeMs": 1757207422623
  }
];

export const orders = [
  {
    "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    "orderTimeMs": 1723456800000,
    "totalCostCents": 3506,
    "products": [
      {
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": 1,
        "estimatedDeliveryTimeMs": 1723716000000
      },
      {
        "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        "quantity": 2,
        "estimatedDeliveryTimeMs": 1723456800000
      }
    ],
    "createdAt": "2025-08-26T17:36:02.611Z",
    "updatedAt": "2025-08-26T17:36:02.611Z"
  },
  {
    "id": "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
    "orderTimeMs": 1718013600000,
    "totalCostCents": 4190,
    "products": [
      {
        "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        "quantity": 2,
        "estimatedDeliveryTimeMs": 1718618400000
      }
    ],
    "createdAt": "2025-08-26T17:36:02.612Z",
    "updatedAt": "2025-08-26T17:36:02.612Z"
  }
];

export const products = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: ["socks", "sports", "apparel"]
},
{
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  image: "images/products/intermediate-composite-basketball.jpg",
  name: "Intermediate Size Basketball",
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095,
  keywords: ["sports", "basketballs"]
}];