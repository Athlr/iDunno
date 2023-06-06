steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE friend_request (
            request_id SERIAL PRIMARY KEY NOT NULL,
            status VARCHAR(100) DEFAULT 'pending' NOT NULL,
            sender_id INT REFERENCES user_table(user_id) NOT NULL,
            receiver_id INT REFERENCES user_table(user_id) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE friend_request;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE friendships (
            friendship_id SERIAL PRIMARY KEY NOT NULL,
            user1_id INT REFERENCES user_table(user_id) NOT NULL,
            user2_id INT REFERENCES user_table(user_id) NOT NULL
        );
        """,
        # "Down" SQL statemnet
        """
        DROP TABLE friendships;
        """,
    ],
]
