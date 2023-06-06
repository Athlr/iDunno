steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE cuisine (
            cuisine_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE cuisine;
        """,
    ]
]
