# Data models

---

### Users

| name                | type   | optional |
| ------------------- | ------ | -------- |
| user_id             | string | no       |
| username            | string | no       |
| password            | string | no       |
| first_name          | string | no       |
| last_name           | string | no       |
| email               | int    | no       |
| profile_picture_url | string | no       |

The `user_table` contains the data about specific users account.

### Cuisine

| name       | type | optional |
| ---------- | ---- | -------- |
| cuisine_id | int  | no       |
| name       | str  | no       |

### Restaurant table

| name          | type    | optional |
| ------------- | ------- | -------- |
| restaurant_id | int     | no       |
| name          | string  | no       |
| price         | string  | no       |
| cuisine_id    | int     | no       |
| user_id       | int     | no       |
| suggested     | boolean | no       |

### Restaurant List

| name         | type   | optional |
| ------------ | ------ | -------- |
| list_id      | string | no       |
| name         | string | no       |
| description  | string | yes      |
| list_picture | string | yes      |
| user_id      | string | no       |

### Restaurant list restaurants

| name          | type   | optional |
| ------------- | ------ | -------- |
| id            | int    | no       |
| list_id       | string | no       |
| price         | string | no       |
| restaurant_id | int    | no       |
| list_id       | Fk     | no       |
| restaurant_id | Fk     | no       |

### Friends

| name        | type | optional |
| ----------- | ---- | -------- |
| request_id  | int  | no       |
| status      | str  | no       |
| sender_id   | int  | no       |
| receiver_id | int  | no       |

### Friendship

| name          | type | optional |
| ------------- | ---- | -------- |
| friendship_id | int  | no       |
| user1_id      | int  | no       |
| user2_id      | int  | no       |

### Insert Cuisine

| name    | value              |
| ------- | ------------------ |
| cuisine | Chinese            |
| cuisine | Thai               |
| cuisine | Greek              |
| cuisine | Caribbean          |
| cuisine | Mediterranean      |
| cuisine | Indian             |
| cuisine | Japanese           |
| cuisine | American           |
| cuisine | European           |
| cuisine | Indonesian         |
| cuisine | Italian            |
| cuisine | French             |
| cuisine | Mexican            |
| cuisine | Spanish            |
| cuisine | Lebanese           |
| cuisine | Vietnamese         |
| cuisine | Korean             |
| cuisine | Fast Food          |
| cuisine | Coffee & Tea       |
| cuisine | Breakfast & Brunch |
| cuisine | Seafood            |
| cuisine | Salad              |
| cuisine | Bakeries           |
| cuisine | Dessert            |

### Insert User

| INSERT INTO | VALUES          | optional |
| ----------- | --------------- | -------- |
| username    | admin           | no       |
| password    | admin           | no       |
| first_name  | admin           | no       |
| last_name   | admin           | no       |
| email       | admin@admin.com | no       |

### Insert Restaurant

| INSERT INTO                                 | VALUES                            |
| ------------------------------------------- | --------------------------------- |
| name, price, cuisine_id, user_id, suggested | 'McDonalds', '$', 18, 1, TRUE     |
| name, price, cuisine_id, user_id, suggested | 'Burger King', '$', 18, 1, TRUE   |
| name, price, cuisine_id, user_id, suggested | 'Arbys', '$', 18, 1, TRUE         |
| name, price, cuisine_id, user_id, suggested | 'Chick-fil-a', '$', 18, 1, TRUE   |
| name, price, cuisine_id, user_id, suggested | 'Canes', '$', 18, 1, TRUE         |
| name, price, cuisine_id, user_id, suggested | 'Del Taco', '$', 18, 1, TRUE      |
| name, price, cuisine_id, user_id, suggested | 'Panda Express', '$', 18, 1, TRUE |
| name, price, cuisine_id, user_id, suggested | 'Chipotle', '$', 18, 1, TRUE      |
| name, price, cuisine_id, user_id, suggested | 'Subway', '$', 18, 1, TRUE        |
| name, price, cuisine_id, user_id, suggested | 'Jersey Mikes', '$', 18, 1, TRUE  |
| name, price, cuisine_id, user_id, suggested | 'Carls Jr', '$', 18, 1, TRUE      |
| name, price, cuisine_id, user_id, suggested | 'Wingstop', '$', 18, 1, TRUE      |
