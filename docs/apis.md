### APIs

### Account

- Method: POST, GET, PUT, DELETE,
- Path: /api/accounts, /api/accounts/{user_id}

Input:

```
{
  "email": "string",
  "username": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string"
}
```

Output:

```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "email": "string",
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "profile_picture_url": "string"
  }
}
```

### Cuisine List

- Method: GET
- Path: /cuisine-list

input:

```
  {
    "cuisine_id": 1,
    "name": "American"
  }
```

Output:

```
  {
    "cuisine_id": 0,
    "name": "string"
  }
```

### Friend Requests

-Method: GET, POST, PUT, DELETE
-Path: /request , /request/{request_id}

Input:

```
{
  "receiver_username": "string"
}
```

Output:

```
{
  "request_id": 0,
  "sender_id": 0,
  "receiver_id": 0
}
```

### Friendships

-Method: GET, POST, PUT, DELETE
-Path: /friends , /friends/{friend_id}

Input:

```
{
    "friend_id": 0,
}
```

Output:

```
{
  "friend_id": 0,
  "username": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "profile_pic": "string"
}
```

### Restaurant List

-Method: GET, PUT, POST, DELETE
-Path: /restaurant-list, /restaurant-list/{list_id}

Input:

```
{
  "name": "string",
  "description": "string",
  "user_id": 0,
  "list_picture": "string"
}
```

Output:

```
{
  "name": "string",
  "description": "string",
  "user_id": 0,
  "list_picture": "string"
}
```

### Restaurants

-Method: GET, PUT, POST, DELETE
-Path: /restaurants, /restaurants/{restaurant_id}

Input:

```
{
    "message": "string",
}
```

Output:

```
  {
    "restaurant_id": 1,
    "name": "test",
    "price": "$$$$",
    "cuisine_id": 1
  }
```
