steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_table (
                user_id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
                profile_picture_url VARCHAR(500) DEFAULT 'https://static.vecteezy.com/system/resources/previews/002/534/006/non_2x/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_table;
        """
    ]
]
