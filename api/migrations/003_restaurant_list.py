steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE restaurant_list (
            list_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(1000),
            user_id INTEGER REFERENCES user(user_id) NOT NULL,
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
        CREATE TABLE list_connection (
            connection_id SERIAL PRIMARY KEY NOT NULL,
            list_id INTEGER REFERENCES restaurant_list(list_id) NOT NULL,
            restaurant_id INTEGER REFERENCES restaurant(restaurant_id) NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE list_connection;
        """
    ],
]
