steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO user_table (username, password, first_name, last_name, email)
        VALUES ('admin', 'admin', 'admin', 'admin', 'admin@admin.com');
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_table;
        """,
    ]
]
