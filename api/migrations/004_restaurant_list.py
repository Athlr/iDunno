steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE restaurant_list (
            list_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(1000),
            user_id INTEGER REFERENCES user_table(user_id) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE restaurant_list;
        """
    ],



    [
        # "Up" SQL statement
        """
        CREATE TABLE restaurant_list_restaurant (
            id SERIAL PRIMARY KEY,
            list_id INT,
            restaurant_id INT,
            FOREIGN KEY (list_id) REFERENCES restaurant_list (list_id),
            FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE restaurant_list_restaurant;
        """
    ]

]
