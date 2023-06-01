steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO cuisine (name) VALUES ('Chinese');
        INSERT INTO cuisine (name) VALUES ('Thai');
        INSERT INTO cuisine (name) VALUES ('Greek');
        INSERT INTO cuisine (name) VALUES ('Caribbean');
        INSERT INTO cuisine (name) VALUES ('Mediterranean');
        INSERT INTO cuisine (name) VALUES ('Indian');
        INSERT INTO cuisine (name) VALUES ('Japanese');
        INSERT INTO cuisine (name) VALUES ('American');
        INSERT INTO cuisine (name) VALUES ('European');
        INSERT INTO cuisine (name) VALUES ('Indonesian');
        INSERT INTO cuisine (name) VALUES ('Italian');
        INSERT INTO cuisine (name) VALUES ('French');
        INSERT INTO cuisine (name) VALUES ('Mexican');
        INSERT INTO cuisine (name) VALUES ('Spanish');
        INSERT INTO cuisine (name) VALUES ('Lebanese');
        INSERT INTO cuisine (name) VALUES ('Vietnamese');
        INSERT INTO cuisine (name) VALUES ('Korean');
        INSERT INTO cuisine (name) VALUES ('Fast Food');
        INSERT INTO cuisine (name) VALUES ('Coffee & Tea');
        INSERT INTO cuisine (name) VALUES ('Breakfast & Brunch');
        INSERT INTO cuisine (name) VALUES ('Seafood');
        INSERT INTO cuisine (name) VALUES ('Salad');
        INSERT INTO cuisine (name) VALUES ('Bakeries');
        INSERT INTO cuisine (name) VALUES ('Dessert');
        """,
        # "Down" SQL statement
        """
        DROP TABLE testingtable;
        """
    ]
]
