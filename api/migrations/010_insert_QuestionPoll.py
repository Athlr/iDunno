steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO options (name) VALUES ('Hot Dog Fingers');
        INSERT INTO options (name) VALUES ('Cactus Legs');
        """,
        # "Down" SQL statement
        """
        DROP TABLE testingtable;
        """,
    ]
]
