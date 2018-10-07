# node-mcdofrance

An API for McDonald's France

## Usage

```javascript
const Mcdo = require('node-mcdofrance');
const mcdo = new Mcdo({
  clientId: '',
  clientSecret: ''
});
```

### Get token to access resources

```javascript
mcdo.getAccessToken();
```

### Get restaurant details

```javascript
mcdo.getRestaurantDetails(restaurantId);
```

### Get products

```javascript
mcdo.getProducts();
```

### Get product details

```javascript
mcdo.getProductDetails(productId);
```
