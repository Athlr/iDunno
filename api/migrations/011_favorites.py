steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE friends_favorites (
            friends_favorites_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES user_table(user_id) NOT NULL,
            friend_id INT REFERENCES user_table(user_id) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE friends_favorites;
        """,
    ]
]
