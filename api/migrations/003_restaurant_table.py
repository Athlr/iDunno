steps = [
    [
        # "UP" SQL statement
        """
        CREATE TABLE restaurant (
            restaurant_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            price VARCHAR(4) NOT NULL,
            cuisine_id INT REFERENCES cuisine(cuisine_id) NOT NULL,
            user_id INT REFERENCES user_table(user_id) NOT NULL,
            suggested BOOLEAN DEFAULT FALSE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE restaurant;
        """,
    ]
]
