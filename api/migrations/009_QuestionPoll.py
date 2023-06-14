steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE options (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            count INT DEFAULT 0
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE options;
        """,
    ]
]
